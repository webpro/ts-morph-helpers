import { ts } from 'ts-morph';
import type { SourceFile, Symbol } from 'ts-morph';

/** Returns whether one of the sourceFiles contains the symbol/binding  */
export const hasSymbol = (sourceFiles: SourceFile | SourceFile[], symbol: Symbol) =>
  Boolean(
    [sourceFiles]
      .flat()
      .find(sourceFile =>
        sourceFile.getDescendantsOfKind(ts.SyntaxKind.Identifier).find(identifier => identifier.getSymbol() === symbol)
      )
  );
