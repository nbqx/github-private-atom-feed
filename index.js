var request = require('request'),
    xpath = require('xpath-stream'),
    _map = require('lodash.map'),
    Promise = require('native-promise-only'),
    Readable = require('stream').Readable;

module.exports = main;

function feedData(feedUrl,next){
  request(feedUrl).pipe(xpath("//entry",{
    id: "id/text()",
    published: "published/text()",
    updated: "updated/text()",
    link: "link/@href",
    title: "title/text()",
    author: {
      name: "author/name/text()",
      email: "author/email/text()",
      uri: "author/uri/text()"
    },
    content: "content/text()"
  })).on('data',next);
};

function main(feedUrl){
  return new Promise(function(resolve,reject){
    feedData(feedUrl,function(data){
      try{
        resolve(data);
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

