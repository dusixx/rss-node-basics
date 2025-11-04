import { createServer as createServerHttp } from 'http';
import { release, version } from 'os';
import path from 'path';
import { Log } from '../utils/misc.js';
import './files/c.cjs';

const PORT = 3000;

const importJSON = async (path) => await import(path, { with: { type: 'json' } })

export const unknownObject = (Math.random() > 0.5
  ? await importJSON('./files/a.json')
  : await importJSON('./files/b.json')
).default;

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);
console.log(`Path to current file is ${import.meta.filename}`);
console.log(`Path to current directory is ${import.meta.dirname}`);
console.log(unknownObject);

export const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});
myServer.listen(PORT, () => {
  console.log();
  console.log(`Server is listening on port ${PORT}`);
  Log.info(`<Ctrl+C> to exit`);
});