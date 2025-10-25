import { resolvePath, Log, gzipFile } from "../utils/index.js";

const compress = async () => {
  const src = resolvePath('zip/files/fileToCompress.txt');
  const dst = resolvePath('zip/files/archive.gz');

  await gzipFile(src, dst);
  Log.success('\nSuccessfully compressed!');
};

await compress();
