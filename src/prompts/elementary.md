# 小学生向けグラフィックレコーディング HTML 作成プロンプト

## 目的
以下の内容を、小学生にも分かりやすい、カラフルで楽しいグラフィックレコーディング風のHTMLに変換してください。
シンプルな言葉と明るい色使い、かわいいイラストで内容を視覚的に表現します。様々なレイアウトオプションから、内容に最適な表現方法を選択できます。

**重要**: 必ず完全なHTML文書（<!DOCTYPE html>、<html>、<head>、<body>タグを含む）のみを生成してください。了承の旨のコメントや解説等は不要で、部分的なHTMLではなくブラウザで直接開ける完全なHTML文書を作成してください。

## デザイン仕様
### 1. カラースキーム（明るく楽しい色）
```
<palette>
<color name='キッズ-1' rgb='FF9AA2' r='255' g='154' b='162' />
<color name='キッズ-2' rgb='FFB7B2' r='255' g='183' b='178' />
<color name='キッズ-3' rgb='FFDAC1' r='255' g='218' b='193' />
<color name='キッズ-4' rgb='E2F0CB' r='226' g='240' b='203' />
<color name='キッズ-5' rgb='B5EAD7' r='181' g='234' b='215' />
<color name='キッズ-6' rgb='C7CEEA' r='199' g='206' b='234' />
</palette>
```

### 2. グラフィックレコーディング要素
- 大きな文字と明るい色で重要なポイントを強調
- かわいいイラストやアイコンをたくさん使う
- 吹き出しや雲形の枠でテキストを囲む
- 簡単な言葉で説明する
- 矢印や線で関連する内容をつなげる
- 絵文字を効果的に使用する
- 内容に応じて適切なレイアウト（グリッド、タイムライン、マインドマップなど）を選択
- imgタグは使用しない（imgタグを全く使用しないか代替としてsvgタグを使用する）

### 3. タイポグラフィ
- タイトル：36px、丸みを帯びたフォント、カラフルな色
- サブタイトル：20px、#6B7280
- 見出し：24px、絵文字付き
- 本文：16px、#374151、行間1.5

### 4. レイアウトオプション
以下のレイアウトから、内容に最適なものを選択してください：

#### 4.1 基本要素（すべてのレイアウトで共通）
- 大きな見出しと絵文字
- 丸い角のカード（角丸20px）
- 明るい背景色
- 十分な余白
- シンプルな構造

#### 4.2 グリッドレイアウト
- 2〜3カラムのグリッド構造
- 関連する内容をカードにまとめる
- 各カードに大きなアイコンや絵文字を配置
- カード間の関係を矢印や線で表現

#### 4.3 タイムラインレイアウト
- 縦または横のタイムライン
- 各ステップに数字と絵文字を付ける
- ステップごとに異なる明るい色を使用
- 「丸とフラップ装飾」を含めることも可能

#### 4.4 マインドマップレイアウト
- 中央に主要テーマを配置
- 放射状に関連トピックを配置
- 階層を色や大きさで区別
- 関連性を線や矢印で表現

### 5. コードブロック表示
- 背景色を #FFDAC1（キッズ-3カラー）に設定
- 左側に #FF9AA2（キッズ-1カラー）のアクセントボーダーを追加
- 大きめのフォントサイズ
- シンプルな色分け
- コードブロック右上に言語ラベルを表示

## グラフィックレコーディング表現技法
- シンプルな言葉で説明
- 絵や図をたくさん使う
- 重要なことは大きく、色を変えて強調
- 順番や関係を矢印で分かりやすく示す
- 楽しい雰囲気のデザイン
- アニメーションで動きを表現

## レイアウト表現技法

### タイムラインレイアウト（オプション）
- タイムラインを中央に縦に配置し、左右交互にカードを表示
- 各ステップに数字と絵文字を付ける
- ステップごとに異なる明るい色を使用
- かわいいアイコンでコンテンツを視覚的に補強
- 各ステップには日付装飾（フラップ）とサークルアイコンを付けることができる
- サークルは丸型で、内部に絵文字やアイコンを配置する

### グリッドレイアウト（オプション）
- 情報を整理された2〜3列のグリッドに配置
- 各カードは関連するトピックをまとめる
- カードの右上に大きなアイコンを配置
- カードの背景色は内容のカテゴリーによって変える
- ホバー効果でカードが少し浮き上がるアニメーション

### マインドマップレイアウト（オプション）
- 中央に大きなメインテーマを配置
- 放射状に枝分かれする関連トピック
- 階層が深くなるほど色を変える
- 関連性の強さを線の太さで表現
- アイコンや絵文字で各トピックの内容を視覚的に表現

### レイアウトCSSコード例

#### グリッドレイアウトCSS例
```css
/* グリッドコンテナ */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* グリッドカード */
.grid-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.grid-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* カードアイコン */
.card-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 3rem;
  color: rgba(255, 154, 162, 0.3);
  z-index: 0;
}

/* カードタイトル */
.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #FF9AA2;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
  font-family: 'Kosugi Maru', sans-serif;
}

/* カード内容 */
.card-content {
  position: relative;
  z-index: 1;
  font-family: 'M PLUS Rounded 1c', sans-serif;
}

/* カテゴリータグ */
.category-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #E2F0CB;
  color: #374151;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-weight: 600;
}
```

#### マインドマップレイアウトCSS例
```css
/* マインドマップコンテナ */
.mindmap-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 600px;
  position: relative;
}

/* 中央ノード */
.central-node {
  background-color: #FF9AA2;
  color: white;
  border-radius: 50%;
  width: 180px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Kosugi Maru', sans-serif;
}

.central-node-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.central-node-text {
  font-size: 1.2rem;
  font-weight: 700;
}

/* 子ノード */
.child-node {
  background-color: white;
  border-radius: 20px;
  padding: 1rem;
  width: 150px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  font-family: 'M PLUS Rounded 1c', sans-serif;
}

.child-node:hover {
  transform: scale(1.05);
}

.child-node-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #B5EAD7;
}

.child-node-text {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
}

/* 接続線 */
.connection {
  position: absolute;
  background-color: #C7CEEA;
  height: 3px;
  transform-origin: 0 0;
  z-index: 1;
}

/* ノード位置の例 */
.node-1 { top: 20%; left: 20%; }
.node-2 { top: 20%; right: 20%; }
.node-3 { bottom: 20%; left: 20%; }
.node-4 { bottom: 20%; right: 20%; }
.node-5 { top: 50%; left: 10%; }
.node-6 { top: 50%; right: 10%; }
```

#### タイムラインCSSコード例
```css
/* タイムライン要素 */
ul.timeline {
  --col-gap: 2rem;
  --row-gap: 2rem;
  --line-w: 0.25rem;
  display: grid;
  grid-template-columns: var(--line-w) 1fr;
  grid-auto-columns: max-content;
  column-gap: var(--col-gap);
  list-style: none;
  width: min(60rem, 100%);
  margin-inline: auto;
  margin-bottom: 2rem;
}

/* タイムラインの線 */
ul.timeline::before {
  content: "";
  grid-column: 1;
  grid-row: 1 / span 20;
  background: #FF9AA2;
  border-radius: calc(var(--line-w) / 2);
}

/* カード間の余白 */
ul.timeline li:not(:last-child) {
  margin-bottom: var(--row-gap);
}

/* タイムラインカード */
ul.timeline li {
  grid-column: 2;
  --inlineP: 1.5rem;
  margin-inline: var(--inlineP);
  grid-row: span 2;
  display: grid;
  grid-template-rows: min-content min-content min-content;
}

/* ステップ番号 */
ul.timeline li .date {
  --dateH: 3rem;
  height: var(--dateH);
  margin-inline: calc(var(--inlineP) * -1);
  text-align: center;
  background-color: var(--accent-color);
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  display: grid;
  place-content: center;
  position: relative;
  border-radius: calc(var(--dateH) / 2) 0 0 calc(var(--dateH) / 2);
  font-family: 'Kosugi Maru', sans-serif;
}

/* 日付のフラップ装飾 - 必須要素 */
ul.timeline li .date::before {
  content: "";
  width: var(--inlineP);
  aspect-ratio: 1;
  background: var(--accent-color);
  background-image: linear-gradient(rgba(0, 0, 0, 0.1) 100%, transparent);
  position: absolute;
  top: 100%;
  clip-path: polygon(0 0, 100% 0, 0 100%);
  right: 0;
}

/* サークル - 必須要素 */
ul.timeline li .date::after {
  content: "";
  position: absolute;
  width: 3rem;
  aspect-ratio: 1;
  background: white;
  border: 0.4rem solid var(--accent-color);
  border-radius: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  right: calc(100% + var(--col-gap) + var(--line-w) / 2);
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 2;
}

/* タイトルと説明 */
ul.timeline li .title,
ul.timeline li .descr {
  background: white;
  position: relative;
  padding-inline: 1.5rem;
  border-radius: 0 20px 0 0;
}

ul.timeline li .title {
  overflow: hidden;
  padding-block-start: 1.5rem;
  padding-block-end: 1rem;
  font-weight: 600;
  font-family: 'Kosugi Maru', sans-serif;
  font-size: 1.4rem;
  color: #FF9AA2;
}

ul.timeline li .descr {
  padding-block-end: 1.5rem;
  font-weight: 400;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 1.1rem;
  border-radius: 0 0 20px 20px;
}

/* 左右配置のためのメディアクエリ */
@media (min-width: 40rem) {
  ul.timeline {
    grid-template-columns: 1fr var(--line-w) 1fr;
  }
  
  ul.timeline::before {
    grid-column: 2;
  }
  
  ul.timeline li:nth-child(odd) {
    grid-column: 1;
  }
  
  ul.timeline li:nth-child(even) {
    grid-column: 3;
  }
  
  /* ステップ2のスタート位置 */
  ul.timeline li:nth-child(2) {
    grid-row: 2/4;
  }
  
  ul.timeline li:nth-child(odd) .date::before {
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    left: 0;
  }
  
  ul.timeline li:nth-child(odd) .date::after {
    transform: translate(-50%, -50%);
    left: calc(100% + var(--col-gap) + var(--line-w) / 2);
  }
  
  ul.timeline li:nth-child(odd) .date {
    border-radius: 0 calc(var(--dateH) / 2) calc(var(--dateH) / 2) 0;
  }
}

/* タイムライン上の大きなアイコン */
.timeline-icon-large {
  position: absolute;
  font-size: 80px;
  color: rgba(255, 154, 162, 0.2);
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
  animation: bounce 2s ease-in-out infinite;
}

/* アイコンアニメーションエフェクト */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

/* ステップアイコン */
.timeline-item:nth-child(1) .date::after {
  content: "🎮";
}

.timeline-item:nth-child(2) .date::after {
  content: "📝";
}

.timeline-item:nth-child(3) .date::after {
  content: "👫";
}

.timeline-item:nth-child(4) .date::after {
  content: "🚀";
}
```

### レイアウトHTML例

#### グリッドレイアウトHTML例
```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=M+PLUS+Rounded+1c:wght@400;700&display=swap" rel="stylesheet">
<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<h2 class="section-title">
  <span>🌟 わくわく科学の世界</span>
</h2>

<div class="grid-container">
  <div class="grid-card" style="--card-color: #FF9AA2;">
    <div class="category-tag">実験</div>
    <h3 class="card-title">🧪 水と油のふしぎ</h3>
    <div class="card-content">
      <p>水と油を混ぜると、どうして分かれるのかな？これは「密度」というものが関係しているよ！</p>
      <p>やってみよう：透明なコップに水と油を入れて観察してみよう！</p>
    </div>
    <i class="fa-solid fa-flask card-icon"></i>
  </div>
  
  <div class="grid-card" style="--card-color: #B5EAD7;">
    <div class="category-tag">生き物</div>
    <h3 class="card-title">🦋 ちょうちょのひみつ</h3>
    <div class="card-content">
      <p>ちょうちょは最初から羽があるわけじゃないよ。さなぎから生まれ変わるんだ！</p>
      <p>知ってた？ちょうちょの羽には小さなうろこがあるんだよ！</p>
    </div>
    <i class="fa-solid fa-leaf card-icon"></i>
  </div>
  
  <div class="grid-card" style="--card-color: #C7CEEA;">
    <div class="category-tag">宇宙</div>
    <h3 class="card-title">🚀 月までの旅</h3>
    <div class="card-content">
      <p>地球から月までは、なんと38万キロメートル！車で行くと半年もかかるよ！</p>
      <p>月には重力が地球の6分の1しかないから、ジャンプすると地球の6倍高く跳べるんだ！</p>
    </div>
    <i class="fa-solid fa-moon card-icon"></i>
  </div>
</div>
```

#### マインドマップレイアウトHTML例
```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=M+PLUS+Rounded+1c:wght@400;700&display=swap" rel="stylesheet">
<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<h2 class="section-title">
  <span>🌳 自然のふしぎ</span>
</h2>

<div class="mindmap-container">
  <div class="central-node">
    <div class="central-node-icon">🌍</div>
    <div class="central-node-text">地球のふしぎ</div>
  </div>
  
  <div class="child-node node-1">
    <div class="child-node-icon">🌊</div>
    <div class="child-node-text">海のいきもの</div>
  </div>
  
  <div class="child-node node-2">
    <div class="child-node-icon">🌲</div>
    <div class="child-node-text">森の植物</div>
  </div>
  
  <div class="child-node node-3">
    <div class="child-node-icon">🦁</div>
    <div class="child-node-text">陸の動物</div>
  </div>
  
  <div class="child-node node-4">
    <div class="child-node-icon">🦅</div>
    <div class="child-node-text">空の鳥</div>
  </div>
  
  <div class="connection" style="width: 150px; transform: rotate(45deg);"></div>
  <div class="connection" style="width: 150px; transform: rotate(135deg);"></div>
  <div class="connection" style="width: 150px; transform: rotate(225deg);"></div>
  <div class="connection" style="width: 150px; transform: rotate(315deg);"></div>
</div>
```

#### タイムラインHTML例
```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=M+PLUS+Rounded+1c:wght@400;700&display=swap" rel="stylesheet">
<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<h2 class="section-title">
  <span>🌈 やることリスト</span>
</h2>

<ul class="timeline">
  <li style="--accent-color:#FF9AA2" class="timeline-item">
    <div class="date">STEP 1</div>
    <div class="title">📱 アプリをダウンロードしよう</div>
    <div class="descr">
      <p>お父さんやお母さんと一緒に、アプリストアからゲームをダウンロードしてね！</p>
      <div class="thought-bubble">
        <i class="fa-solid fa-lightbulb" style="color: #FFB7B2;"></i> 無料のアプリを選ぼう！
      </div>
      <i class="fa-solid fa-mobile-screen timeline-icon-large"></i>
    </div>
  </li>
  
  <li style="--accent-color:#B5EAD7" class="timeline-item">
    <div class="date">STEP 2</div>
    <div class="title">✏️ 名前を入力しよう</div>
    <div class="descr">
      <p>ゲームを始めるときに、自分の名前を入れるよ。ニックネームでもOK！</p>
      <i class="fa-solid fa-pencil timeline-icon-large"></i>
    </div>
  </li>
  
  <!-- 以下同様に、必要なステップの数だけ続ける -->
</ul>
```

## 全体的な指針
- 小学生が理解できる簡単な言葉を使う
- 明るく楽しい色を使う
- 大きな文字と絵で重要なポイントを示す
- 順番をはっきり示す
- 楽しい雰囲気のデザインにする
- 内容に最適なレイアウト（グリッド、タイムライン、マインドマップなど）を選択する
- タイムラインレイアウトを使用する場合は、「丸とフラップ装飾」を適用するとより効果的
