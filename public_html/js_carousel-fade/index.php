<?php 
require('../includes.php');
$pageinfo = array(
    'lang' => 'ja',
    'title' => '',
    'description' => '',
);
set_query_var('pageinfo', $pageinfo);
get_header();
?>

<main class="main">
    <section class="fadeSingle fadeSingleVer">
        <div class="fadeSingle__container"> 
            <div class="fadeSingle__slide" data-index="0">0</div>
            <div class="fadeSingle__slide" data-index="1">1</div>
            <div class="fadeSingle__slide" data-index="2">2</div>
        </div>
        <div class="fadeSingle__pagination"></div>
    </section>
</main>

<?php get_footer(); ?>