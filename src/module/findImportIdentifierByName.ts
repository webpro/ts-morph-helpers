import type { SourceFile } from 'ts-morph';

/** Find import identifier by name (includes default imports) */
export const findImportIdentifierByName = (sourceFile: SourceFile, name: string) => {
  const importDeclarations = sourceFile.getImportDeclarations();
  const namedImports = importDeclarations.map(declaration => declaration.getNamedImports()).flat();
  const defaultImports = importDeclarations.map(declaration => declaration.getDefaultImport());
  return (
    namedImports.find(namedImport => namedImport.getName() === name)?.getNameNode() ??
    defaultImports.find(defaultImport => defaultImport?.getText() === name)
  );
};
