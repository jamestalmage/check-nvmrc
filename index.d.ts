export type Options = {
	/**
	The current working directory.

	@default process.cwd()
	 */
	readonly cwd?: URL | string;

	/**
	Allow symbolic links to match if they point to the requested path type.

	@default true
	 */
	readonly allowSymlinks?: boolean;

	/**
	Filename to search for.

	@default '.nvmrc'
	 */
	readonly filename?: string;
};

/**
My awesome module

@param options - optional. Defaults to searching from `process.cwd()`, and `allowSymlinks: true`.
 @throws Error If `.nvmrc` is not found.
 @throws Error If `.nvmrc` does not contain a valid Node.js version.
 @throws Error If the running node version does not find the version spec in `.nvmrc`.

@example
```
import checkNvmrc from 'check-nvmrc';

unicornFun('unicorns');
//=> 'unicorns & rainbows'
```
*/
export default function checkNvmrc(options?: Options): string;
