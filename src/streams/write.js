import path from 'path';
import { checkPath, FSOperationError, Log, resolvePath, writeInputToStream } from "../utils/index.js";

const write = async () => {
  const filePath = resolvePath('streams/files/fileToWrite.txt');

  const { exists, isFile } = await checkPath(filePath);
  if (!exists || !isFile) {
    throw new FSOperationError();
  }
  const { name, ext } = path.parse(filePath);
  Log.info('Input something and press <Enter>');
  Log.info(`All input will be saved to <${name}${ext}>`);
  Log.info(`Type ".exit" or use <Ctrl+C> to finish\n`);

  await writeInputToStream({ filePath, onClose: () => process.exit(0) });
};

await write();