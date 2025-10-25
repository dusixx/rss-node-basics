import fs from 'fs/promises';
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Log } from "./misc.js";

const checkAccess = async (path, mode) => {
  try {
    await fs.access(path, mode);
    return true;
  } catch {
    return false;
  }
}

export class FSOperationError extends Error {
  constructor(message = Log.style("bgRedBright", "FS operation failed")) {
    super();
    this.message = message;
  }
}

export const resolvePath = (...parts) => {
  const src = dirname(fileURLToPath(import.meta.url));
  return path.resolve(path.parse(src).dir, ...parts);
}

export const pathExists = async (path) => {
  return await checkAccess(path);
}

export const getDirents = async (dirPath) => {
  try {
    const dirents = await fs.readdir(dirPath, {
      withFileTypes: true
    });
    return dirents.length > 0 ? dirents : null;
  } catch {
    return null;
  }
};

/**
 * @param {string} path 
 * @returns {Promise<{exists: boolean, readable: boolean, writeable: boolean, isFile: boolean}>}
 */
export const checkPath = async (path) => {
  const result = {};
  const flags = [fs.constants.F_OK, fs.constants.R_OK, fs.constants.W_OK];
  const keys = ['exists', 'readable', 'writeable'];

  for (let i = 0; i < keys.length; i += 1) {
    result[keys[i]] = await checkAccess(path, flags[i]);
    if (!result.exists) {
      return result;
    }
  }
  const stats = await fs.stat(path);
  result.isFile = stats.isFile();

  return result;
}