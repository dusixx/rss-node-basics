import { styleText } from "util";

export const isStr = v => typeof v === 'string';

export const Log = {
  success(...args) {
    console.log(styleText("bgGreenBright", args.join(' ')));
  },
  info(...args) {
    console.log(styleText("bgCyanBright", args.join(' ')));
  }
}