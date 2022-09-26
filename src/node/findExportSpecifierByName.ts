import type { SourceFile } from 'ts-morph';

export const findExportSpecifierByName = (sourceFile: SourceFile, name: string) => {
  const namedExports = sourceFile
    .getExportDeclarations()
    .map(declaration => declaration.getNamedExports())
    .flat();
  return namedExports.find(namedExport => namedExport.getName() === name);
};
