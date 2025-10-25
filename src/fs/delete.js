import { checkPath, FSOperationError, resolvePath, Log } from "../utils/index.js";
import fs from 'fs/promises';

const remove = async () => {
  const src = resolvePath('fs/files/fileToRemove.txt');

  const { exists } = await checkPath(src);
  if (!exists) {
    throw new FSOperationError();
  }
  await fs.unlink(src);
  Log.success('\nSuccessfully deleted!')
};

await remove();
