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
    <div id="webgl"></div>
</main>

<?php get_footer(); ?>