import { ts } from 'ts-morph';
import type { SourceFile, Identifier } from 'ts-morph';

const findHookIdentifierByContextIndentifier = (sourceFile: SourceFile, identifier: Identifier) => {
  const callExpressions = sourceFile.getDescendantsOfKind(ts.SyntaxKind.CallExpression);
  const callExpression = callExpressions.find(callExpression => {
    if (callExpression.getExpression().getText() === 'useContext') {
      const args = callExpression.getArguments().map(arg => arg.getSymbol());
      return args.includes(identifier.getSymbol());
    }
  });
  return callExpression
    ?.getFirstAncestorByKindOrThrow(ts.SyntaxKind.VariableDeclaration)
    .getFirstChildByKindOrThrow(ts.SyntaxKind.Identifier);
};

/** Finds hook identifier created by the context with the given name */
export const findHookIdentifierByContextName = (sourceFile: SourceFile, contextName: string) => {
  const variableDeclaration = sourceFile.getVariableDeclaration(contextName);
  const identifier = variableDeclaration?.getFirstChildByKindOrThrow(ts.SyntaxKind.Identifier);
  if (identifier) {
    return findHookIdentifierByContextIndentifier(sourceFile, identifier);
  }
};
