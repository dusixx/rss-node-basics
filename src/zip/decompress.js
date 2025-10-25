import { resolvePath, Log, gunzipFile } from "../utils/index.js";

const decompress = async () => {
  const src = resolvePath('zip/files/archive.gz');
  const dst = resolvePath('zip/files/fileToCompress.txt');

  await gunzipFile(src, dst);
  Log.success('\nSuccessfully decompressed!');
};

await decompress();
