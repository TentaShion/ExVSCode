import { ExtensionContext, languages } from "vscode";

import { SuggestService } from "../services/suggest/suggest.service";

/**
 * Setup Action
 */
export class SetupUseCase {

  constructor(
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
}
