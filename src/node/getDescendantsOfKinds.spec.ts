import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { getDescendantsOfKinds } from './getDescendantsOfKinds';

test('getDescendantsOfKinds', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `let a = 1; let b = 1; let c = 1;`);
  const result = getDescendantsOfKinds(sourceFile, [ts.SyntaxKind.Identifier, ts.SyntaxKind.NumericLiteral]);
  assert(result.length === 6);
  assert(result.at(0)?.isKind(ts.SyntaxKind.Identifier));
  assert(result.at(-1)?.isKind(ts.SyntaxKind.NumericLiteral));
});
