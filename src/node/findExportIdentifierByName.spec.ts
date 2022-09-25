import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findExportIdentifierByName } from './findExportIdentifierByName';

test('findExportIdentifierByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export const a = 1`);
  const result = findExportIdentifierByName(sourceFile, 'a');
  assert(!result);
});

test('findExportIdentifierByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export { a }`);
  const result = findExportIdentifierByName(sourceFile, 'a');
  assert(result?.isKind(ts.SyntaxKind.Identifier));
});

test('findExportIdentifierByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export { a } from './a`);
  const result = findExportIdentifierByName(sourceFile, 'a');
  assert(result?.isKind(ts.SyntaxKind.Identifier));
});
