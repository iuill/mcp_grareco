import { Anthropic } from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

// 環境変数の読み込み
dotenv.config();

// 環境変数からAPIキーとモデル名を取得
const apiKey = process.env.ANTHROPIC_API_KEY || '';
const defaultModel = process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229';
const defaultMaxOutputTokens = parseInt(process.env.ANTHROPIC_MAX_OUTPUT_TOKENS || '8192', 10);
const defaultMaxContextWindow = parseInt(process.env.ANTHROPIC_MAX_CONTEXT_WINDOW || '200000', 10);

// APIキーが設定されていない場合はエラーを投げる
if (!apiKey) {
  throw new Error('ANTHROPIC_API_KEYが設定されていません。.envファイルを確認してください。');
}

// Anthropicクライアントの初期化
const anthropic = new Anthropic({
  apiKey,
});

/**
 * AnthropicのSonnetモデルを使用してテキスト生成を行う
 * @param prompt プロンプト
 * @param content 変換対象のコンテンツ
 * @param maxTokens 最大トークン数
 * @returns 生成されたHTML
 */
export async function generateGrareco(
  prompt: string,
  content: string = '',
  maxOutputTokens: number = defaultMaxOutputTokens
): Promise<string> {
  try {
    // contentが空の場合は、promptをそのまま使用（すでに組み合わされている場合）
    const combinedPrompt = content ? `${prompt}\n\n## 変換する文章/記事\n${content}` : prompt;

    // Anthropic APIを呼び出す
    const response = await anthropic.messages.create({
      model: defaultModel,
      max_tokens: maxOutputTokens,
      messages: [
        {
          role: 'user',
          content: combinedPrompt,
        },
      ],
      temperature: 0.7,
    });

    // レスポンスからテキスト部分を抽出
    const generatedText = response.content
      .filter(item => item.type === 'text')
      .map(item => item.text)
      .join('\n');

    return generatedText;
  } catch (error) {
    console.error('Anthropic API呼び出し中にエラーが発生しました:', error);
    throw new Error(`Anthropic API呼び出し中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 利用可能なモデル名を取得する
 * @returns 利用可能なモデル名
 */
export function getAvailableModels(): string[] {
  // 現在はSonnetのみをサポート
  return [defaultModel];
}

/**
 * 現在設定されているモデル名を取得する
 * @returns 現在設定されているモデル名
 */
export function getCurrentModel(): string {
  return defaultModel;
}

/**
 * 現在設定されている最大出力トークン数を取得する
 * @returns 現在設定されている最大出力トークン数
 */
export function getMaxOutputTokens(): number {
  return defaultMaxOutputTokens;
}

/**
 * 現在設定されている最大コンテキストウィンドウサイズを取得する
 * @returns 現在設定されている最大コンテキストウィンドウサイズ
 */
export function getMaxContextWindow(): number {
  return defaultMaxContextWindow;
}
