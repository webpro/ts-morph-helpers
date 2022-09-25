# Helpers for ts-morph

Helpers for [ts-morph](https://ts-morph.com).

```
src $ ls **/*.ts | grep -v spec | grep -v index.ts | sed "s/\.ts//"
expressions/findCallExpressionsWithArg
file/getImplementationSourceFile
file/isBarrel
jsx/findJsxNodeByName
jsx/findJsxNodes
node/findExportDeclarationByIdentifier
node/findExportDeclarationByName
node/findExportIdentifierByName
node/findExportSpecifierByName
node/findImportIdentifierByName
node/findImportSpecifierByName
node/getDeclarationsForSymbols
node/getImportDeclarationsForSymbols
node/getSymbolsOfNodes
react/getHookCallExpressions
```
