import yaml from 'js-yaml';

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Incorrect extension file: '${format}'!`);
  }
};

export default parse;
