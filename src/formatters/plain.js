const plain = (tree) => {
  const iter = (currentValue, path) => {
    const getFormattedString = (data) => {
      if (typeof data === 'string') {
        return `'${data}'`;
      } if (typeof data === 'object' && data !== null) {
        return '[complex value]';
      }
      return data;
    };
    const currentPath = (currentValue.name === undefined) ? path : `${path}${currentValue.name}`;
    if (currentValue.status === 'nested') {
      return iter(currentValue.children, `${currentPath}.`);
    } if (currentValue.status === 'unupdated') {
      return [];
    } if (currentValue.status === 'updated') {
      return `Property '${currentPath}' was updated. From ${getFormattedString(currentValue.valueBefore)} to ${getFormattedString(currentValue.valueAfter)}`;
    } if (currentValue.status === 'added') {
      return `Property '${currentPath}' was added with value: ${getFormattedString(currentValue.value)}`;
    } if (currentValue.status === 'removed') {
      return `Property '${currentPath}' was removed`;
    }
    const result = currentValue.flatMap((object) => iter(object, currentPath));
    return result.join('\n');
  };
  return iter(tree, '');
};

export default plain;
