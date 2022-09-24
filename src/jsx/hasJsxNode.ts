import { ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';
import { getJsxNodes } from './getJsxNodes';

export const hasJsxNode = (sourceFile: SourceFile, jsxElementName: string): Boolean => {
  const nodes = getJsxNodes(sourceFile);
  return Boolean(nodes.find(node => node.getTagNameNode().getText() === jsxElementName));
};
