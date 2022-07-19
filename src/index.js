import _ from 'lodash';
import formatter from './formatters/index.js';
import parser from './parser.js';

const getObjectKeys = (obj1, obj2) => {
  const key1 = (_.isObject(obj1)) ? Object.keys(obj1) : [];
  const key2 = (_.isObject(obj2)) ? Object.keys(obj2) : [];
  return _.sortBy(_.union(key1, key2));
};

const getComparisonObject = (file1, file2) => {
  const iter = (obj1, obj2, key) => {
    if (!(key in obj1)) return { name: key, status: 'added', value: obj2[key] };
    if (!(key in obj2)) return { name: key, status: 'removed', value: obj1[key] };
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { name: key, status: 'nested', children: getComparisonObject(obj1[key], obj2[key]) };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        name: key, status: 'updated', valueBefore: obj1[key], valueAfter: obj2[key],
      };
    }
    return { name: key, status: 'unupdated', value: obj1[key] };
  };

  const keys = getObjectKeys(file1, file2);
  return keys.map((key) => iter(file1, file2, key));
};

const getComparisonFile = (path1, path2, formatName = 'stylish') => {
  const file1 = parser(path1);
  const file2 = parser(path2);
  const result = getComparisonObject(file1, file2);
  return formatter(result, formatName);
};

export default getComparisonFile;
