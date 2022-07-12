import _ from 'lodash';
import parser from './parser.js';

const isObject = (obj) => typeof obj === 'object' && obj !== null;

const getObjectKeys = (obj1, obj2) => {
  const key1 = (isObject(obj1)) ? Object.keys(obj1) : '';
  const key2 = (isObject(obj2)) ? Object.keys(obj2) : '';
  return _.union(key1, key2).sort();
};

const getComparisonObject = (obj1, obj2) => {
  const result = {};
  const keys = getObjectKeys(obj1, obj2);
  /* eslint-disable-next-line */
  for (const key of keys) {
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      result[`  ${key}`] = getComparisonObject(obj1[key], obj2[key]);
    } else if (isObject(obj1[key]) && !isObject(obj2[key])) {
      result[`- ${key}`] = obj1[key];
      if (obj2[key] !== undefined) {
        result[`+ ${key}`] = obj2[key];
      }
    } else if (!isObject(obj1[key]) && isObject(obj2[key])) {
      if (obj1[key] !== undefined) {
        result[`- ${key}`] = obj1[key];
      }
      result[`+ ${key}`] = obj2[key];
    } else if ((key in obj1) && (key in obj2) && (obj1[key] === obj2[key])) {
      result[`  ${key}`] = obj1[key];
    } else if ((key in obj1) && (key in obj2) && (obj1[key] !== obj2[key])) {
      result[`- ${key}`] = obj1[key];
      result[`+ ${key}`] = obj2[key];
    } else if ((key in obj1) && !(key in obj2)) {
      result[`- ${key}`] = obj1[key];
    } else if (!(key in obj1) && (key in obj2)) {
      result[`+ ${key}`] = obj2[key];
    }
  }
  return result;
};

const stylish = (obj, count = 2) => {
  let res = '{';
  const keys = Object.keys(obj);
  /* eslint-disable-next-line */
  for (const key of keys) {
    if (isObject(obj[key])) {
      res = res + '\n' + ' '.repeat(count) + `${key}: ` + stylish(obj[key], count + 4);
    } else {
      res = res + '\n' + ' '.repeat(count) + `${key}: ${obj[key]}`;
    }
  }
  return (res + '\n' + ' '.repeat(count - 2) + '}');
};

const getComparisonFile = (path1, path2) => {
  const file1 = parser(path1);
  const file2 = parser(path2);
  const result = getComparisonObject(file1, file2);
  return stylish(result);
};

export { getComparisonFile, stylish };
