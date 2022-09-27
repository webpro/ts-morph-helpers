import test from 'node:test';
import assert from 'node:assert';
import { Project } from 'ts-morph';
import { isJsx } from './isJsx';

test('isJsx', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `const A = () => null`);
  const result = isJsx(sourceFile);
  assert(!result);
});

test('isJsx', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.tsx', `const A = () => null`);
  const result = isJsx(sourceFile);
  assert(result);
});
