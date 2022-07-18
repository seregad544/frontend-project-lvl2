#!/usr/bin/env node
import { program } from 'commander';
import getComparisonFile from '../src/index.js';

program
  .name('gendiff ')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((path1, path2) => {
    console.log(getComparisonFile(path1, path2, program.opts().format));
  })
  .parse(process.argv);
