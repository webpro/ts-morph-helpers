# Helpers for ts-morph

Helpers for [ts-morph](https://ts-morph.com).

## List

```
experimental/findJsxIdentifiersInJsxExpressions
experimental/findJsxSymbolsInJsxExpressions
experimental/getRealSourceFilesForImportDeclarations
experimental/getReferencedSourceFiles
experimental/isBarrel
expressions/findCallExpressionsByName
expressions/findCallExpressionsWithArg
file/getRealSourceFileForImportDeclaration
file/getSourceFilesForNodes
jsx/findJsxNodeByName
jsx/findJsxNodes
jsx/isJsx
module/findExportDeclarationByIdentifier
module/findExportDeclarationByName
module/findExportIdentifierByName
module/findExportSpecifierByName
module/findImportIdentifierByName
module/findImportSpecifierByName
module/getImportDeclarationsForSymbols
node/getDeclarationsForSymbols
node/getSymbolsOfNodes
react/findContextProviderIdentifierByContextName
react/findHookCallExpressions
react/findHookIdentifierByContextName
```

## Naming Is Hard

### Terminology

When looking at this example code...

```ts
import { a } from './a';
import { b } from 'b';
const c = a + b;
const d = b(c);
export { c };
```

...we can apply the following (incomplete) list of terms:

| Name               | Description                                             | Example                                      |
| ------------------ | ------------------------------------------------------- | -------------------------------------------- |
| Symbol             | Named declaration, connects declaration nodes.          | `a`, `b`, `c`, `d`                           |
| Identifier         | Node, references a symbol                               | `a` (2x), `b` (3x), `c` (2x), `d` (1x)       |
| Specifier          | More specific classification of identifier              | `ImportSpecifier` `a`, `ExportSpecifier` `c` |
| Call expression    | Function call with arguments                            | `b(c)`                                       |
| Import declaration | An import declaration with named and/or default imports | `import { b } from 'b'`                      |
| Export declaration | An export declaration with named (not default) exports  | `export { b } from 'b'`                      |

Here is the
[example code in the TypeScript AST Viewer](https://ts-ast-viewer.com/#code/JYWwDg9gTgLgBAbzgQzgXzgMyhEcDkAdAPTL4DcAUKJLInAEbpY574MWUDGEAdgM7wucALwo4AakZUeA+ABNRjABRcAlFQCmAD1rwkwtFSA)
to see the nodes as described.

### Additional terminology

- SourceFile: The AST of a given source file
- Program: Collection of source files, and its main entry

### Conventions

The following conventions are used to name the helper functions:

- To `get` something means the thing is a reference expected to be there (upwards and/or linked).
- To `find` something means to query for things from a certain starting point (downwards).
- To get things `For` something expresses an `AncestorForDescendant` hierarchy.
- To get things `Of` something means the opposite: `descendantOfAncestor`.

