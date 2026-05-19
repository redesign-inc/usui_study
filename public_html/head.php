<?php $pageinfo = get_query_var('pageinfo'); ?>
<!DOCTYPE html>
<html lang="<?php echo $pageinfo['lang'] ?>">
<head>
<meta charset="utf-8">
<meta name="description" content="<?php echo $pageinfo['description']; ?>">
<meta property="og:title" content="<?php echo $pageinfo['title']; ?>">
<meta property="og:type" content="website">
<meta property="og:site_name" content="<?php echo $pageinfo['title']; ?>">
<meta property="og:description" content="<?php echo $pageinfo['description']; ?>">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
<meta name="format-detection" content="telephone=no">
<title><?php echo $pageinfo['title']; ?></title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" media="all" href="/assets/css/main.css">
</head>
<body class="<?php echo $pageinfo['bodyClass']; ?>">
<div id="wrapper">
<header>ヘッダー</header>