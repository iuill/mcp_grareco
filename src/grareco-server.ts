import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  CompleteRequestSchema,
  ListToolsRequestSchema,
  LoggingLevel,
  SetLevelRequestSchema,
  Tool,
  ToolSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
// import { fetchAndConvertToMarkdown, limitMarkdownSize } from "./utils/web-to-markdown.js";
// import { generateGrareco } from "./utils/anthropic-client.js";
import { PromptType, getPromptTemplate, combineContentWithPrompt, getAvailablePromptTypes } from "./prompts/index.js";
import { processGrareco, InputType } from "./utils/grareco-processor.js";
import { writeFile, access, mkdir } from 'fs/promises';
import path from 'path';
import { constants } from 'fs';
import { fileURLToPath } from 'url';

const ToolInputSchema = ToolSchema.shape.inputSchema;
type ToolInput = z.infer<typeof ToolInputSchema>;

/* Input schemas for tools implemented in this server */
const EchoSchema = z.object({
  message: z.string().describe("Message to echo"),
});

const PrintEnvSchema = z.object({});

const WebToGrarecoSchema = z.object({
  url: z.string().describe("変換対象のWebサイトURL"),
  promptType: z.enum([PromptType.STANDARD, PromptType.ELEMENTARY, PromptType.TIMELINE])
    .default(PromptType.STANDARD)
    .describe("使用するプロンプトタイプ（標準: standard、小学生向け: elementary、タイムライン: timeline）"),
});

// WebToGrarecoSchemaの型定義
type WebToGrarecoInput = z.infer<typeof WebToGrarecoSchema>;

const TextToGrarecoSchema = z.object({
  text: z.string().describe("変換対象のテキスト"),
  promptType: z.enum([PromptType.STANDARD, PromptType.ELEMENTARY, PromptType.TIMELINE])
    .default(PromptType.STANDARD)
    .describe("使用するプロンプトタイプ（標準: standard、小学生向け: elementary、タイムライン: timeline）"),
});

// TextToGrarecoSchemaの型定義
type TextToGrarecoInput = z.infer<typeof TextToGrarecoSchema>;

enum ToolName {
  ECHO = "echo",
  PRINT_ENV = "printEnv",
  WEB_TO_GRARECO = "webToGrareco",
  TEXT_TO_GRARECO = "textToGrareco",
}

// ESモジュールで__dirnameを取得するための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 相対パスを絶対パスに変換する
 * @param relativePath 相対パス
 * @returns 絶対パス
 */
function resolveOutputPath(outputDir: string): string {
  if (path.isAbsolute(outputDir)) {
    return outputDir;
  }

  // プロジェクトのルートディレクトリ（package.jsonがある場所）を起点とする
  // __dirnameは現在のファイルのディレクトリを指す
  // src/grareco-server.tsの場合、__dirnameは'src'ディレクトリを指す
  // そこから一つ上のディレクトリに移動することでプロジェクトルートを取得
  const projectRoot = path.resolve(__dirname, '..');

  return path.resolve(projectRoot, outputDir);
}

/**
 * HTMLをファイルに保存する
 * @param html 保存するHTML
 * @returns 保存結果のメッセージとファイルパス
 */
async function saveHtmlToFile(html: string): Promise<{ message: string, filePath: string }> {
  try {
    // 環境変数から出力先ディレクトリを取得
    const outputDir = process.env.GRARECO_OUTPUT_DIR || './output';

    // 相対パスを絶対パスに変換
    const absoluteOutputDir = resolveOutputPath(outputDir);

    // 現在の日時からファイル名を生成
    const now = new Date();
    const fileName = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}.html`;

    const fullPath = path.join(absoluteOutputDir, fileName);

    // ファイルが既に存在するかチェック
    try {
      await access(fullPath, constants.F_OK);
      // ファイルが存在する場合はエラー
      throw new Error(`ファイルが既に存在します: ${fullPath}`);
    } catch (error) {
      // ファイルが存在しない場合（ENOENT）は続行、それ以外のエラーは再スロー
      if (error instanceof Error && !error.message.includes('既に存在します')) {
        // ディレクトリを作成
        await mkdir(absoluteOutputDir, { recursive: true });
        // ファイルに保存
        await writeFile(fullPath, html, 'utf8');
        return {
          message: `HTMLをファイルに保存しました`,
          filePath: fullPath
        };
      }
      throw error;
    }
  } catch (error) {
    throw new Error(`ファイル保存中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * HTMLの保存処理を行い、結果をレスポンスに含める
 * @param html 保存するHTML
 * @returns 保存結果と更新されたcontent配列
 */
async function handleHtmlSave(html: string): Promise<{ saveResult: string, content: { type: string, text: string }[] }> {
  // 基本のcontent配列

  const content = [
  ];
  // content.push({
  //   type: "text",
  //   text: "-----",
  // });

  // content.push(
  //   {
  //     type: "text",
  //     text: html,
  //   });

  // content.push({
  //   type: "text",
  //   text: "-----",
  // });

  // ファイル保存処理
  let saveResult = '';
  try {
    console.log(`HTMLをファイルに保存します`);
    const result = await saveHtmlToFile(html);
    saveResult = `${result.message}: ${result.filePath}`;
    console.log(saveResult);

    // 保存結果をcontent配列に追加
    content.push({
      type: "text",
      text: saveResult,
    });
  } catch (saveError) {
    saveResult = `ファイル保存エラー: ${saveError instanceof Error ? saveError.message : String(saveError)}`;
    console.error(saveResult);

    // エラー結果をcontent配列に追加
    content.push({
      type: "text",
      text: saveResult,
    });
  }

  return { saveResult, content };
}

export const createServer = () => {
  console.log("サーバー作成開始");
  const server = new Server(
    {
      name: "mcp_grareco",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
        logging: {},
      },
    },
  );

  // let subscriptions: Set<string> = new Set();
  // let subsUpdateInterval: NodeJS.Timeout | undefined;
  // // Set up update interval for subscribed resources

  // subsUpdateInterval = setInterval(() => {
  //   for (const uri of subscriptions) {
  //     server.notification({
  //       method: "notifications/resources/updated",
  //       params: { uri },
  //     });
  //   }
  // }, 5000);

  let logLevel: LoggingLevel = "debug";
  // let logsUpdateInterval: NodeJS.Timeout | undefined;
  const messages = [
    { level: "debug", data: "Debug-level message" },
    { level: "info", data: "Info-level message" },
    { level: "notice", data: "Notice-level message" },
    { level: "warning", data: "Warning-level message" },
    { level: "error", data: "Error-level message" },
    { level: "critical", data: "Critical-level message" },
    { level: "alert", data: "Alert level-message" },
    { level: "emergency", data: "Emergency-level message" }
  ]

  const isMessageIgnored = (level: LoggingLevel): boolean => {
    const currentLevel = messages.findIndex((msg) => logLevel === msg.level);
    const messageLevel = messages.findIndex((msg) => level === msg.level);
    return messageLevel < currentLevel;
  }

  // Set up update interval for random log messages
  // logsUpdateInterval = setInterval(() => {
  //   let message = {
  //     method: "notifications/message",
  //     params: messages[Math.floor(Math.random() * messages.length)],
  //   }
  //   if (!isMessageIgnored(message.params.level as LoggingLevel)) server.notification(message);
  // }, 15000);


  server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.log("ツール一覧リクエスト受信");
    const tools: Tool[] = [
      {
        name: ToolName.ECHO,
        description: "Echoes back the input",
        inputSchema: zodToJsonSchema(EchoSchema) as ToolInput,
      },
      {
        name: ToolName.PRINT_ENV,
        description: "Prints all environment variables, helpful for debugging MCP server configuration",
        inputSchema: zodToJsonSchema(PrintEnvSchema) as ToolInput,
      },
      {
        name: ToolName.WEB_TO_GRARECO,
        description: "URLからWebサイトを取得し、グラフィックレコーディング形式のHTMLに変換します",
        inputSchema: zodToJsonSchema(WebToGrarecoSchema) as ToolInput,
      },
      {
        name: ToolName.TEXT_TO_GRARECO,
        description: "テキストをグラフィックレコーディング形式のHTMLに変換します",
        inputSchema: zodToJsonSchema(TextToGrarecoSchema) as ToolInput,
      },
    ];

    return { tools };
  });
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    console.log(`ツール呼び出し: ${name}`, args);

    if (name === ToolName.ECHO) {
      const validatedArgs = EchoSchema.parse(args);
      return {
        content: [{ type: "text", text: `Echo: ${validatedArgs.message}` }],
      };
    }

    if (name === ToolName.PRINT_ENV) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(process.env, null, 2),
          },
        ],
      };
    }

    if (name === ToolName.WEB_TO_GRARECO) {
      const validatedArgs = WebToGrarecoSchema.parse(args) as WebToGrarecoInput;
      const { url, promptType } = validatedArgs;
      const progressToken = request.params._meta?.progressToken;
      console.log("webToGrareco処理開始", validatedArgs);

      try {
        // 進捗コールバック関数
        const progressCallback = progressToken ?
          async (progress: number, total: number) => {
            await server.notification({
              method: "notifications/progress",
              params: { progress, total, progressToken },
            });
          } : undefined;

        // 共通処理を使用
        console.log(`Webサイト処理開始: ${url}`);
        const html = await processGrareco({
          inputType: InputType.WEB,
          content: url as string,
          promptType: promptType as PromptType,
          progressCallback
        });
        console.log("グラレコ生成完了\n", html.substring(0, 100) + "...");

        // 共通のファイル保存処理を使用
        const { content } = await handleHtmlSave(html);

        return { content };
      } catch (error) {
        console.error("webToGrarecoでエラーが発生しました:", error);
        return {
          content: [
            {
              type: "text",
              text: `エラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }

    if (name === ToolName.TEXT_TO_GRARECO) {
      const validatedArgs = TextToGrarecoSchema.parse(args) as TextToGrarecoInput;
      const { text, promptType } = validatedArgs;
      const progressToken = request.params._meta?.progressToken;
      console.log("textToGrareco処理開始", validatedArgs);

      try {
        // 進捗コールバック関数
        const progressCallback = progressToken ?
          async (progress: number, total: number) => {
            await server.notification({
              method: "notifications/progress",
              params: { progress, total, progressToken },
            });
          } : undefined;

        // 共通処理を使用
        console.log(`テキスト処理開始: ${(text as string).substring(0, 50)}...`);
        const html = await processGrareco({
          inputType: InputType.TEXT,
          content: text as string,
          promptType: promptType as PromptType,
          progressCallback
        });
        console.log("グラレコ生成完了\n", html.substring(0, 100) + "...");

        // 共通のファイル保存処理を使用
        const { content } = await handleHtmlSave(html);

        return { content };
      } catch (error) {
        console.error("textToGrarecoでエラーが発生しました:", error);
        return {
          content: [
            {
              type: "text",
              text: `エラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }

    throw new Error(`Unknown tool: ${name}`);
  });

  server.setRequestHandler(CompleteRequestSchema, async (request) => {
    console.log("補完リクエスト受信", request.params);
    const { ref, argument } = request.params;

    if (ref.type === "ref/resource") {
      const resourceId = ref.uri.split("/").pop();
      if (!resourceId) return { completion: { values: [] } };

      // EXAMPLE_COMPLETIONSを削除したため、空の配列を返す
      return { completion: { values: [], hasMore: false, total: 0 } };
    }

    if (ref.type === "ref/prompt") {
      // EXAMPLE_COMPLETIONSを削除したため、空の配列を返す
      return { completion: { values: [], hasMore: false, total: 0 } };
    }

    throw new Error(`Unknown reference type`);
  });

  server.setRequestHandler(SetLevelRequestSchema, async (request) => {
    console.log("ログレベル設定リクエスト受信", request.params);
    const { level } = request.params;
    logLevel = level;

    // Demonstrate different log levels
    await server.notification({
      method: "notifications/message",
      params: {
        level: "debug",
        logger: "test-server",
        data: `Logging level set to: ${logLevel}`,
      },
    });

    return {};
  });

  const cleanup = async () => {
    console.log("サーバークリーンアップ実行");
    // if (subsUpdateInterval) clearInterval(subsUpdateInterval);
    // if (logsUpdateInterval) clearInterval(logsUpdateInterval);
    console.log("サーバークリーンアップ終了");
  };

  return { server, cleanup };
};
