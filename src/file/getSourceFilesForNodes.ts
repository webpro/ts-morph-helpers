import { ts } from 'ts-morph';
import type { Node, SourceFile } from 'ts-morph';

/** Returns (unique) source files for given nodes */
export const getSourceFilesForNodes = (nodes: Node<ts.Node>[]) => {
  const sourceFiles = new Set<SourceFile>();
  nodes.forEach(node => sourceFiles.add(node.getSourceFile()));
  return [...sourceFiles];
};
