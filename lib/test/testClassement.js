var classement = require("../classement");

  classement("06900286",function(err,data){
  	if(err)
  		console.log("Erreur: " + err);

  	console.log("Classement Simple : " + data[0]);
  	console.log("Classement Double : " + data[1]);
  	console.log("Classement Mixte : " + data[2]);
  });

