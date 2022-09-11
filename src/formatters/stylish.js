import _ from 'lodash';

const indent = (depth) => {
  const replacer = ' ';
  const spacesCount = 4;
  return replacer.repeat(depth * spacesCount - 4);
};

const stringify = (data, depth) => {
  if (_.isNull(data)) {
    return 'null';
  } if (!_.isPlainObject(data)) {
    return data.toString();
  } if (_.isArray(data)) {
    return `[${data}]`;
  }
  const nestedData = Object.entries(data).map(([key, value]) => `  ${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...nestedData, `${indent(depth + 1)}}`].join('\n');
};

const nodes = {
  root: (data, depth, iter) => `{
${data.children.flatMap((obj) => iter(obj, depth)).join('\n')}
${indent(depth)}}`,
  nested: (data, depth, iter) => `  ${indent(depth)}  ${data.key}: {
${data.children.flatMap((obj) => iter(obj, depth + 1)).join('\n')}
${indent(depth + 1)}}`,
  unupdated: (data, depth) => `  ${indent(depth)}  ${data.key}: ${stringify(data.value, depth)}`,
  updated: (data, depth) => [
    `  ${indent(depth)}- ${data.key}: ${stringify(data.value1, depth)}`,
    `  ${indent(depth)}+ ${data.key}: ${stringify(data.value2, depth)}`,
  ].join('\n'),
  added: (data, depth) => `  ${indent(depth)}+ ${data.key}: ${stringify(data.value, depth)}`,
  removed: (data, depth) => `  ${indent(depth)}- ${data.key}: ${stringify(data.value, depth)}`,
};

const render = (tree) => {
  const iter = (node, depth) => nodes[node.type](node, depth, iter);
  return iter(tree, 1);
};

export default render;
