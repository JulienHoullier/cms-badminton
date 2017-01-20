var request = require("request");
var xpath = require("xpath");
var dom = require("xmldom").DOMParser;

var classements= {};

module.exports = function(numeroLicence, callback){

	var now = Date.now();
	if(classements[numeroLicence] && classements[numeroLicence].lastLoaded){
		if((now - classements[numeroLicence].lastLoaded) < 3600000){//1 hour caching
			return callback(null, classements[numeroLicence].result);
		}
	}
	
	var doc;
	request.post("http://poona.ffbad.org/page.php?P=fo/menu/public/accueil/classement_hebdo",
	{
		form: {
			recherche_text_licence: numeroLicence,
			Action: "consultation_joueur_rechercher",
			requestForm: "formRechercher"
		}
	}, function (err, httpResponse, body) {

		if (err) {
			callback(err);
		} else {
			doc = new dom({errorHandler: {warning:function(msg){}, error:function(msg){}, fatalError:function(msg){}}}).parseFromString(body, "text/xml");
			var div = xpath.select("/html/body/div[3]/div/div/div[2]/div[2]/div[3]/text()", doc);
			classements[numeroLicence]= { lastLoaded : now, result : div.toString().replace(/\s+/g, '').split("/")};
			callback(null, classements[numeroLicence].result);
		}

	});

};
