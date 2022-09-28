import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findExportSpecifierByName } from './findExportSpecifierByName';

test('findExportSpecifierByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export const a = 1`);
  const result = findExportSpecifierByName(sourceFile, 'a');
  assert(!result);
});

test('findExportSpecifierByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export { a }`);
  const result = findExportSpecifierByName(sourceFile, 'a');
  assert(result?.isKind(ts.SyntaxKind.ExportSpecifier));
});

test('findExportSpecifierByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export { a } from './a`);
  const result = findExportSpecifierByName(sourceFile, 'a');
  assert(result?.isKind(ts.SyntaxKind.ExportSpecifier));
});
