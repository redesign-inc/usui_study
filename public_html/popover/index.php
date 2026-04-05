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
    <div class="popover">
        <button class="popover__open" popovertarget="my-popover">開く</button>
        <div id="my-popover" class="popover__content" popover>
            <p>ポップオーバーの内容</p>
        </div>
    </div>
</main>

<?php get_footer(); ?>