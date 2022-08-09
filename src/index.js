import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import formatData from './formatters/index.js';
import parse from './parser.js';
import buildTreeDifferences from './ast.js';

const getExtension = (fullPath) => extname(fullPath).slice(1);

const getData = (fullPath) => {
  const extension = getExtension(fullPath);
  const data = readFileSync(fullPath, 'utf8');
  return [data, extension];
};

const getParsingData = (path) => {
  const fullPath = resolve(path);
  const data = parse(...getData(fullPath));
  return data;
};

const genDiff = (path1, path2, outputFormat = 'stylish') => {
  const data1 = getParsingData(path1);
  const data2 = getParsingData(path2);
  const treeDifferences = buildTreeDifferences(data1, data2);
  return formatData(treeDifferences, outputFormat);
};

export default genDiff;
