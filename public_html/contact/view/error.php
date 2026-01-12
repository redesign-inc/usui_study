<?php
if( IS_API ) :
http_response_code(400);
$json = array(
	'status' => 'error'
);
echo json_encode($json);
else :
?>
<div>
	<div>
		<p>エラー</p>
<?php if( isset($messages) ) : ?>
		<ul>
<?php foreach( $messages as $text ) : ?>
			<li><?php echo(htmlentities($text, ENT_QUOTES, 'UTF-8')); ?></li>
<?php endforeach; ?>
		</ul>
<?php endif; ?>
		<p>入力画面に戻り必須項目・正しい値を入力し再度送信して下さい。</p>
	</div>
	<a href="./">入力画面に戻る</a>
</div>
<?php
endif;
