import { ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';
import { findJsxNodeByName } from '../jsx/findJsxNodeByName';

/** Finds component identifier using the provider with the given context name */
export const findContextProviderIdentifierByContextName = (sourceFile: SourceFile, contextName: string) => {
  const node = findJsxNodeByName(sourceFile, `${contextName}.Provider`);
  return node
    ?.getFirstAncestorByKindOrThrow(ts.SyntaxKind.VariableDeclaration)
    .getFirstChildByKindOrThrow(ts.SyntaxKind.Identifier);
};
