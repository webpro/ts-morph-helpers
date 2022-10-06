import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findReferencingNamespaceNodes } from './findReferencingNamespaceNodes';

test('findReferencingNamespaceNodes', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export const a = 1;`);
  project.createSourceFile('a.ts', `import * as NS from './index';`);
  project.createSourceFile('b.ts', `export * from './index';`);

  const result = findReferencingNamespaceNodes(sourceFile);
  assert(result.length === 2);
  assert(result[0].isKind(ts.SyntaxKind.ImportDeclaration));
  assert(result[1].isKind(ts.SyntaxKind.ExportDeclaration));
});
