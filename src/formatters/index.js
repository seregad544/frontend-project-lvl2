import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatData = (tree, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    default:
      throw new Error(`Incorrect output format: '${outputFormat}'!`);
  }
};

export default formatData;
