<html>
<head>
<link rel="stylesheet" media="all" href="/assets/css/main.css">
<style>
.slider {
	--length: 3;
	--itemW: 15;
	--duration: 500;
	--easing: ease-out;
	overflow: hidden;
}
.slider_container {
	display: flex;
	justify-content: center;
	height: 500px;
}
.slider_group {
	display: flex;
	flex-direction: row-reverse;
	flex-shrink: 0;
	width: 100%;
	height: 100%;
}
.slider_item {
	transition: width calc(var(--duration) * 1ms) var(--easing) 0s;
	width: calc(var(--itemW) * 1%);
}
.slider_item.active {
	width: calc((100 - var(--itemW) * (var(--length) - 1)) * 1%);
}
.slider_dots {
	margin: 20px 0;
}
.slider_thumbs {
	display: grid;
	aspect-ratio: 3 / 2;
	width: 300px;
}
.slider_thumb {
	transition: all calc(var(--duration) * 1ms) var(--easing) 0s;
	transition-property: visibility, opacity;
	grid-column: 1 / -1;
	grid-row: 1 / -1;
	visibility: hidden;
	opacity: 0;
}
.slider_thumb.active {
	visibility: visible;
	opacity: 1;
}
.slider_dot.active {
	background: red;
}
</style>
</head>
<body>
<div class="slider">
	<div class="slider_container">
		<div class="slider_group">
			<div class="slider_item" data-index="0" style="background:red;"></div>
			<div class="slider_item" data-index="1" style="background:green;"></div>
			<div class="slider_item" data-index="2" style="background:blue;"></div>
		</div>
	</div>
	<div class="slider_dots"></div>
	<div class="slider_thumbs">
		<div class="slider_thumb" data-index="0" style="background:red;">1</div>
		<div class="slider_thumb" data-index="1" style="background:green;">2</div>
		<div class="slider_thumb" data-index="2" style="background:blue;">3</div>
	</div>
</div>
<script>
class Carousel {
	constructor(){
		//スライド中かどうか
		this.changing = false;
		//スライドのメイン？の番号
		this.active = 0;
		this.slider = document.querySelector('.slider');
		this.container = this.slider.querySelector('.slider_container');
		this.thumbs = this.slider.querySelectorAll('.slider_thumb');
		this.dots;
		this.items;
		this.length = this.container.querySelectorAll('.slider_item').length;
		this.init();
	}
	init(){
		// dotを取得
		const dots = this.slider.querySelector('.slider_dots');
        //各スライダーを配列に回す第二引数でインデックス番号も取得できるようにする
		this.container.querySelectorAll('.slider_item').forEach((item, index)=>{
            //buttonタグ生成
			const dot = document.createElement('button');
            //buttonタグにクラス追加
			dot.classList.add('slider_dot');
            //buttonタグのテキストに1+インデックス番号。（例：0枚目は1+0で１、１枚目は1+1で１....）
			dot.innerText = index + 1;
            //buttonタグクリックしたときに、
			dot.addEventListener('click', ()=>{
                //direction(方向？)にインデックス番号➖this.active(1-0> 0)であれば1が入る。(0-0> 0)であれば-1。
				const direction = ( index - this.active > 0 )? 1 : -1;
                //
				const number = Math.abs(index - this.active);
				console.log(number);
				//他のところでも使えるようにする的なあ？
				this.change(number, direction);
			});
            //dotsの子要素にbutton追加
			dots.appendChild(dot);
		});
		this.dots = dots.querySelectorAll('.slider_dot');
		// group複製
		const group = this.container.querySelector('.slider_group');
        //2個複製
		for( let i=0;i<2;i++ ) {
			const clone = group.cloneNode(true);
			this.container.appendChild(clone);
		}
		this.items = this.container.querySelectorAll('.slider_item');
		// active
		this.activeChange(this.active);
		// control
		this.control();
	}
	change(number, direction){
        //スライド中はリターン
		if( this.changing ) return;
        //parseIntで文字列を整数に変換(this.sliderの15取得)
		const w = parseInt(getComputedStyle(this.slider).getPropertyValue('--itemW'), 10);
        //this.sliderの--easingの値を取得
		const easing = getComputedStyle(this.slider).getPropertyValue('--easing');
        //this.sliderの--durationの値を取得
		const duration = parseInt(getComputedStyle(this.slider).getPropertyValue('--duration'), 10);
        //スライド中だよ
		this.changing = true;
		//（アクティブの番号　＋　方向　＋　ナンバー　✖️ ナンバー）➗　スライドの枚数
		let next = (this.active + direction * number) % this.length;
		// console.log(`next:${next}`);
		// console.log(`this.active:${this.active}`);
		// console.log(`direction:${direction}`);
		console.log(`number:${number}`);
		//バックした時に数がマイナスになるのを防ぐため。（1枚目から3枚目に移動する時とか）
		if( next < 0 ) {
			next = this.length - 1;
		}
		this.activeChange(next);
		// 0% 15% 30%の順
		let start = `${this.active * w}%`;
		// アクティブが０且つ方向がマイナスの時１００％
		if( this.active == 0 && direction < 0 ) {
			start = `100%`;
		// アクティブが最後且つ方向がプラスの時は１５＊（３−１）ー１００
		} else if( this.active == this.length - 1 && direction > 0 ) {
			start = `${w * (this.length - 1) - 100}%`;
		}
		// 0% 15% 30%の順
		const end = `${next * w}%`;
		const animation = this.container.animate([
			{
				translate: `${start} 0`
			},
			{
				translate: `${end} 0`
			},
		], {
			easing: easing,
			duration: duration,
			fill: 'forwards',
		});
		// アニメーション終わったらスライド中ではない判定、アクティブ番号の更新
		animation.onfinish = ()=>{
			this.changing = false;
			this.active = next;
		};
	}
	activeChange(index){
		// ページネーションを配列で回して、iとindex番号が一致したらactiveクラスを追加
		this.dots.forEach((dot, i)=>{
			if( i == index ) {
				dot.classList.add('active');
			} else {
				dot.classList.remove('active');
			}
		});
		// 同様に一致すれば追加
		this.thumbs.forEach((thumb, i)=>{
			if( i == index ) {
				thumb.classList.add('active');
			} else {
				thumb.classList.remove('active');
			}
		});
		// スライドにクラスactiveが付与されてたら外す。そんでもってデータ属性とインデック番号が一致すればクラス追加
		this.items.forEach((item)=>{
			if( item.classList.contains('active') ) {
				item.classList.remove('active');
			}
			if( item.dataset.index == index ) {
				item.classList.add('active');
			}
		});
	};
	control(){
		// swipe
		// タッチ判定
		let touched = false;
		// 触れたスタート位置
		let startX = 0;
		// 移動距離？
		let diffX = 0;
		// タッチスタートの関数、判定true、
		const touchstart = (x)=>{
			touched = true;
			startX = x;
		};
		// タッチムーブ、
		const touchmove = (x)=>{
			if( !touched ) return;
			diffX = x - startX;
			console.log(startX);
		};
		const touchend = ()=>{
			if( !touched ) return;
			touched = false;
			if( diffX > 100 ) {
				this.change(1, 1);
			} else if( diffX < -100 ) {
				this.change(1, -1);
			}
			diffX = 0;
		};
		this.slider.addEventListener('pointerdown', (e)=>{
			if( e.pointerType != 'mouse' ) return;
			touchstart(e.clientX);
		});
		this.slider.addEventListener('pointermove', (e)=>{
			if( e.pointerType != 'mouse' ) return;
			touchmove(e.clientX);
		});
		this.slider.addEventListener('pointerup', (e)=>{
			if( e.pointerType != 'mouse' ) return;
			touchend();
		});
		this.slider.addEventListener('pointerleave', (e)=>{
			if( e.pointerType != 'mouse' ) return;
			touchend();
		});
		this.slider.addEventListener('touchstart', (e)=>{
			touchstart(e.changedTouches[0].clientX);
		});
		this.slider.addEventListener('touchmove', (e)=>{
			touchmove(e.changedTouches[0].clientX);
		});
		this.slider.addEventListener('touchend', (e)=>{
			touchend();
		});
		this.slider.addEventListener('touchcancel', (e)=>{
			touchend();
		});
	}
}
new Carousel();
</script>
</body>
</html>
