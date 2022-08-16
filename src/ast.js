import _ from 'lodash';

const buildNode = (data1, data2, key, parentFunction) => {
  if (!_.has(data1, key)) return { key, status: 'added', value: data2[key] };
  if (!_.has(data2, key)) return { key, status: 'removed', value: data1[key] };
  if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
    return { key, status: 'nested', children: parentFunction(data1[key], data2[key]) };
  }
  if (_.isArray(data1[key]) && _.isArray(data2[key]) && _.isEqual(data1[key], data2[key])) {
    return { key, status: 'unupdated', value: data1[key] };
  }
  if (data1[key] !== data2[key]) {
    return {
      key, status: 'updated', value1: data1[key], value2: data2[key],
    };
  }
  return { key, status: 'unupdated', value: data1[key] };
};

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  return keys.map((key) => buildNode(data1, data2, key, buildTree));
};

export default buildTree;
