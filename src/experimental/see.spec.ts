import test from 'node:test';
import path from 'node:path';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

const cwd = process.cwd();

const log = (sourceFile: SourceFile, ...messages: string[]) =>
  console.log(...messages, path.relative(cwd, sourceFile.getFilePath()));

test('getRealSourceFilesForImportDeclarations', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  // const sourceFile = project.createSourceFile('index.ts', `const a = await import('./a')`);
  const sourceFile = project.createSourceFile('index.ts', `import a from './a'`);
  const a = project.createSourceFile('a.ts', `const a = 1; export default a`);

  const exportDeclarations = a.getExportedDeclarations();

  exportDeclarations.forEach(declarations => {
    declarations.forEach(declaration => {
      const identifier = declaration.getFirstDescendantByKind(ts.SyntaxKind.Identifier);
      console.log(identifier);

      if (identifier) {
        const refs = identifier.findReferences();
        console.log(refs.map(r => r.compilerObject.definition.fileName));
        if (refs.length === 0) {
          log(sourceFile, 'HAS UNUSED EXPORT:', identifier.getText());
        } else {
          const b = new Set(refs.map(r => r.compilerObject.definition.fileName));
          console.log(b);

          if (b.size === 1 && [...b][0] === sourceFile.getFilePath()) {
            log(sourceFile, 'HAS WEIRD UNUSED EXPORT:', identifier.getText());
          }
        }
      } else {
        log(sourceFile, 'HAS UNNAMED DEFAULT EXPORT');
        // const exportAssignment = declaration.getFirstAncestorByKind(ts.SyntaxKind.ExportAssignment);
        // console.log(declaration.getFirstAncestorByKind(ts.SyntaxKind.ExportAssignment));
      }
    });
  });
});
