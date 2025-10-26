import fs from 'fs';
import stream from 'stream/promises';
import zlib from 'zlib';

/**
 * @param {string} src 
 * @param {string} dst 
 * @param {{flag: 'gzip' | 'gunzip', deleteSource: boolean}} options
 */
const process = async (src, dst, { flag = 'gzip', deleteSource = true } = {}) => {
  const gzip = zlib[flag === 'gzip' ? 'createGzip' : 'createGunzip']();
  const readStream = fs.createReadStream(src);
  const writeStream = fs.createWriteStream(dst);

  return new Promise((resolve) => {
    writeStream.on('open', async () => {
      await stream.pipeline(readStream, gzip, writeStream);

      if (deleteSource) {
        void fs.promises.unlink(src);
      }
      resolve();
    }).on('close', () => {
      writeStream.end();
    });
  })
};

/**
 * @param {string} src 
 * @param {string} dst 
 */
export const gzipFile = async (src, dst) => {
  return await process(src, dst);
}

/**
 * @param {string} src 
 * @param {string} dst 
 */
export const gunzipFile = async (src, dst) => {
  return await process(src, dst, { flag: 'gunzip' })
}