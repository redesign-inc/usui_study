<?php 
require('../includes.php');
$pageinfo = array(
    'lang' => 'jp',
    'title' => 'carousel02',
    'description' => '',
);
set_query_var('pageinfo', $pageinfo);
get_header();
?>

<main class="main">
  <section class="carousel02">
    <button class="nav-btn prev-btn" id="prevBtn" aria-label="前へ">&#10094;</button>
    <div class="carousel02__wrapper">
      <div class="carousel02__group active">
        <div class="carousel02__slide">
          <img src="/assets/imgs/0.webp" alt="">
          <h3>Strawberry & Tart</h3>
          <p>苺とタルトのヨウカンカ</p>
        </div>
        <div class="carousel02__slide">
          <img src="/assets/imgs/1.webp" alt="">
          <h3>Sencha & Lime</h3>
          <p>煎茶とライムのヨウカンカ</p>
        </div>
        <div class="carousel02__slide">
          <img src="/assets/imgs/2.webp" alt="">
          <h3>Tea & Spices</h3>
          <p>紅茶とスパイスのヨウカンカ</p>
        </div>
      </div>
      <div class="carousel02__group">
        <div class="carousel02__slide">
          <img src="/assets/imgs/3.webp" alt="">
          <h3>Apple & Caramel</h3>
          <p>リンゴとキャラメルのヨウカンカ</p>
        </div>
        <div class="carousel02__slide">
          <img src="/assets/imgs/4.webp" alt="">
          <h3>Cassis & Marron glace</h3>
          <p>カシスとマロングラッセのヨウカンカ</p>
        </div>
        <div class="carousel02__slide">
          <img src="/assets/imgs/0.webp" alt="">
          <h3>White Chocolate & Cookie</h3>
          <p>ホワイトチョコレートとクッキーのヨウカンカ</p>
        </div>
      </div>
    </div>
    <button class="nav-btn next-btn" id="nextBtn" aria-label="次へ">&#10095;</button>
  </section>
</main>

<?php get_footer(); ?>