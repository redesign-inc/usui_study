<?php
/**
* index
**/
ini_set('default_charset', 'UTF-8');
date_default_timezone_set('Asia/Tokyo');
mb_language('japanese');
mb_internal_encoding('UTF-8');

session_cache_limiter('none');
session_start();
$mode = ( isset($_GET['mode']) )? $_GET['mode'] : '';
if( $mode == 'confirm' ) {
	session_regenerate_id();
}

require_once(__DIR__.'/config.php');
require_once(ROOT_DIR.'/classes/classes.php');
if( $mode != 'complete' ) {
	UploadFile::delete();
}

if( IS_API && ( $mode == 'confirm' || $mode == 'complete' ) ) {
	header('Content-Type: application/json; charset=utf-8');
}

if( !IS_API || ( $mode != 'confirm' && $mode != 'complete' ) ) {
	require_once(ROOT_DIR.'/template/head.php');
}

// mode
switch($mode){
	case 'confirm':
		require_once(ROOT_DIR.'/view/confirm.php');
		break;
	case 'complete':
		require_once(ROOT_DIR.'/view/complete.php');
		break;
	default:
		require_once(ROOT_DIR.'/view/form.php');
		session_destroy();
		break;
}

if( !IS_API || ( $mode != 'confirm' && $mode != 'complete' ) ) {
require_once(ROOT_DIR.'/template/foot.php');
}
