import { readFileSync } from 'fs';
import { resolve } from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (fileName) => resolve('__fixtures__/', fileName);
const readFixture = (filePath) => readFileSync(filePath, 'utf8');
const pathPlainResult = getFixturePath('plainResult.txt');
const pathStylishResult = getFixturePath('stylishResult.txt');
const pathJsonResult = getFixturePath('jsonResult.txt');
const plainResult = readFixture(pathPlainResult);
const stylishResult = readFixture(pathStylishResult);
const jsonResult = readFixture(pathJsonResult);
const pathJson1 = getFixturePath('file1.json');
const pathJson2 = getFixturePath('file2.json');
const pathYaml1 = getFixturePath('file1.yaml');
const pathYaml2 = getFixturePath('file2.yaml');

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
