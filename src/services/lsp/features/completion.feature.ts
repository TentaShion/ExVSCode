import { CompletionItem, CompletionItemKind, IConnection, TextDocumentPositionParams, TextDocuments } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";


/**
 * Setup Completion Settings
 */
export function setupCompletion(connection: IConnection, documents: TextDocuments<TextDocument>) {
  connection.onCompletion(
    (params: TextDocumentPositionParams): CompletionItem[] => loadCandidate(documents, params)
  );

  connection.onCompletionResolve(
    (item: CompletionItem): CompletionItem => item
  );
}


/**
 * Load Completion Candidate
 */
function loadCandidate(documents: TextDocuments<TextDocument>, params: TextDocumentPositionParams): CompletionItem[] {
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    return [];
  }

  return [
    {
      label: "attributes",
      kind: CompletionItemKind.Keyword,
      detail: "[String: Any]",
      documentation: `The PBXProject attributes. This is for advanced use. This defaults to {"LastUpgradeCheck": "XcodeVersion"} with xcodeVersion being set by Options.xcodeVersion`
    },
    {
      label: "configFiles",
      kind: CompletionItemKind.Keyword,
      detail: "Config Files",
      documentation: ".xcconfig files per config"
    },
    {
      label: "configs",
      kind: CompletionItemKind.Keyword,
      detail: "Configs",
      documentation: "Project build configurations. Defaults to Debug and Release configs"
    },
    {
      label: "fileGroups",
      kind: CompletionItemKind.Keyword,
      detail: "[String]",
      documentation: "A list of paths to add to the root of the project. These aren't files that will be included in your targets, but that you'd like to include in the project hierachy anyway. For example a folder of xcconfig files that aren't already added by any target sources, or a Readme file."
    },
    {
      label: "include",
      kind: CompletionItemKind.Keyword,
      detail: "Include",
      documentation: "One or more paths to other specs"
    },
    {
      label: "name",
      kind: CompletionItemKind.Keyword,
      detail: "String",
      documentation: "Name of the generated project"
    },
    {
      label: "options",
      kind: CompletionItemKind.Keyword,
      detail: "Options",
      documentation: "Various options to override default behaviour"
    },
    {
      label: "packages",
      kind: CompletionItemKind.Keyword,
      detail: "[String: Swift Package]",
      documentation: "a map of Swift packages by name."
    },
    {
      label: "projectReferences",
      kind: CompletionItemKind.Keyword,
      detail: "[String: Project Reference]",
      documentation: "a map of project references by name"
    },
    {
      label: "schemes",
      kind: CompletionItemKind.Keyword,
      detail: "Scheme",
      documentation: "A list of schemes by name. This allows more control over what is found in Target Scheme"
    },
    {
      label: "settingGroups",
      kind: CompletionItemKind.Keyword,
      detail: "Setting Groups",
      documentation: "Setting groups mapped by name"
    },
    {
      label: "settings",
      kind: CompletionItemKind.Keyword,
      detail: "Settings",
      documentation: "Project specific settings. Default base and config type settings will be applied first before any settings defined here"
    },
    {
      label: "targets",
      kind: CompletionItemKind.Keyword,
      detail: "[String: Target]",
      documentation: "The list of targets in the project mapped by name"
    },
    {
      label: "targetTemplates",
      kind: CompletionItemKind.Keyword,
      detail: "[String: Target Template]",
      documentation: "a list of targets that can be used as templates for actual targets which reference them via a template property. They can be used to extract common target settings. Works great in combination with include."
    },
  ];
}
