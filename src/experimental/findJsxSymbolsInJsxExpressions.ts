import type { SourceFile, Symbol } from 'ts-morph';
import { findJsxIdentifiersInJsxExpressions } from './findJsxIdentifiersInJsxExpressions';
import { compact } from '../util';

/** Find symbols of JSX identifiers within JSX expressions */
export const findJsxSymbolsInJsxExpressions = (sourceFile: SourceFile) =>
  compact(findJsxIdentifiersInJsxExpressions(sourceFile).map(identifier => identifier.getSymbol()));
