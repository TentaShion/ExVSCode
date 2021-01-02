import { ExtensionContext, Uri, ViewColumn, window } from "vscode";
import { ICommand } from "../i.command";

/**
 * Wasm から"Hello" を返す機能
 */
export class ShowHelloWasm implements ICommand {

  constructor(
    private readonly context: ExtensionContext,
  ) {
  }


  /** アクション内容 */
  action = (...args: any[]) => {
    const panel = window.createWebviewPanel(
      this.name,
      'PatternViewer',
      ViewColumn.One,
      {
        enableScripts: true
      },
    );

    const basePath = panel.webview.asWebviewUri(Uri.joinPath(this.context.extensionUri, 'dist', 'wwwroot', '_framework'));
    const wasmPath = panel.webview.asWebviewUri(Uri.joinPath(this.context.extensionUri, 'dist', 'wwwroot', '_framework', 'blazor.webassembly.js'));

    panel.webview.html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <title>PatternViewer</title>
      <base href="${basePath}" />
    </head>
    <body>
      <p id="target"></p>
      <script>
        const $ = document.getElementById('target');
        $.textContent = location.href;
      </script>
      <script src="${wasmPath}" autostart="false"></script>
      <script>
        Blazor.start({}).then(() => {
            DotNet.invokeMethodAsync('PatternViewerWasm', 'SayHello', 'arguments').then(result => {
                $.textContent = result;
            });
        });
      </script>
    </body>
    </html>
    `;
  };

  /** アクション名 */
  name = "patternviewer.showHelloWasm";

  /** ページ名 */
  readonly title = "Wasm からこんにちは！";
}
