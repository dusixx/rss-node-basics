import { Log } from "../utils/misc.js";

// NOTE: To test the script, use --> npm run cli:args
// Or use command --> node src/cli/args.js --some-arg value1 --other 1337 --arg2 42

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
  console.log(res.join(', '));
};

parseArgs();