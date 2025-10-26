import { FSOperationError, Log, checkPath, gunzipFile, resolvePath } from "../utils/index.js";

const SRC_PATH = 'zip/files/archive.gz';
const DST_PATH = 'zip/files/fileToCompress.txt';

const decompress = async () => {
  const src = resolvePath(SRC_PATH);
  const dst = resolvePath(DST_PATH);

  const { exists, isFile } = await checkPath(src);
  if (!exists || !isFile) {
    throw new FSOperationError();
  }
  await gunzipFile(src, dst);
  console.log('\n', Log.style("green", '✓ decompressed:'), `${SRC_PATH} -> ${DST_PATH}`);
};

await decompress();
