#!/usr/bin/env node
import { program } from 'commander';
import { getComparisonFile, stylish } from '../src/index.js';

const printComparisonFile = (path1, path2) => console.log(getComparisonFile(path1, path2));

program
  .name('gendiff ')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action(printComparisonFile)
  .parse(process.argv);
