import { ExportDeclaration } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

export const findExportDeclarationByName = (sourceFile: SourceFile, name: string): ExportDeclaration | undefined =>
  sourceFile.getExportDeclaration(exportDeclaration => {
    const namedExports = exportDeclaration.getNamedExports();
    return Boolean(namedExports.find(namedExport => namedExport.getName() === name));
  });
