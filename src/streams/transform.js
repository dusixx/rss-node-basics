import { Transform } from 'stream';
import { writeInputToStream } from '../utils/stream.js';
import { EOL } from 'os';
import { Log } from '../utils/misc.js';

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

