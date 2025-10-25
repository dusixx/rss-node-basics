import { EOL } from 'os';
import { Transform } from 'stream';
import { Log, writeInputToStream } from '../utils/index.js';

const transformStream = new Transform({
  transform(chunk, _, callback) {
    const line = chunk.toString().replace(/\s+$/, '').split('').reverse().join('')
    this.push(`${Log.style('cyanBright', 'reversed:')} ${line}${EOL}`);
    callback();
  }
});
const transform = async () => {
  console.log(`\nType ${Log.style("bgCyanBright", ".exit")} or use ${Log.style("bgCyanBright", "Ctrl+C")} to finish\n`);
  writeInputToStream({ transformStream });
};

await transform();

