import { CompletionItemProvider, DocumentFilter } from "vscode";

export interface ICompletion extends CompletionItemProvider {

  /** 適用対象 */
  readonly selector: DocumentFilter;

  /** 入力トリガー */
  readonly trigger: string[];
}
