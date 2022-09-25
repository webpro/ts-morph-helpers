import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findCallExpressionsWithArg } from './findCallExpressionsWithArg';

test('findCallExpressionsWithArg', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `a(b)`);
  const result = findCallExpressionsWithArg(sourceFile, 'b');
  assert(result.length === 1);
  assert(result[0].isKind(ts.SyntaxKind.CallExpression));
});

test('findCallExpressionsWithArg', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `const a = b => a(a, b)`);
  const result = findCallExpressionsWithArg(sourceFile, 'b');
  assert(result.length === 1);
  assert(result[0].isKind(ts.SyntaxKind.CallExpression));
});

test('findCallExpressionsWithArg', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `const b = a(c)`);
  const result = findCallExpressionsWithArg(sourceFile, 'b');
  assert(result.length === 0);
});
