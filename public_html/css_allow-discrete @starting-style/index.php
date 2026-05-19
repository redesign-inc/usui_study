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

<main class="main starting-style">
    <section class="">
        <div class="modal">モーダル</div>
        <div class="btn">ボタン</div>
    </section>
</main>

<?php get_footer(); ?>