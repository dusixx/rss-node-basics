import { pathExists, resolvePath } from "../utils.js";
import fs from 'fs/promises';

const rename = async () => {
  const src = resolvePath('fs/files/wrongFilename.txt');
  const dst = resolvePath('fs/files/properFilename.md');

  const canBeCopied = await pathExists(src) && !await pathExists(dst);
  if (!canBeCopied) {
    throw new FSOperationError();
  }
  await fs.rename(src, dst);
};

await rename();
