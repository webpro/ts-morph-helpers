import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findImportSpecifierByName } from './findImportSpecifierByName';

test('findImportSpecifierByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `import { a } from './a`);
  const result = findImportSpecifierByName(sourceFile, 'a');
  assert(result?.isKind(ts.SyntaxKind.ImportSpecifier));
});
