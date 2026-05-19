'use strict';

import * as THREE from 'three';
import gsap from "gsap";

const URL_BG = "/assets/imgs/bg.avif";
/** 平面の横幅 */
const ITEM_W = 256;
/** 平面の縦幅 */
const ITEM_H = 256;
/** 平面のX座標の間隔 */
const MARGIN_X = 200;
/** スライドの総数 */
const MAX_SLIDE = 4;
/** アニメーションの持続時間 */
const ANIMATION_DURATION = 1.8;
/** 回転アニメーションの持続時間 */
const ROTATION_DURATION = 0.9;
/** アニメーションのイージング */
const ANIMATION_EASE = "expo.out";

/** グローバル変数 */
let currentProgress = 0;
let currentPage = 0;
const cards = [];

const textureLoader = new THREE.TextureLoader();

/** シーン、カメラ、レンダラーの初期化 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // パフォーマンス考慮
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/** タッチ・ホイール操作の状態管理 */
let touchStartX = 0;
let touchStartValue = 0;
let snapTween = null; // スナップ用のアニメーション保持

/** イベントリスナーの設定 */
window.addEventListener("wheel", onWheel, { passive: false });
renderer.domElement.addEventListener("touchstart", onTouchStart, { passive: true });
renderer.domElement.addEventListener("touchmove", onTouchMove, { passive: false });
renderer.domElement.addEventListener("touchend", onTouchEnd, { passive: true });
window.addEventListener("resize", onResize);

function modulo(n, m) {
  return ((n % m) + m) % m;
}

/** マウスホイールイベント */
function onWheel(event) {
  event.preventDefault();
  
  // スナップ中のアニメーションがあれば殺す
  if (snapTween) snapTween.kill();

  currentProgress += event.deltaY * 0.002; // 感度を少しマイルドに調整
  updateSlides();

  // スクロール停止を検知してスナップさせる（デバウンス処理）
  clearTimeout(window.wheelTimeout);
  window.wheelTimeout = setTimeout(() => {
    snapToNearest();
  }, 10);
}

/** タッチ開始 */
function onTouchStart(event) {
  if (snapTween) snapTween.kill();
  touchStartX = event.touches[0].clientX;
  touchStartValue = currentProgress;
}

/** タッチ移動 */
function onTouchMove(event) {
  const touchX = event.touches[0].clientX;
  const deltaX = touchX - touchStartX;

  // 移動量に合わせて進捗を更新
  currentProgress = touchStartValue - deltaX / (ITEM_W * .1);
  updateSlides();
  
  event.preventDefault();
}

/** タッチ終了（指を離した時にピタッと止める） */
function onTouchEnd() {
  snapToNearest();
}

/**
 * 最寄りのスライド位置に綺麗に吸い付かせる処理
 */
function snapToNearest() {
  const targetId = Math.round(currentProgress);
  
  // GSAPで現在のprogressを整数の位置までアニメーションさせる
  snapTween = gsap.to({ value: currentProgress }, {
    value: targetId,
    duration: 0.6,
    ease: "power2.out",
    onUpdate: function () {
      currentProgress = this.targets()[0].value;
      updateSlides();
    }
  });
}

/** 全スライドの位置を更新 */
function updateSlides() {
  const targetId = Math.round(currentProgress);
  currentPage = modulo(targetId, MAX_SLIDE);

  cards.forEach((card, i) => {
    const { x: targetX, z: targetZ, rotation: targetRot } = calculateCardPosition(i, currentProgress);

    gsap.to(card.position, {
      x: targetX,
      z: -1 * targetZ,
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE,
      overwrite: "auto",
    });

    gsap.to(card.rotation, {
      y: targetRot,
      duration: ROTATION_DURATION,
      ease: ANIMATION_EASE,
      overwrite: "auto",
    });
  });
}

/** カードの位置と回転を計算（提示コードのロジックを踏襲） */
function calculateCardPosition(index, progress) {
  let diff = index - (progress % MAX_SLIDE);

  const half = MAX_SLIDE / 2;
  if (diff > half) diff -= MAX_SLIDE;
  if (diff < -half) diff += MAX_SLIDE;

  let targetX = MARGIN_X * diff;
  let targetZ = 0;
  let targetRot = 0;

  const threshold = 0.1;

  if (diff < -threshold) {
    targetX -= ITEM_W * 0.4; // 重なり具合を微調整
    targetZ = ITEM_W * 1.2;
    targetRot = +45 * (Math.PI / 180);
  } else if (diff > threshold) {
    targetX += ITEM_W * 0.4;
    targetZ = ITEM_W * 1.2;
    targetRot = -45 * (Math.PI / 180);
  } else {
    const ratio = diff / threshold;
    targetRot = -ratio * 45 * (Math.PI / 180);
  }

  return { x: targetX, z: targetZ, rotation: targetRot };
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

/** カルーセルのカードクラス */
class Card extends THREE.Object3D {
  constructor(index) {
    super();

    // テスト用に非同期でダミー画像（Lorem Picsum）を読み込み
    const texture = textureLoader.load(`/assets/imgs/${index}.avif`);
    texture.colorSpace = THREE.SRGBColorSpace;

    // 表面
    const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide });
    const planeTop = new THREE.Mesh(new THREE.PlaneGeometry(ITEM_W, ITEM_H), material);
    this.add(planeTop);

    // 反射面（床への映り込み風表現）
    const materialOpt = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 0.4, // ギラつきすぎないよう少し薄く
    });
    const planeBottom = new THREE.Mesh(new THREE.PlaneGeometry(ITEM_W, ITEM_H), materialOpt);
    planeBottom.rotation.x = Math.PI; // 上下反転
    planeBottom.position.y = -ITEM_H - 2;
    this.add(planeBottom);
  }
}

/** 初期化処理 */
async function init() {
  // 環境光とスポットライトを追加して質感をアップ
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1.5, 2000);
  pointLight.position.set(0, 200, 600);
  scene.add(pointLight);

  // カードの生成
  for (let i = 0; i < MAX_SLIDE; i++) {
    const card = new Card(i);
    scene.add(card);
    cards[i] = card;
  }

  camera.position.set(0, 0, 900);
  camera.lookAt(0, 0, 0);

  // 背景の生成
  const bgTexture = textureLoader.load(URL_BG);
  bgTexture.colorSpace = THREE.SRGBColorSpace;
  const meshBg = new THREE.Mesh(
    new THREE.PlaneGeometry(4000, 2000),
    new THREE.MeshBasicMaterial({ map: bgTexture, color: 0x333333 }) // 背景を少し暗くして手前を引き立てる
  );
  meshBg.position.z = -800;
  scene.add(meshBg);

  currentProgress = 0;
  updateSlides();
  onResize();
  tick();
}

init();