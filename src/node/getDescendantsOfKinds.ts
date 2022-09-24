import { ts } from 'ts-morph';
import type { Node, SourceFile } from 'ts-morph';

export const getDescendantsOfKinds = (sourceFile: SourceFile | undefined, kinds: ts.SyntaxKind[]): Node[] => {
  return sourceFile && kinds.length ? kinds.map(kind => sourceFile.getDescendantsOfKind(kind)).flat() : [];
};
