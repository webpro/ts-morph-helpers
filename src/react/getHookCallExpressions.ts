import { ts } from 'ts-morph';
import type { SourceFile, Node } from 'ts-morph';

export const getHookCallExpressions = (sourceFile: SourceFile): Node[] => {
  const callExpressions = sourceFile.getDescendantsOfKind(ts.SyntaxKind.CallExpression);
  return callExpressions.filter(callExpression => callExpression.getText().startsWith('use'));
};
