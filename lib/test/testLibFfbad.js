var feed = require("../ffbadnews");

  feed(function(err,data){
  	if(err)
  		console.log(err);

  	console.log(data);
  });