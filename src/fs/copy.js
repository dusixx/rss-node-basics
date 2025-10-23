import { FSOperationError, pathExists, resolvePath } from "../utils.js";
import fs from 'fs/promises';

const copy = async () => {
  const src = resolvePath('fs/files');
  const dst = resolvePath('fs/files_copy');

  const canBeCopied = await pathExists(src) && !await pathExists(dst);
  if (!canBeCopied) {
    throw new FSOperationError();
  }
  await fs.cp(src, dst, {
    recursive: true
  });
};

await copy();
