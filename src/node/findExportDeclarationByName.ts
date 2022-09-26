import type { SourceFile } from 'ts-morph';

export const findExportDeclarationByName = (sourceFile: SourceFile, name: string) =>
  sourceFile.getExportDeclaration(exportDeclaration => {
    const namedExports = exportDeclaration.getNamedExports();
    return Boolean(namedExports.find(namedExport => namedExport.getName() === name));
  });
