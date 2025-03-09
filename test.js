import {fileURLToPath} from 'node:url';
import path from 'node:path';
import test from 'ava';
import nvexeca from 'nvexeca';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

const shouldPass = test.macro({
	async exec(t, folder, runWithVersion, _overrideSpecDescription) {
		const {childProcess} = await nvexeca(runWithVersion, 'node', ['../../cli.js'], {
			cwd: path.join(currentDirectory, 'fixtures', folder),
		});
		const {exitCode} = await childProcess;
		t.is(exitCode, 0, 'Exit code should be 0');
	},
	title(providedTitle = '', folder, runWithVersion, overrideSpecDescription) {
		if (providedTitle !== '') {
			return providedTitle;
		}

		const specDescription = overrideSpecDescription === undefined ? folder : overrideSpecDescription;
		return `.nvmrc spec "${specDescription}" passes when run with node version ${runWithVersion}`;
	},
});

const shouldFail = test.macro({
	async exec(t, folder, runWithVersion, _overrideSpecDescription) {
		await t.throwsAsync(async () => {
			const {childProcess} = await nvexeca(runWithVersion, 'node', ['../../cli.js'], {
				cwd: path.join(currentDirectory, 'fixtures', folder),
			});
			await childProcess;
		});
	},
	title(providedTitle = '', folder, runWithVersion, overrideSpecDescription) {
		if (providedTitle !== '') {
			return providedTitle;
		}

		const specDescription = overrideSpecDescription === undefined ? folder : overrideSpecDescription;
		return `.nvmrc spec "${specDescription}" should fail when run with node version ${runWithVersion}`;
	},
});

test(shouldPass, 'v22.14.0', '22.14.0');
test(shouldFail, 'v22.13.0', '22.14.0');
test(shouldFail, 'v22.14.0', '22.13.0');
test(shouldPass, 'v20', '20.18.3');
test(shouldPass, 'v20', '20.13.1');
test(shouldFail, 'v22', '20.13.1');
test(shouldPass, 'v22.13', '22.13.1');
test(shouldPass, 'v22.13', '22.13.0');
test(shouldFail, 'v22.13', '22.14.0');
test('should fail if malformed', shouldFail, 'malformed', '22.14.0');
test('should fail if none found', shouldFail, 'none', '22.14.0');
