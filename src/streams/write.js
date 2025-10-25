import { checkPath, FSOperationError, resolvePath, writeInputToStream, Log } from "../utils/index.js";
import path from 'path';

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
