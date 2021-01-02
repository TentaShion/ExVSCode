// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "patternviewer" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const commandName = 'patternviewer.helloWorld';
  let disposable = vscode.commands.registerCommand(commandName, (...args: any[]) => {
    const panel = vscode.window.createWebviewPanel(
      commandName,
      'PatternViewer',
      vscode.ViewColumn.One,
      {
        enableScripts: true
      },
    );

    const basePath = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'dist', 'wwwroot', '_framework'));
    const wasmPath = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'dist', 'wwwroot', '_framework', 'blazor.webassembly.js'));

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
            DotNet.invokeMethodAsync('PatternViewerWasm', 'SayHello', '1st').then(result => {
                $.textContent = result;
            });
        });
      </script>
    </body>
    </html>
    `;
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
