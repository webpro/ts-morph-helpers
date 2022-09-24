import { ExportDeclaration, Identifier } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

export const getExportDeclarationForIdentifier = (
  sourceFile: SourceFile,
  identifier: Identifier
): ExportDeclaration | undefined =>
  sourceFile.getExportDeclaration(exportDeclaration => {
    const namedExports = exportDeclaration.getNamedExports();
    return Boolean(namedExports.find(namedExport => namedExport.getName() === identifier.getText()));
  });
