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
    <section class="carousel">
        <div class="carousel__container"> 
            <div class="carousel__inner">
                <div class="carousel__slide" data-index="0">0</div>
                <div class="carousel__slide" data-index="1">1</div>
                <div class="carousel__slide" data-index="2">2</div>
                <div class="carousel__slide" data-index="3">3</div>
                <div class="carousel__slide" data-index="4">4</div>
            </div>
        </div>
        <div class="carousel__prev"></div>
        <div class="carousel__next"></div>
    </section>
</main>

<?php get_footer(); ?>