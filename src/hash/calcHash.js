import crypto from 'crypto';
import fs from 'fs';
import stream from 'stream/promises';
import { checkPath, FSOperationError, Log, resolvePath } from "../utils/index.js";

const VALID_HASH = '7b90ad9e325c1c22b15c36cbe19413e3c471e5a711b8b828c8ebfcfd71d1d6db'

const calculateHash = async () => {
  const src = resolvePath('hash/files/fileToCalculateHashFor.txt');

  const { exists, isFile } = await checkPath(src);
  if (!exists || !isFile) {
    throw new FSOperationError();
  }
  const sha256 = crypto.createHash('sha256');
  await stream.pipeline(fs.createReadStream(src), sha256);
  const hash = sha256.digest('hex');

  const color = hash === VALID_HASH ? 'green' : 'red';
  const mark = hash === VALID_HASH ? '✓' : '✗';
  console.log(Log.style(color, `\n${mark} [SHA256]:`), hash);
};

await calculateHash();
