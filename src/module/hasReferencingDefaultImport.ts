import { ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

export const hasReferencingDefaultImport = (sourceFile: SourceFile) => {
  const nodes = sourceFile.getReferencingNodesInOtherSourceFiles();
  return Boolean(
    nodes.find(
      node =>
        (node.isKind(ts.SyntaxKind.ImportDeclaration) && node.getDefaultImport()) ||
        node.isKind(ts.SyntaxKind.CallExpression)
    )
  );
};
