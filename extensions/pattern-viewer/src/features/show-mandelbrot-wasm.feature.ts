import { Uri, ViewColumn, window } from "vscode";

import { ICommand } from "../i.command";

/**
 * Mandelbrot 集合を描画する機能
 */
export class ShowMandelbrotWasm implements ICommand {

  constructor(
    public readonly extensionUri: Uri,
  ) {
  }


  /** アクション内容 */
  action = (...args: any[]) => {
    const panel = window.createWebviewPanel(
      this.name,
      this.title,
      ViewColumn.One,
      {
        enableScripts: true
      },
    );

    const basePath = panel.webview.asWebviewUri(Uri.joinPath(this.extensionUri, 'dist', 'wwwroot', '_framework'));
    const wasmPath = panel.webview.asWebviewUri(Uri.joinPath(this.extensionUri, 'dist', 'wwwroot', '_framework', 'blazor.webassembly.js'));

    // 描画条件
    const divergenceBorder = 100;
    const giveUpBorder = 500;
    const partitionCount = 256;

    const pointImMax = 1.00;
    const pointImMin = -1.00;

    const pointReMax = 0.50;
    const pointReMin = -1.50;


    panel.webview.html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <title>${this.title}</title>
      <base href="${basePath}" />
    </head>
    <body>
      <canvas id="target" style="background: black;"></canvas>
      <script>
        const $ = document.getElementById('target');
        $.height = ${partitionCount};
        $.width = ${partitionCount};

        const context = $.getContext('2d');
        const imageData = context.createImageData($.width, $.height);
      </script>
      <script src="${wasmPath}" autostart="false"></script>
      <script>
        Blazor.start({}).then(() => {
            DotNet.invokeMethodAsync(
              'PatternViewerWasm',
              'CallMandelbrotSetMaker',
              ${divergenceBorder},
              ${giveUpBorder},
              ${partitionCount},
              ${pointImMax},
              ${pointImMin},
              ${pointReMax},
              ${pointReMin},
            ).then(result => {
              for (let y = 0; y < ${ partitionCount }; y++) {
                for (let x = 0; x < ${ partitionCount }; x++) {
                  let index = 4 * (y * ${ partitionCount } + x);
                  imageData.data[index + 0] = 255 - result[y][x] * 255;
                  imageData.data[index + 1] = 255 - result[y][x] * 255;
                  imageData.data[index + 2] = 255 - result[y][x] * 255;
                  imageData.data[index + 3] = 255;
                }
              }
              context.putImageData(imageData, 0, 0);
            });
        });
      </script>
    </body>
    </html>
    `;
  };

  /** アクション名 */
  name = "patternviewer.showMandelbrotWasm";

  /** ページ名 */
  private readonly title = "Mandelbrot 集合(Wasm 版)";
}
