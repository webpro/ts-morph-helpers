import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { getExportDeclarationForIdentifier } from './getExportDeclarationForIdentifier';

test('getExportDeclarationForIdentifier', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `const a = 1; export { a };`);
  const identifier = sourceFile.getFirstDescendantByKindOrThrow(ts.SyntaxKind.Identifier);
  const result = getExportDeclarationForIdentifier(sourceFile, identifier);
  assert(result?.isKind(ts.SyntaxKind.ExportDeclaration));
});
