var githubPrivateAtomFeed = require('.');

var through2 = require('through2'),
    es = require('event-stream'),
    _each = require('lodash.foreach');

var githubPrivateAtomUrl = "GITHUB-PRIVATE-ATOM-URL";

// Promise
githubPrivateAtomFeed(githubPrivateAtomUrl).then(function(data){
  console.log(data);
}).catch(function(err){
  console.log(err);
});

// ReadableStream
githubPrivateAtomFeed.stream(githubPrivateAtomUrl).pipe(through2.obj(function(o,e,next){
  var self = this;
  _each(o,function(d){
    self.push(d);
  });
  next();
}))
.pipe(es.map(function(data,next){
  next(null,data.title);
})).on('data',console.log).on('error',console.log);

