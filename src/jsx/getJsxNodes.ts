import { ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

export const getJsxNodes = (sourceFile: SourceFile) =>
  [
    sourceFile.getDescendantsOfKind(ts.SyntaxKind.JsxOpeningElement),
    sourceFile.getDescendantsOfKind(ts.SyntaxKind.JsxSelfClosingElement)
  ]
    .flat()
    .filter(node => /^[A-Z]/.test(node.getTagNameNode().getText()));
