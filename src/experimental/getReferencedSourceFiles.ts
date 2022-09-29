import { getImportDeclarationsForSymbols } from '../module/getImportDeclarationsForSymbols';
import { getRealSourceFilesForImportDeclarations } from '../experimental/getRealSourceFilesForImportDeclarations';
import { compact } from '../util';
import type { SourceFile, Symbol } from 'ts-morph';

/** Function executed for each source file, returns all nodes to recursively add source files of */
type GetSymbols = (sourceFile: SourceFile) => Symbol[];

/** Function to decide whether traversal should be aborted (current file will be excluded) */
type AbortTraversal = (sourceFile: SourceFile) => boolean;

const getReferencedSourceFilesForSymbols = (sourceFile: SourceFile, getSymbols: GetSymbols) => {
  const symbols = getSymbols(sourceFile);
  const importDeclarations = getImportDeclarationsForSymbols(symbols);
  const sourceFiles = getRealSourceFilesForImportDeclarations(importDeclarations);
  return new Set(sourceFiles);
};

const getReferencedSourceFilesDeep = (
  allFiles: Set<SourceFile>,
  referencedFiles: Set<SourceFile>,
  getSymbols: GetSymbols,
  abortTraversal?: AbortTraversal
) => {
  for (const file of referencedFiles) {
    if (abortTraversal && abortTraversal(file)) {
      allFiles.delete(file);
    } else {
      const sourceFiles = getReferencedSourceFilesForSymbols(file, getSymbols);
      sourceFiles.forEach(file => allFiles.add(file));
      getReferencedSourceFilesDeep(allFiles, sourceFiles, getSymbols, abortTraversal);
    }
  }
  return allFiles;
};

/**
 * Start traversal from `entryFile`, `getSymbols` from this source file, then
 * get source files referencing these symbols. Keep traversing recursively,
 * until `abortTraversal` returns `true`.
 */
export const getReferencedSourceFiles = (
  entryFile: SourceFile,
  getSymbols: GetSymbols,
  abortTraversal?: AbortTraversal
) => {
  const sourceFiles = getReferencedSourceFilesForSymbols(entryFile, getSymbols);
  return Array.from(getReferencedSourceFilesDeep(sourceFiles, new Set(sourceFiles), getSymbols, abortTraversal));
};
