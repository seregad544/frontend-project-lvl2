import _ from 'lodash';

const getKeysObjects = (object1, object2) => {
  const key1 = (_.isObject(object1)) ? Object.keys(object1) : [];
  const key2 = (_.isObject(object2)) ? Object.keys(object2) : [];
  return _.sortBy(_.union(key1, key2));
};

const buildTreeDifferences = (object1, object2) => {
  const iter = (currentObject1, currentObject2, key) => {
    if (!(key in currentObject1)) return { name: key, status: 'added', value: currentObject2[key] };
    if (!(key in currentObject2)) return { name: key, status: 'removed', value: currentObject1[key] };
    if (_.isObject(currentObject1[key]) && _.isObject(currentObject2[key])) {
      return { name: key, status: 'nested', children: buildTreeDifferences(currentObject1[key], currentObject2[key]) };
    }
    if (currentObject1[key] !== currentObject2[key]) {
      return {
        name: key, status: 'updated', valueBefore: currentObject1[key], valueAfter: currentObject2[key],
      };
    }
    return { name: key, status: 'unupdated', value: currentObject1[key] };
  };
  const keys = getKeysObjects(object1, object2);
  return keys.map((key) => iter(object1, object2, key));
};

export default buildTreeDifferences;
