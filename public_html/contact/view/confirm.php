<?php
$isError = false;
$messages = array();
$data = array();

function output($value, $setting=null){
	$output = '';
	$prefix = ( isset($setting) && isset($setting['prefix']) )? $setting['prefix'] : '';
	$suffix = ( isset($setting) && isset($setting['suffix']) )? $setting['suffix'] : '';
	if( is_array($value) ) {
		$output = array();
		$group = ( isset($setting) && isset($setting['group']) )? $setting['group'] : null;
		$separate = ( isset($setting) && isset($setting['separate']) )? $setting['separate'] : '';
		$join = ( isset($setting) && isset($setting['join']) )? $setting['join'] : '';
		if( $join ) {
			$joinName = $join['name'];
			$joinValue = $value[$joinName];
			$joinPrefix = ( isset($join['prefix']) )? $join['prefix'] : '';
			$joinTarget = $join['value'];
			unset($value[$joinName]);
		}
		foreach( $value as $key=>$val ) {
			if( $group && isset($group[$key]) ) {
				array_push($output, output($val, $group[$key]));
			} else {
				if( $join && $val == $joinTarget ) {
					$val .= $joinPrefix.$joinValue;
				}
				array_push($output, $val);
			}
		}
		$output = implode($separate, $output);
	} else {
		$output = $value;
	}
	if( $prefix && $output ) {
		$output = $prefix.$output;
	}
	if( $suffix && $output ) {
		$output .= $suffix;
	}
	return $output;
}

foreach( $formData as $name=>$setting ) {
	$item = array(
		'label' => '',
		'value' => '',
		'output' => ''
	);
	$item['label'] = $setting['label'];
	$value = ( isset($_POST[$name]) )? $_POST[$name] : '';
	$item['value'] = $value;
	$output = '';
	if( isset($setting['file']) ) {
		$file = $_FILES[$name];
		$filename = $file['name'];
		$output = $filename;
		$validate = new Validate($filename, $setting['validate'], $file);
		$invalid = $validate->check();
		if( $invalid ) {
			array_push($messages, '【'.$item['label'].'】'.$invalid);
			$isError = true;
		} elseif( !$file['error'] ) {
			$tmp = $file['tmp_name'];
			$fileinfo = pathinfo($filename);
			$ext = $fileinfo['extension'];
			$tmpname = $name.'.'.$ext;
			$result = UploadFile::upload($tmp, $tmpname);
			if( $result ) {
				$item['tmp'] = TMP_DIR.session_id().'/'.$tmpname;
				$item['file'] = array(
					'tmp' => TMP_DIR.session_id().'/'.$tmpname,
					'name' => ( isset($setting['filename']) && $setting['filename'] )? $setting['filename'].'.'.$ext : $filename
				);
			} else {
				array_push($messages, '【'.$item['label'].'】アップロードできませんでした');
				$isError = true;
			}
		}
	} else {
		$output = output($value, $setting);
		if( isset($setting['validate']) ) {
			$validate = new Validate($output, $setting['validate']);
			$invalid = $validate->check();
			if( $invalid ) {
				array_push($messages, '【'.$item['label'].'】'.$invalid);
				$isError = true;
			}
		}
	}
	if( $name == 'email' ) {
		$output = explode(',', $output)[0];
	}
	$item['output'] = $output;
	$data[$name] = $item;
}
$_SESSION['form'] = $data;
if( $isError ) :
require(ROOT_DIR.'/view/error.php');
else :
$_SESSION['form_token'] = session_id();
if( IS_API ) :
$json = array(
	'status' => 'confirm',
	'token' => session_id()
);
echo json_encode($json);
else :
?>
<p>入力した内容でよろしければ「送信する」ボタンをクリックして下さい。<br>入力内容を変更する場合は「入力画面に戻る」ボタンをクリックし、入力画面に戻って下さい。</p>
<?php
foreach( $formData as $key=>$val ) :
if( isset($val['hidden']) ) continue;
?>
<dl>
	<dt><?php echo $val['label']; ?></dt>
	<dd><?php echo(nl2br(htmlentities($_SESSION['form'][$key]['output'], ENT_QUOTES, 'UTF-8'), false)); ?></dd>
</dl>
<?php endforeach; ?>
<a href="./">入力画面に戻る</a>
<a href="./?mode=complete">送信する</a>
<?php
endif;
endif;
