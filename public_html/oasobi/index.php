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
  <ul>
    <li>
      <a href="#"><span>A</span><span>b</span><span>o</span><span>u</span><span>t</span></a>
    </li>
    <li>
      <a href="#"><span>P</span><span>o</span><span>r</span><span>t</span><span>f</span><span>o</span><span>l</span><span>i</span><span>o</span></a>
    </li>
    <li>
      <a href="#"><span>C</span><span>o</span><span>n</span><span>t</span><span>a</span><span>c</span><span>t</span></a>
    </li>
  </ul>
</main>

<?php get_footer(); ?>