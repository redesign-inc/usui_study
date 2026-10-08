<?php 
require('../includes.php');
$pageinfo = array(
    'lang' => 'ja',
    'title' => 'タイトル',
    'description' => 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
);
set_query_var('pageinfo', $pageinfo);
get_header();
?>

<main>
    <div class="square">
        <div class="square-border"></div>
    </div>
    <div class="scroll-fv"></div>
    <div class="scroll01 scroll01-1" data-scroll="0">0</div>
    <div class="scroll01 scroll01-2" data-scroll="1">1</div>
    <div class="scroll01 scroll01-3" data-scroll="2">2</div>
</main>

<?php get_footer(); ?>