import { Log } from "../utils/index.js";

const parseEnv = () => {
  const result = Object.entries(process.env).reduce((res, [k, v]) => {
    if (k.startsWith('RSS_')) {
      res.push(`${k}=${v}`);
    }
    return res;
  }, []);
  Log.info('Parsed env:');
  console.log(result.join('; ') || '(there is nothing here)')
};

parseEnv();