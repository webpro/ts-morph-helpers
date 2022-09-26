import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findJsxNodes } from './findJsxNodes';

test('findJsxNodes', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.tsx', `const A = () => null`);
  const result = findJsxNodes(sourceFile);
  assert(result.length === 0);
});

test('findJsxNodes', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.tsx', `const A = () => <B><div><C /></div></B>`);
  const result = findJsxNodes(sourceFile);
  assert(result.length === 2);
  assert(result[0].isKind(ts.SyntaxKind.JsxOpeningElement));
  assert(result[1].isKind(ts.SyntaxKind.JsxSelfClosingElement));
});
