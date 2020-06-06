import { join } from "path";
import { ExtensionContext } from "vscode";
import { DocumentSelector, LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from "vscode-languageclient";

/**
 * Language Server Protocol Service
 */
export class LspService {

  private client?: LanguageClient;


  start(context: ExtensionContext) {
    this.client = this.createClient(context);
    this.client?.start();
  }

  stop(): Thenable<void> | undefined {
    return this.client?.stop();
  }


  private createClient(context: ExtensionContext): LanguageClient {
    const serverPath = context.asAbsolutePath(
      join("out", "services", "lsp", "server.js")
    );
    const serverOptions: ServerOptions = {
      run: {
        module: serverPath,
        transport: TransportKind.ipc
      },
      debug: {
        module: serverPath,
        options: {
          execArgv: ["--nolazy", "--inspect=6010"]
        },
        transport: TransportKind.ipc
      }
    };

    const documentSelector = [
      { language: "yaml" },
    ] as DocumentSelector;
    const clientOptions: LanguageClientOptions = {
      documentSelector
    };

    return new LanguageClient(
      "work.shion.xcodegen",
      "ExVSC for XcodeGen",
      serverOptions,
      clientOptions
    );
  }
}
