import { ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

export const findHookCallExpressions = (sourceFile: SourceFile) => {
  const callExpressions = sourceFile.getDescendantsOfKind(ts.SyntaxKind.CallExpression);
  return callExpressions.filter(callExpression => callExpression.getText().startsWith('use'));
};
