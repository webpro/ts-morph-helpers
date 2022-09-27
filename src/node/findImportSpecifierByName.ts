import type { SourceFile } from 'ts-morph';

/** Find import specifier by name (does not include default imports) */
export const findImportSpecifierByName = (sourceFile: SourceFile, name: string) => {
  const namedImports = sourceFile
    .getImportDeclarations()
    .map(declaration => declaration.getNamedImports())
    .flat();
  return namedImports.find(namedImport => namedImport.getName() === name);
};
