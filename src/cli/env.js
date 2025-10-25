import { Log } from "../utils/misc.js";

// NOTE: To test the script, use --> npm run cli:env
// Or uncomment the lines below

// process.env.SOME = 'any';
// process.env.RSS_foo = 'bar';
// process.env.RSS_bar = 'baz';

const parseEnv = () => {
  const result = Object.entries(process.env).reduce((res, [k, v]) => {
    if (k.startsWith('RSS_')) {
      res.push(`${k}=${v}`);
    }
    return res;
  }, []);
  Log.info('\nParsed env:');
  console.log(result.join('; '))
};

parseEnv();
