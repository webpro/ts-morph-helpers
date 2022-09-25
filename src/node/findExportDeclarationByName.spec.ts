import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findExportDeclarationByName } from './findExportDeclarationByName';

test('findExportDeclarationByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export const a = 1`);
  const result = findExportDeclarationByName(sourceFile, 'a');
  assert(!result);
});

test('findExportDeclarationByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export { a }`);
  const result = findExportDeclarationByName(sourceFile, 'a');
  assert(result?.isKind(ts.SyntaxKind.ExportDeclaration));
});

test('findExportDeclarationByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export { a } from './a`);
  const result = findExportDeclarationByName(sourceFile, 'a');
  assert(result?.isKind(ts.SyntaxKind.ExportDeclaration));
});
