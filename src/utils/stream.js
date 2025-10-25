import fs from 'fs';
import { EOL } from "os";
import { stdin, stdout } from 'process';
import readline from 'readline';
import { Transform } from "stream";
import { checkPath } from './fs.js';

/**
 * @param {{transformStream: Transform | undefined, filePath: string, exitCmd: string}} props
 */
export const writeInputToStream = async ({ transformStream, filePath, exitCmd = '.exit' } = {}) => {
  const { isFile, writeable } = await checkPath(filePath);
  let writeStream = isFile && writeable ? fs.createWriteStream(filePath) : null;

  if (transformStream instanceof Transform) {
    transformStream.pipe(writeStream ?? stdout);
    writeStream = transformStream;
  }
  const rl = readline.createInterface({ input: stdin, output: stdout });
  rl.setPrompt('> ');
  rl.prompt();

  rl.on('line', (line) => {
    if (line.trim() === exitCmd) {
      rl.close();
    }
    writeStream.write(`${line}${EOL}`);
    rl.prompt();
  }).on('close', () => {
    writeStream.end();
    process.exit(0);
  });
};