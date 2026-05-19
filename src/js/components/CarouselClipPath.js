'use strict';

class CarouselClipPath {
	constructor(){
		this.slider();
	}
	slider() {
		(function () {
			// ─── 設定 ────────────────────────────────────────────
			const DURATION = 3000; // 自動再生の間隔 (ms)
			
			// clip-path: inset(top right bottom left)
			// 「入ってくるスライド」が最初に隠れている位置
			const HIDDEN_CLIP = {
				right: 'inset(0% 0% 0% 100%)',  // 右から入ってくる → 最初は左側に隠す
				left:  'inset(0% 100% 0% 0%)',  // 左から入ってくる → 最初は右側に隠す
				up:    'inset(100% 0% 0% 0%)',  // 上から入ってくる → 最初は下側に隠す
				down:  'inset(0% 0% 100% 0%)',  // 下から入ってくる → 最初は上側に隠す
			};
		
			// ─── 要素取得 ─────────────────────────────────────────
			const section  = document.querySelector('.clipSingle');
			if (!section) return;
			
			const slides   = Array.from(section.querySelectorAll('.clipSingle__slide'));
			const dotsEl   = document.getElementById('dots');
			const playBtn  = document.getElementById('playBtn');
			const prevBtnEl = document.getElementById('prevBtn');
			const nextBtnEl = document.getElementById('nextBtn');
			const dirSel   = document.getElementById('dirSel');
			
			const total    = slides.length;
			let current    = 0;
			let playing    = true;
			let timer      = null;
		
			// ─── 初期化 ───────────────────────────────────────────
			function init() {
				slides.forEach((s, i) => {
				// s.style.transition = 'none';
				s.style.clipPath   = 'inset(0% 0% 0% 0%)';
				s.style.zIndex     = total - i;  // 最初のスライドが最前面
				});
				current = 0;
				updateDots();
			}
		
			// ─── ドット生成 ───────────────────────────────────────
			function buildDots() {
				dotsEl.innerHTML = '';
				slides.forEach((_, i) => {
				const btn = document.createElement('button');
				btn.className = 'clipSingle__dot';
				btn.setAttribute('aria-label', `スライド ${i + 1} へ移動`);
				btn.addEventListener('click', () => goTo(i));
				dotsEl.appendChild(btn);
				});
			}
		
			function updateDots() {
				Array.from(dotsEl.children).forEach((d, i) => {
				d.classList.toggle('is-active', i === current);
				});
			}
		
			// ─── コアアニメーション ───────────────────────────────
			function goTo(next) {
				if (next === current) return;
			
				const dir      = dirSel.value;
				const inSlide  = slides[next];
				const outSlide = slides[current];
			
				// 入ってくるスライドを最前面に配置し、隠れた状態にリセット
				// inSlide.style.transition = 'none'; // これを入れると、次の行の clipPath の変更が transition なしで即座に反映される
				inSlide.style.clipPath   = HIDDEN_CLIP[dir];
				inSlide.style.zIndex     = total + 1;
			
				// 1フレーム待ってからアニメーション開始
				// (transition:none → transition:clip-path の切り替えをブラウザに認識させるため)
				// requestAnimationFrame(() => {
				// 	requestAnimationFrame(() => {
				// 		inSlide.style.transition = 'clip-path 1s ease-out';
				// 		inSlide.style.clipPath   = 'inset(0% 0% 0% 0%)';
				// 	});
				// });
			
				// アウト側は z-index を下げるだけ (clip-path はそのまま)
				outSlide.style.zIndex = total;
			
				current = next;
				updateDots();
			
				// アニメーション完了後に z-index を整理
				inSlide.addEventListener('transitionend', () => {
				slides.forEach((s, i) => {
					const offset = (i - current + total) % total; // current=0, 次=1, ...
					s.style.zIndex = total - offset;
				});
				}, { once: true });
			}
		
			// ─── 前後ナビ ─────────────────────────────────────────
			function nextSlide() { goTo((current + 1) % total); }
			function prevSlide() { goTo((current - 1 + total) % total); }
			
			// ─── 自動再生 ─────────────────────────────────────────
			function startTimer() { timer = setInterval(nextSlide, DURATION); }
			function stopTimer()  { clearInterval(timer); timer = null; }
			
			// ─── イベント ─────────────────────────────────────────
			playBtn.addEventListener('click', () => {
				playing = !playing;
				playBtn.textContent = playing ? 'pause' : 'play';
				playing ? startTimer() : stopTimer();
			});
			
			nextBtnEl.addEventListener('click', () => {
				if (playing) { stopTimer(); nextSlide(); startTimer(); }
				else nextSlide();
			});
			
			prevBtnEl.addEventListener('click', () => {
				if (playing) { stopTimer(); prevSlide(); startTimer(); }
				else prevSlide();
			});
			
			// 方向変更時はリセット
			dirSel.addEventListener('change', () => {
				stopTimer();
				init();
				if (playing) startTimer();
			});
			
			// ─── 起動 ─────────────────────────────────────────────
			init();
			startTimer();
		})();
	}
}

export default CarouselClipPath;