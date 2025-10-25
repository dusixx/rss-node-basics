import { writeFile } from 'node:fs/promises';
import { checkPath, FSOperationError, resolvePath } from "../utils/fs.js";
import { Log } from '../utils/misc.js';

const create = async () => {
  const dst = resolvePath('fs/files/fresh.txt');

  const { isFile, exists } = await checkPath(dst);
  if (isFile && exists) {
    throw new FSOperationError();
  }
  await writeFile(dst, 'I am fresh and young', { flag: 'wx' });
  Log.success('\nSuccessfully created!')
};

await create();
