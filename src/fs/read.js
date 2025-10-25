import { checkPath, FSOperationError, resolvePath, Log } from "../utils/index.js";
import fs from 'fs/promises';

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
