import { FSOperationError, Log, checkPath, gzipFile, resolvePath } from "../utils/index.js";

const SRC_PATH = 'zip/files/fileToCompress.txt';
const DST_PATH = 'zip/files/archive.gz';

const compress = async () => {
  const src = resolvePath(SRC_PATH);
  const dst = resolvePath(DST_PATH);

  const { exists, isFile } = await checkPath(src);
  if (!exists || !isFile) {
    throw new FSOperationError();
  }
  await gzipFile(src, dst);
  console.log('\n', Log.style("green", '✓ compressed:'), `${SRC_PATH} -> ${DST_PATH}`);
};

await compress();