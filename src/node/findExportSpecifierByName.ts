import { ExportSpecifier } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

export const findExportSpecifierByName = (sourceFile: SourceFile, name: string): ExportSpecifier | undefined => {
  const namedExports = sourceFile
    .getExportDeclarations()
    .map(declaration => declaration.getNamedExports())
    .flat();
  return namedExports.find(namedExport => namedExport.getName() === name);
};
