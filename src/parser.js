import { load } from 'js-yaml';

const parse = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return load(data);
    default:
      throw new Error(`Incorrect extension file: '${extension}'!`);
  }
};

export default parse;
