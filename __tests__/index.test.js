import getComparisonFile from '../index.js';

const a = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('getComparisonFile', () => {
  expect(getComparisonFile('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(a);
});
