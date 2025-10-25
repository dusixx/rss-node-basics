import path from 'path';
import { checkPath, FSOperationError, Log, resolvePath, writeInputToStream } from "../utils/index.js";

const write = async () => {
  const filePath = resolvePath('streams/files/fileToWrite.txt');

  const { exists } = await checkPath(filePath);
  if (!exists) {
    throw new FSOperationError();
  }
  const { name, ext } = path.parse(filePath);
  console.log(`\nAll input will be saved to ${Log.style("bgCyanBright", name + ext)}`);
  console.log(`Type ${Log.style("bgCyanBright", ".exit")} or use ${Log.style("bgCyanBright", "Ctrl+C")} to finish\n`);

  await writeInputToStream({ filePath });
};

await write();
