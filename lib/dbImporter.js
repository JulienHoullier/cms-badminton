/**
 * Created by houllier on 04/01/2017.
 */
var fs = require('fs');
var request = require('request');
var xpath = require("xpath");
var dom = require("xmldom").DOMParser;
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').load();
}
var log = console;

function getUsers(clubId){
	var users = [];
	request.get("https://badiste.fr/joueurs-club/"+clubId+".html", function (err, httpResponse, body){
			if(err){
				return onErr(err);
			} else {
				var doc = new dom().parseFromString(body,"text/html");
				
				var select = xpath.useNamespaces({'html': 'http://www.w3.org/1999/xhtml'});
				var table = select("//html:table[@class='tux']/html:tr", doc);
				
				for(var i=1; i<table.length; i++){
					var tr = table[i];
					if(tr) {
						var name = select("./html:td[2]/html:a/text()", tr).toString();
						var names = name.split(" ");
						var firstname = names.shift();
						var lastname = names.join(" ");
						
						var sex = select("./html:td[3]/text()", tr).toString();
						var category = select("./html:td[4]/text()", tr).toString();
						var isYoung = isYoungCat(category);
						var isCompetitor = false;
						if(!isYoung) {
							var simple = select("./html:td[5]/text()", tr).toString();
							var double = select("./html:td[6]/text()", tr).toString();
							var mixte = select("./html:td[7]/text()", tr).toString();
							isCompetitor = simple != "NC" || double != "NC" || mixte != "NC";
						}
						
						var licence = select("./html:td[13]/text()", tr).toString();
						users.push({"name.first": firstname, "name.last": lastname, "email": "", "licence": licence, "type": isYoung?"young":(isCompetitor ? "competitor": "leisure"), "timeSlot": 'wednesday_strong' });
					}
				}
				var json = {Players: users};
				var data = "exports.create ="+JSON.stringify(json, null, '\t');
				saveUsers(data);
			}
		});
	
	
}

function isYoungCat(category){
	return category.startsWith("Ben") || category.startsWith("Min") || category.startsWith("Cad") || category.startsWith("Jun");
}

function saveUsers(data){
	fs.open("./updates/0.0.2-players.js", 'w', function(err, fd) {
		if(err){
			return onErr(err);
		}
		var buffer = new Buffer(data);
		fs.write(fd, buffer, 0, buffer.length, null, function(err) {
			if (err) return onErr(err);
			fs.close(fd, function() {
				console.log('file written');
			})
		});
	})
}
		
function onErr(err) {
	log.log(err);
	return 1;
}

if(process.env.CLUB_ID) {
	log.log('Start users generation');
	getUsers(process.env.CLUB_ID);
}
