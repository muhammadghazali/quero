quero
=====

# Description

Query a list of APIs

# Features

* Ping APIs for one url.

# TODOs

```
It will be passed a URL and query these APIs:

http://api.ak.facebook.com/restserver.php?v=1.0&method=links.getStats&urls=%%URL%%&format=json
http://urls.api.twitter.com/1/urls/count.json?url=%%URL%%&callback=twttr.receiveCount
http://www.linkedin.com/cws/share-count?url=%%URL%%
http://www.stumbleupon.com/services/1.01/badge.getinfo?url=%%URL%%
http://api.pinterest.com/v1/urls/count.json?url=%%URL%%

The script should also have the ability to accept an array of URLs with identifiers, example:
[{"identifier": "yahoo homepage", "url": "http://www.yahoo.com"}, {"identifier": "microsoft homepage", "url": "http://www.microsoft.com"}]

If it is passed an array the results should also contain the identifier.
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