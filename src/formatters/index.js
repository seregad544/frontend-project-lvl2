import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const getFormattedData = (ast, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(ast);
    case 'plain':
      return plain(ast);
    case 'json':
      return json(ast);
    default:
      throw new Error(`Incorrect output format: '${outputFormat}'!`);
  }
};

export default getFormattedData;
