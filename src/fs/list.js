import { FSOperationError, getDirents, pathExists, resolvePath } from "../utils.js";

const list = async () => {
  const src = resolvePath('fs/files');
  if (!await pathExists(src)) {
    throw new FSOperationError()
  }
  const dirents = await getDirents(src);
  if (!dirents) {
    console.log('Nothing to list');
  }
  for (const ent of dirents) {
    if (ent.isFile()) {
      console.log(ent.name);
    }
  }
};

await list();
