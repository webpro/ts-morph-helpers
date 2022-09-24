import test from 'node:test';
import assert from 'node:assert';
import { Project } from 'ts-morph';
import { isBarrel } from './isBarrel';

test('isBarrel', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export { a } from './a';`);
  const result = isBarrel(sourceFile);
  assert(result);
});

test('isBarrel', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export { a } from './a'; export { b } from './b';`);
  const result = isBarrel(sourceFile);
  assert(result);
});

test('isBarrel', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export { a } from './a'; export const b = 1;`);
  const result = isBarrel(sourceFile);
  assert(!result);
});

test('isBarrel', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `const c = 1; export { c }; export { b } from './b';`);
  const result = isBarrel(sourceFile);
  assert(!result);
});
