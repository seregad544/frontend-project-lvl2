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
  expect(getComparisonFile('/home/srj/frontend-project-lvl2/file1.json', '/home/srj/frontend-project-lvl2/file2.json')).toEqual(a);
});
