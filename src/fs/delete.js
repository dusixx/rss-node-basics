import fs from 'fs/promises';
import { checkPath, FSOperationError, Log, resolvePath } from "../utils/index.js";

const SRC_PATH = 'fs/files/fileToRemove.txt';

const remove = async () => {
  const src = resolvePath(SRC_PATH);

  const { exists } = await checkPath(src);
  if (!exists) {
    throw new FSOperationError();
  }
  await fs.unlink(src);
  console.log(`\n${SRC_PATH}`);
  Log.success('\nSuccessfully deleted!')
};

await remove();
