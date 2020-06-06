import { ExtensionContext } from 'vscode';

import { LspService } from './services/lsp/lsp.service';


let lsp: LspService;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  lsp = new LspService();
  lsp.start(context);
}

// this method is called when your extension is deactivated
export function deactivate() {
  lsp.stop();
}
