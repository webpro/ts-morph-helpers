import test from 'node:test';
import assert from 'node:assert';
import { Identifier, Project, ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';
import { findHookIdentifierByContextName } from './findHookIdentifierByContextName';

test('findHookIdentifierByContextName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile(
    'provider.tsx',
    ` const MyContext = createContext();
      export const useMyContext = (): SomeContext => useContext(MyContext);`
  );
  const hookIdentifier = findHookIdentifierByContextName(sourceFile, 'MyContext');
  assert(hookIdentifier?.isKind(ts.SyntaxKind.Identifier));
});

test('findHookIdentifierByContextName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile(
    'provider.tsx',
    ` const MyContext = createContext();
      export const useMyContext = function() {
        return useContext(MyContext);
      }`
  );
  const hookIdentifier = findHookIdentifierByContextName(sourceFile, 'MyContext');
  assert(hookIdentifier?.isKind(ts.SyntaxKind.Identifier));
});
