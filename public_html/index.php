<?php 
require('includes.php');
$pageinfo = array(
    'lang' => 'ja',
    'title' => 'ホーム',
    'description' => '',
);
set_query_var('pageinfo', $pageinfo);
get_header();
?>
<main>  
<?php
$baseDir = __DIR__ . '/';
$baseUrl = '/';
$dirs = array_filter(scandir($baseDir), function ($item) use ($baseDir) {
    return $item !== '.' && $item !== '..' && is_dir($baseDir . $item);
});
$result = array_diff($dirs, array('assets'));
$result = array_values($result);
?>
    <nav>
        <ul>
<?php foreach ($result as $dir): ?>
            <li>
                <a interestfor="tip-anchor" href="/<?php echo htmlspecialchars($dir); ?>/"><span><span><?php echo htmlspecialchars(mb_strimwidth($dir, 0, 20, '...')); ?></span></span></a>
            </li>
<?php endforeach; ?>
        </ul>
    </nav>
</main>