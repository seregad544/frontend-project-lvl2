import getComparisonFile from '../src/index.js';

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
const test6 = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const test7 = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;

test('json', () => {
  expect(getComparisonFile('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish')).toEqual(test1);
  expect(getComparisonFile('__fixtures__/file1.json', '__fixtures__/file3.json', 'stylish')).toEqual(test2);
  expect(getComparisonFile('__fixtures__/file1.json', '__fixtures__/file4.json', 'stylish')).toEqual(test3);
  expect(getComparisonFile('__fixtures__/file2.json', '__fixtures__/file3.json', 'stylish')).toEqual(test4);
});

test('yaml', () => {
  expect(getComparisonFile('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'stylish')).toEqual(test1);
  expect(getComparisonFile('__fixtures__/file1.yaml', '__fixtures__/file3.yml', 'stylish')).toEqual(test2);
  expect(getComparisonFile('__fixtures__/file1.yaml', '__fixtures__/file4.yml', 'stylish')).toEqual(test3);
  expect(getComparisonFile('__fixtures__/file2.yaml', '__fixtures__/file3.yml', 'stylish')).toEqual(test4);
});

test('recursive comparison', () => {
  expect(getComparisonFile('__fixtures__/file5.json', '__fixtures__/file6.json', 'stylish')).toEqual(test5);
  expect(getComparisonFile('__fixtures__/file7.yaml', '__fixtures__/file8.yaml', 'stylish')).toEqual(test5);
});

test('plain', () => {
  expect(getComparisonFile('__fixtures__/file5.json', '__fixtures__/file6.json', 'plain')).toEqual(test6);
  expect(getComparisonFile('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(test7);
});
