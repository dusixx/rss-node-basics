import { writeFile } from 'node:fs/promises';
import { checkPath, FSOperationError, Log, resolvePath } from "../utils/index.js";

const DST_PATH = 'fs/files/fresh.txt';

const create = async () => {
  const dst = resolvePath(DST_PATH);

  const { isFile, exists } = await checkPath(dst);
  if (isFile && exists) {
    throw new FSOperationError();
  }
  await writeFile(dst, 'I am fresh and young');
  console.log(`\n${DST_PATH}`);
  Log.success('\nSuccessfully created!')
};

await create();
