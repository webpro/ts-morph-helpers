import type { SourceFile } from 'ts-morph';
import { getJsxNodes } from './getJsxNodes';

export const hasJsxNode = (sourceFile: SourceFile, jsxElementName: string): Boolean => {
  const components = getJsxNodes(sourceFile);
  return Boolean(components.find(component => component.getSymbol()?.getName() === jsxElementName));
};
