import { ts } from 'ts-morph';
import type { Symbol, ImportDeclaration } from 'ts-morph';
import { getDeclarationsForSymbols } from './getDeclarationsForSymbols';

export const getImportDeclarationsForSymbols = (symbols: Symbol[]): ImportDeclaration[] => {
  const declarations = getDeclarationsForSymbols(symbols);
  const importDeclarations = Array.from(declarations)
    .filter(
      declaration => declaration.isKind(ts.SyntaxKind.ImportSpecifier) || declaration.isKind(ts.SyntaxKind.ImportClause)
    )
    .map(declaration => declaration.getFirstAncestorByKind(ts.SyntaxKind.ImportDeclaration))
    .filter((declaration): declaration is ImportDeclaration => declaration?.isModuleSpecifierRelative() ?? false);
  return importDeclarations;
};
