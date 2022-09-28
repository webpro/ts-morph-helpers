import type { SourceFile } from 'ts-morph';

/** Find export identifier by name (does not include exported variable declaration) */
export const findExportIdentifierByName = (sourceFile: SourceFile, name: string) => {
  const namedExports = sourceFile
    .getExportDeclarations()
    .map(declaration => declaration.getNamedExports())
    .flat();
  return namedExports.find(namedExport => namedExport.getName() === name)?.getNameNode();
};
