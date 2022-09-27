import { ts } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

const jsxScriptKinds = [ts.ScriptKind.JSX, ts.ScriptKind.TSX];

/** Returns whether the file has the .jsx or .tsx extension */
export const isJsx = (sourceFile: SourceFile) => jsxScriptKinds.includes(sourceFile.getScriptKind());
