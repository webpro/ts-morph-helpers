import type { Node, Symbol } from 'ts-morph';

export const getDeclarationsForSymbols = (symbols: Symbol[]): Node[] => {
  const declarations = symbols
    .map(symbol => symbol.getDeclarations())
    .flat()
    .filter(Boolean);
  return [...new Set(declarations)];
};
