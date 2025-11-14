import { availableParallelism } from 'os';
import { checkPath, createWorker, FSOperationError, Log, resolvePath } from '../utils/index.js';

const INIT_NUM = 10;
const LOGICAL_CPU_CORES = availableParallelism();

/**
 * @param {string} workerPath 
 * @returns {Promise<{status: 'resolved' | 'error', data: unknown}>}
 */
const calculateFibonacci = async (workerPath) => {
  const workers = Array
    .from({ length: LOGICAL_CPU_CORES })
    .map((_, idx) => createWorker(workerPath, INIT_NUM + idx));

  return (await Promise.allSettled(workers)).map(({ status, value }) => {
    return status === 'fulfilled'
      ? { status: 'resolved', data: value }
      : { status: 'error', data: null }
  });
}

const performCalculations = async () => {
  const workerPath = resolvePath('wt/worker.js');

  const { exists, isFile } = await checkPath(workerPath);
  if (!exists || !isFile) {
    throw new FSOperationError();
  }
  Log.info(`Results (${LOGICAL_CPU_CORES} logical CPU cores):`);
  console.log(await calculateFibonacci(workerPath));
};

await performCalculations();