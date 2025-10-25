import { EOL } from 'node:os';
import { argv, exit, stdin, stdout } from 'node:process';

const args = argv.slice(2);

console.log(`\nTotal number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}${EOL}`);

stdin.on('data', (chunk) => {
  const chunkStringified = chunk.toString();
  if (chunkStringified.trim() === 'CLOSE') {
    exit(0);
  }
  stdout.write(`Received from master process: ${chunkStringified}${EOL}`);
});

// handle IPC channel messages from parent
process.on('message', (msg) => {
  console.log("IPC channel testing:");
  console.log(`[parent]: ${JSON.stringify(msg)}`);
  if (process.send) {
    process.send({ message: "Response from child", timestamp: Date.now() });
  }
});