import test from 'node:test';
import assert from 'node:assert';
import { Project } from 'ts-morph';
import { hasReferencingDefaultImport } from './hasReferencingDefaultImport';

test('hasReferencingDefaultImport', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('main.ts', `export default () => 1`);
  project.createSourceFile('index.ts', `import main from './main'; main()`);
  const result = hasReferencingDefaultImport(sourceFile);
  assert(result);
});

test('hasReferencingDefaultImport (dynamic import)', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('main.ts', `export default () => 1`);
  project.createSourceFile('index.ts', `const main = import('./main'); main()`);
  const result = hasReferencingDefaultImport(sourceFile);
  assert(result);
});

test('hasReferencingDefaultImport', { skip: true }, () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('main.ts', `export default () => 1`);
  project.createSourceFile('barrel.ts', `export default from './main'`);
  project.createSourceFile('index.ts', `import main from './barrel'; main()`);
  const result = hasReferencingDefaultImport(sourceFile);
  assert(result);
});
