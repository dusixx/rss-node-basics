import { resolvePath, FSOperationError, checkPath, Log } from "../utils/index.js";
import fs from 'fs';

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
