import type { SourceFile } from 'ts-morph';

/** Find import specifier by name (does not include default imports) */
export const findImportSpecifierByName = (sourceFile: SourceFile, name: string) => {
  const namedImports = sourceFile.getImportDeclarations().map(declaration => declaration.getNamedImports());
  return namedImports.flat().find(namedImport => namedImport.getName() === name);
};
