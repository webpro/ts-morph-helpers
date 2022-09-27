import { ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

/** Find React hook call expressions (prefixed with `use`) */
export const findHookCallExpressions = (sourceFile: SourceFile) => {
  const callExpressions = sourceFile.getDescendantsOfKind(ts.SyntaxKind.CallExpression);
  return callExpressions.filter(callExpression => callExpression.getText().startsWith('use'));
};
