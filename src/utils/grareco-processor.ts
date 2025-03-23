import { PromptType, getPromptTemplate } from "../prompts/index.js";
import { fetchAndConvertToMarkdown, limitMarkdownSize } from "./web-to-markdown.js";
import { generateGrareco } from "./anthropic-client.js";
import dotenv from 'dotenv';

// 環境変数の読み込み
dotenv.config();

// 入力テキストの最大トークン数を環境変数から取得
const MAX_INPUT_TOKENS = parseInt(process.env.ANTHROPIC_MAX_INPUT_TOKENS || '6000', 10);

// 入力タイプの定義
export enum InputType {
  WEB = 'web',
  TEXT = 'text'
}

// 共通処理のインターフェース
export interface GrarecoProcessorOptions {
  inputType: InputType;
  content: string; // URLまたはテキスト
  promptType: PromptType;
  progressCallback?: (progress: number, total: number) => Promise<void>;
}

/**
 * グラレコ生成の共通処理
 * WebサイトURLまたはテキストからグラフィックレコーディングを生成する
 * @param options 処理オプション
 * @returns 生成されたHTML
 */
export async function processGrareco(options: GrarecoProcessorOptions): Promise<string> {
  console.log('グラレコ処理を開始します', { options });
  const { inputType, content, promptType, progressCallback } = options;
  
  console.log(`入力タイプ: ${inputType}, プロンプトタイプ: ${promptType}`);
  
  // ステップ1: コンテンツの取得
  console.log('ステップ1: コンテンツの取得を開始します');
  let processedContent = '';
  if (inputType === InputType.WEB) {
    // Webサイトの場合
    console.log(`Webサイトからコンテンツを取得します: ${content}`);
    if (progressCallback) await progressCallback(1, 3);
    processedContent = await fetchAndConvertToMarkdown(content);
    console.log('Webサイトからのコンテンツ取得が完了しました', { contentLength: processedContent.length });
  } else {
    // テキストの場合
    console.log('テキスト入力を処理します');
    if (progressCallback) await progressCallback(1, 2);
    processedContent = content;
    console.log('テキスト処理が完了しました', { contentLength: processedContent.length });
  }
  
  // ステップ2: サイズ制限
  console.log('ステップ2: コンテンツのサイズ制限を適用します', { originalSize: processedContent.length });
  const limitedContent = limitMarkdownSize(processedContent, MAX_INPUT_TOKENS);
  console.log('サイズ制限適用後', { limitedSize: limitedContent.length, maxInputTokens: MAX_INPUT_TOKENS });
  
  // ステップ3: プロンプト取得と組み合わせ
  console.log('ステップ3: プロンプトテンプレートを取得します', { promptType });
  const promptTemplate = getPromptTemplate(promptType);
  const combinedPrompt = `${promptTemplate.template}\n\n## 変換する文章/記事\n${limitedContent}`;
  console.log('プロンプトとコンテンツを組み合わせました', { combinedPromptLength: combinedPrompt.length });
  
  // ステップ4: グラレコ生成
  console.log('ステップ4: グラレコ生成を開始します');
  if (inputType === InputType.WEB && progressCallback) {
    await progressCallback(2, 3);
  }
  
  console.log('Anthropic APIを呼び出してグラレコを生成します');
  const html = await generateGrareco(combinedPrompt, '');
  console.log('グラレコ生成が完了しました', { htmlLength: html.length });
  
  // HTMLタグのチェックと抽出
  let processedHtml = html;
  const htmlStartRegex = /<html.*?>/i;
  const htmlEndRegex = /<\/html>/i;
  
  if (!(htmlStartRegex.test(html) && htmlEndRegex.test(html))) {
    console.log('完全なHTML形式ではありません。HTML部分のみを抽出します');
    
    // HTML部分を抽出する正規表現
    const htmlContentRegex = /<html.*?>[\s\S]*?<\/html>/i;
    const match = html.match(htmlContentRegex);
    
    if (match) {
      // HTML部分が見つかった場合は抽出
      processedHtml = match[0];
      console.log('HTML部分を抽出しました', { extractedLength: processedHtml.length });
    } else {
      // HTML部分が見つからない場合はHTMLタグで囲む
      console.log('HTML部分が見つかりませんでした。コンテンツをHTMLタグで囲みます');
      processedHtml = `<html><body>${html}</body></html>`;
    }
  }
  
  // 完了通知
  if (progressCallback) {
    await progressCallback(
      inputType === InputType.WEB ? 3 : 2,
      inputType === InputType.WEB ? 3 : 2
    );
  }
  
  console.log('グラレコ処理が完了しました');
  return processedHtml;
}
