import { Log, gunzipFile, resolvePath } from "../utils/index.js";

const SRC_PATH = 'zip/files/archive.gz';
const DST_PATH = 'zip/files/fileToCompress.txt';

const decompress = async () => {
  const src = resolvePath(SRC_PATH);
  const dst = resolvePath(DST_PATH);

  await gunzipFile(src, dst);
  console.log(`\n${SRC_PATH} -> ${DST_PATH}`)
  Log.success('\nSuccessfully decompressed!');
};

await decompress();
