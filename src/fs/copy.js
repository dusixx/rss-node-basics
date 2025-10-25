import { FSOperationError, resolvePath, checkPath, Log } from "../utils/index.js";
import fs from 'fs/promises';

const copy = async () => {
  const src = resolvePath('fs/files');
  const dst = resolvePath('fs/files_copy');

  const srcInfo = await checkPath(src);
  const dstInfo = await checkPath(dst);

  if (!srcInfo.exists || dstInfo.exists) {
    throw new FSOperationError();
  }
  await fs.cp(src, dst, { recursive: true });
  Log.success('\nSuccessfully copied!')
};

await copy();
