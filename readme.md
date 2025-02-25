# check-nvmrc

> Ensures that the node version in the `.nvmrc` file matches the current node version

## Install

```sh
npm install check-nvmrc
```

## Usage

From javascript
```js
import { checkNvmrc } from 'check-nvmrc';

checkNvmrc();
// Throws if `.nvmrc` not found or node version mismatch.
```

From command line
```sh
npx check-nvmrc
# Throws if `.nvmrc` not found or node version mismatch.
```

## API

### checkNvmrc(options?)

#### options

Type: `object`

##### cwd

Type: `string` | `URL`\
Default: `process.cwd()`

The default directory.

##### allowSymLinks

Type: `boolean`
Default: `true`

Follow symlinks.
