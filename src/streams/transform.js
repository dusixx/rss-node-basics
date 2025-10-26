import { Transform } from 'stream';
import { Log, writeInputToStream } from '../utils/index.js';

const transformStream = new Transform({
  transform(chunk, _, callback) {
    const line = chunk.toString().replace(/\s+$/, '').split('').reverse().join('')
    this.push(`${Log.style('blackBright', 'reversed:')} ${line}\n`);
    callback();
  }
});
const transform = async () => {
  Log.info('\nInput something and press <Enter>');
  Log.info('Type ".exit" or use <Ctrl+C> to exit\n');

  await writeInputToStream({ transformStream, onClose: () => process.exit(0) });
};

await transform();

