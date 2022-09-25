import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findJsxNodeByName } from './findJsxNodeByName';

test('findJsxNodeByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.tsx', `const A = () => <B><div><C /></div></B>`);
  const result = findJsxNodeByName(sourceFile, 'A');
  assert(!result);
});

test('findJsxNodeByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.tsx', `const A = () => <B><div><C /></div></B>`);
  const result = findJsxNodeByName(sourceFile, 'B');
  assert(result?.isKind(ts.SyntaxKind.JsxOpeningElement));
});

test('findJsxNodeByName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.tsx', `const A = () => <B><div><C /></div></B>`);
  const result = findJsxNodeByName(sourceFile, 'C');
  assert(result?.isKind(ts.SyntaxKind.JsxSelfClosingElement));
});
