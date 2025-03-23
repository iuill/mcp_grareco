import axios from 'axios';
import TurndownService from 'turndown';

/**
 * URLからWebサイトを取得し、Markdownに変換する
 * @param url 取得するWebサイトのURL
 * @returns Markdownに変換されたコンテンツ
 */
export async function fetchAndConvertToMarkdown(url: string): Promise<string> {
  try {
    // URLからHTMLを取得
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      timeout: 10000, // 10秒でタイムアウト
    });

    const html = response.data;

    // HTMLをMarkdownに変換
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      emDelimiter: '*',
    });

    // テーブルのサポートを追加
    turndownService.addRule('tables', {
      filter: ['table'],
      replacement: function(content: string, node: Node): string {
        // テーブルの内容を保持
        return '\n\n' + content + '\n\n';
      }
    });

    // 見出し、リスト、テーブルなどの構造を保持するための設定
    turndownService.keep(['thead', 'tbody', 'tfoot', 'th', 'td', 'tr']);

    // HTMLをMarkdownに変換
    let markdown = turndownService.turndown(html);

    // 余分な空白行を削除
    markdown = markdown.replace(/\n{3,}/g, '\n\n');

    return markdown;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error(`URLの取得がタイムアウトしました: ${url}`);
      }
      if (error.response) {
        throw new Error(`URLの取得に失敗しました (${error.response.status}): ${url}`);
      }
    }
    throw new Error(`URLの取得に失敗しました: ${url} - ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Markdownの内容を最大トークン数に制限する
 * @param markdown Markdownテキスト
 * @param maxTokens 最大トークン数（デフォルト: 4000）
 * @returns 制限されたMarkdownテキスト
 */
export function limitMarkdownSize(markdown: string, maxTokens: number = 4000): string {
  // 簡易的なトークン数の見積もり（英語の場合、単語数の約1.3倍がトークン数の目安）
  // 日本語の場合はもっと多くなる可能性があるため、保守的に見積もる
  const estimatedTokens = markdown.length / 2;
  
  if (estimatedTokens <= maxTokens) {
    return markdown;
  }
  
  // トークン数を制限するために内容を切り詰める
  // 単純に文字数で切り詰めるが、実際のトークン化はもっと複雑
  const ratio = maxTokens / estimatedTokens;
  const limitedLength = Math.floor(markdown.length * ratio);
  
  // 文の途中で切れないように、最後の改行または句点で切る
  let truncatedMarkdown = markdown.substring(0, limitedLength);
  const lastNewline = truncatedMarkdown.lastIndexOf('\n');
  const lastPeriod = truncatedMarkdown.lastIndexOf('。');
  
  const cutPoint = Math.max(lastNewline, lastPeriod);
  if (cutPoint > 0) {
    truncatedMarkdown = truncatedMarkdown.substring(0, cutPoint + 1);
  }
  
  return truncatedMarkdown + '\n\n...(内容が長いため省略されました)';
}
