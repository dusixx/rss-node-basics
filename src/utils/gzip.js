import fs from 'fs';
import stream from 'stream/promises';
import zlib from 'zlib';

/**
 * @param {string} src 
 * @param {string} dst 
 * @param {{method: 'Gzip' | 'Gunzip', deleteSource: boolean}} options
 */
const gzipUnzip = async (src, dst, { method = 'Gzip', deleteSource = true } = {}) => {
  const gzip = zlib[`create${method}`]();
  const readStream = fs.createReadStream(src);
  const writeStream = fs.createWriteStream(dst);

  await stream.pipeline(readStream, gzip, writeStream);
  if (deleteSource) {
    await fs.promises.unlink(src);
  }
};

/**
 * @param {string} src 
 * @param {string} dst 
 */
export const gzipFile = async (src, dst) => {
  return await gzipUnzip(src, dst, { method: 'Gzip' });
}

/**
 * @param {string} src 
 * @param {string} dst 
 */
export const gunzipFile = async (src, dst) => {
  return await gzipUnzip(src, dst, { method: 'Gunzip' })
}