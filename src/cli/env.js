const parseEnv = () => {
  const result = Object.entries(process.env).reduce((res, [k, v]) => {
    if (k.startsWith('RSS_')) {
      res.push(`${k}=${v}`);
    }
    return res;
  }, []);
  console.log(result.join('; '))
};

parseEnv();
