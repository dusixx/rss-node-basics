import { pathExists, resolvePath } from "../utils.js";
import crypto from 'crypto';
import stream from 'stream/promises';
import fs from 'fs';

const calculateHash = async () => {
  const src = resolvePath('hash/files/fileToCalculateHashFor.txt');
  if (!await pathExists(src)) {
    throw new FSOperationError();
  }
  const sha256 = crypto.createHash('sha256');
  await stream.pipeline(fs.createReadStream(src), sha256);

  console.log(sha256.digest('hex'));
};

await calculateHash();
