// Use the compiler from the project's pinned, reproducible build dependencies.
// Never assume a particular Node.js version or machine-specific global path.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const sourceRequire = createRequire(new URL('../source/package.json', import.meta.url));
const scriptRequire = createRequire(import.meta.url);

export function checkTypescriptScene(source, sourcefile = 'office-scene.ts') {
  try {
    // esbuild is installed by `npm ci --prefix source` before CI simulator tests.
    const { transformSync } = sourceRequire('esbuild');
    const result = transformSync(source, { loader: 'ts', format: 'esm', target: 'es2022', sourcefile });
    assert.ok(result.code?.length, `${sourcefile}: TypeScript transpilation returned no JavaScript`);
    return 'esbuild';
  } catch (error) {
    // Local developer fallback only. A broken esbuild installation, or a real
    // compiler error, must not be silently ignored.
    if (error?.code !== 'MODULE_NOT_FOUND' || !/Cannot find module ['"]esbuild['"]/.test(String(error.message))) {
      throw error;
    }
    let ts;
    try { ts = scriptRequire('typescript'); } catch {
      throw new Error('Missing project compiler. Run `npm ci --prefix source` before simulator tests.', { cause: error });
    }
    const result = ts.transpileModule(source, {
      fileName: sourcefile,
      reportDiagnostics: true,
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext }
    });
    const errors = (result.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error);
    assert.equal(errors.length, 0, `${sourcefile}: invalid TypeScript syntax: ${errors.map(d => ts.flattenDiagnosticMessageText(d.messageText, ' ')).join('; ')}`);
    assert.ok(result.outputText?.length, `${sourcefile}: TypeScript transpilation returned no JavaScript`);
    return 'typescript';
  }
}
