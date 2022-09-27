import type { SourceFile } from 'ts-morph';

/** Find export declaration by name (does not include exported variable declaration) */
export const findExportDeclarationByName = (sourceFile: SourceFile, name: string) =>
  sourceFile.getExportDeclaration(exportDeclaration => {
    const namedExports = exportDeclaration.getNamedExports();
    return Boolean(namedExports.find(namedExport => namedExport.getName() === name));
  });
