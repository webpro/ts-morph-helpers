import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { getSymbolsOfNodes } from './getSymbolsOfNodes';

test('getSymbolsOfNodes', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `const a = 1; const b = () => a;`);
  const nodes = [
    ...sourceFile.getDescendantsOfKind(ts.SyntaxKind.VariableDeclaration),
    ...sourceFile.getDescendantsOfKind(ts.SyntaxKind.Identifier),
  ];
  const result = getSymbolsOfNodes(nodes);
  assert(result.length === 2);
  assert(result[0].getName() === 'a');
  assert(result[1].getName() === 'b');
});
