import { FSOperationError, pathExists, resolvePath } from "../utils.js";
import fs from 'fs/promises';

const remove = async () => {
  const src = resolvePath('fs/files/fileToRemove.txt');
  if (!await pathExists(src)) {
    throw new FSOperationError();
  }
  await fs.unlink(src);
};

await remove();
