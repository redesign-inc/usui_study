<?php 
require('../includes.php');
$pageinfo = array(
    'lang' => 'jp',
    'title' => 'imagesLoaded',
    'description' => '',
);
set_query_var('pageinfo', $pageinfo);
get_header();
?>

<main class="main js_imagesLoaded">
    <div class="js_imagesLoaded__opening">0%</div>
    <div class="js_imagesLoaded__imgs"></div>
</main>

<?php get_footer(); ?>