import fs from 'fs';
import { checkPath, FSOperationError, Log, resolvePath } from "../utils/index.js";

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
