import { readFileSync } from 'fs';
import _ from 'lodash';
import { cwd } from 'process';
import { resolve, extname } from 'path';

const readFile = (pathFile) => {
  const fullPath = resolve(pathFile);
  const fileExtension = extname(fullPath);
  const file = readFileSync(fullPath, "utf8");
  return [file, fileExtension];
};

const convertToObject = (pathFile) => {
  const [file, fileExtension] = readFile(pathFile);
  if (fileExtension === '.json') {
    return JSON.parse(file);
  }
};

const getObjectKeys = (obj1, obj2) => {
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  return _.union(key1, key2).sort();
};

const getComparisonObject = (obj1, obj2) => {
  let result = '';
  const keys = getObjectKeys(obj1, obj2);
  for (const key of keys) {
    if ((key in obj1) && (key in obj2)) {
      result = (obj1[key] === obj2[key]) ? 
      `${result}
       ${key}: ${obj1[key]}` :  
      `${result}
      -${key}: ${obj1[key]}
      +${key}: ${obj2[key]}`;
    }
    else {
      result = ((key in obj1)) ? 
      `${result}
      -${key}: ${obj1[key]}` :  
      `${result}
      +${key}: ${obj2[key]}`;
    }
  }
  return `{
    ${result}
  }`;
};

const getComparisonFile = (path1, path2) => {
  const file1 = convertToObject(path1);
  const file2 = convertToObject(path2);
  const result = getComparisonObject(file1, file2);
  return result;
};

export default getComparisonFile;
