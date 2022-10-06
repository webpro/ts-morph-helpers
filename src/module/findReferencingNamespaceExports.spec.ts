import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findReferencingNamespaceExports } from './findReferencingNamespaceExports';

test('findReferencingNamespaceExports', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export const a = 1;`);
  project.createSourceFile('a.ts', `export * from './index';`);
  project.createSourceFile('b.ts', `import { a } from './index';`);

  const result = findReferencingNamespaceExports(sourceFile);
  assert(result.length === 1);
  assert(result[0].isKind(ts.SyntaxKind.ExportDeclaration));
});
