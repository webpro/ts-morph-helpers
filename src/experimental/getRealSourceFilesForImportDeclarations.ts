import type { SourceFile, ImportDeclaration } from 'ts-morph';
import { getRealSourceFileForImportDeclaration } from '../file/getRealSourceFileForImportDeclaration';

/** Get source files for import declarations, taking into account re-exports */
export const getRealSourceFilesForImportDeclarations = (importDeclarations: ImportDeclaration[]) =>
  importDeclarations
    .map(getRealSourceFileForImportDeclaration)
    .filter((sourceFile): sourceFile is SourceFile => Boolean(sourceFile));
