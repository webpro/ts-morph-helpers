import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findReferencingNamespaceImports } from './findReferencingNamespaceImports';

test('findReferencingNamespaceImports', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export const a = 1;`);
  project.createSourceFile('a.ts', `import * as NS from './index';`);
  project.createSourceFile('b.ts', `import { a } from './index';`);

  const result = findReferencingNamespaceImports(sourceFile);
  assert(result.length === 1);
  assert(result[0].isKind(ts.SyntaxKind.ImportDeclaration));
});
