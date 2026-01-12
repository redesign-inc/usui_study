# 案件名

## git対象外ファイル
- node_modules
- yarn.lock (package-lock.json)

## 依存パッケージ、アプリ
- Docker
- node.js ver16最新
- yarn

## ディレクトリ構成
└ /_materials/ … icomoon, svg素材など実装に必要なデータを格納  
└ /docker/ … Dockerの設定、DBなど格納  
└ /docker-compose.yml  
└ /package.json  
└ /public_html/ … 公開ディレクトリ  
└ /src/ … 作業ディレクトリ  
　└ /imgs/ … 画像ファイル格納  
　└ /js/ … webpackを使用する場合のjsファイル格納  
　└ /sass/ … scssファイル格納  
└ /task/ … タスクランナーファイル格納  


## package.jsonの設定
```json
{
  "name": "project",          // 半角英数記号で必ず入力（gitのリポジトリ名を推奨）
  "config": {
    "server": {
      "php": true,            // Docker仮想サーバ使用の有無
      "mysql": false          // Docker仮想サーバのmysql使用の有無
    },
    "src": "src",             // 作業ディレクトリ名
    "public": "public_html",  // 公開ディレクトリ名
    "css": {
      "sass": true,           // sass利用の有無
      "src": "sass",          // sass作業ディレクトリ名
      "dest": "assets/css",   // cssの生成先ディレクトリ名
      "minify": true          // css minifyの有無
    },
    "js": {
      "webpack": true,        // webpack利用の有無
      "src": "js",            // js作業ディレクトリ名
      "dest": "assets/js",    // jsの生成先ディレクトリ名
      "entry": "main"         // webpackのエントリーポイント（複数ある場合はカンマ区切り）
    },
    "image": {
      "compress": true,       // 画像圧縮の有無
      "src": "imgs",          // 画像ディレクトリ名
      "dest": "assets/imgs",  // 画像の生成先ディレクトリ名
      "avif": true,           // avif生成の有無
      "webp": true,           // webp生成の有無
      "jpg": true,            // jpg生成の有無（avifまたはwebpがtrueの場合のみ有効）
      "png": true             // png生成の有無（avifまたはwebpがtrueの場合のみ有効）
    }
  },
  "browserslist": [           // サポートブラウザ
    "last 2 versions",
    "not dead",
    "not IE 11",
    "Android >= 11.0"
  ]
}
```

## コマンド
```bash
# 依存パッケージのインストール
yarn
# productionモードでの開発（server, css:watch, js:watch, image:watchが起動）
yarn start
# developmentモードでの開発（server, css:watch, js:watch, image:watchが起動）
# css, jsはsourcemapが生成される
yarn dev
# Docker仮想サーバ、ローカルサーバの起動
yarn server
# css,js,imageの生成先を空にして再生成
yarn build
# cssの生成先を空にしてコンパイル
yarn css:build
# jsの生成先を空にしてコンパイル
yarn js:build
# imageの生成先を空にして再生成
yarn image:build
# sass作業ディレクトリを監視してコンパイル
yarn css:watch
# js作業ディレクトリを監視してコンパイル
yarn js:watch
# image作業ディレクトリを監視して圧縮生成
yarn image:watch
```

## Browsersync
PORTはxxx0(例：3000)で起動。  
下記のWordPressファイルは監視対象外。
- wp-xxx.php
- /wp-admin/以下のファイル
- /wp-includes/以下のファイル
- /wp-content/以下の/themes/以外のファイル
- /uploads/以下のファイル

## sass, js
sassはDartSassを使用。

## 画像
画像圧縮には下記を使用。
- jpg : imagemin-mozjpeg
- png : imagemin-pngquant
- gif : imagemin-gifsicle
- svg : imagemin-svgo
- webp : imagemin-webp
- avif : iamgemin-avif

画像圧縮のqualityは下記がデフォルト設定。
- jpg : 85
- png : 0.8-1
- webp : 85
- avif : 50

jpg, png, webpはファイルごとにqlualityを変えることも可能で、設定は下記のように記述する。  
svgは圧縮の有無のみ設定可能
```bash
# quality 75のsample.jpgを生成
sample{jpg_75}.jpg
# quality 75のsample.jpgとquality 50のsample.webpとquality 60のsample.avifを生成
sample{jpg_75}{webp_50}{avif_60}.jpg
# 値はmin-maxの形式で記述し0〜1の値で指定。
# 最低限色数がmaxとなりminを切る場合は保存しない
sample{png_0.6-0.8}.png
# 圧縮しない
sample{compress_none}.png
```

## Dockerの基本設定
コンテナは下記が起動。
- {project名}_web : PHP + apacheイメージ
- {project名}_mysql : MySQL5.7イメージ
- {project名}_pma : phpMyAdminイメージ

### PHP + apache
PORTはxxx2(例：3002)で起動し、Browsersyncのproxyに設定される。  
デフォルトはPHP8.0。  
PHP7.4のファイルも用意してるので切り替えることも可能。

### データベース
MySQL5.7
- host : mysql
- user : root
- password : red

### phpMyAdmin
PORTはxxx3(例：3003)で起動。  
データベースを使用する場合はここから作成する。

### WordPress
wp-config.phpに下記を記述するとDBに登録されているWPのURLをいい感じにアクセスURLに変更してくれる。
```php
$site_url = 'http://'.$_SERVER['HTTP_HOST'];
define('WP_HOME',    $site_url); // WPトップページのURL
define('WP_SITEURL', $site_url); // WPインストールURL
```

### 注意事項
データベースを使用しない場合はgit管理ファイルの肥大化を防ぐために下記をコメントアウトすること。
- web : depends_onの項目（19〜20行目付近）
- mysql : 全て（22〜30行目付近）
- pma : 全て（32〜45行目付近）

## 公開しないファイル
公開しないファイルがある場合は<span style="color:red">ここに必ず漏れなく記載!!</span>