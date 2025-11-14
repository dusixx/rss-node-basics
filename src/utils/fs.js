import fs from 'fs/promises';
import path from "path";
import { Log } from "./misc.js";

const checkAccess = async (path, mode) => {
  try {
    await fs.access(path, mode);
    return true;
  } catch {
    return false;
  }
}

export const pathExists = async (path) => {
  return await checkAccess(path);
}

export class FSOperationError extends Error {
  constructor(msg) {
    super();
    this.message = `${Log.style("red", "FS operation failed")}${msg ? `: ${msg}` : ''}`;
  }
}

export const resolvePath = (...parts) => {
  return path.resolve(import.meta.dirname, '..', ...parts);
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
 * @returns {Promise<{
 * exists: boolean, 
 * readable: boolean, 
 * writeable: boolean, 
 * isFile: boolean, 
 * isDirectory: boolean}>}
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
  result.isDirectory = stats.isDirectory();

  return result;
}