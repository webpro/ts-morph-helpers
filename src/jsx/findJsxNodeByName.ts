import type { SourceFile } from 'ts-morph';
import { findJsxNodes } from './findJsxNodes';
import { isJsx } from './isJsx';

/** Find JSX node by tag name */
export const findJsxNodeByName = (sourceFile: SourceFile, tagName: string) => {
  if (!isJsx(sourceFile)) return;
  const nodes = findJsxNodes(sourceFile);
  return nodes.find(node => node.getTagNameNode().getText() === tagName);
};
