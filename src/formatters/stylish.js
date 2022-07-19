const stylish = (value, replacer = ' ', spacesCount = 2) => {
  const iter = (currentValue, depth) => {
    const indentSize = depth * spacesCount;
    const topIndent = (indent) => replacer.repeat(indent);
    const bottomIndent = (indent) => replacer.repeat(indent - spacesCount);
    const formattingData = (data, n = 1) => {
      if (typeof data === 'object' && data !== null) {
        const currentIndent = (depth + n) * spacesCount;
        const nestedData = Object.entries(data).map(([key, valu]) => `${topIndent(currentIndent)}${key}: ${formattingData(valu, n + 1)}`);
        return ['{', ...nestedData, `${bottomIndent(currentIndent)}}`].join('\n');
      }
      return data;
    };
    if (currentValue.status === 'nested') {
      return `${topIndent(indentSize)}  ${currentValue.name}: ${iter(currentValue.children, depth + 1)}`;
    } if (currentValue.status === 'unupdated') {
      return `${topIndent(indentSize)}  ${currentValue.name}: ${formattingData(currentValue.value)}`;
    } if (currentValue.status === 'updated') {
      return `${topIndent(indentSize)}- ${currentValue.name}: ${formattingData(currentValue.valueBefore)}` + '\n' + `${topIndent(indentSize)}+ ${currentValue.name}: ${formattingData(currentValue.valueAfter)}`;
    } if (currentValue.status === 'added') {
      return `${topIndent(indentSize)}+ ${currentValue.name}: ${formattingData(currentValue.value)}`;
    } if (currentValue.status === 'removed') {
      return `${topIndent(indentSize)}- ${currentValue.name}: ${formattingData(currentValue.value)}`;
    }
    const result = currentValue.flatMap((obj) => iter(obj, depth));
    return ['{', ...result, `${bottomIndent(indentSize)}}`].join('\n');
  };
  return iter(value, 1);
};

export default stylish;
