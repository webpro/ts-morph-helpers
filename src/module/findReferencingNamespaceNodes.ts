import { ts } from 'ts-morph';
import type { SourceFile, ImportDeclaration, ExportDeclaration } from 'ts-morph';

export const findReferencingNamespaceNodes = (sourceFile: SourceFile) => {
  const nodes = sourceFile.getReferencingNodesInOtherSourceFiles();
  return [
    ...nodes
      .filter((node): node is ImportDeclaration => node.isKind(ts.SyntaxKind.ImportDeclaration))
      .filter(importDeclaration => importDeclaration.getNamespaceImport()),
    ...nodes
      .filter((node): node is ExportDeclaration => node.isKind(ts.SyntaxKind.ExportDeclaration))
      .filter(importDeclaration => importDeclaration.isNamespaceExport()),
  ];
};
