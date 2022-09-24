import { ts } from 'ts-morph';
import type { Symbol, ImportDeclaration } from 'ts-morph';
import { getDeclarationsForSymbols } from './getDeclarationsForSymbols';

type Options = { onlyRelative: boolean };
type GetImportDeclarationsForSymbols = (symbols: Symbol[], options?: Options) => ImportDeclaration[];

export const getImportDeclarationsForSymbols: GetImportDeclarationsForSymbols = (
  symbols,
  options = { onlyRelative: true }
) => {
  const declarations = getDeclarationsForSymbols(symbols);
  const importDeclarations = Array.from(declarations)
    .filter(
      declaration => declaration.isKind(ts.SyntaxKind.ImportSpecifier) || declaration.isKind(ts.SyntaxKind.ImportClause)
    )
    .map(declaration => declaration.getFirstAncestorByKind(ts.SyntaxKind.ImportDeclaration))
    .filter((declaration): declaration is ImportDeclaration => Boolean(declaration));

  if (options.onlyRelative) {
    return importDeclarations.filter(declaration => declaration.isModuleSpecifierRelative());
  }

  return importDeclarations;
};
