import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import formatData from './formatters/index.js';
import parse from './parser.js';
import buildTree from './ast.js';

const getFullPath = (path) => resolve(path);
const extractFormat = (fullPath) => extname(fullPath).slice(1);
const getData = (fullPath) => parse(readFileSync(fullPath, 'utf8'), extractFormat(fullPath));

const genDiff = (path1, path2, outputFormat = 'stylish') => {
  const data1 = getData(getFullPath(path1));
  const data2 = getData(getFullPath(path2));
  const tree = buildTree(data1, data2);
  return formatData(tree, outputFormat);
};

export default genDiff;
