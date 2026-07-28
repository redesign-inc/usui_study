<?php 
require('../includes.php');
$pageinfo = array(
    'lang' => 'ja',
    'title' => 'three',
    'description' => 'three',
    'bodyClass' => 'three-map',
);
set_query_var('pageinfo', $pageinfo);
get_header();
?>
<main class="main three-map">
    <section class="section section01"></section>
    <section class="section section02">
        <div class="section02__img"></div>
        <div class="section02__inner">
            <div id="ui-overlay">
                <div class="card-content">
                    <h2 id="card-title">都道府県名</h2>
                    <p id="card-desc">ダミーテキスト</p>
                    <!-- <div id="close-btn">CLOSE</div> -->
                </div>
            </div>   
        </div>
    </section>
    <section class="section section03"></section>
</main>
<?php get_footer(); ?>
