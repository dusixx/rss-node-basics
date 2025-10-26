import { Log } from "../utils/misc.js";

// NOTE: To run the script, use --> npm run cli:env

const parseEnv = () => {
  const result = Object.entries(process.env).reduce((res, [k, v]) => {
    if (k.startsWith('RSS_')) {
      res.push(`${k}=${v}`);
    }
    return res;
  }, []);
  Log.info('\nParsed env:');
  console.log(result.join('; ') || '(there is nothing here)')
};

parseEnv();