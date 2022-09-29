import type { Symbol } from 'ts-morph';
import { compact } from '../util';

const getDeclarationsForSymbol = (symbol: Symbol) => symbol.getDeclarations();

/** Get declarations for symbols */
export const getDeclarationsForSymbols = (symbols: Symbol[]) => {
  const declarations = symbols.map(getDeclarationsForSymbol).flat();
  return compact(declarations);
};
