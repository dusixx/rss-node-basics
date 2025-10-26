import crypto from 'crypto';
import fs from 'fs';
import stream from 'stream/promises';
import { checkPath, FSOperationError, Log, resolvePath } from "../utils/index.js";

const calculateHash = async () => {
  const src = resolvePath('hash/files/fileToCalculateHashFor.txt');

  const { exists, isFile } = await checkPath(src);
  if (!exists || !isFile) {
    throw new FSOperationError();
  }
  const sha256 = crypto.createHash('sha256');
  await stream.pipeline(fs.createReadStream(src), sha256);
  const hash = sha256.digest('hex');

  console.log(Log.style("green", `\n✓ [SHA256]:`), hash);
};

await calculateHash();