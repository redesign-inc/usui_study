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
    <section class="clipSingle">
        <div class="clipSingle__container">
            <div class="clipSingle__slide">0</div>
            <div class="clipSingle__slide">1</div>
            <div class="clipSingle__slide">2</div>
            <div class="clipSingle__slide">3</div>
        </div>
        <div class="clipSingle__dots" id="dots"></div>
        <div class="clipSingle__nav">
            <button class="clipSingle__btn" id="prevBtn">‹ prev</button>
            <button class="clipSingle__btn" id="playBtn">pause</button>
            <button class="clipSingle__btn" id="nextBtn">next ›</button>
            <select class="clipSingle__dir" id="dirSel">
                <option value="right">→ 右へ</option>
                <option value="left">← 左へ</option>
                <option value="up">↑ 上へ</option>
                <option value="down">↓ 下へ</option>
            </select>
        </div>
    </section>

</main>

<?php get_footer(); ?>