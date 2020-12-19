import { ExtensionContext, languages } from "vscode";

import { LspService } from "../services/lsp/lsp.service";
import { SuggestService } from "../services/suggest/suggest.service";

/**
 * Setup Action
 */
export class SetupUseCase {

  constructor(
    private lspService = new LspService(),
    private suggestService = new SuggestService()
  ) {
  }


  setupCompletion(context: ExtensionContext) {
    const target = languages.registerCompletionItemProvider(
      { language: "yaml", scheme: "file" },
      this.suggestService
    );
    context.subscriptions.push(target);
  }

  setupServer(context: ExtensionContext) {
    const client = this.lspService.createClient(context);
    const target = client.start();
    context.subscriptions.push(target);
  }
}
