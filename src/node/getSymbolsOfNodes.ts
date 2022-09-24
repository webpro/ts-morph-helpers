import { ts } from 'ts-morph';
import type { Node, Symbol } from 'ts-morph';

export const getSymbolsOfNodes = (nodes: Node[]): Symbol[] =>
  nodes
    .map(node => node.getFirstDescendantByKind(ts.SyntaxKind.Identifier))
    .map(identifier => identifier?.getSymbol())
    .filter(Boolean)
    .filter((symbol, index, self): symbol is Symbol => self.indexOf(symbol) === index);
