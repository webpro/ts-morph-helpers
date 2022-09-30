import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { hasSymbol } from './hasSymbol';

test('hasSymbol', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.tsx', `export const a = 1;`);
  const targetFile = project.createSourceFile('a.tsx', `import * as ns from './index'; ns.a; `);
  const symbol = sourceFile.getFirstDescendantByKindOrThrow(ts.SyntaxKind.Identifier).getSymbolOrThrow();
  const result = hasSymbol(targetFile, symbol);
  assert(result);
});

test('hasSymbol', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.tsx', `export const a = 1;`);
  const targetFile = project.createSourceFile('a.tsx', `import * as ns from './index'; ns.B; `);
  const symbol = sourceFile.getFirstDescendantByKindOrThrow(ts.SyntaxKind.Identifier).getSymbolOrThrow();
  const result = hasSymbol(targetFile, symbol);
  assert(!result);
});
