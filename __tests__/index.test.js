import getComparisonFile from '../index.js';

const test1 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const test2 = `{
  - follow: false
  + follow: true
  - host: hexlet.io
  + host: vk.com
    proxy: 123.234.53.22
    timeout: 50
  + timezone: 3
}`;

const test3 = `{
    follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  + proxy: 134.434.53.22
    timeout: 50
  + verbose: true
}`;

const test4 = `{
  + follow: true
  - host: hexlet.io
  + host: vk.com
  + proxy: 123.234.53.22
  - timeout: 20
  + timeout: 50
  + timezone: 3
  - verbose: true
}`;

test('test json', () => {
  expect(getComparisonFile('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(test1);
  expect(getComparisonFile('__fixtures__/file1.json', '__fixtures__/file3.json')).toEqual(test2);
  expect(getComparisonFile('__fixtures__/file1.json', '__fixtures__/file4.json')).toEqual(test3);
  expect(getComparisonFile('__fixtures__/file2.json', '__fixtures__/file3.json')).toEqual(test4);
});

test('test yaml', () => {
  expect(getComparisonFile('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(test1);
  expect(getComparisonFile('__fixtures__/file1.yaml', '__fixtures__/file3.yml')).toEqual(test2);
  expect(getComparisonFile('__fixtures__/file1.yaml', '__fixtures__/file4.yml')).toEqual(test3);
  expect(getComparisonFile('__fixtures__/file2.yaml', '__fixtures__/file3.yml')).toEqual(test4);
});
