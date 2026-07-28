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
        <div class="carousel02__container"> 
            <div class="carousel02__inner">
                <div class="carousel02__slide" data-index="0">0</div>
                <div class="carousel02__slide" data-index="1">1</div>
                <div class="carousel02__slide" data-index="2">2</div>
            </div>
        </div>
        <div class="carousel02__prev"></div>
        <div class="carousel02__next"></div>
    </section>
</main>

<?php get_footer(); ?>