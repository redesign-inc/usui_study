<?php
class Validate {
	function __construct($value, $rules, $filedata=null){
		$this->value = $value;
		$this->rules = $rules;
		$this->filedata = $filedata;
	}

	public function check(){
		if( $this->rules ) {
			if( isset($this->rules['require']) && $this->rules['require'] && $this->require() ) {
				return $this->require();
			}
			if( isset($this->rules['email']) && $this->rules['email'] && $this->email() ) {
				return $this->email();
			}
			if( isset($this->rules['equal']) && $this->rules['equal'] && $this->equal() ) {
				return $this->equal();
			}
			if( isset($this->rules['file']) && $this->rules['file'] && $this->file() ) {
				return $this->file();
			}
		}
		return false;
	}

	public function require(){
		if( $this->value == '' ) {
			return '必須項目です';
		}
		return false;
	}

	public function email(){
		if( !preg_match('/^[a-zA-Z0-9_\.\-]+?@[A-Za-z0-9_\.\-]+\.[A-Za-z0-9\.]+$/', $this->value) ) {
			return '正しく入力されていません';
		}
		return false;
	}

	public function equal(){
		global $formData;
		$name = $this->rules['equal'];
		$value = ( isset($_POST[$name]) )? $_POST[$name] : '';
		if( $value != $this->value ) {
			return '「'.$formData[$name]['label'].'」と同じ内容を入力してください';
		}
		return false;
	}

	public function file(){
		if( !$this->value ) {
			return false;
		}
		$fileinfo = pathinfo($this->value);
		$error = $this->filedata['error'];
		$size = $this->filedata['size'];
		$name = $fileinfo['filename'];
		$ext = $fileinfo['extension'];
		if( !isset($error) || !is_int($error) ) {
			return 'パラメータが不正です';
		}
		if( $ext != '' && !preg_match('/('.FILE_TYPE.')/i', $ext) ) {
			return 'ファイル形式が不正です';
		}
		if( $size > 1024 * 1000 * MAX_FILE_SIZE ) {
			return 'ファイルサイズが大きすぎます';
		}
		return false;
	}
}
