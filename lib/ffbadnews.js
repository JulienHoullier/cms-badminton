var FeedParser = require('feedparser')
  , request = require('request');
var fs = require('fs');

var news = {};

module.exports = function (lireNewsFfbad){

    var loaded = false;
    if(news && news.lastLoaded){
      var now = Date.now();
      if(now - news.lastLoaded.getTime() < 86400000){//1 day caching
        lireNewsFfbad(null, news.result);
        loaded = true;
      }
    }
    if(!loaded){
        var req = request('http://www.ffbad.org/front/index.php?lvlid=1&mduuseid=MQ%3D%3D&dsgtypid=281&page=rss')
          , feedparser = new FeedParser();
        req.headers['user-agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36';
        req.headers['accept'] = 'text/html,application/xhtml+xml';

        var lastNews = [];

        req.on('error', function (error) {
          return lireNewsFfbad(error);
        });

        req.on('response', function (res) {
          var stream = this;

          if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

          stream.pipe(feedparser);
        });


        feedparser.on('error', function(error) {
          return lireNewsFfbad(error);
        });

        feedparser.on('readable', function() {
          // This is where the action is!
          var stream = this
            , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
            , item;

          while (item = stream.read()) {
            lastNews.push(item);
          }
        });

        feedparser.on('end', function(){
          news.lastLoaded = new Date();
          news.result = lastNews;
          lireNewsFfbad(null, lastNews);
        });
    }
}
