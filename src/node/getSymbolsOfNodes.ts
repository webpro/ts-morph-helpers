import { ts } from 'ts-morph';
import type { Node } from 'ts-morph';
import { compact } from '../util';

/** Return symbols of nodes, identifiers and symbols */
export const getSymbolsOfNodes = (nodes: Node[]) =>
  compact(nodes.map(node => node?.getFirstDescendantByKind(ts.SyntaxKind.Identifier)?.getSymbol()));
