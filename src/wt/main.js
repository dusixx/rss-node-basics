import { checkPath, FSOperationError, resolvePath, Log } from '../utils/index.js';
import { Worker } from 'worker_threads';
import { cpus } from 'os';

const INIT_NUM = 10;
const LOGICAL_CPU_CORES_LEN = cpus().length;

const createWorker = (workerPath, workerData) => {
  return new Promise((resolve, reject) => {
    new Worker(workerPath, { workerData })
      .on('message', resolve)
      .on('error', reject);
  });
}

const runFibCalcTasks = async (workerPath) => {
  const workers = Array
    .from({ length: LOGICAL_CPU_CORES_LEN })
    .map((_, id) => createWorker(workerPath, { id, data: INIT_NUM + id }));

  return (await Promise.all(workers)).map(({ status, data }) => ({ status, data }));
}

const performCalculations = async () => {
  const workerPath = resolvePath('wt/worker.js');

  const { exists } = await checkPath(workerPath);
  if (!exists) {
    throw new FSOperationError();
  }
  Log.info(`\nResults (${LOGICAL_CPU_CORES_LEN} logical CPU cores):`);
  console.log(await runFibCalcTasks(workerPath));
};

await performCalculations();
