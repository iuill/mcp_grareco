# MCP Grareco

グラフィックレコーディングを生成するためのMCPサーバーです。
MCPプロトコルの機能を活用して、任意URLや任意文字列の内容をグラレコ化します。

## Components

### Tools

1. `echo`
   - 入力メッセージをエコーバックするシンプルなツール
   - 入力:
     - `message` (string): エコーバックするメッセージ
   - 戻り値: エコーメッセージを含むテキスト

2. `printEnv`
   - すべての環境変数を表示
   - MCPサーバー設定のデバッグに役立つ
   - 入力: なし
   - 戻り値: すべての環境変数のJSON文字列

3. `webToGrareco`
   - URLからWebサイトを取得し、グラフィックレコーディング形式のHTMLに変換
   - 入力:
     - `url` (string): 変換対象のWebサイトURL
     - `promptType` (enum: "standard" | "elementary" | "timeline", デフォルト: "standard"): 使用するプロンプトタイプ（標準、小学生向け、タイムライン）
   - 戻り値: 生成されたHTMLファイルの保存パス
   - 処理中は進捗通知を送信

4. `textToGrareco`
   - テキストをグラフィックレコーディング形式のHTMLに変換
   - 入力:
     - `text` (string): 変換対象のテキスト
     - `promptType` (enum: "standard" | "elementary" | "timeline", デフォルト: "standard"): 使用するプロンプトタイプ（標準、小学生向け、タイムライン）
   - 戻り値: 生成されたHTMLファイルの保存パス
   - 処理中は進捗通知を送信

### Logging

The server sends random-leveled log messages every 15 seconds, e.g.:

```json
{
  "method": "notifications/message",
  "params": {
	"level": "info",
	"data": "Info-level message"
  }
}
```

## 使用方法

### ローカルでの実行

```bash
# インストール
npm install

# ビルド
npm run build

# 実行(STDIOモード)
npm run start

# 実行(SSEモード)
npm run start:sse
```

### Claude Desktopでの使用

`cline_mcp_settings.json`に以下を追加してください：

例1:
```json
{
  "mcpServers": {
    "grareco": {
      "command": "npx",
      "args": [
        "-y",
        "mcp_grareco"
      ]
    }
  }
}
```

例2:
```json
{
  "mcpServers": {
    "grareco": {
      "url": "http://localhost:3000/sse",
      "headers": {},
      "timeout": 900
    }
  }
}
```
