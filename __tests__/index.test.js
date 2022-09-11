import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => resolve(__dirname, '..', '__fixtures__', fileName);
const readFixture = (filePath) => readFileSync(filePath, 'utf8');
const plainResult = readFixture(getFixturePath('plainResult.txt'));
const stylishResult = readFixture(getFixturePath('stylishResult.txt'));
const jsonResult = readFixture(getFixturePath('jsonResult.txt'));
const pathJson1 = getFixturePath('file1.json');
const pathJson2 = getFixturePath('file2.json');
const pathYaml1 = getFixturePath('file1.yaml');
const pathYaml2 = getFixturePath('file2.yaml');

describe('genDiff', () => {
  test('json', () => {
    expect(genDiff(pathJson1, pathJson2)).toEqual(stylishResult);
    expect(genDiff(pathJson1, pathJson2, 'stylish')).toEqual(stylishResult);
    expect(genDiff(pathJson1, pathJson2, 'plain')).toEqual(plainResult);
    expect(genDiff(pathJson1, pathJson2, 'json')).toEqual(jsonResult);
  });
  test('yaml', () => {
    expect(genDiff(pathYaml1, pathYaml2)).toEqual(stylishResult);
    expect(genDiff(pathYaml1, pathYaml2, 'stylish')).toEqual(stylishResult);
    expect(genDiff(pathYaml1, pathYaml2, 'plain')).toEqual(plainResult);
    expect(genDiff(pathYaml1, pathYaml2, 'json')).toEqual(jsonResult);
  });
});
