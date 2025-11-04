import fs from 'fs';
import { EOL } from "os";
import { stdin, stdout } from 'process';
import readline from 'readline';
import { Transform } from "stream";
import { checkPath } from './fs.js';

/**
 * @param {{
 *  transformStream: Transform, 
 *  filePath: string, 
 *  exitCmd: string, 
 *  prompt: string
 *  onClose: () => void
 * }}
 */
export const writeInputToStream = async ({ transformStream, filePath, exitCmd = '.exit', prompt = '> ', onClose } = {}) => {
  const { isFile, writeable } = await checkPath(filePath);
  let writeStream = isFile && writeable ? fs.createWriteStream(filePath) : null;

  if (transformStream instanceof Transform) {
    transformStream.pipe(writeStream ?? stdout);
    writeStream = transformStream;
  }
  const rl = readline.createInterface({ input: stdin, output: stdout });
  rl.setPrompt(prompt);
  rl.prompt();

  rl.on('line', (line) => {
    if (line.trim() === exitCmd) {
      rl.close();
    } else {
      writeStream.write(`${line}${EOL}`);
      rl.prompt();
    }
  });
  return new Promise((resolve) => {
    rl.on('close', () => {
      writeStream.end();
      onClose?.();
      resolve();
    });
  })
};