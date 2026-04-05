<?php 
require('../includes.php');
$pageinfo = array(
    'lang' => '',
    'title' => '',
    'description' => '',
);
set_query_var('pageinfo', $pageinfo);
get_header();
?>

<main class="main">
    <div class="masonry">
        <div class="masonry__img">
            <img src="/assets/imgs/photo01.webp" alt="">        
        </div>
        <div class="masonry__img">
            <img src="/assets/imgs/photo03.webp" alt="">
        </div>
        <div class="masonry__img">
            <img src="/assets/imgs/photo04.webp" alt="">
        </div>
        <div class="masonry__img">
            <img src="/assets/imgs/photo05.webp" alt="">
        </div>
        <div class="masonry__img">
            <img src="/assets/imgs/photo02.webp" alt="">
        </div>
        <div class="masonry__img">
            <img src="/assets/imgs/photo05.webp" alt="">
        </div>
        <div class="masonry__img">
        <img src="/assets/imgs/photo03.webp" alt="">
        </div>
        <div class="masonry__img">
            <img src="/assets/imgs/photo03.webp" alt="">
        </div>
        <div class="masonry__img">
            <img src="/assets/imgs/photo02.webp" alt="">
        </div>
        <div class="masonry__img">
            <img src="/assets/imgs/photo01.webp" alt="">
        </div>
        <div class="masonry__img">
            <img src="/assets/imgs/photo03.webp" alt="">
        </div>
        <div class="masonry__img">
            <img src="/assets/imgs/photo04.webp" alt="">
        </div>        
    </div>
</main>

<?php get_footer(); ?>