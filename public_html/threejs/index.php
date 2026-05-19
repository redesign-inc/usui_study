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

<?php get_footer(); ?>