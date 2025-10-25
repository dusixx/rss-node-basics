import path, { dirname } from 'path';
import { fileURLToPath } from "url";
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.cjs';
import { Log } from '../utils/misc.js';

const PORT = 3000;

const importJSON = async (path) => await import(path, { with: { type: 'json' } })

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const unknownObject = (Math.random() > 0.5
  ? await importJSON('./files/a.json')
  : await importJSON('./files/b.json')
).default;

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);
console.log(unknownObject);

export const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});
myServer.listen(PORT, () => {
  console.log(`\nServer is listening on port ${PORT}`);
  Log.info('Use <Ctrl+C> to terminate');
});