import { createConnection, Diagnostic, DiagnosticSeverity, DidChangeConfigurationNotification, InitializeParams, TextDocuments, TextDocumentSyncKind, CompletionItemKind, TextDocumentPositionParams, CompletionItem } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";


const connection = createConnection();
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);


connection.onInitialize((params: InitializeParams) => ({
  capabilities: {
    textDocumentSync: TextDocumentSyncKind.Full
  }
}));


documents.onDidChangeContent(change => {
  validateTextDocument(change.document);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
  // The validator creates diagnostics for all uppercase words length 2 and more
  let text = textDocument.getText();
  let pattern = /\b[A-Z]{2,}\b/g;
  let m: RegExpExecArray | null;

  let problems = 0;
  let diagnostics: Diagnostic[] = [];
  while ((m = pattern.exec(text)) && problems < 10) {
    problems++;
    let diagnostic: Diagnostic = {
      severity: DiagnosticSeverity.Warning,
      range: {
        start: textDocument.positionAt(m.index),
        end: textDocument.positionAt(m.index + m[0].length)
      },
      message: `${m[0]} is all uppercase.`,
      source: 'ex'
    };
    if (true) {
      diagnostic.relatedInformation = [
        {
          location: {
            uri: textDocument.uri,
            range: Object.assign({}, diagnostic.range)
          },
          message: 'Spelling matters'
        },
        {
          location: {
            uri: textDocument.uri,
            range: Object.assign({}, diagnostic.range)
          },
          message: 'Particularly for names'
        }
      ];
    }
    diagnostics.push(diagnostic);
  }

  // Send the computed diagnostics to VSCode.
  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}


documents.listen(connection);
connection.listen();
