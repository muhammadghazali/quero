quero
=====
[![Build Status](https://travis-ci.org/muhammadghazali/quero.png?branch=master)](https://travis-ci.org/muhammadghazali/quero)
[![Dependency Status](https://gemnasium.com/muhammadghazali/quero.png)](https://gemnasium.com/muhammadghazali/quero)

# Description

Ping a list of APIs.

# Features

* Ping APIs for one url.
* Ping APIs for more than one url.

# How to install
Install the module directly from git repository, read more here:

* [How to install a private NPM module without my own registry?](http://stackoverflow.com/questions/10386310/how-to-install-a-private-npm-module-without-my-own-registry)
* [Private npm modules](http://debuggable.com/posts/private-npm-modules:4e68cc7d-1ac4-42d9-995a-343dcbdd56cb)

# How to use

```javascript
var quero = require('quero');

var validUrls = [
  {identifier: 'nodejs homepage', url: 'http://nodejs.org'},
  {identifier: 'npm homepage', url: 'http://npmjs.org'},
  {identifier: 'yahoo homepage', url: 'http://www.yahoo.com'},
  {identifier: 'google homepage', url: 'http://google.com'}
];

quero.ping(validUrls, function (err, results) {

  if(!err)
    console.log(results);
});
```

# How to test

Install the dependencies:

```sh
$ npm install
$ npm install -d
```
And execute the test runner:

```sh
$ npm test
```

## License

Licensed under the MIT License.
=======
