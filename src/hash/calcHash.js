import { checkPath, FSOperationError, resolvePath, Log } from "../utils/index.js";
import crypto from 'crypto';
import stream from 'stream/promises';
import fs from 'fs';

const VALID_HASH = '7b90ad9e325c1c22b15c36cbe19413e3c471e5a711b8b828c8ebfcfd71d1d6db'

const calculateHash = async () => {
  const src = resolvePath('hash/files/fileToCalculateHashFor.txt');

  const { exists } = await checkPath(src);
  if (!exists) {
    throw new FSOperationError();
  }
  const sha256 = crypto.createHash('sha256');
  await stream.pipeline(fs.createReadStream(src), sha256);
  const hash = sha256.digest('hex');

  Log[hash === VALID_HASH ? 'success' : 'error']('\nSHA256:', hash, '\n');
};

await calculateHash();
