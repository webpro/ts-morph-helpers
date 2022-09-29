import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findJsxIdentifiersInJsxExpressions } from './findJsxIdentifiersInJsxExpressions';

test('findJsxIdentifiersInJsxExpressions', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.tsx', `const A = () => <B prop={C} />`);
  const result = findJsxIdentifiersInJsxExpressions(sourceFile);
  assert(result.length === 1);
  assert(result[0].isKind(ts.SyntaxKind.Identifier));
  assert(result[0].getText() === 'C');
});

test('findJsxIdentifiersInJsxExpressions', { skip: true }, () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.tsx', `const A = () => <B prop={[C,D]} />`);
  const result = findJsxIdentifiersInJsxExpressions(sourceFile);
  assert(result.length === 2);
  assert(result[0].isKind(ts.SyntaxKind.Identifier));
  assert(result[0].getText() === 'C');
  assert(result[1].isKind(ts.SyntaxKind.Identifier));
  assert(result[1].getText() === 'D');
});
