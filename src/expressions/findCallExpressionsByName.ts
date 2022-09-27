import { ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

/** Find call expressions by name */
export const findCallExpressionsByName = (sourceFile: SourceFile, name: string) => {
  const callExpressions = sourceFile.getDescendantsOfKind(ts.SyntaxKind.CallExpression);
  return callExpressions.filter(callExpression => callExpression.getExpression().getText() === name);
};
