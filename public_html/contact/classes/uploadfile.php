<?php
class UploadFile {
	static function delete(){
		$token = ( isset($_SESSION['form_token']) && $_SESSION['form_token'] )? $_SESSION['form_token'] : null;
		if( $handle = opendir(TMP_DIR) ) {
			while( false !== ($pathname = readdir($handle)) ) {
				$dir = TMP_DIR.$pathname;
				if( is_dir($dir) && !preg_match('/^\.$/', $pathname) && !preg_match('/^\.\.$/', $pathname) ) {
					$mtime = filemtime($dir);
					$dtime = date('U', strtotime('-1 day'));
					if( $token == $pathname || $mtime < $dtime ) {
						array_map('unlink', glob($dir.'/*.*'));
						rmdir($dir);
					}
				}
			}
		}
	}

	static function upload($tmp=null, $name=null){
		$result = false;
		if( $tmp && $name ) {
			$dir = TMP_DIR.session_id().'/';
			if( !file_exists($dir) ) {
				mkdir($dir);
			}
			$result = move_uploaded_file($tmp, $dir.$name);
		}
		return $result;
	}
}
