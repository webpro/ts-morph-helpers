import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { getDeclarationsForSymbols } from './getDeclarationsForSymbols';

test('getDeclarationsForSymbols', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile(
    'index.ts',
    `const a = 1; export const b = 2; const c = a + b; const d = b + c;`
  );
  const symbols = sourceFile
    .getDescendantsOfKind(ts.SyntaxKind.Identifier)
    .filter(identifier => /[ab]/.test(identifier.getText()))
    .map(identifier => identifier.getSymbolOrThrow());
  const result = getDeclarationsForSymbols(symbols);
  assert(result.length === 2);
  assert(result[0].isKind(ts.SyntaxKind.VariableDeclaration));
  assert(result[1].isKind(ts.SyntaxKind.VariableDeclaration));
  assert(result[1].isNamedExport());
});
