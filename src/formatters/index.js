import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatter = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    default:
      return 'error output format';
  }
};

export default formatter;
