'use strict';

import * as THREE from 'three';
import gsap from "gsap";

const URL_BG = "/assets/imgs/bg.avif";
const ITEM_W = 256;
const ITEM_H = 256;
const MARGIN_X = ITEM_W * 1.2;
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
let currentProgress = 0;
const cards = [];
let autoScrollTween = null;
let snapTween = null;
let isExpanded = false;   // 拡大中フラグ
let selectedCard = null; // 選択中のカード

const textureLoader = new THREE.TextureLoader();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

/** シーン、カメラ、レンダラー */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(0, 0, 900);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
const wrapper = document.querySelector("#wrapper");
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
  stopAutoScroll();
  autoScrollTween = gsap.to({ value: currentProgress }, {
    value: currentProgress + 100,
    duration: 100 / AUTO_SCROLL_SPEED,
    ease: "none",
    repeat: -1,
    onUpdate: function () {
      currentProgress = this.targets()[0].value;
      updateSlides();
    }
  });
}

function stopAutoScroll() {
  if (autoScrollTween) {
    autoScrollTween.kill();
    autoScrollTween = null;
  }
}

function onWheel(event) {
  if (isExpanded) return;
  stopAutoScroll();
  if (snapTween) snapTween.kill();
  currentProgress += event.deltaY * 0.002;
  updateSlides();
  clearTimeout(window.wheelTimeout);
  window.wheelTimeout = setTimeout(() => snapToNearest(), 10);
}

function onTouchStart(event) {
  if (isExpanded) return;
  stopAutoScroll();
  if (snapTween) snapTween.kill();
  this.touchStartX = event.touches[0].clientX;
  this.touchStartValue = currentProgress;
}

function onTouchMove(event) {
  if (isExpanded) return;
  const deltaX = event.touches[0].clientX - this.touchStartX;
  currentProgress = this.touchStartValue - deltaX / (ITEM_W * 0.1);
  updateSlides();
}

function onTouchEnd() {
  if (isExpanded) return;
  snapToNearest();
}

function snapToNearest() {
  const targetId = Math.round(currentProgress);
  snapTween = gsap.to({ value: currentProgress }, {
    value: targetId,
    duration: 0.6,
    ease: "power2.out",
    onUpdate: function () {
      currentProgress = this.targets()[0].value;
      updateSlides();
    },
    onComplete: () => startAutoScroll()
  });
}

/** クリック判定 */
function onClick(event) {
  if (isExpanded) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(cards, true);
  if (intersects.length > 0) {
    let target = intersects[0].object;
    while (!(target instanceof Card) && target.parent) target = target.parent;
    if (target instanceof Card) expandCard(target);
  }
}

/** カード拡大 */
function expandCard(card) {
  isExpanded = true;
  selectedCard = card;
  stopAutoScroll();
  if (snapTween) snapTween.kill();

  const params = getExpandedParams();

  // カードを動的に計算した位置へ移動
  gsap.to(card.position, {
    x: params.x, 
    y: 0, 
    z: 400,
    duration: 0.8,
    ease: "expo.out"
  });

  // スケールも調整してはみ出しを防ぐ
  gsap.to(card.scale, {
    x: params.scale,
    y: params.scale,
    z: params.scale,
    duration: 0.8,
    ease: "expo.out"
  });

  // 他のカードをフェードアウト
  cards.forEach(c => {
    if (c !== card) gsap.to(c, { opacity: .1, duration: 0.5 });
  });

  // UI表示（CSS側で右カラムになるよう設定されている前提）
  const data = CARD_DATA[card.cardId % MAX_SLIDE];
  document.getElementById("card-title").innerText = data.title;
  document.getElementById("card-desc").innerText = data.desc;
  
  const ui = document.getElementById("ui-overlay");
  ui.style.display = "flex";
  gsap.fromTo(ui, { opacity: 0 }, { opacity: 1, duration: 0.5 });
}

/** カードを閉じる */
function closeCard(e) {
if (e) e.stopPropagation();
  if (!selectedCard) return;

  const card = selectedCard;
  isExpanded = false;

  const totalWidth = MARGIN_X * cards.length;
  const i = cards.indexOf(card);
  const baseX = (i * MARGIN_X) - (currentProgress * MARGIN_X);
  const targetX = ((baseX + totalWidth / 2) % totalWidth + totalWidth) % totalWidth - totalWidth / 2;

  // 位置を戻す
  gsap.to(card.position, {
    x: targetX,
    z: 0,
    duration: 0.8,
    ease: "power3.out",
    onComplete: () => {
      selectedCard = null;
      startAutoScroll();
    }
  });

  // スケールを1に戻す ★追加
  gsap.to(card.scale, {
    x: 1,
    y: 1,
    z: 1,
    duration: 0.8,
    ease: "power3.out"
  });

  // 3. 他のカードの透明度を戻す
  cards.forEach(c => {
    if (c !== card) {
      gsap.to(c, { opacity: 1, duration: 0.6 }); // updateSlides 内で計算されるので、補助的なアニメーション
    }
  });

  // UI非表示
  gsap.to("#ui-overlay", { 
    opacity: 0, 
    duration: 0.3, 
    onComplete: () => {
        document.getElementById("ui-overlay").style.display = "none";
    }
  });
}

function updateSlides() {
  if (isExpanded) return; // 拡大中は座標計算を完全にスキップ

  const totalWidth = MARGIN_X * cards.length;
  cards.forEach((card, i) => {
    // 戻りアニメーション中も GSAP 側の値を優先する
    if (gsap.isTweening(card.position)) return;

    let baseX = (i * MARGIN_X) - (currentProgress * MARGIN_X);
    let wrappedX = ((baseX + totalWidth / 2) % totalWidth + totalWidth) % totalWidth - totalWidth / 2;
    
    card.position.x = wrappedX;
    card.position.z = 0;

    // 不透明度の計算
    const fadeRange = totalWidth * 0.6;
    const opacity = Math.max(0, 1 - Math.abs(wrappedX) / fadeRange);
    
    card.traverse((child) => {
      if (child.isMesh) {
        child.material.transparent = true;
        const baseOpacity = child.geometry.type === "PlaneGeometry" && child.position.y < 0 ? 0.4 : 1.0;
        child.material.opacity = opacity * baseOpacity;
      }
    });
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
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function tick() {
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

class Card extends THREE.Object3D {
  constructor(index) {
    super();
    this.cardId = index;
    const texture = textureLoader.load(`/assets/imgs/${index}.avif`);
    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide });
    const planeTop = new THREE.Mesh(new THREE.PlaneGeometry(ITEM_W, ITEM_H), material);
    this.add(planeTop);

    const materialOpt = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const planeBottom = new THREE.Mesh(new THREE.PlaneGeometry(ITEM_W, ITEM_H), materialOpt);
    planeBottom.rotation.x = Math.PI; 
    planeBottom.position.y = -ITEM_H - 1; 
    this.add(planeBottom);
  }
}

async function init() {
  scene.add(new THREE.AmbientLight(0xffffff, 1));
  const pointLight = new THREE.PointLight(0xffffff, 1.5, 2000);
  pointLight.position.set(0, 200, 600);
  scene.add(pointLight);

  for (let i = 0; i < MAX_SLIDE * 2; i++) {
    const card = new Card(i % MAX_SLIDE); 
    scene.add(card);
    cards.push(card);
  }

  const bgTexture = textureLoader.load(URL_BG);
  bgTexture.colorSpace = THREE.SRGBColorSpace;
  const meshBg = new THREE.Mesh(
    new THREE.PlaneGeometry(4000, 2000),
    new THREE.MeshBasicMaterial({ map: bgTexture, color: 0x333333 }) 
  );
  meshBg.position.z = -800;
  scene.add(meshBg);

  updateSlides();
  startAutoScroll();
  tick();
}

init();