import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { getCallExpressionsWithArg } from './getCallExpressionsWithArg';

test('getCallExpressionsWithArg', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `a(b)`);
  const result = getCallExpressionsWithArg(sourceFile, 'b');
  assert(result.length === 1);
  assert(result[0].isKind(ts.SyntaxKind.CallExpression));
});

test('getCallExpressionsWithArg', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `const a = b => a(a, b)`);
  const result = getCallExpressionsWithArg(sourceFile, 'b');
  assert(result.length === 1);
  assert(result[0].isKind(ts.SyntaxKind.CallExpression));
});

test('getCallExpressionsWithArg', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `const b = a(c)`);
  const result = getCallExpressionsWithArg(sourceFile, 'b');
  assert(result.length === 0);
});
