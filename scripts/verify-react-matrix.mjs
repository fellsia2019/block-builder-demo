#!/usr/bin/env node
/**
 * Verifies demo-bb production build with React 18 and React 19.
 * Usage: node scripts/verify-react-matrix.mjs
 */
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const MATRIX = [
  {
    label: 'React 18',
    packages: [
      'react@18.3.1',
      'react-dom@18.3.1',
      '@types/react@18.3.12',
      '@types/react-dom@18.3.1',
    ],
  },
  {
    label: 'React 19',
    packages: [
      'react@19.1.0',
      'react-dom@19.1.0',
      '@types/react@19.1.2',
      '@types/react-dom@19.1.2',
    ],
  },
];

function run(command) {
  execSync(command, { cwd: rootDir, stdio: 'inherit', shell: true });
}

for (const entry of MATRIX) {
  console.log(`\n[demo-bb react-compat] Build — ${entry.label}\n`);
  run(`npm install --no-save ${entry.packages.join(' ')}`);
  run('npm run build');
}

console.log('\n[demo-bb react-compat] Restoring default dependencies…');
run('npm install');

console.log('\n[demo-bb react-compat] React 18 and 19 builds passed.\n');
