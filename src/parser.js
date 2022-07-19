import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { load } from 'js-yaml';

const readFile = (pathFile) => {
  const fullPath = resolve(pathFile);
  const fileExtension = extname(fullPath);
  const file = readFileSync(fullPath, 'utf8');
  return [file, fileExtension];
};

const parser = (pathFile) => {
  const [file, fileExtension] = readFile(pathFile);
  switch (fileExtension) {
    case '.json':
      return JSON.parse(file);
    case '.yaml':
    case '.yml':
      return load(file);
    default:
      return 'error input format';
  }
};

export default parser;
