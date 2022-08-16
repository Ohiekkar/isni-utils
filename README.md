# isni-utils

Validates and generates ISNI (International Standard Name Identifier) codes

## Usage

Usage as a Node library:

```js
const isni = require('isni-utils');

isni.validate('0000-0001-2147-8925') // true
isni.validate('0000000121478925') // true
isni.validate('1234-1234-1234-1234') // false

isni.generate() // Generates a random ISNI code
```
