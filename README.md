# ExVSCode
自作VSCode 拡張機能群の開発リポジトリ。
各拡張機能は```extensions/``` 配下に配置されていて、共通設定は[Lerna] で管理されている。


## Quick Start
```make``` コマンドが使えるなら、```make setup``` を実行してください。


## Features
パス | 概要
--- | ---
[pattern-viewer](./extensions/pattern-viewer) | マンデルブロなどの模様を表示する拡張機能


## Memo
### 開発環境
下記拡張機能を適用したVisual Studio Code で開発しています。

* [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=editorconfig.editorconfig)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)


## References
* [Lerna](https://lerna.js.org/)


[Lerna]: https://lerna.js.org/
