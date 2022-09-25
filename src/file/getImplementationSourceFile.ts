import { ts } from 'ts-morph';
import type { SourceFile, ImportDeclaration, Identifier } from 'ts-morph';
import { findExportDeclarationByIdentifier } from '../node/findExportDeclarationByIdentifier';

const getSourceFileForIdentifier = (sourceFile: SourceFile, identifier: Identifier): SourceFile | undefined => {
  const exportDeclaration = findExportDeclarationByIdentifier(sourceFile, identifier);
  const targetFile = exportDeclaration?.getModuleSpecifierSourceFile();
  return targetFile && targetFile !== sourceFile ? getSourceFileForIdentifier(targetFile, identifier) : sourceFile;
};

export const getImplementationSourceFile = (importDeclaration: ImportDeclaration): SourceFile | undefined => {
  const sourceFile = importDeclaration.getModuleSpecifierSourceFileOrThrow();
  const identifier = importDeclaration.getFirstDescendantByKindOrThrow(ts.SyntaxKind.Identifier);
  return getSourceFileForIdentifier(sourceFile, identifier);
};
