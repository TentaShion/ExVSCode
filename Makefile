# PatternViewer の発行
publish-pattern-viewer-wasm: PatternViewerWasm
	dotnet publish $< -c Release -o ./packages/pattern-viewer/assets -p:PublishTrimmed=true
	npx lerna bootstrap
	npx lerna run --scope pattern-viewer package-vsce
