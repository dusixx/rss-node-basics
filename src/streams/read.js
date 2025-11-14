import fs from 'fs';
import { checkPath, FSOperationError, Log, resolvePath } from "../utils/index.js";

const DST_PATH = 'streams/files/fileToRead.txt'

const read = async () => {
  const src = resolvePath(DST_PATH);

  const { exists, isFile } = await checkPath(src);
  if (!exists || !isFile) {
    throw new FSOperationError();
  }
  const readStream = fs.createReadStream(src);
  readStream.on('end', () => console.log()).pipe(process.stdout);
  Log.info(`${DST_PATH} contents:`);
}

await read();