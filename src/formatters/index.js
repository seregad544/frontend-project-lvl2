import plain from './plain.js';
import stylish from './stylish.js';

const formats = {
  stylish,
  plain,
  json: JSON.stringify,
};

export default (tree, outputFormat) => formats[outputFormat](tree);
