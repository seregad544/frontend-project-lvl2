const plain = (value) => {
  const iter = (currentValue, name) => {
    const formattingData = (data) => {
      if (data === true || data === false || data === null) {
        return data;
      } if (typeof data === 'object') {
        return '[complex value]';
      }
      return `'${data}'`;
    };
    const newName = currentValue.name === undefined ? name : `${name}${currentValue.name}`;
    if (currentValue.status === 'nested') {
      return iter(currentValue.children, `${newName}.`);
    } if (currentValue.status === 'unupdated') {
      return [];
    } if (currentValue.status === 'updated') {
      return `Property '${newName}' was updated. From ${formattingData(currentValue.valueBefore)} to ${formattingData(currentValue.valueAfter)}`;
    } if (currentValue.status === 'added') {
      return `Property '${newName}' was added with value: ${formattingData(currentValue.value)}`;
    } if (currentValue.status === 'removed') {
      return `Property '${newName}' was removed`;
    }
    const result = currentValue.flatMap((obj) => iter(obj, newName));
    return result.join('\n');
  };
  return iter(value, '');
};

export default plain;
