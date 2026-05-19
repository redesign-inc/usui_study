'use strict';

import * as THREE from 'three';
import gsap from "gsap";

/** 背景画像のパス */
const URL_BG = "/assets/imgs/bg.avif";
/** 平面の横幅 */
const ITEM_W = 256;
/** 平面の縦幅 */
const ITEM_H = 256;
/** 平面のX座標の間隔 */
const MARGIN_X = 80;
/** スライドの総数 */
const MAX_SLIDE = 4;
/** アニメーションの持続時間 */
const ANIMATION_DURATION = 1.8;
/** 回転アニメーションの持続時間 */
const ROTATION_DURATION = 0.9;
/** アニメーションのイージング */
const ANIMATION_EASE = "expo.out";

/**
 * グローバル変数
 */
/** 現在の仮想的なスライド位置（無限に増減する実数） */
let currentProgress = 0;
/** 現在の中心にあるスライドID（0 〜 MAX_SLIDE-1） */
let currentPage = 0;

/**
 * 平面を格納する配列
 * @type {Card[]}
 */
const cards = [];

/**
 * シーン、カメラ、レンダラーの初期化
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ 
  antialias: true 
});
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

/**
 * タッチ操作の状態管理
 */
let touchStartX = 0;
let touchStartValue = 0;

/**
 * イベントリスナーの設定
 */
window.addEventListener("wheel", onWheel, { 
  passive: false 
});
renderer.domElement.addEventListener("touchstart", onTouchStart, {
  passive: true,
});
renderer.domElement.addEventListener("touchmove", onTouchMove, {
  passive: false,
});
window.addEventListener("resize", onResize);

/**
 * ユーティリティ: 適切な剰余算 (マイナス値に対応)
 */
function modulo(n, m) {
  return ((n % m) + m) % m;
}

/**
 * マウスホイールイベントハンドラー
 */
function onWheel(event) {
  // 制限なく値を増減させる
  currentProgress += event.deltaY * 0.005;
  updateSlides();
  event.preventDefault();
}

/**
 * タッチ開始イベントハンドラー
 */
function onTouchStart(event) {
  touchStartX = event.touches[0].clientX;
  touchStartValue = currentProgress;
}

/**
 * タッチ移動イベントハンドラー
 */
function onTouchMove(event) {

  const touchX = event.touches[0].clientX;
  const deltaX = touchX - touchStartX;

  // 制限（Math.max / Math.min）を解除して無限に動かせるようにする
  currentProgress = touchStartValue - deltaX / (ITEM_W * 0.7);
  updateSlides();

  event.preventDefault();
}


/**
 * 進捗状況から全スライドの位置を更新・アニメーション
 */
function updateSlides() {
  // 現在の進捗に最も近い整数（ターゲットID）を割り出す
  const targetId = Math.round(currentProgress);
  
  // 実際のページID（0 〜 MAX_SLIDE-1）に丸める
  const pageId = modulo(targetId, MAX_SLIDE);

  // 各カードの配置を計算してアニメーション
  cards.forEach((card, i) => {
    const {
      x: targetX,
      z: targetZ,
      rotation: targetRot,
    } = calculateCardPosition(i, currentProgress);

    gsap.to(card.position, {
      x: targetX,
      z: -1 * targetZ,
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE,
      overwrite: "auto", // 重複アニメーションの最適化
    });

    gsap.to(card.rotation, {
      y: targetRot,
      duration: ROTATION_DURATION,
      ease: ANIMATION_EASE,
      overwrite: "auto",
    });
  });
}

/**
 * 無限ループを考慮したカードの位置と回転を計算
 * @param {number} index - カードの固有インデックス (0 ~ MAX_SLIDE-1)
 * @param {number} progress - 現在のスクロール進捗（小数点を含む実数）
 */
function calculateCardPosition(index, progress) {
  // progress（中心位置）に対する、このカードの相対位置を計算
  // 無限ループさせるため、最も近い「周期」の位置にカードをずらす
  let diff = index - (progress % MAX_SLIDE);
  
  // 画面外に消えたカードを逆サイドに回り込ませる判定
  const half = MAX_SLIDE / 2;
  if (diff > half) diff -= MAX_SLIDE;
  if (diff < -half) diff += MAX_SLIDE;

  // 相対位置（diff）を元にX座標を計算
  let targetX = MARGIN_X * diff;
  let targetZ = 0;
  let targetRot = 0;

  // カバーフロー特有の左右の傾きを、閾値（0.1など）や滑らかな傾斜で表現
  const threshold = 0.1; 
  if (diff < -threshold) {
    targetX -= ITEM_W * 0.6;
    targetZ = ITEM_W;
    targetRot = +45 * (Math.PI / 180);
  } else if (diff > threshold) {
    targetX += ITEM_W * 0.6;
    targetZ = ITEM_W;
    targetRot = -45 * (Math.PI / 180);
  } else {
    // 中心付近にいるときは、diffに応じて滑らかに回転とZ深度を戻す
    const ratio = diff / threshold; // -1 〜 1
    // 必要に応じて中心の滑らかな補間をここに追加可能
  }

  return { x: targetX, z: targetZ, rotation: targetRot };
}

/**
 * リサイズイベントハンドラー
 */
function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

/**
 * アニメーションループ
 */
function tick() {
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

/**
 * カバーフローのカードクラス
 */
class Card extends THREE.Object3D {
  constructor(index) {
    super();

    const texture = new THREE.TextureLoader().load(`/assets/imgs/${index}.avif`);
    texture.colorSpace = THREE.SRGBColorSpace;

    // 上面
    const material = new THREE.MeshLambertMaterial({ map: texture });
    const planeTop = new THREE.Mesh(
      new THREE.PlaneGeometry(ITEM_W, ITEM_H),
      material
    );
    this.add(planeTop);

    // 反射面
    const materialOpt = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      side: THREE.BackSide,
      opacity: .5,
    });
    const planeBottom = new THREE.Mesh(
      new THREE.PlaneGeometry(ITEM_W, ITEM_H),
      materialOpt
    );
    planeBottom.rotation.y = Math.PI;
    planeBottom.rotation.z = Math.PI;
    planeBottom.position.y = -ITEM_H - 1;
    this.add(planeBottom);
  }
}

/**
 * 初期化処理
 */
async function init() {
  // ライトの設定
  const pointLight = new THREE.PointLight(0xffffff, 1000000, 1000);
  pointLight.position.set(0, 0, 500);
  scene.add(pointLight);

  // カードの生成
  for (let i = 0; i < MAX_SLIDE; i++) {
    const card = new Card(i);
    scene.add(card);
    cards[i] = card;
  }

  // カメラの位置設定
  camera.position.z = 1000;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 背景の生成
  const bgTexture = new THREE.TextureLoader().load(URL_BG);
  bgTexture.colorSpace = THREE.SRGBColorSpace;
  const meshBg = new THREE.Mesh(
    new THREE.PlaneGeometry(3000, 1000),
    new THREE.MeshBasicMaterial({ map: bgTexture })
  );
  meshBg.position.z = -500;
  scene.add(meshBg);

  // 初期表示（真ん中の位置からスタート）
  currentProgress = MAX_SLIDE / 2;
  updateSlides();
  onResize();
  tick();
}

// アプリケーションの開始
init();