import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findCallExpressionsByName } from './findCallExpressionsByName';

test('findCallExpressionsByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `a(b)`);
  const result = findCallExpressionsByName(sourceFile, 'b');
  assert(result.length === 0);
});

test('findCallExpressionsByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `const a = b => a(a, b)`);
  const result = findCallExpressionsByName(sourceFile, 'a');
  assert(result.length === 1);
  assert(result[0].isKind(ts.SyntaxKind.CallExpression));
});

test('findCallExpressionsByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `const b = a(c)`);
  const result = findCallExpressionsByName(sourceFile, 'a');
  assert(result.length === 1);
  assert(result[0].isKind(ts.SyntaxKind.CallExpression));
});
