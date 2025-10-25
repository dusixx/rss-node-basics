import { spawn } from 'child_process';
import { checkPath, resolvePath } from '../utils/fs.js';
import { Log } from '../utils/misc.js';

const spawnChildProcess = async (args) => {
  const childPath = resolvePath('cp/files/script.js');

  const { exists } = await checkPath(childPath);
  if (!exists) {
    throw new FSOperationError();
  }
  const argv = Array.isArray(args) ? args : [];

  const child = spawn('node', [childPath, ...argv], {
    stdio: ['pipe', 'pipe', 'inherit', 'ipc']
  });
  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  process.on('exit', () => {
    child.kill();
  });
  process.on('SIGINT', () => {
    child.kill('SIGINT');
    process.exit(0);
  });

  if (child.send) {
    child.send({ message: "Request from parent", timestamp: Date.now() });
  }
  // handle IPC channel messages from child
  child.on('message', (msg) => {
    console.log(`[child]: ${JSON.stringify(msg)}\n`);
    child.disconnect();
    console.log("Input something and press", Log.style("bgCyanBright", "Enter"));
    console.log(`Type ${Log.style("bgCyanBright", "CLOSE")} or use ${Log.style("bgCyanBright", "Ctrl+C")} to exit\n`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess([1, "test", "test 1 2 3", null]);