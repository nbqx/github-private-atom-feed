var test = require('tap').test;
var G = require(__dirname+'/../');

var dummyUrl = 'xxx';

test('promise',function(t){
  var g = G(dummyUrl);
  t.type(g.then,'function');
  t.type(g.catch,'function');
  g.then(function(data){
    t.deepEqual(data,[]);
    t.end();
  });
});

test('stream',function(t){
  var g = G.stream(dummyUrl);
  t.ok(g.hasOwnProperty('_readableState'));
  g.on('data',function(data){
    t.deepEqual(data,[]);
    t.end();
  });
});
