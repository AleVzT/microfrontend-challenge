#!/usr/bin/env node
// Zero-dependency orchestrator for the three independent apps.
// Each app keeps its own package.json and lockfile so it can be built and
// deployed on its own; this script only saves typing during local work and CI.
//
//   node scripts/workspace.mjs install          -> npm ci in every app
//   node scripts/workspace.mjs run <script>     -> npm run <script> in every app that defines it
//   node scripts/workspace.mjs start            -> build all apps, then serve them together
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Remotes first: the host references them by URL.
const APPS = ['rick-and-morty-app', 'potter-app', 'host-app'];
const COLORS = { 'rick-and-morty-app': 32, 'potter-app': 33, 'host-app': 36 };
const isWindows = process.platform === 'win32';

const hasScript = (app, script) =>
  Boolean(JSON.parse(readFileSync(join(app, 'package.json'), 'utf8')).scripts?.[script]);

const run = (app, args, { prefix = false } = {}) =>
  new Promise((resolve) => {
    const child = spawn('npm', args, { cwd: app, shell: isWindows, stdio: prefix ? 'pipe' : 'inherit' });
    if (prefix) {
      const tag = `\x1b[${COLORS[app]}m[${app}]\x1b[0m `;
      const pipe = (stream, out) =>
        stream.on('data', (chunk) =>
          chunk.toString().split(/\r?\n/).filter(Boolean).forEach((line) => out.write(tag + line + '\n')),
        );
      pipe(child.stdout, process.stdout);
      pipe(child.stderr, process.stderr);
    }
    child.on('close', (code) => resolve({ app, code: code ?? 1, child }));
    run.children.push(child);
  });
run.children = [];

async function sequential(argsFor, label) {
  const failed = [];
  for (const app of APPS) {
    const args = argsFor(app);
    if (!args) {
      console.log(`\n- ${app}: no "${label}" script, skipped`);
      continue;
    }
    console.log(`\n> ${app}: npm ${args.join(' ')}`);
    const { code } = await run(app, args);
    if (code !== 0) failed.push(app);
  }
  if (failed.length) {
    console.error(`\n✖ ${label} failed in: ${failed.join(', ')}`);
    process.exit(1);
  }
  console.log(`\n✔ ${label} passed in all apps`);
}

const [command, script] = process.argv.slice(2);

if (command === 'install') {
  await sequential(() => ['ci', '--no-fund', '--no-audit'], 'install');
} else if (command === 'run' && script) {
  await sequential((app) => (hasScript(app, script) ? ['run', script] : null), script);
} else if (command === 'start') {
  await sequential(() => ['run', 'build'], 'build');
  console.log('\nServing (Ctrl+C to stop):');
  console.log('  host               http://localhost:5174');
  console.log('  rick-and-morty-app http://localhost:5173');
  console.log('  potter-app         http://localhost:4174\n');
  // On Windows the child is a shell wrapping npm/vite: kill the whole process
  // tree, otherwise the preview servers keep running after Ctrl+C.
  const stopAll = () =>
    run.children.forEach((c) =>
      isWindows ? spawn('taskkill', ['/pid', String(c.pid), '/T', '/F'], { stdio: 'ignore' }) : c.kill(),
    );
  process.on('SIGINT', stopAll);
  process.on('SIGTERM', stopAll);
  const results = await Promise.all(APPS.map((app) => run(app, ['run', 'preview'], { prefix: true })));
  process.exit(results.some((r) => r.code !== 0) ? 1 : 0);
} else {
  console.error('Usage: node scripts/workspace.mjs <install | run <script> | start>');
  process.exit(1);
}
