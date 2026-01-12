<?php
//==========================================================
// 基本設定
//==========================================================

// ディレクトリ
const ROOT_DIR = __DIR__;
// API（jsonで出力する場合はtrue）
const IS_API = false;
// 送信名
const FROM_NAME = '会社名';
// 送信アドレス
const FROM_MAIL = 'info@re-d.jp';
// 受信アドレス(複数指定する場合は「,」で区切る)
const ADMIN_MAIL = 'd.iso@re-d.jp';
// adminタイトル
const ADMIN_SUBJECT = 'お問い合わせフォーム';
// userタイトル
const USER_SUBJECT = 'お問い合わせありがとうございました';
// SMTP
const IS_SMTP = false;
const SMTP_HOST = '';
const SMTP_USERNAME = '';
const SMTP_PASSWORD = '';
const SMTP_SECURE = '';
const SMTP_PORT = '';
// メールID（メールID項目名、falseでメールID非表示）
const MAIL_ID = false;
// user本文内容表示（trueで送信内容表示）
const USER_MAIL_BODY = true;
// 最大ファイルサイズ（単位はMB）
const MAX_FILE_SIZE = 2;
// 許可するファイルの拡張子（大文字小文字の区別ナシ）
const FILE_TYPE = 'jpg|jpeg|gif|png|pdf|xls|xlsx|doc|docx|ppt|pptx';
// ファイルの一時的アップロードディレクトリ
const TMP_DIR = ROOT_DIR.'/tmp/';

// formData
$formData = array(
/*
	配列の書き方
	'name値' => array(
		'label' => '項目名',
		'prefix' => '接頭語',
		'suffix' => '接尾語',
		'separator' => '区切り文字', // 配列の場合有効
		'file' => 'boolean', // ファイルアップロードの場合true
		'group' => array( // 配列をグループ化したい場合に記述
			'要素名' => array(
				'prefix' => '接頭語',
				'suffix' => '接尾語',
				'separate' => '区切り文字'
			),
		),
		'join' => array( // その他などの入力項目を追加する場合に記述
			'name' => '要素名',
			'value' => 'その他', // この値に繋げる
			'prefix' => '：'
		),
		'validate' => array(
			'require' => boolean // 必須項目の場合true
			'email' => boolean // メールの場合true
			'equal' => '対象となるname値', // 同じ文字列を判定する
			'file' => boolean // ファイルの場合true
		),
	)
*/
	'name' => array(
		'label' => 'お名前',
		'validate' => array(
			'require' => true
		)
	),
	'email' => array(
		'label' => 'メールアドレス',
		'validate' => array(
			'require' => true,
			'email' => true
		)
	),
	'email_confirm' => array(
		'label' => '確認用メールアドレス',
		'hidden' => true,
		'validate' => array(
			'require' => true,
			'equal' => 'email'
		)
	),
	'tel' => array(
		'label' => '電話番号'
	),
	'age' => array(
		'label' => '年齢',
		'suffix' => '歳'
	),
	'address' => array(
		'label' => '住所',
		'separate' => ' ',
		'group' => array(
			'zip' => array(
				'prefix' => '〒',
				'separate' => '-'
			),
			'addr'
		),
		'validate' => array(
			'require' => true
		)
	),
	'pref' => array(
		'label' => '都道府県'
	),
	'date' => array(
		'label' => '希望日',
		'separate' => "\n",
		'group' => array(
			'1' => array(
				'prefix' => '第1希望：'
			),
			'2' => array(
				'prefix' => '第2希望：'
			),
			'3' => array(
				'prefix' => '第3希望：'
			)
		),
		'validate' => array(
			'require' => true
		)
	),
	'radio' => array(
		'label' => '単一選択',
		'validate' => array(
			'require' => true
		)
	),
	'radio2' => array(
		'label' => '単一選択（その他あり）',
		'join' => array(
			'name' => 'other',
			'value' => 'その他',
			'prefix' => '：'
		),
		'validate' => array(
			'require' => false
		)
	),
	'checkbox' => array(
		'label' => '複数選択',
		'separate' => '、',
		'validate' => array(
			'require' => true
		)
	),
	'checkbox2' => array(
		'label' => '複数選択（その他あり）',
		'separate' => '、',
		'join' => array(
			'name' => 'other',
			'value' => 'その他',
			'prefix' => '：'
		),
		'validate' => array(
			'require' => true
		)
	),
	'file1' => array(
		'label' => '添付ファイル1',
		'file' => true,
		'validate' => array(
			'file' => true
		)
	),
	'file2' => array(
		'label' => '添付ファイル2',
		'file' => true,
		'filename' => 'ファイル名',
		'validate' => array(
			'file' => true
		)
	),
	'msg' => array(
		'label' => '備考'
	),
	'privacy' => array(
		'label' => '個人情報保護の同意',
		'validate' => array(
			'require' => true,
		)
	)
);
