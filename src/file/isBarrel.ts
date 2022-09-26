import { ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

export const isBarrel = (sourceFile: SourceFile) => {
  const namedExports = sourceFile.getDescendantsOfKind(ts.SyntaxKind.ExportDeclaration);
  const reExports = namedExports.filter(exportDeclaration => {
    return exportDeclaration.getChildrenOfKind(ts.SyntaxKind.StringLiteral).length === 1;
  });
  const exportKeywords = sourceFile.getDescendantsOfKind(ts.SyntaxKind.ExportKeyword);
  return reExports.length === exportKeywords.length;
};
