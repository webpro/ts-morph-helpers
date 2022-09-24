import { Identifier, ts } from 'ts-morph';
import type { SourceFile, ImportDeclaration } from 'ts-morph';

const getIdentifierSourceFile = (sourceFile: SourceFile, identifier: Identifier): SourceFile | undefined => {
  const exportDeclaration = sourceFile.getExportDeclaration(exportDeclaration => {
    const namedExports = exportDeclaration.getNamedExports();
    return Boolean(namedExports.find(namedExport => namedExport.getName() === identifier.getText()));
  });
  const targetFile = exportDeclaration?.getModuleSpecifierSourceFile();
  return targetFile ? getIdentifierSourceFile(targetFile, identifier) : sourceFile;
};

export const getImplementationSourceFile = (importDeclaration: ImportDeclaration): SourceFile | undefined => {
  const sourceFile = importDeclaration.getModuleSpecifierSourceFileOrThrow();
  const identifier = importDeclaration.getFirstDescendantByKindOrThrow(ts.SyntaxKind.Identifier);
  return getIdentifierSourceFile(sourceFile, identifier);
};
