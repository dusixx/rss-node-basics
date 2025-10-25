import { checkPath, FSOperationError, resolvePath } from "../utils/fs.js";
import path from 'path';
import { writeInputToStream } from "../utils/stream.js";
import { Log } from "../utils/misc.js";

const write = async () => {
  const filePath = resolvePath('streams/files/fileToWrite.txt');

  const { exists } = await checkPath(filePath);
  if (!exists) {
    throw new FSOperationError();
  }
  const { name, ext } = path.parse(filePath);
  console.log(`\nAll input will be saved to "${name}${ext}"`);
  Log.info('Type ".exit" or use <Ctrl+C> to finish\n');

  await writeInputToStream({ filePath });
};

await write();
