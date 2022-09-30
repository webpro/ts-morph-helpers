import type { SourceFile, Symbol } from 'ts-morph';

type ExportedDeclarations = ReturnType<SourceFile['getExportedDeclarations']>;

const findExportNamesForSymbol = (exportDeclarations: ExportedDeclarations, symbol: Symbol) => {
  const names = [];
  for (const [name, declarations] of exportDeclarations.entries()) {
    if (declarations.find(declaration => declaration.getSymbol() === symbol)) names.push(name);
  }
  return names;
};

/** Return exported names for symbols that are exported more than once */
export const findDuplicateExportedNames = (sourceFile: SourceFile) => {
  const exportDeclarations = sourceFile.getExportedDeclarations();
  const exportedSymbols = new Set();
  const duplicateSymbols: string[][] = [];
  for (const declarations of exportDeclarations.values()) {
    declarations.forEach(declaration => {
      const symbol = declaration.getSymbol();
      if (symbol && exportedSymbols.has(symbol)) {
        const names = findExportNamesForSymbol(exportDeclarations, symbol);
        if (names.length > 1) duplicateSymbols.push(names);
      }
      exportedSymbols.add(symbol);
    });
  }
  return duplicateSymbols;
};
