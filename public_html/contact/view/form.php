<?php
function formValue($name, ...$params){
	$session = ( isset($_SESSION['form'][$name]) )? $_SESSION['form'][$name] : null;
	if( !$session ) {
		return '';
	}
	$value = $session['value'];
	if( $params ) {
		foreach( $params as $param ) {
			$value = $value[$param];
		}
	}
	if( !is_array($value) ) {
		$value = htmlentities($value, ENT_QUOTES, 'UTF-8');
	}
	return $value;
}
?>
<form action="./?mode=confirm" method="post" enctype="multipart/form-data">
	<dl>
		<dt>名前</dt>
		<dd><input type="text" name="name" value="<?php echo formValue('name'); ?>"></dd>
	</dl>
	<dl>
		<dt>メールアドレス</dt>
		<dd><input type="email" name="email" value="<?php echo formValue('email'); ?>"></dd>
	</dl>
	<dl>
		<dt>確認用メールアドレス</dt>
		<dd><input type="email" name="email_confirm" value="<?php echo formValue('email_confirm'); ?>"></dd>
	</dl>
	<dl>
		<dt>電話番号</dt>
		<dd><input type="tel" name="tel" value="<?php echo formValue('tel'); ?>"></dd>
	</dl>
	<dl>
		<dt>年齢</dt>
		<dd>
			<input type="text" name="age" value="<?php echo formValue('age'); ?>">
			歳
		</dd>
	</dl>
	<dl>
		<dt>住所</dt>
		<dd>
			<div>
				〒
				<input type="text" name="address[zip][1]" value="<?php echo formValue('address', 'zip', 1); ?>">
				-
				<input type="text" name="address[zip][2]" value="<?php echo formValue('address', 'zip', 2); ?>">
			</div>
			<input type="text" name="address[addr]" value="<?php echo formValue('address', 'addr'); ?>">
		</dd>
	</dl>
	<dl>
		<dt>都道府県</dt>
		<dd>
<select name="pref">
	<option value="">選択してください</option>
<?php
/*
 * Parts::pref($selected)の使い方
 * $selected: 初期選択の都道府県（デフォルトはnullで選択なし）
 */
echo Parts::pref(formValue('pref'));
?>
</select>
		</dd>
	</dl>
	<dl>
		<dt>希望日</dt>
		<dd>
			<div>
				第1希望：
<select name="date[1][y]">
	<option value="">-</option>
<?php
/*
 * Parts::year($selected, $start, $count)の使い方
 * $selected: 初期選択の年（デフォルトはnullで選択なし）
 * $start: 始まりの年（デフォルトは現在の年）
 * $count: 表示する年数（デフォルトは3）
 */
$date1Year = ( formValue('date', 1, 'y') )? floatval(formValue('date', 1, 'y')) : null;
echo Parts::year($date1Year);
?>
</select>
				年
<select name="date[1][m]">
	<option value="">-</option>
<?php
/*
 * Parts::month($selected)の使い方
 * $selected: 初期選択の月（デフォルトはnullで選択なし）
 */
$date1Month = ( formValue('date', 1, 'm') )? floatval(formValue('date', 1, 'm')) : null;
echo Parts::month($date1Month);
?>
</select>
				月
<select name="date[1][d]">
	<option value="">-</option>
<?php
/*
 * Parts::day($selected)の使い方
 * $selected: 初期選択の日（デフォルトはnullで選択なし）
 */
$date1Day = ( formValue('date', 1, 'd') )? floatval(formValue('date', 1, 'd')) : null;
echo Parts::day($date1Day);
?>
</select>
				日
			</div>
			<div>
				第2希望：
<select name="date[2][y]">
	<option value="">-</option>
<?php
$date2Year = ( formValue('date', 2, 'y') )? floatval(formValue('date', 2, 'y')) : date('Y');
echo Parts::year($date2Year);
?>
</select>
				年
<select name="date[2][m]">
	<option value="">-</option>
<?php
$date2Month = ( formValue('date', 2, 'm') )? floatval(formValue('date', 2, 'm')) : date('n');
echo Parts::month($date2Month);
?>
</select>
				月
<select name="date[2][d]">
	<option value="">-</option>
<?php
$date2Day = ( formValue('date', 2, 'd') )? floatval(formValue('date', 2, 'd')) : date('j');
echo Parts::day($date2Day);
?>
</select>
				日
			</div>
			<div>
				第3希望：
<select name="date[3][y]">
	<option value="">-</option>
<?php
$date3Year = ( formValue('date', 3, 'y') )? floatval(formValue('date', 3, 'y')) : 2051;
echo Parts::year($date3Year, 2050, 10);
?>
</select>
				年
<select name="date[3][m]">
	<option value="">-</option>
<?php
$date3Month = ( formValue('date', 3, 'm') )? floatval(formValue('date', 3, 'm')) : null;
echo Parts::month($date3Month);
?>
</select>
				月
<select name="date[3][d]">
	<option value="">-</option>
<?php
$date3Day = ( formValue('date', 3, 'd') )? floatval(formValue('date', 3, 'd')) : null;
echo Parts::day($date3Day);
?>
</select>
				日
			</div>
		</dd>
	</dl>
	<dl>
		<dt>単一選択</dt>
		<dd>
			<ul>
<?php
$radio_array = array(
	'radio項目1',
	'radio項目2',
	'radio項目3'
);
foreach( $radio_array as $val ) :
$checked = '';
if(
	formValue('radio') == $val
	|| ( formValue('radio') == '' && $val == 'radio項目1' )
) {
	$checked = ' checked';
}
?>
				<li>
					<label>
						<input type="radio" name="radio" value="<?php echo $val; ?>"<?php echo $checked; ?>>
						<?php echo $val; ?>
					</label>
				</li>
<?php endforeach; ?>
			</ul>
		</dd>
	</dl>
	<dl>
		<dt>単一選択（その他あり）</dt>
		<dd>
			<ul>
<?php
$radio2_array = array(
	'radio項目1',
	'radio項目2',
	'その他'
);
foreach( $radio2_array as $val ) :
$checked = '';
if(
	formValue('radio2', 0) == $val
	|| ( formValue('radio2', 0) == '' && $val == 'その他' )
) {
	$checked = ' checked';
}
?>
				<li>
					<label>
						<input type="radio" name="radio2[]" value="<?php echo $val; ?>"<?php echo $checked; ?>>
						<?php echo $val; ?>
					</label>
<?php if( $val == 'その他' ) : ?>
					<input type="text" name="radio2[other]" value="<?php echo formValue('radio2', 'other'); ?>">
<?php endif; ?>
				</li>
<?php endforeach; ?>
			</ul>
		</dd>
	</dl>
	<dl>
		<dt>複数選択</dt>
		<dd>
			<ul>
<?php
$checkbox_array = array(
	'checkbox項目1',
	'checkbox項目2',
	'checkbox項目3'
);
foreach( $checkbox_array as $val ) :
$checked = '';
if(
	( is_array(formValue('checkbox')) && array_search($val, formValue('checkbox')) !== false )
	|| ( formValue('checkbox') == '' && $val == 'checkbox項目1' )
) {
	$checked = ' checked';
}
?>
				<li>
					<label>
						<input type="checkbox" name="checkbox[]" value="<?php echo $val; ?>"<?php echo $checked; ?>>
						<?php echo $val; ?>
					</label>
				</li>
<?php endforeach; ?>
			</ul>
		</dd>
	</dl>
	<dl>
		<dt>複数選択（その他あり）</dt>
		<dd>
			<ul>
<?php
$checkbox2_array = array(
	'checkbox項目1',
	'checkbox項目2',
	'その他'
);
foreach( $checkbox2_array as $val ) :
$checked = '';
if(
	( is_array(formValue('checkbox2')) && array_search($val, formValue('checkbox2')) !== false )
	|| ( formValue('checkbox2') == '' && $val == 'その他' )
) {
	$checked = ' checked';
}
?>
				<li>
					<label>
						<input type="checkbox" name="checkbox2[]" value="<?php echo $val; ?>"<?php echo $checked; ?>>
						<?php echo $val; ?>
					</label>
<?php if( $val == 'その他' ) : ?>
					<input type="text" name="checkbox2[other]" value="<?php echo formValue('checkbox2', 'other'); ?>">
<?php endif; ?>
				</li>
<?php endforeach; ?>
			</ul>
		</dd>
	</dl>
	<dl>
		<dt>添付ファイル1</dt>
		<dd><input type="file" name="file1"></dd>
	</dl>
	<dl>
		<dt>添付ファイル2</dt>
		<dd><input type="file" name="file2"></dd>
	</dl>
	<dl>
		<dt>お問合せ内容</dt>
		<dd><textarea name="msg"><?php echo formValue('msg'); ?></textarea></dd>
	</dl>
	<dl>
		<dt>個人情報保護の同意</dt>
		<dd>
			<label>
				<input type="checkbox" name="privacy" value="同意する"<?php if( formValue('privacy') ) echo ' checked'; ?>>
				同意する
			</label>
		</dd>
	</dl>
	<button type="submit">確認</button>
</form>
