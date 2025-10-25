import { styleText } from "util";

export const isStr = v => typeof v === 'string';

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