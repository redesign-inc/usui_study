<?php 
require('../includes.php');
$pageinfo = array(
    'lang' => 'ja',
    'title' => 'three',
    'description' => 'three',
    'bodyClass' => 'three-carousel',
);
set_query_var('pageinfo', $pageinfo);
get_header();
?>
<main class="main three-carousel">
    <!-- <div id="wrapper" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"></div> -->

    <!-- <div class="content-layer" style="position: relative; z-index: 10; pointer-events: none;">
        <section class="section 1">1</section>
        <section class="section 2">2</section>
        <section class="section 3">3</section>
    </div> -->

    <div id="ui-overlay">
        <div class="card-content">
            <h2 id="card-title"></h2>
            <p id="card-desc"></p>
            <div id="close-btn">CLOSE</div>
        </div>
    </div>   
</main>
<?php get_footer(); ?>