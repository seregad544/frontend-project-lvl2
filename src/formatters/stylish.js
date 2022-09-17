import _ from 'lodash';

const symbols = {
  doubleSpace: '  ',
  plusWithSpace: '+ ',
  minusWithSpace: '- ',
};
const replacer = ' ';
const spacesCount = 4;

const indent = (depth) => replacer.repeat(depth * spacesCount - 2);

const stringify = (data, depth) => {
  if (_.isArray(data)) {
    return `[${data}]`;
  } if (!_.isObject(data)) {
    return String(data);
  }
  const output = Object.entries(data).map(([key, value]) => `${indent(depth + 1)}${symbols.doubleSpace}${key}: ${stringify(value, depth + 1)}`);
  return `{
${output.join('\n')}
${symbols.doubleSpace}${indent(depth)}}`;
};

const nodes = {
  root: (node, depth, iter) => {
    const output = node.children.flatMap((obj) => iter(obj, depth));
    return `{
${output.join('\n')}
}`;
  },
  nested: (node, depth, iter) => {
    const output = node.children.flatMap((obj) => iter(obj, depth + 1));
    return `${indent(depth)}${symbols.doubleSpace}${node.key}: {
${output.join('\n')}
${symbols.doubleSpace}${indent(depth)}}`;
  },
  unupdated: (node, depth) => `${indent(depth)}${symbols.doubleSpace}${node.key}: ${stringify(node.value, depth)}`,
  updated: (node, depth) => `${indent(depth)}${symbols.minusWithSpace}${node.key}: ${stringify(node.value1, depth)}
${indent(depth)}${symbols.plusWithSpace}${node.key}: ${stringify(node.value2, depth)}`,
  added: (node, depth) => `${indent(depth)}${symbols.plusWithSpace}${node.key}: ${stringify(node.value, depth)}`,
  removed: (node, depth) => `${indent(depth)}${symbols.minusWithSpace}${node.key}: ${stringify(node.value, depth)}`,
};

const render = (tree) => {
  const iter = (node, depth) => nodes[node.type](node, depth, iter);
  return iter(tree, 1);
};

export default render;
