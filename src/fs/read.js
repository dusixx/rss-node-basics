import { FSOperationError, pathExists, resolvePath } from "../utils.js";
import fs from 'fs/promises';

const read = async () => {
  const src = resolvePath('fs/files/fileToRead.txt');
  if (!await pathExists(src)) {
    throw new FSOperationError();
  }
  const contents = await fs.readFile(src, 'utf-8');
  console.log(contents);
};

await read();
