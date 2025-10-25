import { writeInputToStream, Log } from '../utils/index.js';
import { Transform } from 'stream';
import { EOL } from 'os';

const transformStream = new Transform({
  transform(chunk, _, callback) {
    const line = chunk.toString().replace(/\s+$/, '').split('').reverse().join('')
    this.push(`${Log.style('cyanBright', 'reversed:')} ${line}${EOL}`);
    callback();
  }
});
const transform = async () => {
  Log.info('\nType ".exit" or use <Ctrl+C> to finish\n');
  writeInputToStream({ transformStream });
};

await transform();

