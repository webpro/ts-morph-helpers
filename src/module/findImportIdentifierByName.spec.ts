import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findImportIdentifierByName } from './findImportIdentifierByName';

test('findImportIdentifierByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `import a from './a`);
  const result = findImportIdentifierByName(sourceFile, 'a');
  assert(result?.isKind(ts.SyntaxKind.Identifier));
});

test('findImportIdentifierByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `import { a } from './a`);
  const result = findImportIdentifierByName(sourceFile, 'a');
  assert(result?.isKind(ts.SyntaxKind.Identifier));
});
