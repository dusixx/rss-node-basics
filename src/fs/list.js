import { checkPath, FSOperationError, getDirents, resolvePath } from "../utils/fs.js";
import { Log } from "../utils/misc.js";

const list = async () => {
  const src = resolvePath('fs/files');

  const { exists } = await checkPath(src);
  if (!exists) {
    throw new FSOperationError()
  }
  const dirents = await getDirents(src) || [];
  Log.info('\nFiles list:');
  for (const ent of dirents) {
    if (ent.isFile()) {
      console.log(ent.name);
    }
  }
};

await list();
