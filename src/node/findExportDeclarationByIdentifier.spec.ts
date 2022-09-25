import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findExportDeclarationByIdentifier } from './findExportDeclarationByIdentifier';

test('findExportDeclarationByIdentifier', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `const a = 1; export { a };`);
  const identifier = sourceFile.getFirstDescendantByKindOrThrow(ts.SyntaxKind.Identifier);
  const result = findExportDeclarationByIdentifier(sourceFile, identifier);
  assert(result?.isKind(ts.SyntaxKind.ExportDeclaration));
});
