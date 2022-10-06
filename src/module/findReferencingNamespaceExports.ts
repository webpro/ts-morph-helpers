import { ts } from 'ts-morph';
import type { SourceFile, ExportDeclaration } from 'ts-morph';

export const findReferencingNamespaceExports = (sourceFile: SourceFile) =>
  sourceFile
    .getReferencingNodesInOtherSourceFiles()
    .filter((node): node is ExportDeclaration => node.isKind(ts.SyntaxKind.ExportDeclaration))
    .filter(exportDeclaration => exportDeclaration.isNamespaceExport());
