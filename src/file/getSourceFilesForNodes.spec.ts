import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { getSourceFilesForNodes } from './getSourceFilesForNodes';

test('getSourceFilesForNodes', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFiles = [
    project.createSourceFile('a.ts', `export const a = 1;`),
    project.createSourceFile('b.ts', `import { a } from './a'; const b = 1; const c = 1;`)
  ];
  const nodes = sourceFiles.map(file => file.getDescendantsOfKind(ts.SyntaxKind.Identifier)).flat();
  const result = getSourceFilesForNodes(nodes);
  assert(result.length === 2);
});
