import { checkPath, FSOperationError, resolvePath, Log } from "../utils/index.js";
import fs from 'fs/promises';

const rename = async () => {
  const src = resolvePath('fs/files/wrongFilename.txt');
  const dst = resolvePath('fs/files/properFilename.md');

  const srcInfo = await checkPath(src);
  const dstInfo = await checkPath(dst);

  if (!srcInfo.exists || dstInfo.exists) {
    throw new FSOperationError();
  }
  await fs.rename(src, dst);
  Log.success('\nSuccessfully renamed!')
};

await rename();
