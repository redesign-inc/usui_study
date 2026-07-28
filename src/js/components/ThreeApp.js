  'use strict';

import * as THREE from 'three';
import gsap from "gsap";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

class ThreeApp {
  constructor() {
    this.slider()
    this.map()
  }
  slider() {
    const section = document.querySelector('.three-carousel');
    if(!section) return;
    const URL_BG = "/assets/imgs/bg.avif";
    const ITEM_W = 256;
    const ITEM_H = 256;
    const MARGIN_X = ITEM_W + 100;
    const MAX_SLIDE = 4;
    const AUTO_SCROLL_SPEED = 0.15;

    /** テキストデータ */
    const CARD_DATA = [
      { title: "ダミータイトル 01", desc: "ダミーテキストダミーテキスト" },
      { title: "ダミータイトル 02", desc: "ダミーテキストダミーテキスト" },
      { title: "ダミータイトル 03", desc: "ダミーテキストダミーテキスト" },
      { title: "ダミータイトル 04", desc: "ダミーテキストダミーテキスト" },
    ];

    /** グローバル変数 */
    // 現在のスクロール進行度。
    // 1 増えると「カード 1 枚ぶん」横に進んだ扱いになる。
    let currentProgress = 0;
    // 表示中のカードインスタンスを保持する配列。
    const cards = [];
    // 自動スクロール用の GSAP Tween 参照。
    let autoScrollTween = null;
    // スナップ（最寄り位置へ吸着）用 Tween 参照。
    let snapTween = null;
    let wheelTimeoutId = null;
    let isExpanded = false;   // 拡大中フラグ
    let selectedCard = null; // 選択中のカード

    const textureLoader = new THREE.TextureLoader();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    /** シーン、カメラ、レンダラー */
    const scene = new THREE.Scene();
    // 遠近感ありのカメラ。fov=40, near=1, far=10000。
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 900);
    scene.add(camera);

    // 2Dキャンバスではなく WebGL で描画するレンダラー。
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // 高DPI環境でも重くなりすぎないよう、devicePixelRatio は 2 を上限にする。
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
    renderer.setSize(window.innerWidth, window.innerHeight);
    const wrapper = document.querySelector("#wrapper");
    if (!wrapper) return;
    wrapper.prepend(renderer.domElement);

    /** イベントリスナー */
    window.addEventListener("wheel", onWheel, { passive: false });
    renderer.domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    renderer.domElement.addEventListener("touchmove", onTouchMove, { passive: false });
    renderer.domElement.addEventListener("touchend", onTouchEnd, { passive: true });
    renderer.domElement.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    // HTMLの閉じるボタン
    const closeBtn = document.getElementById("close-btn");
    if (closeBtn) closeBtn.addEventListener("click", closeCard);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCard();
      }
    });

    /** --- ロジック --- */

    function startAutoScroll() {
      // 既存 Tween が残っていると二重再生になるので必ず停止してから作る。
      stopAutoScroll();

      // 現在値から先へ向かって線形で進める。
      // repeat:-1 により無限ループし、見た目上は常時流れ続ける。
      autoScrollTween = gsap.to({ value: currentProgress }, {
        value: currentProgress + 100,
        duration: 100 / AUTO_SCROLL_SPEED,
        ease: "none",
        repeat: -1,
        onUpdate: function () {
          // Tween 内部オブジェクトの value を実値へ反映。
          currentProgress = this.targets()[0].value;
          updateSlides();
        }
      });
    }

    function stopAutoScroll() {
      // kill() で更新ループを止め、参照を破棄して GC 対象にする。
      if (autoScrollTween) {
        autoScrollTween.kill();
        autoScrollTween = null;
      }
    }

    function onWheel(event) {
      // 拡大中は位置固定したいのでスクロール入力を無視。
      if (isExpanded) return;

      // 手動操作が始まったら自動スクロールを停止。
      stopAutoScroll();
      // 前回スナップ中なら上書きするため中断。
      if (snapTween) snapTween.kill();

      // deltaY を進行度に変換。係数 0.002 は操作感の調整値。
      currentProgress += event.deltaY * 0.002;
      updateSlides();

      // ホイール連続入力が止まったタイミングで吸着させる。
      clearTimeout(wheelTimeoutId);
      wheelTimeoutId = setTimeout(() => snapToNearest(), 120);
    }

    function onTouchStart(event) {
      if (isExpanded) return;
      stopAutoScroll();
      if (snapTween) snapTween.kill();
      // タッチ開始時点を保持し、move 時に相対移動量へ変換する。
      this.touchStartX = event.touches[0].clientX;
      this.touchStartValue = currentProgress;
    }

    function onTouchMove(event) {
      if (isExpanded) return;
      event.preventDefault();
      // 指の移動量から進行度を逆算（右へドラッグで左へ送る挙動）。
      const deltaX = event.touches[0].clientX - this.touchStartX;
      currentProgress = this.touchStartValue - deltaX / (ITEM_W * 0.1);
      updateSlides();
    }

    function onTouchEnd() {
      if (isExpanded) return;
      snapToNearest();
    }

    function snapToNearest() {
      // 最も近い整数インデックスへ丸めて吸着先を決める。
      const targetId = Math.round(currentProgress);
      snapTween = gsap.to({ value: currentProgress }, {
        value: targetId,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: function () {
          currentProgress = this.targets()[0].value;
          updateSlides();
        },
        // スナップ終了後に自動スクロールを再開。
        onComplete: () => startAutoScroll()
      });
    }

    /** クリック判定 */
    function onClick(event) {
      if (isExpanded) return;

      // 画面座標(px) -> NDC(-1〜1) へ変換してレイ判定に使用。
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      // true を渡しているので Card 配下の Mesh まで判定対象になる。
      const intersects = raycaster.intersectObjects(cards, true);
      if (intersects.length > 0) {
        // ヒット対象が Mesh の場合があるため、親をたどって Card 本体を得る。
        let target = intersects[0].object;
        while (!(target instanceof Card) && target.parent) target = target.parent;
        if (target instanceof Card) expandCard(target);
      }
    }

    /** カード拡大 */
    function expandCard(card) {
      // 展開モードへ遷移。
      isExpanded = true;
      selectedCard = card;
      stopAutoScroll();
      if (snapTween) snapTween.kill();

      const params = getExpandedParams();

      // カードの移動とスケール
      gsap.to(card.position, { 
        x: params.x, 
        y: 0, 
        z: 400, 
        duration: 0.8, 
        ease: "expo.out" 
      });
      gsap.to(card.scale, { 
        x: params.scale, 
        y: params.scale, 
        z: params.scale, 
        duration: 0.8, 
        ease: "expo.out" 
      });

      // ★ 透過度の調整
      // 選択したカードはハッキリ見せる
      gsap.to(card, { 
        opacity: 1.0, 
        duration: 0.5 
      });

      // 他カードを半透明にして主役を際立たせる。
      cards.forEach(c => {
        if (c !== card) {
          gsap.to(c, { 
            opacity: 0.5, 
            duration: 0.5 
          });
        }
      });

      // UI表示
      const data = CARD_DATA[card.cardId % MAX_SLIDE];
      document.getElementById("card-title").innerText = data.title;
      document.getElementById("card-desc").innerText = data.desc;
      
      const ui = document.getElementById("ui-overlay");
      ui.style.display = "flex";
      gsap.fromTo(ui, { 
        opacity: 0 
      }, { 
        opacity: 1, 
        duration: 0.5 
      });
    }

    /** カードを閉じる */
    function closeCard(e) {
      if (e) e.stopPropagation();
      if (!selectedCard) return;

      const card = selectedCard;

      // 現在の progress に基づいて「本来このカードがいるべき X」を再計算。
      // modulo 計算で -totalWidth/2〜totalWidth/2 に折り返し、循環配置を維持する。
      const totalWidth = MARGIN_X * cards.length;
      const i = cards.indexOf(card);
      const baseX = (i * MARGIN_X) - (currentProgress * MARGIN_X);
      const targetX = ((baseX + totalWidth / 2) % totalWidth + totalWidth) % totalWidth - totalWidth / 2;

      gsap.to(card.position, {
        x: targetX,
        y: 0,
        z: 0,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          // 状態を通常モードに戻して自動スクロール再開。
          selectedCard = null;
          isExpanded = false;
          updateSlides();
          startAutoScroll();
        }
      });

      gsap.to(card.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.8,
        ease: "power3.out"
      });

      cards.forEach(c => {
        gsap.to(c, { 
          opacity: 1, 
          duration: 0.6 
        });
      });

      gsap.to("#ui-overlay", {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          document.getElementById("ui-overlay").style.display = "none";
        }
      });
    }

    function updateSlides() {
      // 展開中は個別アニメーションを優先し、整列ロジックを止める。
      if (isExpanded) return; 

      const totalWidth = MARGIN_X * cards.length;
      cards.forEach((card, i) => {
        // 位置の計算
        // GSAP がそのカードを移動中なら、手動上書きしない。
        if (gsap.isTweening(card.position)) return;

        let baseX = (i * MARGIN_X) - (currentProgress * MARGIN_X);
        // 無限横スクロールのため、範囲外へ出たカードを反対側へ折り返す。
        let wrappedX = ((baseX + totalWidth / 2) % totalWidth + totalWidth) % totalWidth - totalWidth / 2;
        
        card.position.x = wrappedX;
        card.position.z = 0;
      });
    }

    /** 拡大時のレスポンシブ座標とスケールを計算 */
    function getExpandedParams() {
      const width = window.innerWidth;
      let x = -width * 0.07; // 画面幅の7%左に寄せる
      let scale = 1.0;

      // 画面が狭い場合（PCのウィンドウを小さくした場合など）の調整
      if (width < 1200) {
        x = -width * 0.07;
        scale = 0.8;
      }
      if (width < 900) {
        x = -width * 0.07;
        scale = 0.7;
      }

      return { x, scale };
    }

    function onResize() {
      // 画面サイズ変更時はレンダラーと投影行列を再計算して歪みを防ぐ。
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    function tick() {
      // 毎フレーム描画し続けるメインループ。
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }

    class Card extends THREE.Object3D {
      constructor(index) {
        super();
        this.cardId = index;
        this._opacity = 1.0; // 内部保持用

        // カード本体テクスチャ。index に対応した画像を利用。
        const texture = textureLoader.load(`/assets/imgs/${index}.avif`);
        texture.colorSpace = THREE.SRGBColorSpace;

        // --- メイン（上側）のカード ---
        const material = new THREE.MeshStandardMaterial({ 
          map: texture, 
          side: THREE.DoubleSide,
          transparent: true
        });
        const planeTop = new THREE.Mesh(new THREE.PlaneGeometry(ITEM_W, ITEM_H), material);
        this.add(planeTop);

        // --- 反射面（下側）のカード ---
        const materialOpt = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
          // 初期化時の透明度をあらかじめ下げておく（例: 0.3）
          opacity: 0.3 
        });
        const planeBottom = new THREE.Mesh(new THREE.PlaneGeometry(ITEM_W, ITEM_H), materialOpt);
        planeBottom.rotation.x = Math.PI; 
        planeBottom.position.y = -ITEM_H - 1; 
        this.add(planeBottom);

        // ★重要: インスタンス化された瞬間にセッターを介して透明度を同期させる
        this.opacity = 1.0;
      }

      // GSAPや初期化時に呼ばれるセッター
      set opacity(val) {
        this._opacity = val;
        this.traverse((child) => {
          if (child.isMesh) {
            // child.position.y < 0 が「下の反射面」を指す
            // ここの 0.3 を調整することで、影の最大濃度をコントロールできます
            const baseFactor = (child.position.y < 0) ? 0.3 : 1.0;
            // 反射面は本体より薄く保つため係数を掛ける。
            child.material.opacity = val * baseFactor;
          }
        });
      }

      get opacity() {
        return this._opacity;
      }
    }

    async function init() {
      // 全体を明るくする環境光。
      scene.add(new THREE.AmbientLight(0xffffff, 1));
      // 奥行きを感じさせる点光源。
      const pointLight = new THREE.PointLight(0xffffff, 1.5, 2000);
      pointLight.position.set(0, 200, 600);
      scene.add(pointLight);

      // MAX_SLIDE*2 枚生成することで、循環時の見た目密度を確保する。
      for (let i = 0; i < MAX_SLIDE * 2; i++) {
        const card = new Card(i % MAX_SLIDE); 
        scene.add(card);
        cards.push(card);
      }

      // 背景板。z を後方に置いて奥に固定表示。
      const bgTexture = textureLoader.load(URL_BG);
      bgTexture.colorSpace = THREE.SRGBColorSpace;
      const meshBg = new THREE.Mesh(
        new THREE.PlaneGeometry(4000, 2000),
        new THREE.MeshBasicMaterial({ map: bgTexture, color: 0xffffff }) 
      );
      meshBg.position.z = -800;
      scene.add(meshBg);

      updateSlides();
      startAutoScroll();
      tick();
    }

    init();    
  }
  async map() {
    const section = document.querySelector('.three-map');
    if(!section) return;

    const URL_MAP = "/assets/imgs/map.svg";

    const CARD_DATA = [
      { title: "北海道", desc: "Hokkaido" },
      { title: "青森県", desc: "Aomori" },
      { title: "岩手県", desc: "Iwate" },
      { title: "宮城県", desc: "Miyagi" },
      { title: "秋田県", desc: "Akita" },
      { title: "山形県", desc: "Yamagata" },
      { title: "福島県", desc: "Fukushima" },
      { title: "茨城県", desc: "Ibaraki" },
      { title: "栃木県", desc: "Tochigi" },
      { title: "群馬県", desc: "Gunma" },
      { title: "埼玉県", desc: "Saitama" },
      { title: "千葉県", desc: "Chiba" },
      { title: "東京都", desc: "Tokyo" },
      { title: "神奈川県", desc: "Kanagawa" },
      { title: "新潟県", desc: "Niigata" },
      { title: "富山県", desc: "Toyama" },
      { title: "石川県", desc: "Ishikawa" },
      { title: "福井県", desc: "Fukui" },
      { title: "山梨県", desc: "Yamanashi" },
      { title: "長野県", desc: "Nagano" },
      { title: "岐阜県", desc: "Gifu" },
      { title: "静岡県", desc: "Shizuoka" },
      { title: "愛知県", desc: "Aichi" },
      { title: "三重県", desc: "Mie" },
      { title: "滋賀県", desc: "Shiga" },
      { title: "京都府", desc: "Kyoto" },
      { title: "大阪府", desc: "Osaka" },
      { title: "兵庫県", desc: "Hyogo" },
      { title: "奈良県", desc: "Nara" },
      { title: "和歌山県", desc: "Wakayama" },
      { title: "鳥取県", desc: "Tottori" },
      { title: "島根県", desc: "Shimane" },
      { title: "岡山県", desc: "Okayama" },
      { title: "広島県", desc: "Hiroshima" },
      { title: "山口県", desc: "Yamaguchi" },
      { title: "徳島県", desc: "Tokushima" },
      { title: "香川県", desc: "Kagawa" },
      { title: "愛媛県", desc: "Ehime" },
      { title: "高知県", desc: "Kochi" },
      { title: "福岡県", desc: "Fukuoka" },
      { title: "佐賀県", desc: "Saga" },
      { title: "長崎県", desc: "Nagasaki" },
      { title: "熊本県", desc: "Kumamoto" },
      { title: "大分県", desc: "Oita" },
      { title: "宮崎県", desc: "Miyazaki" },
      { title: "鹿児島県", desc: "Kagoshima" },
      { title: "沖縄県", desc: "Okinawa" },
    ];

    let selectedMesh = null;
    let hoverDataCode = null;
    const pickUpData = 9;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 2000);
    scene.add(camera);

    const defaultCamera = {
      x: 0,
      y: 0,
      z: 2000,
      fov: 50,
    };
    const lookAtTarget = new THREE.Vector3(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const imgArea = document.querySelector(".section02__img");
    imgArea.prepend(renderer.domElement);
    
    renderer.domElement.classList.add("three-map-canvas");
    renderer.domElement.addEventListener("click", onClick);
    renderer.domElement.addEventListener("mousemove", onMouseOver);
    renderer.domElement.addEventListener("mouseleave", onMouseLeave);

    // ライトの追加
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const pointLight = new THREE.PointLight(0xffffff, 1.5, 2000);
    pointLight.position.set(0, 0, 100);
    scene.add(pointLight);

    // 2. SVGの読み込みと解析
    const loader = new SVGLoader();
    const svgData = await loader.loadAsync(URL_MAP);
    const paths = svgData.paths;
    
    // SVGをThree.jsのオブジェクトに変換するためのグループ
    const svgGroup = new THREE.Group();

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const svgElement = path.userData.node;
      const dataCode = svgElement.getAttribute("data-code");
      // パスからシェイプを生成
      const shapes = SVGLoader.createShapes(path);

      for (let j = 0; j < shapes.length; j++) {
        const shape = shapes[j];
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
          depthWrite: false
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData.dataCode = dataCode;
        svgGroup.add(mesh);
      }
    }

    svgGroup.rotation.x = Math.PI;
    // svgGroup.scale.set(1.5, 1.5, 1.5);
    
    //ボックスのインスタンスを作成
    const box = new THREE.Box3().setFromObject(svgGroup);
    //サイズや中心点を取得
    const center = new THREE.Vector3();
    //中心座標を取得
    box.getCenter(center);
    svgGroup.position.x = -center.x;
    svgGroup.position.y = -center.y;
    scene.add(svgGroup);
    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

  function raycast(event) {
    // Canvas要素のスクリーン上の正確な領域を取得
    // 例: 親要素のサイズに合わせる場合
    const rect = imgArea.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();

    // Canvas内のローカルなマウス位置（px）を計算
    const x = event.clientX - rect.left;
    // ※上下反転に対応するため、rect.bottom から計算します
    const y = event.clientY - rect.top;

    // -1.0 ～ +1.0 の正規化デバイス座標（NDC）に変換
    mouse.x = (x / rect.width) * 2 - 1;
    mouse.y = -(y / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(svgGroup.children, true);
    return intersects;
  }

    function getDataCodeCenter(dataCode, fallbackMesh) {
      const fallbackCenter = new THREE.Vector3();
      fallbackMesh.getWorldPosition(fallbackCenter);

      const meshes = svgGroup.children.filter((mesh) => mesh.userData.dataCode === dataCode);

      const bounds = new THREE.Box3();
      const tmpBox = new THREE.Box3();
      let hasBounds = false;

      meshes.forEach((mesh) => {
        tmpBox.setFromObject(mesh);
        if (tmpBox.isEmpty()) return;
        if (!hasBounds) {
          bounds.copy(tmpBox);
          hasBounds = true;
          return;
        }
        bounds.union(tmpBox);
      });

      if (!hasBounds || bounds.isEmpty()) return fallbackCenter;

      const center = new THREE.Vector3();
      bounds.getCenter(center);
      return center;
    }

    function startBlinkForDataCode() {
      if (selectedMesh) return;
      svgGroup.children.forEach((mesh) => {
        if (Number(mesh.userData.dataCode) === pickUpData) {
          gsap.killTweensOf(mesh.material.color);
          gsap.fromTo(mesh.material.color, {
            r: 1,
            g: 1,
            b: 1
          }, {
            r: 1,
            g: 0,
            b: 0,
            duration: 0.8,
            ease: "none",
            repeat: -1,
            yoyo: true
          });
        }
      });
      selectedMesh = null;
    }

    function stopBlinkForDataCode() {
      svgGroup.children.forEach((mesh) => {
        if (Number(mesh.userData.dataCode) === pickUpData) {
          gsap.killTweensOf(mesh.material.color);
          mesh.material.color.set(0xffffff);
        }
      });
    }

    // const closeBtn = document.getElementById("close-btn");
    // if (closeBtn) closeBtn.addEventListener("click", closeCard);
    // document.addEventListener('keydown', (e) => {
    //   if(e.key === "Escape"){
    //     closeCard();
    //   }
    // });

    // ★修正: 選択状態を解除するとき、同じdataCodeの全メッシュを白に戻す
    // function closeCard() {
    //   if (!selectedMesh) return;

    //   const selectedDataCode = selectedMesh.userData.dataCode;
    //   svgGroup.children.forEach((mesh) => {
    //     if (mesh.userData.dataCode === selectedDataCode && Number(mesh.userData.dataCode) !== pickUpData) {
    //       mesh.material.color.set(0xffffff);
    //     }
    //   });
      
    //   selectedMesh = null;
    //   startBlinkForDataCode();

    //   gsap.to(camera.position, {
    //     x: defaultCamera.x,
    //     y: defaultCamera.y,
    //     z: defaultCamera.z,
    //     duration: 0.8,
    //     ease: "expo.out"
    //   });
    //   gsap.to(camera, {
    //     fov: defaultCamera.fov,
    //     duration: 0.8,
    //     ease: "expo.out",
    //     onUpdate: () => camera.updateProjectionMatrix()
    //   });
    //   gsap.to(lookAtTarget, {
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //     duration: 0.8,
    //     ease: "expo.out"
    //   });

    //   const ui = document.getElementById("ui-overlay");

    //   gsap.to(ui, {
    //     opacity: 0,
    //     duration: 0.3,
    //     onComplete: () => {
    //       ui.style.display = "none";
    //     }
    //   });
    // }

    function resetSelectedColor() {
      if (!selectedMesh) return;
      const selectedDataCode = selectedMesh.userData.dataCode;
      if (Number(selectedDataCode) !== pickUpData) {
        svgGroup.children.forEach((mesh) => {
          if (mesh.userData.dataCode === selectedDataCode) {
            mesh.material.color.set(0xffffff);
          }
        });
      }
      selectedMesh = null;
    }

    // ★修正: クリック時、選択解除と再選択を許可する
    function onClick(event) {
      const intersects = raycast(event);

      // 何もヒットしない場所をクリックしたときは選択解除。
      if (intersects.length === 0) {
        if (selectedMesh) {
          resetSelectedColor();
          startBlinkForDataCode();
        }
        return;
      }

      const target = intersects[0].object;
      const dataCode = target.userData.dataCode;
      const targetCenter = getDataCodeCenter(dataCode, target);
      const dataIndex = dataCode - 1;
      const data = CARD_DATA[dataIndex];

      // 既に別の都道府県が選択されている場合は色を戻す。
      if (selectedMesh && selectedMesh.userData.dataCode !== dataCode) {
        resetSelectedColor();
      }

      selectedMesh = target;
      stopBlinkForDataCode();

      svgGroup.children.forEach((mesh) => {
        if (mesh.userData.dataCode === dataCode) {
          mesh.material.color.set(0xff0000); // すべて赤に
        }
      });

      // gsap.to(camera.position, {
      //   x: targetCenter.x,
      //   y: targetCenter.y,
      //   z: 900,
      //   duration: 0.8,
      //   ease: "expo.out"
      // });
      // gsap.to(camera, {
      //   fov: 32,
      //   duration: 0.8,
      //   ease: "expo.out",
      //   onUpdate: () => camera.updateProjectionMatrix()
      // });
      // gsap.to(lookAtTarget, {
      //   x: targetCenter.x,
      //   y: targetCenter.y,
      //   z: targetCenter.z,
      //   duration: 0.8,
      //   ease: "expo.out"
      // });

      const titleEl = document.getElementById("card-title");
      const descEl = document.getElementById("card-desc");
      const ui = document.getElementById("ui-overlay");

      titleEl.innerText = data.title;
      descEl.innerText = data.desc;
      // ui.style.display = "flex";
      // gsap.fromTo(ui, { 
      //   opacity: 0 
      // }, { 
      //   opacity: 1, 
      //   duration: 0.35 
      // });
    }

    // ★修正: ホバー時も、同じdataCodeの全メッシュを一括でグレーにする
    function onMouseOver(event) {
      const intersects = raycast(event);
      if(intersects.length > 0) {
        const target = intersects[0].object;
        const targetDataCode = target.userData.dataCode;
        const selectedDataCode = selectedMesh ? selectedMesh.userData.dataCode : null;

        // 前回のホバー対象と異なる場合のみ処理
        if (hoverDataCode !== targetDataCode) {
          // 前回のホバーをクリア（選択中の都道府県は除外）
          if (hoverDataCode !== null && hoverDataCode !== selectedDataCode && Number(hoverDataCode) !== pickUpData) {
            svgGroup.children.forEach((mesh) => {
              if (mesh.userData.dataCode === hoverDataCode) {
                mesh.material.color.set(0xffffff);
              }
            });
          }

          // 新しいホバー対象をグレーにする（選択中の都道府県は除外）
          if (targetDataCode !== selectedDataCode && Number(targetDataCode) !== pickUpData) {
            svgGroup.children.forEach((mesh) => {
              if (mesh.userData.dataCode === targetDataCode) {
                mesh.material.color.set(0xdddddd);
              }
            });
          }

          hoverDataCode = targetDataCode;
        }
      } else if (hoverDataCode !== null) {
        // 何もホバーしていない状態に戻す
        const selectedDataCode = selectedMesh ? selectedMesh.userData.dataCode : null;
        
        if (hoverDataCode !== selectedDataCode && Number(hoverDataCode) !== pickUpData) {
          svgGroup.children.forEach((mesh) => {
            if (mesh.userData.dataCode === hoverDataCode) {
              mesh.material.color.set(0xffffff);
            }
          });
        }
        hoverDataCode = null;
      }
    }

    // ★修正: マウスが画面を外れた際、ホバーしていた全メッシュを白に戻す
    function onMouseLeave() {
      if (hoverDataCode !== null) {
        const selectedDataCode = selectedMesh ? selectedMesh.userData.dataCode : null;

        if (hoverDataCode !== selectedDataCode && Number(hoverDataCode) !== pickUpData) {
          svgGroup.children.forEach((mesh) => {
            if (mesh.userData.dataCode === hoverDataCode) {
              mesh.material.color.set(0xffffff);
            }
          });
        }
      }
      hoverDataCode = null;
    }

    // 3. イベントやループの開始
    window.addEventListener("resize", onResize);
    startBlinkForDataCode();

    function onResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    function tick() {
      camera.lookAt(lookAtTarget);
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }

    // アニメーションループを開始
    tick();
  }
}

export default ThreeApp;
