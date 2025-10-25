import { checkPath, FSOperationError, resolvePath } from "../utils/fs.js";
import fs from 'fs/promises';
import { Log } from "../utils/misc.js";

const read = async () => {
  const src = resolvePath('fs/files/fileToRead.txt');

  const { exists } = await checkPath(src);
  if (!exists) {
    throw new FSOperationError();
  }
  const contents = await fs.readFile(src, 'utf-8');
  Log.info('\nFile contents:');
  console.log(contents);
};

await read();
