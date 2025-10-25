import { Log, gzipFile, resolvePath } from "../utils/index.js";

const SRC_PATH = 'zip/files/fileToCompress.txt';
const DST_PATH = 'zip/files/archive.gz';

const compress = async () => {
  const src = resolvePath(SRC_PATH);
  const dst = resolvePath(DST_PATH);

  await gzipFile(src, dst);
  console.log(`\n${SRC_PATH} -> ${DST_PATH}`)
  Log.success('\nSuccessfully compressed!');
};

await compress();
