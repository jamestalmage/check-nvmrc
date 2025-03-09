import fs from 'node:fs';
import * as process from 'node:process';
import {findUpSync} from 'find-up';
import semver from 'semver';

export default function checkNvmrc(options) {
	options ||= {};
	const cwd = options.cwd || process.cwd();
	const allowSymlinks = options.allowSymlinks !== false;
	const filename = options.filename || '.nvmrc';

	const nvmrcPath = findUpSync(filename, {cwd, allowSymlinks});
	if (!nvmrcPath) {
		throw new Error('No .nvmrc file found.');
	}

	const nvmrc = fs.readFileSync(nvmrcPath, 'utf8');

	if (!semver.satisfies(process.version, nvmrc)) {
		throw new Error(`Node.js version ${process.version} does not satisfy '${nvmrc}' from file ${nvmrcPath}`);
	}
}
