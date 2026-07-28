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
    <div class="parallax">
        <img src="/assets/imgs/img.webp" alt="">
        <img src="/assets/imgs/img.webp" alt="">
        <img src="/assets/imgs/img.webp" alt="">
        <img src="/assets/imgs/img.webp" alt="">
        <img src="/assets/imgs/img.webp" alt="">
    </div>
</main>

<?php get_footer(); ?>