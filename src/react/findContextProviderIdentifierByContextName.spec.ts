import test from 'node:test';
import assert from 'node:assert';
import { Identifier, Project, ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';
import { findContextProviderIdentifierByContextName } from './findContextProviderIdentifierByContextName';

test('findContextProviderIdentifierByContextName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile(
    'index.tsx',
    `export const MyProvider = ({ children }) => <MyContext.Provider>{children}</MyContext.Provider>;`
  );
  const identifier = findContextProviderIdentifierByContextName(sourceFile, 'MyContext');
  assert(identifier?.isKind(ts.SyntaxKind.Identifier));
  assert(identifier.getText() === 'MyProvider');
});

test('findContextProviderIdentifierByContextName', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile(
    'index.tsx',
    ` export const MyProvider = function() {
        return <Wrapper>
          <MyContext.Provider>{children}</MyContext.Provider>
        </Wrapper>;
      };`
  );
  const identifier = findContextProviderIdentifierByContextName(sourceFile, 'MyContext');
  assert(identifier?.isKind(ts.SyntaxKind.Identifier));
  assert(identifier.getText() === 'MyProvider');
});
