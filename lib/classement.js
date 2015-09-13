var request = require("request");
var xpath = require("xpath");
var dom = require("xmldom").DOMParser;

module.exports = function(numeroLicence, callback){
	var doc;
	request.post("http://poona.ffbad.org/page.php?P=fo/menu/public/accueil/classement_hebdo",
		{
			form:{
				recherche_text_licence : numeroLicence,
				Action : "consultation_joueur_rechercher",
				requestForm : "formRechercher"
			}
		}, function (err, httpResponse, body){

			if(err){
				callback(err);
			} else {
				doc = new dom().parseFromString(body,"text/xml");
			    var div = xpath.select("/html/body/div[3]/div/div/div[2]/div[2]/div[3]/text()", doc);
				callback(null, div.toString().replace(/\s+/g, '').split("/"));
			}

		});
}
