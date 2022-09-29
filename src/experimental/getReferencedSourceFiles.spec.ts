import test from 'node:test';
import assert from 'node:assert';
import { Project, SourceFile, ts } from 'ts-morph';
import { getReferencedSourceFiles } from './getReferencedSourceFiles';
import { getSymbolsOfNodes } from '../node/getSymbolsOfNodes';

test('getRealSourceFilesForImportDeclarations', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `import { a } from './a'; a();`);
  const sourceFileA = project.createSourceFile('a.ts', `import { b } from './b'; export const a = b();`);
  const sourceFileB = project.createSourceFile('b.ts', `import { c } from './c'; export const b = c();`);
  const sourceFileC = project.createSourceFile('c.ts', `export const c = () => 1;`);

  const getSymbols = (sourceFile: SourceFile) =>
    getSymbolsOfNodes(sourceFile.getDescendantsOfKind(ts.SyntaxKind.CallExpression));

  const abortTraversal = (sourceFile: SourceFile) =>
    Boolean(sourceFile.getDescendantsOfKind(ts.SyntaxKind.NumericLiteral).find(node => node.getText() === '1'));

  {
    const result = getReferencedSourceFiles(sourceFile, getSymbols);
    assert(result.length === 3);
    assert(result[0] === sourceFileA);
    assert(result[1] === sourceFileB);
    assert(result[2] === sourceFileC);
  }
  {
    const result = getReferencedSourceFiles(sourceFile, getSymbols, abortTraversal);
    assert(result.length === 2);
    assert(result[0] === sourceFileA);
    assert(result[1] === sourceFileB);
  }
});
