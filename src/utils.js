import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from 'fs/promises';

export class FSOperationError extends Error {
  constructor(message = "FS operation failed") {
    super();
    this.message = message;
  }
}

export const resolvePath = (...parts) => {
  const src = dirname(fileURLToPath(import.meta.url));
  return path.resolve(src, ...parts);
}

export const pathExists = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (err) {
    return err.code !== 'ENOENT';
  }
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