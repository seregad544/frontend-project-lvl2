import _ from 'lodash';

const getIndent = (position, depth) => {
  const replacer = ' ';
  const spacesCount = 4;
  const parsers = {
    top: replacer.repeat(depth * spacesCount - 2),
    bottom: replacer.repeat(depth * spacesCount - spacesCount),
  };
  return parsers[position];
};

const stringify = (data, depth) => {
  if (_.isPlainObject(data)) {
    const nestedData = Object.entries(data).map(([key, value]) => `${getIndent('top', depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
    return ['{', ...nestedData, `${getIndent('bottom', depth + 1)}}`].join('\n');
  } if (_.isArray(data)) {
    return ['[', data, ']'].join('');
  }
  return `${data}`;
};

const typeFunctions = {
  root: (data, depth, iter) => ['{', ...data.children.flatMap((obj) => iter(obj, depth)), `${getIndent('bottom', depth)}}`].join('\n'),
  nested: (data, depth, iter) => `${getIndent('top', depth)}  ${data.key}: ${iter(data.children, depth + 1)}`,
  unupdated: (data, depth) => `${getIndent('top', depth)}  ${data.key}: ${stringify(data.value, depth)}`,
  updated: (data, depth) => [
    `${getIndent('top', depth)}- ${data.key}: ${stringify(data.value1, depth)}`,
    `${getIndent('top', depth)}+ ${data.key}: ${stringify(data.value2, depth)}`,
  ].join('\n'),
  added: (data, depth) => `${getIndent('top', depth)}+ ${data.key}: ${stringify(data.value, depth)}`,
  removed: (data, depth) => `${getIndent('top', depth)}- ${data.key}: ${stringify(data.value, depth)}`,
};

const getFormattedData = (data, depth, iter) => typeFunctions[data.type](data, depth, iter);

const stylish = (tree) => {
  const iter = (node, depth) => getFormattedData(node, depth, iter);
  return iter(tree, 1);
};

export default stylish;
