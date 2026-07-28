<?php 
require('../includes.php');
$pageinfo = array(
    'lang' => '',
    'title' => '',
    'description' => '',
);
set_query_var('pageinfo', $pageinfo);
get_header();
?>

    <div class="recipe-layout">
      <ol class="progress">
        <li class="progress__item"><a class="progress__link" href="#step1">
          <span class="progress__badge">STEP 1</span>
          <span class="progress__text">準備<span class="progress__time">2分</span> </span>
        </a></li>
        <li class="progress__item"><a class="progress__link" href="#step2">
          <span class="progress__badge">STEP 2</span>
          <span class="progress__text">加熱開始<span class="progress__time">5分</span> </span>
        </a></li>
        <li class="progress__item"><a class="progress__link" href="#step3">
          <span class="progress__badge">STEP 3</span>
          <span class="progress__text">ゆでる<span class="progress__time">6〜12分</span> </span>
        </a></li>
        <li class="progress__item"><a class="progress__link" href="#step4">
          <span class="progress__badge">STEP 4</span>
          <span class="progress__text">冷やす<span class="progress__time">3分</span> </span>
        </a></li>
        <li class="progress__item"><a class="progress__link" href="#step5">
          <span class="progress__badge">STEP 5</span>
          <span class="progress__text">からをむく<span class="progress__time">3分</span> </span>
        </a></li>
      </ol>

      <main class="recipe-main">
        <h1 class="recipe-title">ゆで卵</h1>
        <p class="recipe-title__lead">鍋で作る基本のゆで卵の作り方。</p>

        <section class="recipe-intro">
          <h2 class="recipe-intro__title">材料（2〜4個分）</h2>
          <ul class="recipe-intro__list">
            <li class="recipe-intro__item">卵 2〜4個</li>
            <li class="recipe-intro__item">水（卵がかぶる量）</li>
            <li class="recipe-intro__item">塩 小さじ1（お好み）</li>
            <li class="recipe-intro__item">氷水（冷やす用）</li>
          </ul>
        </section>

        <section id="step1" class="recipe-step" data-step-title="準備">
          <h2 class="recipe-step__title">
            <span class="recipe-step__label">STEP 1</span>
            準備
            <span class="recipe-step__time">所要時間: 2分</span>
          </h2>
          <div class="recipe-step__content">
            <ol class="recipe-step__list">
              <li class="recipe-step__item">卵は冷蔵庫から出し、ひび割れがないか確認します。</li>
              <li class="recipe-step__item">鍋に卵を入れ、卵がかぶる量の水を注ぎます。</li>
            </ol>
          </div>
          <div class="recipe-step__image" aria-hidden="true"></div>
        </section>

        <section id="step2" class="recipe-step" data-step-title="加熱開始">
          <h2 class="recipe-step__title">
            <span class="recipe-step__label">STEP 2</span>
            加熱開始
            <span class="recipe-step__time">所要時間: 5分</span>
          </h2>
          <div class="recipe-step__content">
            <ol class="recipe-step__list">
              <li class="recipe-step__item">中火にかけ、静かに沸騰するまで待ちます。</li>
              <li class="recipe-step__item">
                沸騰したら火を少し弱め、軽く沸き続ける状態にします。
              </li>
            </ol>
          </div>
          <div class="recipe-step__image" aria-hidden="true"></div>
        </section>

        <section id="step3" class="recipe-step" data-step-title="ゆでる">
          <h2 class="recipe-step__title">
            <span class="recipe-step__label">STEP 3</span>
            ゆでる
            <span class="recipe-step__time">所要時間: 6〜12分</span>
          </h2>
          <div class="recipe-step__content">
            <ol class="recipe-step__list">
              <li class="recipe-step__item">
                タイマーを開始します（半熟: 6〜7分 / やや固め: 8〜9分 / 固ゆで: 10〜12分）。
              </li>
              <li class="recipe-step__item">
                ゆでている間は強く沸騰させず、卵がぶつかり過ぎないようにします。
              </li>
            </ol>
          </div>
          <div class="recipe-step__image" aria-hidden="true"></div>
        </section>

        <section id="step4" class="recipe-step" data-step-title="冷やす">
          <h2 class="recipe-step__title">
            <span class="recipe-step__label">STEP 4</span>
            冷やす
            <span class="recipe-step__time">所要時間: 3分</span>
          </h2>
          <div class="recipe-step__content">
            <ol class="recipe-step__list">
              <li class="recipe-step__item">火を止め、卵をすぐに氷水へ移します。</li>
              <li class="recipe-step__item">
                全体が冷えるまでしっかり冷やします（余熱で固まるのを防ぎます）。
              </li>
            </ol>
          </div>
          <div class="recipe-step__image" aria-hidden="true"></div>
        </section>

        <section id="step5" class="recipe-step" data-step-title="からをむく">
          <h2 class="recipe-step__title">
            <span class="recipe-step__label">STEP 5</span>
            からをむく
            <span class="recipe-step__time">所要時間: 3分</span>
          </h2>
          <div class="recipe-step__content">
            <ol class="recipe-step__list">
              <li class="recipe-step__item">卵の底（丸い方）に軽くヒビを入れ、からをむきます。</li>
              <li class="recipe-step__item">水の中でむくとからが散りにくく、きれいにむけます。</li>
            </ol>
          </div>
          <div class="recipe-step__image" aria-hidden="true"></div>
        </section>
      </main>

<?php get_footer(); ?>