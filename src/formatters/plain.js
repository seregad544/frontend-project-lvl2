import _ from 'lodash';

const stringify = (data) => {
  if (_.isNull(data)) {
    return 'null';
  } if (typeof data === 'string') {
    return `'${data}'`;
  } if (_.isObject(data)) {
    return '[complex value]';
  }
  return data.toString();
};

const nodes = {
  root: (data, path, iter) => data.children.flatMap((object) => iter(object, path)).join('\n'),
  nested: (data, path, iter) => data.children.flatMap((object) => iter(object, `${path}.`)).join('\n'),
  unupdated: () => [],
  updated: (data, path) => `Property '${path}' was updated. From ${stringify(data.value1)} to ${stringify(data.value2)}`,
  added: (data, path) => `Property '${path}' was added with value: ${stringify(data.value)}`,
  removed: (data, path) => `Property '${path}' was removed`,
};

const render = (tree) => {
  const iter = (node, path) => {
    const currentPath = (node.key === undefined) ? path : `${path}${node.key}`;
    return nodes[node.type](node, currentPath, iter);
  };
  return iter(tree, '');
};

export default render;
