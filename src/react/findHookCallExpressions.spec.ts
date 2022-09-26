import test from 'node:test';
import assert from 'node:assert';
import { Project, ts } from 'ts-morph';
import { findHookCallExpressions } from './findHookCallExpressions';

test('findHookCallExpressions', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile(
    'index.ts',
    ` import { useCustom } from './useCustom';
      const A = () => {
        const [a, update] = useState();
        useEffect(() => {}, []),
        const b = getSomething();
        useCustom(b);
        return null;
      }`
  );
  const result = findHookCallExpressions(sourceFile);
  assert(result.length === 3);
  assert(result[0].isKind(ts.SyntaxKind.CallExpression));
});
