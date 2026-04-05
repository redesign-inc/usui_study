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
    <ul>
        <li data-fruit="🍎">Apple</li>
        <li data-fruit="🍌">Banana</li>
        <li data-fruit="🍊">Orange</li>
    </ul>

    <div class="entry" style="--color: red">red</div>
    <div class="entry" style="--color: blue">blue</div>
    <div class="entry" style="--color: green">green</div>

    <div class="aaaaa" data-color="black">aaaaa</div>
</main>

<?php get_footer(); ?>