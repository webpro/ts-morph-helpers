import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { getRealSourceFilesForImportDeclarations } from './getRealSourceFilesForImportDeclarations';

test('getRealSourceFilesForImportDeclarations', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `import { a } from './a'`);
  project.createSourceFile('a.ts', `export { a } from './b'`);
  project.createSourceFile('b.ts', `export { a } from './impl'`);
  const targetFile = project.createSourceFile('impl.ts', `export const a = 1;`);
  const importDeclarations = sourceFile.getDescendantsOfKind(ts.SyntaxKind.ImportDeclaration);
  const result = getRealSourceFilesForImportDeclarations(importDeclarations);
  assert(result[0] === targetFile);
});
