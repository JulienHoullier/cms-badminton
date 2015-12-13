var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});


/**
 * Ajoute un tweet.
 */
module.exports = {

	tweet: function (msg){
		client.post('statuses/update', {status: msg},  function(error, tweet, response){
		  if(error) throw error;
		});	
	}
	
};
