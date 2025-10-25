import { checkPath, FSOperationError } from "./fs.js";
import zlib from 'zlib';
import stream from 'stream/promises';
import fs from 'fs';

/**
 * @param {string} src 
 * @param {string} dst 
 * @param {{flag: 'gzip' | 'gunzip', deleteSource: boolean}} options
 */
const process = async (src, dst, { flag = 'gzip', deleteSource = true } = {}) => {
  const { exists } = await checkPath(src);
  if (!exists) {
    throw new FSOperationError();
  }
  const gzip = zlib[flag === 'gzip' ? 'createGzip' : 'createGunzip']();
  const readStream = fs.createReadStream(src);
  const writeStream = fs.createWriteStream(dst);

  writeStream.on('open', async () => {
    await stream.pipeline(readStream, gzip, writeStream);
    if (deleteSource) {
      void fs.promises.unlink(src);
    }
  }).on('close', () => {
    writeStream.end();
  });
};

export const gzipFile = async (src, dst) => {
  await process(src, dst);
}

export const gunzipFile = async (src, dst) => {
  await process(src, dst, { flag: 'gunzip' })
}