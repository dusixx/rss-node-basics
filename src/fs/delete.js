import { checkPath, FSOperationError, resolvePath } from "../utils/fs.js";
import fs from 'fs/promises';
import { Log } from "../utils/misc.js";

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
