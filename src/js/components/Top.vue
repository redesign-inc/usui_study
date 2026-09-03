<template>
	<div class="c-opening" v-show="isOpening">
		<div class="c-opening__gradient-bg">
			<div class="c-opening__gradient-container">
				<div class="c-opening__gradient-ball thin-pink02"></div>
				<div class="c-opening__gradient-ball thin-pink"></div>
				<div class="c-opening__gradient-ball pink"></div>
			</div>
			<div class="c-opening__gradient-overlay"></div>
		</div>
		<div class="c-opening__coin">
			<CoinComponent
				v-if="isOpening"
				:topPageRef="topPage"
			/>
			<picture class="c-opening__coin-name">
				<img src="/assets/imgs/opening_logo.webp" width="294" height="40" alt="LOVE or MONEY">
			</picture>
		</div>
		<div class="c-opening__num" ref="openingNum">00</div>
	</div>
	<div class="top-page" ref="topPage" v-show="!isOpening">
		<header class="header">
			<h1 class="header__logo" ref="headerLogo">
				<a href="/">
					<picture>
						<source media="(max-width:1023px)" srcset="/assets/imgs/header_logo_sp.webp">
						<img src="/assets/imgs/header_logo.webp" width="242" height="57" alt="ラブキャッチャージャパン2">
					</picture>
				</a>
			</h1>
			<a href="https://abema.tv/video/title/90-1904" target="_blank" class="header__watch c-shine">
				<picture>
					<source media="(max-width:849px)" srcset="/assets/imgs/header_watch_sp.svg" width="149" height="30">
					<img src="/assets/imgs/header_watch.svg" width="187" height="40" alt="ABEMAで視聴する">
				</picture>
			</a>
		</header>

		<main class="main">		
			<section class="p-top-fv" ref="fv">
				<picture class="p-top-fv__abemaLogo">
					<source type="image/avif" srcset="/assets/imgs/abema_logo.avif">
					<img src="/assets/imgs/abema_logo.webp" width="250" height="59" alt="ABEMA">
				</picture>
				<picture class="p-top-fv__mv">
					<source type="image/avif" srcset="/assets/imgs/fv.avif">
					<img src="/assets/imgs/fv.webp" width="1440" height="900" alt="">
				</picture>
				<picture class="p-top-fv__sttl">
					<source type="image/avif" srcset="/assets/imgs/fv_copy.avif">
					<img src="/assets/imgs/fv_copy.webp" width="65" height="709" alt="選ぶのは、愛か金か">
				</picture>
				<picture class="p-top-fv__logo">
					<source type="image/avif" srcset="/assets/imgs/fv_logo.avif">
					<img src="/assets/imgs/fv_logo.webp" width="1058" height="266" alt="ラブキャッチャー３">
				</picture>
				<p class="p-top-fv__scroll"><svg class="c-icon c-icon--arw_b"><use xlink:href="#icon-arw_b" /></svg>SCROLL DOWN</p>
			</section>
			<section class="p-top-intro" ref="topIntro">
				<picture class="p-top-intro__bg love">
					<source type="image/avif" srcset="/assets/imgs/intro_bg_love.avif">
					<img src="/assets/imgs/intro_bg_love.webp" width="733" height="733" alt="" loading="lazy">
				</picture>
				<picture class="p-top-intro__bg money">
					<source type="image/avif" srcset="/assets/imgs/intro_bg_money.avif">
					<img src="/assets/imgs/intro_bg_money.webp" width="550" height="801" alt="" loading="lazy">
				</picture>
				<div class="p-top-intro__copy"><div class="love">LOVE</div><div class="or">or</div><div class="money">MONEY</div></div>
				<h2 class="p-top-intro__title">この<span class="medium">恋</span>、<span class="medium">最後</span>まで<span class="medium">信</span>じるな</h2>
				<p class="p-top-intro__lead">恋をしに来た男女12名。<br>その中には"賞金1,000万円"を狙う"<br class="pc-hidden">金目当て"が潜んでいる──。<br><br>その笑顔も、その涙も、<br class="pc-hidden">すべては1,000万円のためかもしれない。<br><br>疑心暗鬼の世界で<br class="sp-hidden">人間の本性があらわになる、<br class="pc-hidden">究極の恋愛心理ゲーム。<br><br>最後に待つのは、真実の愛か、裏切りか。</p>
				<div class="p-top-intro__spSlider --one">
					<ul class="p-top-intro__spSlide">
						<li
							v-for="(item, index) in shuffledAll"
							:key="item.key"
							:data-key="item.key"
							class="slide"
							:style="{ transitionDelay: `${index * 0.1}s` }"
						>
							<picture class="slide__front">
								<source :srcset="`/assets/imgs/intro_${item.key}_${item.front}.avif`" type="image/avif">
								<img :src="`/assets/imgs/intro_${item.key}_${item.front}.webp`" width="120" height="120" :alt="item.name">
							</picture>
							<picture class="slide__back">
								<source :srcset="`/assets/imgs/intro_${item.key}_${item.back}.avif`" type="image/avif">
								<img :src="`/assets/imgs/intro_${item.key}_${item.back}.webp`" width="120" height="120" :alt="item.name">
							</picture>
							<div class="slide__edgeFront"></div>
							<div class="slide__edgeBack"></div>
						</li>
					</ul>
					<ul class="p-top-intro__spSlide">
						<li
							v-for="(item, index) in shuffledAll"
							:key="item.key"
							:data-key="item.key"
							class="slide"
							:style="{ transitionDelay: `${index * 0.1}s` }"
						>
							<picture class="slide__front">
								<source :srcset="`/assets/imgs/intro_${item.key}_${item.front}.avif`" type="image/avif">
								<img :src="`/assets/imgs/intro_${item.key}_${item.front}.webp`" width="120" height="120" :alt="item.name">
							</picture>
							<picture class="slide__back">
								<source :srcset="`/assets/imgs/intro_${item.key}_${item.back}.avif`" type="image/avif">
								<img :src="`/assets/imgs/intro_${item.key}_${item.back}.webp`" width="120" height="120" :alt="item.name">
							</picture>
							<div class="slide__edgeFront"></div>
							<div class="slide__edgeBack"></div>
						</li>
					</ul>
				</div>
				<div class="p-top-intro__spSlider --two">
					<ul class="p-top-intro__spSlide">
						<li
						v-for="(item, index) in shuffledAllSecondary"
						:key="item.key"
						:data-key="item.key"
						class="slide"
						:style="{ transitionDelay: `${(shuffledAllSecondary.length/2) * 0.1 + index * 0.1}s` }"
						>
							<picture class="slide__front">
								<source :srcset="`/assets/imgs/intro_${item.key}_${item.front}.avif`" type="image/avif">
								<img :src="`/assets/imgs/intro_${item.key}_${item.front}.webp`" width="120" height="120" :alt="item.name">
							</picture>
							<picture class="slide__back">
								<source :srcset="`/assets/imgs/intro_${item.key}_${item.back}.avif`" type="image/avif">
								<img :src="`/assets/imgs/intro_${item.key}_${item.back}.webp`" width="120" height="120" :alt="item.name">
							</picture>
							<div class="slide__edgeFront"></div>
							<div class="slide__edgeBack"></div>
						</li>
					</ul>
					<ul class="p-top-intro__spSlide">
						<li
						v-for="(item, index) in shuffledAllSecondary"
						:key="item.key"
						:data-key="item.key"
						class="slide"
						:style="{ transitionDelay: `${(shuffledAllSecondary.length/2) * 0.1 + index * 0.1}s` }"
						>
							<picture class="slide__front">
								<source :srcset="`/assets/imgs/intro_${item.key}_${item.front}.avif`" type="image/avif">
								<img :src="`/assets/imgs/intro_${item.key}_${item.front}.webp`" width="120" height="120" :alt="item.name">
							</picture>
							<picture class="slide__back">
								<source :srcset="`/assets/imgs/intro_${item.key}_${item.back}.avif`" type="image/avif">
								<img :src="`/assets/imgs/intro_${item.key}_${item.back}.webp`" width="120" height="120" :alt="item.name">
							</picture>
							<div class="slide__edgeFront"></div>
							<div class="slide__edgeBack"></div>
						</li>
					</ul>
				</div>
				<div class="p-top-intro__pcSlider">
					<ul class="p-top-intro__pcSlide">
						<li
							v-for="item in shuffledAll"
							:key="item.key" class="slide"
							:data-key="item.key"
						>
							<picture class="slide__front">
								<source :srcset="`/assets/imgs/intro_${item.key}_${item.front}.avif`" type="image/avif">
								<img :src="`/assets/imgs/intro_${item.key}_${item.front}.webp`" width="222" height="222" :alt="item.name" loading="lazy">
							</picture>
							<picture class="slide__back">
								<source :srcset="`/assets/imgs/intro_${item.key}_${item.back}.avif`" type="image/avif">
								<img :src="`/assets/imgs/intro_${item.key}_${item.back}.webp`" width="222" height="222" :alt="item.name" loading="lazy">
							</picture>
							<div class="slide__edgeFront"></div>
							<div class="slide__edgeBack"></div>
						</li>
					</ul>
					<ul class="p-top-intro__pcSlide">
						<li
							v-for="item in shuffledAll"
							:key="item.key" class="slide"
							:data-key="item.key"
						>
							<picture class="slide__front">
								<source :srcset="`/assets/imgs/intro_${item.key}_${item.front}.avif`" type="image/avif">
								<img :src="`/assets/imgs/intro_${item.key}_${item.front}.webp`" width="222" height="222" :alt="item.name" loading="lazy">
							</picture>
							<picture class="slide__back">
								<source :srcset="`/assets/imgs/intro_${item.key}_${item.back}.avif`" type="image/avif">
								<img :src="`/assets/imgs/intro_${item.key}_${item.back}.webp`" width="222" height="222" :alt="item.name" loading="lazy">
							</picture>
							<div class="slide__edgeFront"></div>
							<div class="slide__edgeBack"></div>
						</li>
					</ul>
				</div>
				<picture class="p-top-intro__coin coin-1" data-parallax="200">
					<source type="image/avif" srcset="/assets/imgs/intro_coin_left_1.avif">
					<img src="/assets/imgs/intro_coin_left_1.webp" width="552" height="850" alt="">
				</picture>
				<picture class="p-top-intro__coin coin-6" data-parallax="230">
					<source type="image/avif" srcset="/assets/imgs/intro_coin_left_2.avif">
					<img src="/assets/imgs/intro_coin_left_2.webp" width="435" height="378" alt="">
				</picture>
				<picture class="p-top-intro__coin coin-2" data-parallax="260">
					<source type="image/avif" srcset="/assets/imgs/intro_coin_right_1.avif">
					<img src="/assets/imgs/intro_coin_right_1.webp" width="417" height="498" alt="">
				</picture>
				<picture class="p-top-intro__coin coin-3" data-parallax="290">
					<source type="image/avif" srcset="/assets/imgs/intro_coin_right_2.avif">
					<img src="/assets/imgs/intro_coin_right_2.webp" width="433" height="838" alt="">
				</picture>
				<picture class="p-top-intro__coin coin-4" data-parallax="150">
					<source type="image/avif" srcset="/assets/imgs/intro_coin_top_sp.avif">
					<img src="/assets/imgs/intro_coin_top_sp.webp" width="390" height="251" alt="">
				</picture>
				<picture class="p-top-intro__coin coin-5" data-parallax="160">
					<source type="image/avif" srcset="/assets/imgs/intro_coin_bottom_sp.avif">
					<img src="/assets/imgs/intro_coin_bottom_sp.webp" width="390" height="423" alt="">
				</picture>
			</section>
			<section class="p-top-howto" ref="topHowto">
				<div class="p-top-howto__wrapper">
					<picture class="p-top-howto__bgCircle right">
						<source type="image/avif" srcset="/assets/imgs/howto_right_circle.avif">
						<img src="/assets/imgs/howto_right_circle.webp" width="830" height="830" alt="" loading="lazy">
					</picture>
					<picture class="p-top-howto__bgCircle left">
						<source type="image/avif" srcset="/assets/imgs/howto_left_circle.avif">
						<img src="/assets/imgs/howto_left_circle.webp" width="830" height="830" alt="" loading="lazy">
					</picture>
					<div class="p-top-howto__loopAnim">
						<div class="p-top-howto__loopAnim-lists">
							<picture class="p-top-howto__loopAnim-list">
								<source media="(max-width: 1023px)" srcset="/assets/imgs/howto_loop_logo_sp.webp" width="1269" height="78" loading="lazy">
								<img src="/assets/imgs/howto_loop_logo.webp" width="2106" height="130" alt="" loading="lazy">
							</picture>
							<picture class="p-top-howto__loopAnim-list">
								<source media="(max-width: 1023px)" srcset="/assets/imgs/howto_loop_logo_sp.webp" width="1269" height="78" loading="lazy">
								<img src="/assets/imgs/howto_loop_logo.webp" width="2106" height="130" alt="" loading="lazy">
							</picture>
						</div>
						<div class="p-top-howto__loopAnim-lists">
							<picture class="p-top-howto__loopAnim-list">
								<source media="(max-width: 1023px)" srcset="/assets/imgs/howto_loop_logo_sp.webp" width="1269" height="78" loading="lazy">
								<img src="/assets/imgs/howto_loop_logo.webp" width="2106" height="130" alt="" loading="lazy">
							</picture>
							<picture class="p-top-howto__loopAnim-list">
								<source media="(max-width: 1023px)" srcset="/assets/imgs/howto_loop_logo_sp.webp" width="1269" height="78" loading="lazy">
								<img src="/assets/imgs/howto_loop_logo.webp" width="2106" height="130" alt="" loading="lazy">
							</picture>
						</div>
					</div>
					<picture class="p-top-howto__coin">
						<source type="image/avif" srcset="/assets/imgs/howto_coin.avif">
						<img src="/assets/imgs/howto_coin.webp" width="236" height="236" alt="" loading="lazy">
					</picture>
					<h2 class="p-top-howto__title">あなたの<span class="big">予想は?</span></h2>
					<div class="p-top-howto__inner">
						<h3 class="p-top-howto__present"><span>プレゼントキャンペーン</span></h3>
						<div class="p-top-howto__present-content">
							<figure class="p-top-howto__present-figure">
								<picture class="p-top-howto__present-img">
									<source type="image/avif" srcset="/assets/imgs/howto_present.avif">
									<img src="/assets/imgs/howto_present.webp" width="280" height="175" alt="AirPods Pro 3 イメージ図" loading="lazy">
								</picture>
								<figcaption class="p-top-howto__present-figcaption">※画像はイメージです</figcaption>
							</figure>							
							<div class="p-top-howto__present-inner">
								<p class="p-top-howto__present-txt">「ラブキャッチャー3正体予想」に参加いただき<br class="sp-hidden">@ABEMAをフォロー&投票結果をXでシェアいただいた方の中から抽選で<br class="pc-hidden">「AirPods Pro 3」が当たる！</p>
								<div class="p-top-howto__present-ttl">
									<span class="ttl">AirPods Pro 3</span>
									<div class="caption">毎週<div class="row"><div class="num">1</div>名様</div></div>
								</div>
								<a class="p-top-howto__present-link" href="https://x.com/ABEMA" target="_blank">ABEMA公式Xはこちら</a>
							</div>
						</div>
						<div class="p-top-howto__manner">
								<picture class="p-top-howto__deco">
									<source type="image/avif" srcset="/assets/imgs/howto_txt_deco.avif">
									<img src="/assets/imgs/howto_txt_deco.webp" width="773" height="64" alt="" loading="lazy">
								</picture>
							<h3 class="p-top-howto__manner-ttl">【予想のやり方】</h3>
							<div class="p-top-howto__manner-txt">
								<p class="sp-hidden">予想したいメンバーの「ラブorマネー」ボタンを選択し、<br>最後に「予想を投票する」ボタンを押してください。</p>
								<p class="pctb-hidden">メンバーの正体がラブかマネーか<br>スワイプして予想しよう！</p>
							</div>
						</div>
					</div>
					<div class="p-top-howto__button">
						<router-link to="/vote" class="c-button c-shine">
							<span class="c-button__text">正体予想はコチラ！</span>
							<picture class="c-button__icon">
								<source type="image/avif" srcset="/assets/imgs/button_icon.avif">
								<img src="/assets/imgs/button_icon.webp" width="33" height="28" alt="" loading="lazy">
							</picture>
						</router-link>
					</div>
				</div>
			</section>
			<section class="p-top-prediction" ref="topPrediction">
				<div class="p-top-prediction__wrapper">
					<picture class="p-top-prediction__bgCircle">
						<source madia="(max-width: 1023px)" srcset="/assets/imgs/prediction_circle_sp.webp">
						<img src="/assets/imgs/prediction_circle.webp" width="1437" height="1437" alt="" loading="lazy">
					</picture>					
					<h2 class="p-top-prediction__title">みんなの予想を<br>リアルタイムで公開中!</h2>
					<p class="p-top-prediction__caption">※以下、ネタバレを含みます</p>
					<div class="p-top-prediction__tab">
						<label>
							<svg><use xlink:href="#icon-money" /></svg>
							<h3>マネーランク順</h3>
							<input type="radio" name="tab" value="money" v-model="tab">
						</label>
						<label>
							<svg><use xlink:href="#icon-love" /></svg>
							<h3>ラブランク順</h3>
							<input type="radio" name="tab" value="love" v-model="tab">
						</label>
					</div>
					<div class="p-top-prediction__outer">
						<div class="p-top-prediction__inner">
							<ul class="p-top-prediction__list">
								<li
									v-for="(prediction, key) in sortedPredictions"
									class="prediction"
									:class="{'--proved': prediction.proved, '--dropout': prediction.dropout}"
									:key="key"
									:data-name="key"
								>
									<div class="prediction__head">
										<picture class="prediction__img">
											<source type="image/avif" media="(max-width:849px)" :srcset="`/assets/imgs/prediction_${key}_sp.avif`" width="80" height="92">
											<source media="(max-width:849px)" :srcset="`/assets/imgs/prediction_${key}_sp.webp`" width="80" height="92">
											<source type="image/avif" :srcset="`/assets/imgs/prediction_${key}.avif`">
											<img :src="`/assets/imgs/prediction_${key}.webp`" width="200" height="230" :alt="prediction.name" loading="lazy">
										</picture>
									</div>
									<div class="prediction__body">
										<div class="prediction__infos">
											<p class="prediction__title">{{ prediction.title }}</p>
										</div>
										<div v-if="!prediction.proved && !prediction.dropout" class="prediction__status">
											<div class="prediction__state love">
												<p class="prediction__number"><span class="number">{{ prediction.love }}</span><span class="suffix">%</span></p>
												<p class="prediction__suffix">ラブ</p>
											</div>
											<div class="prediction__progress">
												<div class="icon">
													<img src="/assets/imgs/icon_love_after.svg" width="22" height="22" alt="" loading="lazy">
												</div>
												<div class="bar">
													<div class="ratio love" :style="`--love:${prediction.love}%`"></div>
													<div class="ratio money" :style="`--money:${prediction.money}%`"></div>
												</div>
												<div class="icon">
													<img src="/assets/imgs/icon_money_after.svg" width="22" height="22" alt="" loading="lazy">
												</div>
											</div>
											<div class="prediction__state money">
												<p class="prediction__number"><span class="number">{{ prediction.money }}</span><span class="suffix">%</span></p>
												<p class="prediction__suffix">マネー</p>
											</div>
										</div>
										<div v-if="prediction.proved || prediction.dropout" class="prediction__proved">正体判明</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
			<div class="p-top-stickyArea__button">
				<router-link to="/vote" class="c-button c-shine">
					<picture class="c-button__icon">
						<source type="image/avif" srcset="/assets/imgs/button_icon.avif">
						<img src="/assets/imgs/button_icon.webp" width="54" height="45" alt="" loading="lazy">
					</picture>
					<span class="c-button__text"><span class="txt01">予</span><span class="txt02">想</span><span class="txt03">す</span><span class="txt04">る</span></span>
				</router-link>
			</div>				
		</main>

		<footer class="footer">
			<div class="footer__head">
				<div class="footer__intro">
					<picture class="footer__intro__kv">
						<source type="image/avif" srcset="/assets/imgs/footer_intro_kv.avif">
						<img src="/assets/imgs/footer_intro_kv.webp" width="560" height="315" alt="ラブキャッチャージャパン3" loading="lazy">
					</picture>
					<div class="footer__intro__body">
						<div class="footer__intro__title"><img src="/assets/imgs/footer_ttl.svg" width="409" height="28" alt="「ラブキャッチャージャパン3」" loading="lazy"></div>
						<div class="footer__intro__schedule">毎週火曜よる9時から放送中！</div>
						<a href="https://abema.tv/video/title/90-1904" target="_blank" class="footer__intro__watch c-shine">
							<img src="/assets/imgs/footer_watch.svg" width="320" height="70" alt="ABEMAで視聴する" loading="lazy">
						</a>
						<div class="footer__intro__sns">
							<a href="https://www.tiktok.com/@abema_official" target="_blank"><svg class="c-icon c-icon--tiktok"><use xlink:href="#icon-tiktok" /></svg></a>
							<a href="https://www.youtube.com/@Love_ABEMA" target="_blank"><svg class="c-icon c-icon--youtube"><use xlink:href="#icon-youtube" /></svg></a>
							<a href="https://www.instagram.com/lovecatcherjapan_official/" target="_blank"><svg class="c-icon c-icon--instagram"><use xlink:href="#icon-instagram" /></svg></a>
							<a href="https://x.com/ABEMA" target="_blank"><svg class="c-icon c-icon--x"><use xlink:href="#icon-x" /></svg></a>
						</div>
					</div>
				</div>
			</div>
			<div ref="footerMain" class="footer__main">
				<a href="https://abema.tv/" target="_blank" class="footer__logo">
					<img src="/assets/imgs/footer_logo.svg" width="201" height="66" alt="ABEMA TV for the Future" loading="lazy">
				</a>
				<p class="footer__lead">アプリをダウンロードして、<br class="pctb-hidden">「ラブキャッチャー」を見よう！</p>
				<div class="footer__buttons">
					<a href="https://play.google.com/store/apps/details?id=tv.abema&hl=ja" target="_blank" class="button c-shine googlePlay">
						<picture>
							<source type="image/avif" srcset="/assets/imgs/banner_googlePlay.avif">
							<img src="/assets/imgs/banner_googlePlay.webp" width="169" height="50" alt="Google Play" loading="lazy">
						</picture>
					</a>
					<a href="https://apps.apple.com/jp/app/abematv/id1074866833" target="_blank" class="button c-shine appStore">
						<picture>
							<source type="image/avif" srcset="/assets/imgs/banner_appStore.avif">
							<img src="/assets/imgs/banner_appStore.webp" width="136" height="50" alt="App Store" loading="lazy">
						</picture>
					</a>
				</div>
				<div class="footer__foot">
					<div class="footer__links">
						<a href="https://abematv.co.jp/pages/396088/company" target="_blank">運営会社について</a>
						<a href="https://abema.tv/about/privacy-policy" target="_blank">プライバシーポリシー</a>
						<a href="https://abematv.co.jp/pages/394742/contact" target="_blank">お問い合わせ</a>
					</div>
					<p class="footer__copyright">(C)2023 AbemaTV, Inc.（C）CJ ENM CO., LTD. All Rights Reserved</p>
				</div>
			</div>
		</footer>
	</div>
</template>

<script setup>
'use strict';
import { reactive, computed, ref, nextTick, onMounted, onUnmounted } from 'vue';
import CoinComponent from './OpeningCoin.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imagesLoaded from 'imagesloaded';
import { entries } from 'lodash';

gsap.registerPlugin(ScrollTrigger);

const predictions = reactive(window.voteData);

const shuffle = (array) => {
	const arr = array.slice();
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};

const shuffledFemales = ref([]);
const shuffledMales = ref([]);
const shuffledAll = ref([]);
const shuffledAllSecondary = ref([]);
const tab = ref('money');

const runShuffle = () => {
	const entries = Object.entries(predictions);

	const shuffleAndSetFrontBack = (arr) => {
		const shuffled = shuffle(arr);
		return shuffled.map(([key, member], index) => {
			const front = index % 2 === 0 ? 'love' : 'money';
			const back  = front === 'love' ? 'money' : 'love';
			return { key, ...member, front, back };
		});
	};

	const femaleEntries = entries.filter(([key, member]) => member.gender === 'female');
	shuffledFemales.value = shuffleAndSetFrontBack(femaleEntries);

	const maleEntries = entries.filter(([key, member]) => member.gender === 'male');
	shuffledMales.value = shuffleAndSetFrontBack(maleEntries);

	shuffledAll.value = shuffleAndSetFrontBack(entries);
	shuffledAllSecondary.value = shuffleAndSetFrontBack(entries);
};

const sortedPredictions = computed(() => {
	return Object.entries(predictions)
		.sort(([, a], [, b]) => {
			if (a.proved || a.dropout) return 1;
			if (b.proved || b.dropout) return -1;
			if (tab.value === 'love') return b.love - a.love;
			return b.money - a.money;
		})
		.reduce((acc, [key, value]) => {
			acc[key] = value;
			return acc;
		}, {});
});

const isOpening = ref(true);
const topPage = ref(null);
const headerLogo= ref(null);
const fv = ref(null);
const topIntro = ref(null);
const topHowto = ref(null);
const topPrediction = ref(null);
const footerMain = ref(null);
const openingNum = ref(null);

let headerLogoObserver = null;
let fvObserver = null;
let introObserver = null;
let interval = null;
let howtoObserver = null;
let predictionObserver = null;
let footerObserver = null;
let animations = [];

onMounted(() => {
	runShuffle();

	const isSP = window.matchMedia('(max-width:849px)').matches;
	isOpening.value = !isSP;

	if (!isSP) {
		nextTick(() => {
			const openingItems = document.querySelector('.c-opening');
			if (!openingItems) return;			
			openingNum.value.textContent = '000';
			document.documentElement.style.cursor = 'progress';
			const preloads = [fv.value, openingItems];
			imagesLoaded(preloads, () => {
				const counterState = { 
					value: 0 
				};
				const timeLine = gsap.timeline({
					onComplete: () => {
						openingNum.value.textContent = '100';
						isOpening.value = false;
						document.documentElement.style.cursor = 'auto';
						nextTick(() => {
							init();
						});
					}
				});

				timeLine.
					fromTo(openingItems, {
						opacity: 1,
					}, {
						opacity: 1,
						duration: 2,
						ease: "power2.out"
					}, 0)
					.to(counterState, {
						value: 100,
						duration: 2,
						ease: "power2.out",
						onUpdate: () => {
							const currentValue = Math.floor(counterState.value);
							openingNum.value.textContent = String(currentValue).padStart(3, '0');
						}
					}, 0)
					.to(openingItems, {
						duration: .4,
						ease: "cubic-bezier(0.33, 1, 0.68, 1)"
					});
			});
		});
	} else {
		nextTick(() => {
			imagesLoaded(topIntro.value, () => {
				init();
			});
		});
	}

	const init = () => {
		if (headerLogo.value) {
			headerLogoObserver = new IntersectionObserver(([entry])=>{
				if (entry.isIntersecting) {
					headerLogo.value.classList.add('is-visible');
				}
			});
			headerLogoObserver.observe(headerLogo.value);
		}
		if (fv.value) {
			fvObserver = new IntersectionObserver(([entry])=>{
				if (entry.isIntersecting) {
					fv.value.classList.add('is-visible');
					document.documentElement.classList.remove('fv-scrolled');
				} else {
					document.documentElement.classList.add('fv-scrolled');
				}
			});
			fvObserver.observe(fv.value);
		}
		if (topIntro.value) {
			introObserver = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					topIntro.value.classList.add('is-visible');
					introObserver.unobserve(topIntro.value);
				}
			}, {
				rootMargin: '0% 0% -50% 0%'
			});
			introObserver.observe(topIntro.value);

			const rotationMap = new Map();
			const rotatedKeys = new Set();

			const pcSlides = Array.from(document.querySelectorAll('.p-top-intro__pcSlider .slide'));
			const spSlides = Array.from(document.querySelectorAll('.p-top-intro__spSlider .slide'));

			[...pcSlides, ...spSlides].forEach(el => rotationMap.set(el.dataset.key, 0));

			const mediaQuery = window.matchMedia('(max-width:849px)');

			const getActiveSlides = () => mediaQuery.matches ? spSlides : pcSlides;

			const flipRandomCoins = () => {
				const activeSlides = getActiveSlides();
				if (!activeSlides.length) return;

				const uniqueKeys = [...new Set(activeSlides.map(el => el.dataset.key))].filter(k => !rotatedKeys.has(k));

				if (uniqueKeys.length === 0) {
					rotatedKeys.clear();
					return;
				}

				const count = Math.min(uniqueKeys.length, Math.floor(Math.random() * 2) + 3);
				const chosenKeys = uniqueKeys.sort(() => Math.random() - 0.5).slice(0, count);

				chosenKeys.forEach((key, i) => {
					setTimeout(() => {
						const targets = activeSlides.filter(el => el.dataset.key === key);
						const currentRotation = rotationMap.get(key);

						targets.forEach(el => {
							gsap.to(el, {
								rotateY: currentRotation + 180,
								duration: 0.8,
								ease: "cubic-bezier(0.33, 1, 0.68, 1)"
							});
						});

						rotationMap.set(key, currentRotation + 180);
						rotatedKeys.add(key);
					}, i * 400);
				});
			};

			interval = setInterval(flipRandomCoins, 4000);

			mediaQuery.addEventListener('change', () => {
				location.reload();
			});
		}

		if (topHowto.value) {
			howtoObserver = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					topHowto.value.classList.add('is-visible');
					howtoObserver.unobserve(topHowto.value);
				}
			}, {
				rootMargin: '0% 0% -25% 0%'
			});
			howtoObserver.observe(topHowto.value);
		}

		if (topPrediction.value) {
			predictionObserver = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					topPrediction.value.classList.add('is-visible');
					predictionObserver.unobserve(topPrediction.value);
				}
			}, {
				rootMargin: '0% 0% -25% 0%'
			});
			predictionObserver.observe(topPrediction.value);
		}

		if (footerMain.value) {
			footerObserver = new IntersectionObserver(([entry])=>{
				if (entry.isIntersecting) {
					document.documentElement.classList.add('footer-scrolled');
				} else {
					document.documentElement.classList.remove('footer-scrolled');
				}
			});
			footerObserver.observe(footerMain.value);
		}

		const parallaxTargets = document.querySelectorAll('[data-parallax]');

		parallaxTargets.forEach((target) => {
			gsap.set(target, {
				y: 30,
				opacity: 0
			});

			const fadeAnim = gsap.to(target, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				delay: 0.4,
				ease: "cubic-bezier(0.33, 1, 0.68, 1)",
				scrollTrigger: {
					trigger: target,
					start: "top 90%",
					once: true
				}
			});

			animations.push(fadeAnim);

			if (!isSP) {
				const parallaxY = -parseFloat(target.dataset.parallax);
				const img = target.querySelector('img');
				const parallaxAnim = gsap.to(img, {
					y: parallaxY,
					ease: "none",
					scrollTrigger: {
						trigger: img,
						start: "top bottom",
						end: "bottom top",
						scrub: true,
						immediateRender: false
					}
				});
				animations.push(parallaxAnim);
			}
		});
	};

	const footerMainArea = document.querySelector('.footer__main');
	const stickyBtn = document.querySelector('.p-top-stickyArea__button');
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if(entry.isIntersecting) {
				stickyBtn.classList.add('active');
			} else {
				stickyBtn.classList.remove('active');
			}
		});
	});
	observer.observe(footerMainArea);	
});

onUnmounted(() => {
	if (headerLogoObserver && headerLogo.value) {
		headerLogoObserver.unobserve(headerLogo.value);
		headerLogoObserver.disconnect();
	}

	if (fvObserver && fv.value) {
		fvObserver.unobserve(fv.value);
		fvObserver.disconnect();
	}

	if (introObserver && topIntro.value) {
		introObserver.unobserve(topIntro.value);
		introObserver.disconnect();
	}

	if (interval) clearInterval(interval);

	if (howtoObserver && topHowto.value) {
		howtoObserver.unobserve(topHowto.value);
		howtoObserver.disconnect();
	}

	if (predictionObserver && topPrediction.value) {
		predictionObserver.unobserve(topPrediction.value);
		predictionObserver.disconnect();
	}

	if (footerObserver && footerMain.value) {
		footerObserver.unobserve(footerMain.value);
		footerObserver.disconnect();
	}

	animations.forEach(anim => anim.kill());
	animations = [];
	ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>
