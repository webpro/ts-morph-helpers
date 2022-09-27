import { ts } from 'ts-morph';
import type { SourceFile, ImportDeclaration, Identifier } from 'ts-morph';
import { findExportDeclarationByIdentifier } from '../node/findExportDeclarationByIdentifier';

const getRealSourceFileForIdentifier = (sourceFile: SourceFile, identifier: Identifier): SourceFile => {
  const exportDeclaration = findExportDeclarationByIdentifier(sourceFile, identifier);
  const targetFile = exportDeclaration?.getModuleSpecifierSourceFile();
  return targetFile && targetFile !== sourceFile ? getRealSourceFileForIdentifier(targetFile, identifier) : sourceFile;
};

/** Get source file of import declaration, taking into account re-exports */
export const getRealSourceFileForImportDeclaration = (importDeclaration: ImportDeclaration) => {
  const sourceFile = importDeclaration.getModuleSpecifierSourceFileOrThrow();
  const identifier = importDeclaration.getFirstDescendantByKindOrThrow(ts.SyntaxKind.Identifier);
  return getRealSourceFileForIdentifier(sourceFile, identifier);
};
