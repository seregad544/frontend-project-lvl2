import _ from 'lodash';

const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    const indentSize = depth * spacesCount;
    const topIndent = (indent) => replacer.repeat(indent);
    const bottomIndent = (indent) => replacer.repeat(indent - spacesCount);
    const formattingData = (data, n = 1) => {
      if (_.isPlainObject(data)) {
        const currentIndent = (depth + n) * spacesCount;
        const nestedData = Object.entries(data).map(([key, value]) => `${topIndent(currentIndent)}${key}: ${formattingData(value, n + 1)}`);
        return ['{', ...nestedData, `${bottomIndent(currentIndent)}}`].join('\n');
      } if (_.isArray(data)) {
        return ['[', data, ']'].join('');
      }
      return data;
    };
    if (currentValue.status === 'nested') {
      return `${topIndent(indentSize)}${currentValue.key}: ${iter(currentValue.children, depth + 1)}`;
    } if (currentValue.status === 'unupdated') {
      return `${topIndent(indentSize)}${currentValue.key}: ${formattingData(currentValue.value)}`;
    } if (currentValue.status === 'updated') {
      return [
        `${topIndent(indentSize - 2)}- ${currentValue.key}: ${formattingData(currentValue.value1)}`,
        `${topIndent(indentSize - 2)}+ ${currentValue.key}: ${formattingData(currentValue.value2)}`,
      ].join('\n');
    } if (currentValue.status === 'added') {
      return `${topIndent(indentSize - 2)}+ ${currentValue.key}: ${formattingData(currentValue.value)}`;
    } if (currentValue.status === 'removed') {
      return `${topIndent(indentSize - 2)}- ${currentValue.key}: ${formattingData(currentValue.value)}`;
    }
    const result = currentValue.flatMap((obj) => iter(obj, depth));
    return ['{', ...result, `${bottomIndent(indentSize)}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
