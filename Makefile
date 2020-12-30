.PHONY: default
default: setup


# PatternViewer の発行
publish-pattern-viewer-wasm: PatternViewerWasm
	dotnet publish $< -c Release -o ./packages/pattern-viewer/assets -p:PublishTrimmed=true
	npx lerna bootstrap
	npx lerna run --scope pattern-viewer package-vsce


# 開発環境の整備
setup:
	yarn install --frozen-lockfile
	npx lerna bootstrap
