import { ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

/** Find call expressions with an argument of the provided name */
export const findCallExpressionsWithArg = (sourceFile: SourceFile, argumentText: string) => {
  const callExpressions = sourceFile.getDescendantsOfKind(ts.SyntaxKind.CallExpression);
  const callExpressionsWithArg = callExpressions.filter(callExpression => {
    const identifiers = callExpression
      .getArguments()
      .map(argument => [argument, argument.getDescendantsOfKind(ts.SyntaxKind.Identifier)].flat())
      .flat();
    return identifiers.find(identifier => identifier.getText() === argumentText);
  });
  return callExpressionsWithArg;
};
