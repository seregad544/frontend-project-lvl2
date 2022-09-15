import _ from 'lodash';

const stringify = (data) => {
  if (typeof data === 'string') {
    return `'${data}'`;
  }

  if (_.isObject(data)) {
    return '[complex value]';
  }

  return String(data);
};

const currentPath = (node, path) => `${path}${node.key}`;

const nodes = {
  root: (node, path, iter) => node.children.flatMap((object) => iter(object, path)).join('\n'),
  nested: (node, path, iter) => node.children.flatMap((object) => iter(object, `${currentPath(node, path)}.`)).join('\n'),
  unupdated: () => [],
  updated: (node, path) => `Property '${currentPath(node, path)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`,
  added: (node, path) => `Property '${currentPath(node, path)}' was added with value: ${stringify(node.value)}`,
  removed: (node, path) => `Property '${currentPath(node, path)}' was removed`,
};

const render = (tree) => {
  const iter = (node, path) => nodes[node.type](node, path, iter);
  return iter(tree, '');
};

export default render;
