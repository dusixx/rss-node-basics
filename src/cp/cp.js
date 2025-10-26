import { spawn } from 'child_process';
import { checkPath, Log, resolvePath } from '../utils/index.js';

const CP_PATH = 'cp/files/script.js';

const spawnChildProcess = async (args) => {
  const childPath = resolvePath(CP_PATH);

  const { exists, isFile } = await checkPath(childPath);
  if (!exists || !isFile) {
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
  }).on('SIGINT', () => {
    child.kill('SIGINT');
    process.exit(0);
  });

  if (child.send) {
    child.send({ message: "Request from parent", timestamp: Date.now() });
  }
  // handle IPC channel messages from child
  child.on('message', (msg) => {
    console.log(`[child]: ${JSON.stringify(msg)}`);
    child.disconnect();
    console.log();
    Log.info('Input something and press <Enter>');
    Log.info(`Type "CLOSE" or use <Ctrl+C> to exit\n`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess([1, "test", "test 1 2 3", null]);