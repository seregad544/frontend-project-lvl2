import genDiff from '../src/index.js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const pathPlainResult = resolve('__fixtures__/plainResult.txt');
const pathStylishResult = resolve('__fixtures__/stylishResult.txt');
const pathJsonResult = resolve('__fixtures__/jsonResult.txt');
const plainResult = readFileSync(pathPlainResult, 'utf8');
const stylishResult = readFileSync(pathStylishResult, 'utf8');
const jsonResult = readFileSync(pathJsonResult, 'utf8');
const pathJson1 = resolve('__fixtures__/file1.json');
const pathJson2 = resolve('__fixtures__/file2.json');
const pathYaml1 = resolve('__fixtures__/file1.yaml');
const pathYaml2 = resolve('__fixtures__/file2.yaml');



test('json', () => {
  expect(genDiff(pathJson1, pathJson2)).toEqual(stylishResult);
  expect(genDiff(pathJson1, pathJson2, 'plain')).toEqual(plainResult);
  expect(genDiff(pathJson1, pathJson2, 'json')).toEqual(jsonResult);
});

test('yaml', () => {
  expect(genDiff(pathYaml1, pathYaml2)).toEqual(stylishResult);
  expect(genDiff(pathYaml1, pathYaml2, 'plain')).toEqual(plainResult);
  expect(genDiff(pathYaml1, pathYaml2, 'json')).toEqual(jsonResult);
});
