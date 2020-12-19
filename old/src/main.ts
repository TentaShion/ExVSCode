import { ExtensionContext } from 'vscode';

import { SetupUseCase } from './usecases/setup.usecase';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  const setupUseCase = new SetupUseCase();
  setupUseCase.setupCompletion(context);
  setupUseCase.setupServer(context);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
