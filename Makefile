.PHONY: default
default: setup


# PatternViewerWasm のデプロイ
pattern-viewer-wasm:
	dotnet publish PatternViewerWasm -c Release -o ./extensions/pattern-viewer/dist -p:PublishTrimmed=true
	sh scripts/remove-blazor.sh pattern-viewer
	@echo deployed

# PatternViewer の発行
pattern-viewer-publish:
	@make pattern-viewer-wasm
	@make setup
	npx lerna run --scope pattern-viewer package-vsce


# 開発環境の整備
setup:
	yarn install --frozen-lockfile
	npx lerna bootstrap
