import { checkPath, FSOperationError, getDirents, Log, resolvePath } from "../utils/index.js";

const SRC_PATH = 'fs/files';

const list = async () => {
  const src = resolvePath(SRC_PATH);

  const { exists, isFile } = await checkPath(src);
  if (!exists || isFile) {
    throw new FSOperationError()
  }
  const list = (await getDirents(src) ?? []).reduce((res, ent) => {
    return res.concat(ent.isFile() ? ent.name : []);
  }, []);
  Log.info(`\n${SRC_PATH}:`);
  console.table(list.length ? list : '(there is nothing here)');
};

await list();