import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const indent = (depth) => replacer.repeat(depth * spacesCount - 4);

const stringify = (data, depth) => {
  if (_.isArray(data)) {
    return `[${data}]`;
  } if (!_.isObject(data)) {
    return String(data);
  }
  const output = Object.entries(data).map(([key, value]) => `  ${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{
${output.join('\n')}
${indent(depth + 1)}}`;
};

const nodes = {
  root: (node, depth, iter) => {
    const output = node.children.flatMap((obj) => iter(obj, depth));
    return `{
${output.join('\n')}
${indent(depth)}}`;
  },
  nested: (node, depth, iter) => {
    const output = node.children.flatMap((obj) => iter(obj, depth + 1));
    return `  ${indent(depth)}  ${node.key}: {
${output.join('\n')}
${indent(depth + 1)}}`;
  },
  unupdated: (node, depth) => `  ${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`,
  updated: (node, depth) => `  ${indent(depth)}- ${node.key}: ${stringify(node.value1, depth)}
  ${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`,
  added: (node, depth) => `  ${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`,
  removed: (node, depth) => `  ${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`,
};

const render = (tree) => {
  const iter = (node, depth) => nodes[node.type](node, depth, iter);
  return iter(tree, 1);
};

export default render;
