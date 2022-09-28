import type { SourceFile } from 'ts-morph';

/** Find export specifier by name (does not include exported variable declaration) */
export const findExportSpecifierByName = (sourceFile: SourceFile, name: string) => {
  const namedExports = sourceFile
    .getExportDeclarations()
    .map(declaration => declaration.getNamedExports())
    .flat();
  return namedExports.find(namedExport => namedExport.getName() === name);
};
