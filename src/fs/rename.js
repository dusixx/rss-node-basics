import fs from 'fs/promises';
import { checkPath, FSOperationError, Log, resolvePath } from "../utils/index.js";

const SRC_PATH = 'fs/files/wrongFilename.txt';
const DST_PATH = 'fs/files/properFilename.md';

const rename = async () => {
  const src = resolvePath(SRC_PATH);
  const dst = resolvePath(DST_PATH);

  const srcInfo = await checkPath(src);
  const dstInfo = await checkPath(dst);

  const canBeRenamed = srcInfo.exists && srcInfo.isFile && !dstInfo.exists;
  if (!canBeRenamed) {
    throw new FSOperationError();
  }
  await fs.rename(src, dst);
  console.log('\n', Log.style("green", '✓ renamed:'), `${SRC_PATH} -> ${DST_PATH}`);
};

await rename();
