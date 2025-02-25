#!/usr/bin/env node
import * as process from 'node:process';
import checkNvmrc from './index.js';

if (process.argv.includes('--help') || process.argv.includes('-h')) {
	console.log(`
  Usage
	$ check-nvmrc
  Options
	--no-symlinks  Don't allow symlinks
  `);
	process.exit(0);
}

checkNvmrc({allowSymlinks: !process.argv.includes('--no-symlinks')});
