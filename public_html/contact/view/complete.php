<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$isError = false;
$attachmentFiles = array();

if( !isset($_SESSION['form_token']) || $_SESSION['form_token'] != session_id() ) {
	require(ROOT_DIR.'/view/error.php');
	return;
}

$mailBody = "\n\n-------------------------------------------------\n\n";
if( MAIL_ID ) {
	$mailBody .= "【".MAIL_ID."】\n".$_SESSION['form_token']."\n\n";
}
foreach( $formData as $key=>$val ) {
	if( isset($val['hidden']) ) continue;
	$mailBody .= "【".$val['label']."】\n".$_SESSION['form'][$key]['output']."\n\n";
	if( isset($_SESSION['form'][$key]['tmp']) && $_SESSION['form'][$key]['tmp'] ) {
		array_push($attachmentFiles, $_SESSION['form'][$key]['file']);
	}
}
$mailBody .= "-------------------------------------------------\n\n";

// PHPMailer
require ROOT_DIR.'/vendor/autoload.php';
require ROOT_DIR.'/vendor/phpmailer/phpmailer/language/phpmailer.lang-ja.php';
$encode = 'UTF-8';

// admin
$adminMails = explode(',', ADMIN_MAIL);
$adminMailBody = file_get_contents(ROOT_DIR.'/mail/admin.txt');
$adminMailBody .= $mailBody;
$adminMail = new PHPMailer(true);
$adminMail->CharSet = $encode;
if( IS_SMTP ) {
	$adminMail->isSMTP();
	$adminMail->Host = SMTP_HOST;
	$adminMail->SMTPAuth = true;
	$adminMail->Username = SMTP_USERNAME;
	$adminMail->Password = SMTP_PASSWORD;
	$adminMail->SMTPSecure = SMTP_SECURE;
	$adminMail->Port = SMTP_PORT;
}
$adminMail->setFrom(FROM_MAIL, mb_convert_encoding(FROM_NAME, $encode));
foreach( $adminMails as $email ) {
	$adminMail->addAddress($email);
}
$adminMail->Subject = mb_convert_encoding(ADMIN_SUBJECT, $encode);
$adminMail->Body = mb_convert_encoding($adminMailBody, $encode);
foreach( $attachmentFiles as $file ) {
	$adminMail->addAttachment($file['tmp'], $file['name']);
}
try {
	$adminMail->send();
} catch (Exception $e) {
	$isError = true;
}

// user
$userMailBody = file_get_contents(ROOT_DIR.'/mail/head.txt');
if( USER_MAIL_BODY ) {
	$userMailBody.= $mailBody;
}
$userMailBody.= file_get_contents(ROOT_DIR.'/mail/foot.txt');
$userMail = new PHPMailer(true);
$userMail->CharSet = $encode;
if( IS_SMTP ) {
	$userMail->isSMTP();
	$userMail->Host = SMTP_HOST;
	$userMail->SMTPAuth = true;
	$userMail->Username = SMTP_USERNAME;
	$userMail->Password = SMTP_PASSWORD;
	$userMail->SMTPSecure = SMTP_SECURE;
	$userMail->Port = SMTP_PORT;
}
$userMail->setFrom(FROM_MAIL, mb_convert_encoding(FROM_NAME, $encode));
$userMail->addAddress($_SESSION['form']['email']['output']);
$userMail->Subject = mb_convert_encoding(USER_SUBJECT, $encode);
$userMail->Body = mb_convert_encoding($userMailBody, $encode);
try {
	$userMail->send();
} catch (Exception $e) {
	$isError = true;
}

if( $isError ) :
require(ROOT_DIR.'/view/error.php');
else :
if( IS_API ) :
$json = array(
	'status' => 'complete',
	'token' => session_id()
);
echo json_encode($json);
else :
?>
<p>お問い合わせありがとうございました。<br>送信は無事に終了しました。<br>担当者より折り返しご連絡させていただきます。<br><br>【自動返信メールが届かない場合は以下のことが考えられます】<br>・メールアドレスの記入間違い<br>・お問い合わせいただいた端末による拒否設定<br>・システムの不具合<br><br>※メーラーの設定によっては迷惑メールとして受信されている場合がございますので、迷惑メールフォルダをご確認ください。<br>※数日中に連絡が無い場合は、お手数ですがお電話（<a href="tel:0000000000">0000-00-0000</a>）にて直接ご連絡ください。</p>

<p>お問い合わせありがとうございました。<br>送信は無事に終了しました。<br>担当者より折り返しご連絡させていただきます。<br><br>【自動返信メールが届かない場合は以下のことが考えられます】<br>・メールアドレスの記入間違い<br>・お問い合わせいただいた端末による拒否設定<br>・システムの不具合<br><br>※メーラーの設定によっては迷惑メールとして受信されている場合がございますので、迷惑メールフォルダをご確認ください。<br>※数日中に連絡が無い場合は、お手数ですが再度お問い合わせフォームにてご連絡ください。</p>
<?php
endif;
UploadFile::delete();
session_destroy();
endif;
