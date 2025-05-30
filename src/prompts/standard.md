# グラフィックレコーディング (グラレコ) HTML 作成プロンプト

## 目的
以下の内容を、超一流デザイナーが作成したような、日本語で完璧なグラフィックレコーディング風のHTMLインフォグラフィックに変換してください。情報設計とビジュアルデザインの両面で最高水準を目指します。
手書き風の図形やFont Awesomeアイコンを大きく活用して内容を視覚的かつ直感的に表現します。

**重要**: 必ず完全なHTML文書（<!DOCTYPE html>、<html>、<head>、<body>タグを含む）のみを生成してください。了承の旨のコメントや解説等は不要で、部分的なHTMLではなくブラウザで直接開ける完全なHTML文書を作成してください。

## デザイン仕様
### 1. カラースキーム
```
<palette>
<color name='MysticLibrary-1' rgb='2E578C' r='46' g='87' b='140' />
<color name='MysticLibrary-2' rgb='182D40' r='24' g='45' b='64' />
<color name='MysticLibrary-3' rgb='BF807A' r='191' g='128' b='122' />
<color name='MysticLibrary-4' rgb='592A2A' r='89' g='42' b='42' />
<color name='MysticLibrary-5' rgb='F2F2F2' r='242' g='242' b='242' />
</palette>
```

### 2. グラフィックレコーディング要素
- 左上から右へ、上から下へと情報を順次配置
- 手描き風の囲み線、矢印、バナー、吹き出し
- テキストと視覚要素（Font Awesomeアイコン、シンプルな図形）の組み合わせ
- Font Awesomeアイコンは各セクションの内容を表現するものを大きく（2x〜3x）表示
- キーワードごとに関連するFont Awesomeアイコンを隣接配置
- キーワードの強調（色付き下線、マーカー効果、Font Awesomeによる装飾）
- 関連する概念を線や矢印で接続し、接続部にもFont Awesomeアイコン（fa-arrow-right, fa-connection等）を挿入
- Font Awesomeアニメーション効果（fa-beat, fa-bounce, fa-fade, fa-flip, fa-shake, fa-spin）を適切に活用
- 重要なポイントには「fa-circle-exclamation」や「fa-lightbulb」などのアイコンを目立つ大きさで配置
- 数値やデータには「fa-chart-line」や「fa-percent」などの関連アイコンを添える
- 感情や状態を表すには表情アイコン（fa-face-smile, fa-face-frown等）を活用
- アイコンにホバー効果（色変化、サイズ変化）を付与
- 背景にはFont Awesomeの薄いパターンを配置（fa-shapes等を透過度を下げて配置）
- imgタグは使用しない（imgタグを全く使用しないか代替としてsvgタグを使用する）

### 3. アニメーション効果
- Font Awesomeアイコンに連動するアニメーション（fa-beat, fa-bounce, fa-fade等）
- 重要キーワード出現時のハイライト効果（グラデーション変化）
- 接続線や矢印の流れるようなアニメーション
- アイコンの回転・拡大縮小アニメーション（特に注目させたい箇所）
- 背景グラデーションの緩やかな変化
- スクロールに連動した要素の出現効果
- クリック/タップでアイコンが反応する効果

### 4. タイポグラフィ
- タイトル：32px、グラデーション効果、太字、Font Awesomeアイコンを左右に配置
- サブタイトル：16px、#475569、関連するFont Awesomeアイコンを添える
- セクション見出し：18px、#1e40af、左側にFont Awesomeアイコンを必ず配置し、アイコンにはアニメーション効果
- 本文：14px、#334155、行間1.4、重要キーワードには関連するFont Awesomeアイコンを小さく添える

### 5. レイアウト
- ヘッダー：左揃えタイトル（大きなFont Awesomeアイコンを添える）＋右揃え日付/出典
- 3カラム構成：左側33%、中央33%、右側33%
- カード型コンポーネント：白背景、角丸12px、微細シャドウ、右上にFont Awesomeアイコンを配置
- セクション間の適切な余白と階層構造（階層を示すFont Awesomeアイコンを活用）
- 適切にグラスモーフィズムを活用（背後にぼかしたFont Awesomeアイコンを配置）
- 横幅は100%
- 重要な要素は中央寄り、補足情報は周辺部に配置

### 6. コードブロック表示
- 背景色を #182D40（MysticLibrary-2カラー）に設定
- 左側に #2E578C（MysticLibrary-1カラー）のアクセントボーダーを追加
- シンタックスハイライトにパレットカラーを使用
- 言語に応じた色分け（JSON、YAML、ENV、BASH等）
- コードブロック右上に言語ラベルを表示

## グラフィックレコーディング表現技法
- テキストと視覚要素のバランスを重視（文字情報の50%以上をFont Awesomeアイコンで視覚的に補完）
- キーワードを囲み線や色で強調し、関連するFont Awesomeアイコンを必ず添える
- 概念ごとに最適なFont Awesomeアイコンを選定（抽象的な概念には複数の関連アイコンを組み合わせて表現）
- 数値データは簡潔なグラフや図表で表現し、データ種類に応じたFont Awesomeアイコン（fa-chart-pie, fa-chart-column等）を配置
- 接続線や矢印で情報間の関係性を明示し、関係性の種類に応じたアイコン（fa-link, fa-code-branch等）を添える
- 余白を効果的に活用して視認性を確保（余白にも薄いFont Awesomeパターンを配置可）
- コントラストと色の使い分けでメリハリを付け、カラースキームに沿ったアイコン色を活用

## Font Awesomeアイコン活用ガイドライン
- 概念カテゴリー別の推奨アイコン：
  - 時間・順序：fa-clock, fa-hourglass, fa-calendar, fa-timeline
  - 場所・位置：fa-location-dot, fa-map, fa-compass, fa-globe
  - 人物・組織：fa-user, fa-users, fa-building, fa-sitemap
  - 行動・活動：fa-person-running, fa-gears, fa-hammer, fa-rocket
  - 思考・アイデア：fa-brain, fa-lightbulb, fa-thought-bubble, fa-comments
  - 感情・状態：fa-face-smile, fa-face-sad-tear, fa-heart, fa-temperature-half
  - 成長・変化：fa-seedling, fa-arrow-trend-up, fa-chart-line, fa-diagram-project
  - 問題・課題：fa-triangle-exclamation, fa-circle-question, fa-bug, fa-ban
  - 解決・成功：fa-check, fa-trophy, fa-handshake, fa-key
- アイコンサイズの使い分け：
  - 主要概念：3x（fa-3x）
  - 重要キーワード：2x（fa-2x）
  - 補足情報：1x（標準サイズ）
  - 装飾的要素：lg（fa-lg）
- アニメーション効果の適切な使い分け：
  - 注目喚起：fa-beat, fa-shake
  - 継続的プロセス：fa-spin, fa-pulse
  - 状態変化：fa-flip, fa-fade
  - 新規情報：fa-bounce

## HTML基本構造例
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>グラフィックレコーディング</title>
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    /* ここにスタイルを記述 */
    :root {
      --color-primary: #2E578C;
      --color-secondary: #182D40;
      --color-accent: #BF807A;
      --color-dark: #592A2A;
      --color-light: #F2F2F2;
    }
    
    body {
      font-family: 'Hiragino Kaku Gothic Pro', 'Meiryo', sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: var(--color-light);
      margin: 0;
      padding: 0;
    }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .title {
      font-size: 32px;
      font-weight: bold;
      color: var(--color-primary);
      background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .content-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    
    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
    }
    
    .card-icon {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 2rem;
      color: var(--color-primary);
      opacity: 0.8;
      transition: all 0.3s ease;
    }
    
    .card:hover .card-icon {
      transform: scale(1.1);
      opacity: 1;
    }
    
    .section-title {
      font-size: 18px;
      color: #1e40af;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .keyword {
      font-weight: bold;
      color: var(--color-primary);
      border-bottom: 2px solid var(--color-accent);
      padding-bottom: 2px;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .highlight {
      background: linear-gradient(transparent 60%, rgba(191, 128, 122, 0.4) 40%);
      padding: 0 4px;
    }
    
    .code-block {
      background-color: var(--color-secondary);
      border-left: 4px solid var(--color-primary);
      border-radius: 6px;
      padding: 1rem;
      margin: 1rem 0;
      position: relative;
      overflow: hidden;
    }
    
    .code-label {
      position: absolute;
      top: 0;
      right: 0;
      background-color: var(--color-primary);
      color: white;
      padding: 0.25rem 0.5rem;
      font-size: 0.8rem;
      border-bottom-left-radius: 6px;
    }
    
    .code-block pre {
      margin: 0;
      color: white;
      font-family: 'Courier New', monospace;
      overflow-x: auto;
    }
    
    .connection-line {
      position: relative;
      height: 2px;
      background-color: var(--color-accent);
      margin: 1rem 0;
      animation: flowLine 2s infinite linear;
    }
    
    @keyframes flowLine {
      0% { background-position: 0 0; }
      100% { background-position: 20px 0; }
    }
    
    .icon-bg {
      position: absolute;
      font-size: 120px;
      color: rgba(46, 87, 140, 0.05);
      z-index: 0;
      pointer-events: none;
    }
    
    .thought-bubble {
      background-color: white;
      border: 2px solid var(--color-accent);
      border-radius: 20px;
      padding: 1rem;
      position: relative;
      margin: 1.5rem 0;
    }
    
    .thought-bubble::before {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 20px;
      width: 20px;
      height: 15px;
      background-color: white;
      border-right: 2px solid var(--color-accent);
      border-bottom: 2px solid var(--color-accent);
      transform: rotate(45deg);
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1 class="title">
        <i class="fa-solid fa-diagram-project fa-lg"></i>
        タイトル
        <i class="fa-solid fa-lightbulb fa-lg"></i>
      </h1>
      <div class="date">2025年3月23日</div>
    </header>
    
    <div class="content-grid">
      <!-- ここにコンテンツを配置 -->
    </div>
  </div>
</body>
</html>
```

## 全体的な指針
- 読み手が自然に視線を移動できる配置（Font Awesomeアイコンで視線誘導）
- 情報の階層と関連性を視覚的に明確化（階層ごとにアイコンのサイズや色を変える）
- 手書き風の要素とFont Awesomeアイコンを組み合わせて親しみやすさとプロフェッショナル感を両立
- 大きなFont Awesomeアイコンを活用した視覚的な記憶に残るデザイン（各セクションに象徴的なアイコンを配置）
- フッターに出典情報と関連するFont Awesomeアイコン（fa-book, fa-citation等）を明記
