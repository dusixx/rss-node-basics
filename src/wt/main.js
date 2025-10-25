import { cpus } from 'os';
import { checkPath, createWorker, FSOperationError, Log, resolvePath } from '../utils/index.js';

const INIT_NUM = 10;
const LOGICAL_CPU_CORES_LEN = cpus().length;

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
