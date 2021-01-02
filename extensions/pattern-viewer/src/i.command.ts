/** コマンドアクション */
export interface ICommand {

  /**
   * アクション内容
   *
   * @remarks
   * "args" is from {@link vscode.commands#registerCommand}
   */
  readonly action: (...args: any[]) => void

  /** アクション名 */
  readonly name: string
}
