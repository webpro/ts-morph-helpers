import { Identifier } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

export const findExportIdentifierByName = (sourceFile: SourceFile, name: string): Identifier | undefined => {
  const namedExports = sourceFile
    .getExportDeclarations()
    .map(declaration => declaration.getNamedExports())
    .flat();
  return namedExports.find(namedExport => namedExport.getName() === name)?.getNameNode();
};
