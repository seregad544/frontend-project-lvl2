import _ from 'lodash';
import parser from './parser.js';

const getObjectKeys = (obj1, obj2) => {
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  return _.union(key1, key2).sort();
};

const getComparisonObject = (obj1, obj2) => {
  let result = '';
  const keys = getObjectKeys(obj1, obj2);
  const addGeneralProperties = (key) => `    ${key}: ${obj1[key]}`;
  const addFirstProperties = (key) => `  - ${key}: ${obj1[key]}`;
  const addSecondProperties = (key) => `  + ${key}: ${obj2[key]}`;
  /* eslint-disable-next-line */
  for (const key of keys) {
    if ((key in obj1) && (key in obj2) && (obj1[key] === obj2[key])) {
      result = [...result, addGeneralProperties(key)];
    } if ((key in obj1) && (key in obj2) && (obj1[key] !== obj2[key])) {
      result = [...result, addFirstProperties(key), addSecondProperties(key)];
    } if ((key in obj1) && !(key in obj2)) {
      result = [...result, addFirstProperties(key)];
    } if (!(key in obj1) && (key in obj2)) {
      result = [...result, addSecondProperties(key)];
    }
  }
  return `{
${result.join('\n')}
}`;
};

const getComparisonFile = (path1, path2) => {
  const file1 = parser(path1);
  const file2 = parser(path2);
  const result = getComparisonObject(file1, file2);
  return result;
};

export default getComparisonFile;
