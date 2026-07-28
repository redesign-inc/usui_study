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
    <div class="txt-hover-img-change">
        <div class="txt">
            <div class="p">aaaaaaa</div>
            <div class="p">bbbbbbb</div>
            <div class="p">ccccccc</div>
        </div>
        <div class="imgs">
            <img class="is-current" src="/assets/imgs/0.png" alt="">
            <img src="/assets/imgs/1.png" alt="">
            <img src="/assets/imgs/2.png" alt="">
        </div>
    </div>
</main>

<?php get_footer(); ?>