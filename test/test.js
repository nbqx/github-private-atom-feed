var test = require('tap').test;
var G = require(__dirname+'/../');

var url = "GITHUB-PRIVATE-ATOM-URL";

test('promise',function(t){
  var g = G(url);
  t.type(g.then,'function');
  t.type(g.catch,'function');
  g.then(function(data){
    var d = data[0];
    t.ok(d.id!==undefined);
    t.ok(d.published!==undefined);
    t.ok(d.updated!==undefined);
    t.ok(d.link!==undefined);
    t.ok(d.title!==undefined);
    t.ok(d.author.name!==undefined);
    t.ok(d.author.email!==undefined);
    t.ok(d.author.uri!==undefined);
    t.ok(d.content!==undefined);
    t.end();
  });
});

test('stream',function(t){
  var g = G.stream(url);
  t.ok(g.hasOwnProperty('_readableState'));
  g.on('data',function(data){
    var d = data[0];
    t.ok(d.id!==undefined);
    t.ok(d.published!==undefined);
    t.ok(d.updated!==undefined);
    t.ok(d.link!==undefined);
    t.ok(d.title!==undefined);
    t.ok(d.author.name!==undefined);
    t.ok(d.author.email!==undefined);
    t.ok(d.author.uri!==undefined);
    t.ok(d.content!==undefined);
    t.end();
  });
});
