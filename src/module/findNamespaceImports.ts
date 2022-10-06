import { ts } from 'ts-morph';
import type { SourceFile, ImportDeclaration } from 'ts-morph';

export const findNamespaceImports = (sourceFile: SourceFile) =>
  sourceFile
    .getReferencingNodesInOtherSourceFiles()
    .filter((node): node is ImportDeclaration => node.isKind(ts.SyntaxKind.ImportDeclaration))
    .filter((importDeclaration) => importDeclaration.getNamespaceImport());
