import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findJsxSymbolsInJsxExpressions } from './findJsxSymbolsInJsxExpressions';

test('findJsxSymbolsInJsxExpressions', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.tsx', `const C; const A = () => <B prop={C} />`);
  const result = findJsxSymbolsInJsxExpressions(sourceFile);
  assert(result.length === 1);
  assert(result[0].getName() === 'C');
});

test('findJsxSymbolsInJsxExpressions', { skip: true }, () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.tsx', `const C, D; const A = () => <B prop={[C,D]} />`);
  const result = findJsxSymbolsInJsxExpressions(sourceFile);
  assert(result.length === 2);
  assert(result[0].getName() === 'C');
  assert(result[1].getName() === 'D');
});
