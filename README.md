# Few Mocha

[![Build status](https://travis-ci.org/forter/few-mocha.svg?branch=master)](https://travis-ci.org/forter/few-mocha)

Enable support for generators in [Mocha](https://github.com/mochajs/mocha) tests using [few](https://github.com/forter/few).

## Installation

```
npm install few-mocha --save-dev
```

## Usage

Simply require the module and start writing generators in your tests.

```js
describe("New user", function() {
  let business;
  let user;

  before(function*() {
    yield setup();
    business = yield Account.create("FooBar Inc");
    user = yield business.addUser("Mr. Boo");
  });

  it("should be the only customer", function*() {
    let count = yield User.count({ businessID: business.id });
    assert.equal(count, 1);
  });

  after(function*() {
    yield cleanUp();
  });
});
```

### Node

Install the module using `npm install few-mocha --save-dev`. With `mocha`, you have multiple ways of requiring the module:
- add `--require few-mocha` to your `mocha.opts`
- add `require('few-mocha')` inside your main test file.

If you need to add generator support to a different mocha instance you can use it like this:

```js
var mocha = require('mocha')
var fewMocha = require('few-mocha')

fewMocha(mocha)
```

## How It Works

The module override the `Runnable.prototype.run` method of `mocha` to enable generators. In contrast to other npm packages, `few-mocha` extends `mocha` at runtime.

## License
Licensed under Apache 2.0
