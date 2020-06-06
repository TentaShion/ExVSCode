import { createConnection, DidChangeConfigurationNotification, InitializeParams, TextDocuments, TextDocumentSyncKind } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

import { setupCompletion } from "./features/completion.feature";


const connection = createConnection();
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);


connection.onInitialize((params: InitializeParams) => ({
  capabilities: {
    completionProvider: {
      resolveProvider: true
    },
    textDocumentSync: TextDocumentSyncKind.Incremental
  }
}));

connection.onInitialized(() => {
  connection.client.register(DidChangeConfigurationNotification.type, undefined);
});

setupCompletion(connection, documents);


documents.listen(connection);
connection.listen();
