import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { getRealSourceFileForImportDeclaration } from './getRealSourceFileForImportDeclaration';

test('getRealSourceFileForImportDeclaration', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `import { a } from './impl'`);
  const targetFile = project.createSourceFile('impl.ts', `export const a = 1;`);
  const importDeclaration = sourceFile.getFirstDescendantByKindOrThrow(ts.SyntaxKind.ImportDeclaration);
  const result = getRealSourceFileForImportDeclaration(importDeclaration);
  assert(result === targetFile);
});

test('getRealSourceFileForImportDeclaration', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `import { a } from './barrel'`);
  project.createSourceFile('barrel.ts', `export { a } from './impl'`);
  const targetFile = project.createSourceFile('impl.ts', `export const a = 1;`);
  const importDeclaration = sourceFile.getFirstDescendantByKindOrThrow(ts.SyntaxKind.ImportDeclaration);
  const result = getRealSourceFileForImportDeclaration(importDeclaration);
  assert(result === targetFile);
});

test('getRealSourceFileForImportDeclaration', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `import { a } from './a'`);
  project.createSourceFile('a.ts', `export { a } from './b'`);
  project.createSourceFile('b.ts', `export { a } from './impl'`);
  const targetFile = project.createSourceFile('impl.ts', `export const a = 1;`);
  const importDeclaration = sourceFile.getFirstDescendantByKindOrThrow(ts.SyntaxKind.ImportDeclaration);
  const result = getRealSourceFileForImportDeclaration(importDeclaration);
  assert(result === targetFile);
});
