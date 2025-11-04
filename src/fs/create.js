import { writeFile } from 'node:fs/promises';
import { checkPath, FSOperationError, Log, resolvePath } from "../utils/index.js";

const DST_PATH = 'fs/files/fresh.txt';
const CONTENTS = 'I am fresh and young';

const create = async () => {
  const dst = resolvePath(DST_PATH);

  const { exists } = await checkPath(dst);
  if (exists) {
    throw new FSOperationError();
  }
  await writeFile(dst, CONTENTS);
  console.log(Log.style("green", '✓ created:'), DST_PATH);
};

await create();