import fs from 'fs/promises';
import { checkPath, FSOperationError, Log, resolvePath } from "../utils/index.js";

const SRC_PATH = 'fs/files/fileToRead.txt';

const read = async () => {
  const src = resolvePath(SRC_PATH);

  const { exists, isFile } = await checkPath(src);
  if (!exists || !isFile) {
    throw new FSOperationError();
  }
  Log.info(`\n${SRC_PATH} contents:`);
  console.log(await fs.readFile(src, 'utf-8'));
};

await read();
