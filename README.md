### Difference finder:

[![Actions Status](https://github.com/seregad544/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/seregad544/frontend-project-lvl2/actions)
[![Actions Status](https://github.com/seregad544/frontend-project-lvl2/actions/workflows/run-test-and-lint.yml/badge.svg)](https://github.com/seregad544/frontend-project-lvl2/actions/workflows/run-test-and-lint.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/7652fa969a2b19996651/maintainability)](https://codeclimate.com/github/seregad544/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7652fa969a2b19996651/test_coverage)](https://codeclimate.com/github/seregad544/frontend-project-lvl2/test_coverage)

### Description

Difference finder is CLI util for getting diffs between compared files. It can be used as a library in any other project.

**Supported file extensions:**
- `.json`
- `.yml` | `.yaml`

**Formats output:**
- `stylish`
```
{
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
}
```
- `plain`
```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```
- `json`

### Installation ###

```sh
# clone the repository
git clone https://github.com/seregad544/frontend-project-lvl2.git
# go to the folder with the repository
cd frontend-project-lvl2
# install dependencies
make install
```

### Usage ###

```gendiff [options] <pathToFile1> <pathToFile2>```

Options:

`-V, --version` output the version number

`-f, --format <type>` Output format

`-h, --help` output usage information

### Example ###

**comparison of flat files (JSON)**

[![asciicast](https://asciinema.org/a/5QSdoxPFPs4CEWNJWOuMhnLDY.svg)](https://asciinema.org/a/5QSdoxPFPs4CEWNJWOuMhnLDY)

**comparison of flat files (yaml)**

[![asciicast](https://asciinema.org/a/xR7CyHtsF8FrSUeU616H9cmhB.svg)](https://asciinema.org/a/xR7CyHtsF8FrSUeU616H9cmhB)

**recursive comparison**

[![asciicast](https://asciinema.org/a/zhE6JHebVNAOQ3ed88Ik0DQTb.svg)](https://asciinema.org/a/zhE6JHebVNAOQ3ed88Ik0DQTb)

**recursive comparison (output format: plain)**

[![asciicast](https://asciinema.org/a/W138fzc37OxwjTjnvre2OJ7Qe.svg)](https://asciinema.org/a/W138fzc37OxwjTjnvre2OJ7Qe)

**recursive comparison (output format: json)**

[![asciicast](https://asciinema.org/a/lfYmmCGPioh49DnI5XAE3uXec.svg)](https://asciinema.org/a/lfYmmCGPioh49DnI5XAE3uXec)
