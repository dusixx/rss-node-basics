import { parentPort, workerData } from 'worker_threads';

const nthFibonacci = (n) => {
  return n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);
}

const sendResult = () => {
  const { id, data } = workerData ?? {};
  if (id == null || data == null) {
    return;
  }
  const message = {
    id,
    status: 'error',
    data: null,
    errorMessage: null
  };
  try {
    const result = nthFibonacci(data);
    // simulate error
    if (Math.random() < 0.3) {
      throw new Error("Something wrong");
    }
    message.status = 'resolved';
    message.data = result;
  } catch (err) {
    message.errorMessage = err.message;
  }
  parentPort.postMessage(message);
};

sendResult();