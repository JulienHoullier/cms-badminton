var FeedParser = require('feedparser')
  , request = require('request');


module.exports = function (){

    var req = request('http://www.ffbad.org/front/index.php?lvlid=1&mduuseid=MQ%3D%3D&dsgtypid=281&page=rss')
      , feedparser = new FeedParser();
    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
     .setHeader('accept', 'text/html,application/xhtml+xml');
    
    req.on('error', function (error) {
      return callback(error);
    });

    req.on('response', function (res) {
      var stream = this;

      if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

      stream.pipe(feedparser);
    });


    feedparser.on('error', function(error) {
      console.log("erreur lors du parsing.", error);
    });

    feedparser.on('readable', function() {
      // This is where the action is!
      var stream = this
        , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
        , item;

      var news = [];

      while (item = stream.read()) {
        news.push = item;
      }
      
      callback(null, news);

    });
}
