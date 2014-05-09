var jsdom = require('jsdom'),
    _map = require('lodash.map'),
    Promise = require('native-promise-only'),
    Readable = require('stream').Readable;

module.exports = main;

function feedData(feedUrl,next){
  jsdom.env(feedUrl,["http://code.jquery.com/jquery.js"],next);
};

function mkEntry(root){
  var $ = root.$;
  return function(o){
    var ret = {};
    ret.id = $(o).find("id").text();
    ret.published = $(o).find("published").text();
    ret.updated = $(o).find("updated").text();
    ret.link = $(o).find("link").attr("href");
    ret.title = $(o).find("title").text();
    ret.author = {
      name: $(o).find("author name").text(),
      email: $(o).find("author email").text(),
      uri: $(o).find("author uri").text()
    };
    ret.content = $(o).find("content").text();
    return ret;
  }
};

function main(feedUrl){
  return new Promise(function(resolve,reject){
    feedData(feedUrl,function(err,root){
      if(err) return reject(err);
      try{
        var entries = _map(root.$("entry"),mkEntry(root));
        resolve(entries);
      }catch(x_x){
        reject(x_x);
      }
    });
  });
};

main.stream = function(feedUrl){
  var self = this;
  var stream = new Readable({objectMode: true});
  var buf = null;

  stream._read = function(){
    if(buf!==null) return stream.push(null);
    self(feedUrl).then(function(data){
      buf = data;
      stream.push(buf);
    }).catch(function(err){
      return stream.emit('error',err);
    });
  };

  return stream
};

