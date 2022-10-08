import { ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';
import { isJsx } from './isJsx';

/** Find all JSX nodes (opening and self-closing elements), excluding lower-cased (HTML) elements */
export const findJsxNodes = (sourceFile: SourceFile) => {
  if (!isJsx(sourceFile)) return [];
  const nodes = [
    sourceFile.getDescendantsOfKind(ts.SyntaxKind.JsxOpeningElement),
    sourceFile.getDescendantsOfKind(ts.SyntaxKind.JsxSelfClosingElement),
  ].flat();
  return nodes.filter(node => /^[A-Z]/.test(node.getTagNameNode().getText()));
};
