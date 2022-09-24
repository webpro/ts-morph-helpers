import { ts } from 'ts-morph';
import { getDescendantsOfKinds } from '../node/getDescendantsOfKinds';
import type { Node, SourceFile } from 'ts-morph';

export const getJsxNodes = (sourceFile: SourceFile): Node[] => {
  const jsxElements = getDescendantsOfKinds(sourceFile, [
    ts.SyntaxKind.JsxOpeningElement,
    ts.SyntaxKind.JsxSelfClosingElement
  ]);
  return jsxElements.filter(component => /<[A-Z]/.test(component.getText()));
};
