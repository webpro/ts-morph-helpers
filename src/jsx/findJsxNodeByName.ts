import type { SourceFile, Node } from 'ts-morph';
import { findJsxNodes } from './findJsxNodes';

export const findJsxNodeByName = (sourceFile: SourceFile, jsxElementName: string) => {
  const nodes = findJsxNodes(sourceFile);
  return nodes.find(node => node.getTagNameNode().getText() === jsxElementName);
};
