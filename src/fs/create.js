import { writeFile } from 'node:fs/promises';
import { FSOperationError, resolvePath } from "../utils.js";

// NOTE: To run, enter in the terminal --> node src/fs/create.js
// Similarly for all other scripts

const FILE_CONTENTS = "I am fresh and young";

const create = async () => {
  const targetPath = resolvePath('fs/files/fresh.txt');
  try {
    await writeFile(targetPath, FILE_CONTENTS, {
      flag: 'wx'
    });
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new FSOperationError();
    } else {
      console.log(`Error: ${err.message}`);
    }
  }
};

await create();
