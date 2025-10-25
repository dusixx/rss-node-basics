import { styleText } from "util";
import { Worker } from 'worker_threads';

export const Log = {
  /**
   * @param  {Parameters<typeof styleText>} args 
   */
  style(...args) {
    return styleText(...args);
  },
  success(...args) {
    console.log(styleText("bgGreenBright", args.join(' ')));
  },
  info(...args) {
    console.log(styleText("bgCyanBright", args.join(' ')));
  },
  error(...args) {
    console.log(styleText("bgRedBright", args.join(' ')));
  }
}

/**
 * @param {string} workerPath 
 * @param {unknown} workerData 
 */
export const createWorker = (workerPath, workerData) => {
  return new Promise((resolve, reject) => {
    new Worker(workerPath, { workerData })
      .on('message', resolve)
      .on('error', reject);
  });
}
