import fs from 'fs/promises';
import { checkPath, FSOperationError, Log, resolvePath } from "../utils/index.js";

const SRC_PATH = 'fs/files';
const DST_PATH = 'fs/files_copy';

const copy = async () => {
  const src = resolvePath(SRC_PATH);
  const dst = resolvePath(DST_PATH);

  const srcInfo = await checkPath(src);
  const dstInfo = await checkPath(dst);

  if (!srcInfo.exists || dstInfo.exists) {
    throw new FSOperationError();
  }
  await fs.cp(src, dst, { recursive: true });
  console.log(`\n${SRC_PATH} -> ${DST_PATH}`)
  Log.success('\nSuccessfully copied!')
};

await copy();
