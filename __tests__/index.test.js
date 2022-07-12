import { getComparisonFile } from '../src/index.js';

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

const test5 = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
          key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
          key: value
        }
      + nest: str
    }
  - group2: {
      abc: 12345
      deep: {
          id: 45
        }
    }
  + group3: {
      deep: {
          id: {
              number: 45
            }
        }
      fee: 100500
    }
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

test('test recursive comparison', () => {
  expect(getComparisonFile('__fixtures__/file5.json', '__fixtures__/file6.json')).toEqual(test5);
  expect(getComparisonFile('__fixtures__/file7.yaml', '__fixtures__/file8.yaml')).toEqual(test5);
});
