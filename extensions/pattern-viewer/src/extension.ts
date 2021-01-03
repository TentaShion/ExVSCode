// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ShowHelloWasm } from "./features/show-hello-wasm.feature";
import { ICommand } from './i.command';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "patternviewer" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const extensionUri = context.extensionUri;
  Array.of<ICommand>(
    new ShowHelloWasm(extensionUri),
  ).map(cmd =>
    vscode.commands.registerCommand(cmd.name, cmd.action)
  ).forEach(disposable =>
    context.subscriptions.push(disposable)
  );
}

// this method is called when your extension is deactivated
export function deactivate() { }
