import { ts } from 'ts-morph';
import type { Node } from 'ts-morph';
import { compact } from '../util';

/** Returns (unique) source files for given nodes */
export const getSourceFilesForNodes = (nodes: Node<ts.Node>[]) => compact(nodes.map(node => node.getSourceFile()));
