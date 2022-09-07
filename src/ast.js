import _ from 'lodash';

const buildNode = (data1, data2, key, parentFunction) => {
  if (!_.has(data1, key)) return { key, type: 'added', value: data2[key] };
  if (!_.has(data2, key)) return { key, type: 'removed', value: data1[key] };
  if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
    return { key, type: 'nested', children: parentFunction(data1[key], data2[key]) };
  }
  if (!_.isEqual(data1[key], data2[key])) {
    return {
      key, type: 'updated', value1: data1[key], value2: data2[key],
    };
  }
  return { key, type: 'unupdated', value: data1[key] };
};

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const nodes = keys.map((key) => buildNode(data1, data2, key, buildTree));
  return { type: 'root', children: nodes };
};

export default buildTree;
