import _ from 'lodash';

const stringify = (data) => {
  if (typeof data === 'string') {
    return `'${data}'`;
  } if (_.isObject(data)) {
    return '[complex value]';
  }
  return `${data}`;
};

const typeFunctions = {
  root: (data, path, iter) => data.children.flatMap((object) => iter(object, path)).join('\n'),
  nested: (data, path, iter) => iter(data.children, `${path}.`),
  unupdated: () => [],
  updated: (data, path) => `Property '${path}' was updated. From ${stringify(data.value1)} to ${stringify(data.value2)}`,
  added: (data, path) => `Property '${path}' was added with value: ${stringify(data.value)}`,
  removed: (data, path) => `Property '${path}' was removed`,
};

const getFormattedData = (data, path, iter) => typeFunctions[data.type](data, path, iter);

const plain = (tree) => {
  const iter = (node, path) => {
    const currentPath = (node.key === undefined) ? path : `${path}${node.key}`;
    return getFormattedData(node, currentPath, iter);
  };
  return iter(tree, '');
};

export default plain;
