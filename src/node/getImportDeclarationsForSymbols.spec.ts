import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { getImportDeclarationsForSymbols } from './getImportDeclarationsForSymbols';

test('getImportDeclarationsForSymbols', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile(
    'index.ts',
    `import { a } from './a'; import { b } from 'b'; const c = a + b; const d = b + c;`
  );
  const identifiers = sourceFile.getDescendantsOfKind(ts.SyntaxKind.Identifier);
  const symbols = identifiers
    .filter(identifier => /[ab]/.test(identifier.getText()))
    .map(identifier => identifier.getSymbolOrThrow());

  {
    const result = getImportDeclarationsForSymbols(symbols);
    assert(result.length === 1);
    assert(result[0].isKind(ts.SyntaxKind.ImportDeclaration));
  }

  {
    const result = getImportDeclarationsForSymbols(symbols, { onlyRelative: false });
    assert(result.length === 2);
    assert(result[1].isKind(ts.SyntaxKind.ImportDeclaration));
  }
});
