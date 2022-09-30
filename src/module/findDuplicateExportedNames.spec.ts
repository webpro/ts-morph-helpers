import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findDuplicateExportedNames } from './findDuplicateExportedNames';

test('findDuplicateExportedNames', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('index.ts', `export const a = 1, b = 2; export default b;`);
  const result = findDuplicateExportedNames(sourceFile);
  assert(result.length === 1);
  assert(result[0][0] === 'b');
  assert(result[0][1] === 'default');
});
