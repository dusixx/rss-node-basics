import { Log } from "../utils/misc.js";

// NOTE: To run the script, use --> npm run cli:args

const parseArgs = () => {
  const map = {};
  let cur;

  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--')) {
      cur = arg;
      continue;
    }
    (map[cur] = map[cur] ?? []).push(arg);
  }
  const res = Object.entries(map).map(([k, v]) => {
    return `${k} is ${v}`
  });
  Log.info('\nParsed argv:');
  console.log(res.join(', ') || '(there is nothing here)');
};

parseArgs();