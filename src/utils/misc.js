import { styleText } from "util";

/**
 * @param {number} ms 
 * @returns {Promise<void>}
 */
export const wait = (ms) => {
  return new Promise(r => setTimeout(r, ms));
}

export const Log = {
  /**
   * @param  {Parameters<typeof styleText>} args 
   * @returns 
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