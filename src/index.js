import _ from 'lodash';
import getFormattedData from './formatters/index.js';
import parse from './parser.js';
import getAstDifferences from './ast.js';
import { readFileSync } from 'fs';
import { resolve, extname } from 'path';

const readFile = (pathFile) => {
  const fullPath = resolve(pathFile);
  const extension = extname(fullPath);
  const data = readFileSync(fullPath, 'utf8');
  return [data, extension];
};

const genDiff = (path1, path2, outputFormat = 'stylish') => {
  const [data1, extension1] = readFile(path1);
  const [data2, extension2] = readFile(path2);
  const object1 = parse(data1, extension1);
  const object2 = parse(data2, extension2);
  const astDifferences = getAstDifferences(object1, object2);
  return getFormattedData(astDifferences, outputFormat);
};

export default genDiff;