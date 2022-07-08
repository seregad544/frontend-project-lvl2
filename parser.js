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
  if (fileExtension === '.json') {
    return JSON.parse(file);
  }
  if (fileExtension === '.yaml' || fileExtension === '.yml') {
    return load(file);
  }
};

export default parser;
