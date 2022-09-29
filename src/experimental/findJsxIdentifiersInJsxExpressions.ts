import { ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

/** Find JSX identifier within JSX expressions (currently supports only single direct child `prop={Component}` variation) */
export const findJsxIdentifiersInJsxExpressions = (sourceFile: SourceFile) => {
  const jsxExpressions = sourceFile.getDescendantsOfKind(ts.SyntaxKind.JsxExpression);
  return jsxExpressions
    .map(expression => expression.getChildrenOfKind(ts.SyntaxKind.Identifier))
    .flat()
    .filter(identifier => /^[A-Z]/.test(identifier.getText()));
};
