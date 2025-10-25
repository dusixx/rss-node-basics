import { resolvePath, FSOperationError, checkPath } from "../utils/fs.js";
import fs from 'fs';
import { Log } from "../utils/misc.js";

const read = async () => {
  const src = resolvePath('streams/files/fileToRead.txt');

  const { exists } = await checkPath(src);
  if (!exists) {
    throw new FSOperationError();
  }
  Log.info('\nFile contents:');
  fs.createReadStream(src).pipe(process.stdout);
};

await read();
