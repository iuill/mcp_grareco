// プロンプトテンプレートのインデックスファイル
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 現在のファイルのディレクトリパスを取得（ES モジュール対応）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// プロジェクトのルートディレクトリを取得
const projectRoot = process.cwd();

// プロンプトタイプの定義
export enum PromptType {
  STANDARD = 'standard',
  ELEMENTARY = 'elementary',
  TIMELINE = 'timeline'
}

// プロンプトテンプレートのインターフェース
export interface PromptTemplate {
  type: PromptType;
  name: string;
  description: string;
  template: string;
}

// プロンプトテンプレートの読み込み
const loadPromptTemplate = (type: PromptType): string => {
  // src/prompts ディレクトリ内の .md ファイルを参照
  const filePath = path.join(projectRoot, 'src', 'prompts', `${type}.md`);
  return fs.readFileSync(filePath, 'utf-8');
};

// 利用可能なプロンプトテンプレート
export const promptTemplates: PromptTemplate[] = [
  {
    type: PromptType.STANDARD,
    name: '標準',
    description: '一般的なグラフィックレコーディング',
    template: loadPromptTemplate(PromptType.STANDARD)
  },
  {
    type: PromptType.ELEMENTARY,
    name: '小学生向け',
    description: '小学生にも分かりやすいグラフィックレコーディング',
    template: loadPromptTemplate(PromptType.ELEMENTARY)
  },
  {
    type: PromptType.TIMELINE,
    name: 'タイムライン',
    description: 'タイムライン形式のグラフィックレコーディング',
    template: loadPromptTemplate(PromptType.TIMELINE)
  }
];

// プロンプトタイプからテンプレートを取得
export const getPromptTemplate = (type: PromptType): PromptTemplate => {
  const template = promptTemplates.find(t => t.type === type);
  if (!template) {
    throw new Error(`プロンプトテンプレート "${type}" が見つかりません`);
  }
  return template;
};

// 利用可能なプロンプトタイプの一覧を取得
export const getAvailablePromptTypes = (): { type: PromptType; name: string; description: string }[] => {
  return promptTemplates.map(({ type, name, description }) => ({ type, name, description }));
};

// コンテンツとプロンプトを組み合わせる
export const combineContentWithPrompt = (content: string, promptType: PromptType): string => {
  const template = getPromptTemplate(promptType);
  // プロンプトの最後に変換する文章/記事を追加
  return `${template.template}\n\n## 変換する文章/記事\n${content}`;
};
