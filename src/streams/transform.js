import { Transform } from 'stream';
import { Log, writeInputToStream } from '../utils/index.js';

const reverse = (chunk) => {
  return chunk.toString().replace(/\s+$/, '').split('').reverse().join('');
}
const transformStream = new Transform({
  transform(chunk, _, callback) {
    const line = reverse(chunk);
    if (line) {
      this.push(`${Log.style('blackBright', 'reversed:')} ${line}\n`);
    }
    callback();
  }
});
const transform = async () => {
  Log.info('\nInput something and press <Enter>');
  Log.info('Type ".exit" or use <Ctrl+C> to exit\n');

  await writeInputToStream({ transformStream, onClose: () => process.exit(0) });
};

await transform();