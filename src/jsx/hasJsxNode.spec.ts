import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { hasJsxNode } from './hasJsxNode';

test('hasJsxNode', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.tsx', `const A = () => <B><div><C /></div></B>`);
  const result = hasJsxNode(sourceFile, 'C');
  assert(result);
});

test('hasJsxNode', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.tsx', `const A = () => <B><div><C /></div></B>`);
  const result = hasJsxNode(sourceFile, 'A');
  assert(!result);
});
