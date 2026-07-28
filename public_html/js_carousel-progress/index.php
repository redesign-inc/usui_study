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
    <section class="fadeSingle02 progressVer">
        <div class="fadeSingle02__container"> 
            <div class="fadeSingle02__slide">0</div>
            <div class="fadeSingle02__slide">1</div>
            <div class="fadeSingle02__slide">2</div>
        </div>
        <div class="fadeSingle02__pagination"></div>
    </section>
</main>

<?php get_footer(); ?>