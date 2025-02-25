import {fileURLToPath} from 'node:url';
import path from 'node:path';
import test from 'ava';
import nvexeca from 'nvexeca';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

test('22.14.0 passes when run on the appropriate version', async t => {
	const {childProcess} = await nvexeca('22.14.0', 'node', ['../../cli.js'], {
		cwd: path.join(currentDirectory, 'fixtures', 'v22.14.0'),
	});
	const {exitCode} = await childProcess;
	t.is(exitCode, 0, 'Exit code should be 0');
});

test('22.13.0 fails when run with 22.14.0 spec', async t => {
	await t.throwsAsync(async () => {
		const {childProcess} = await nvexeca('22.13.0', 'node', ['../../cli.js'], {
			cwd: path.join(currentDirectory, 'fixtures', 'v22.14.0'),
		});
		await childProcess;
	});
});

test('22.14.0 fails when run with 22.13.0 spec', async t => {
	await t.throwsAsync(async () => {
		const {childProcess} = await nvexeca('22.14.0', 'node', ['../../cli.js'], {
			cwd: path.join(currentDirectory, 'fixtures', 'v22.13.0'),
		});
		await childProcess;
	});
});

test('throws if malformed', async t => {
	await t.throwsAsync(async () => {
		const {childProcess} = await nvexeca('22.14.0', 'node', ['../../cli.js'], {
			cwd: path.join(currentDirectory, 'fixtures', 'malformed'),
		});
		await childProcess;
	});
});

test('throws if none found', async t => {
	await t.throwsAsync(async () => {
		const {childProcess} = await nvexeca('22.14.0', 'node', ['../../cli.js'], {
			cwd: path.join(currentDirectory, 'fixtures', 'none'),
		});
		await childProcess;
	});
});
