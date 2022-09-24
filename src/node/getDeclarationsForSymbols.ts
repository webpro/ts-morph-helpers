import type { Node, Symbol } from 'ts-morph';

const getDeclarationsForSymbol = (symbol: Symbol): Node[] => symbol.getDeclarations();

export const getDeclarationsForSymbols = (symbols: Symbol[]): Node[] => {
  const declarations = symbols.map(getDeclarationsForSymbol).flat().filter(Boolean);
  return [...new Set(declarations)];
};
