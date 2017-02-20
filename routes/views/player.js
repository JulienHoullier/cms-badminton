var keystone = require('keystone');
var classement = require('../../lib/classement');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'player';

	var startTime = Date.now();
	
	var fillPlayers= function (players, next){
		// Ajout des classements aux joueurs
		//Could be long so check if not 
			async.some(players, function (player, nextOrEnd){
				player.ranking = 'Indisponible';
				classement(player.licence, function(err, data){
					if(!err && data && data.length == 3){
						player.ranking = data[0] + " / " + data[1] + " / " + data[2];	
					}
					var currentTime = Date.now();
					nextOrEnd(err, (currentTime - startTime) > 5000);//if make more than 5 seconds let http thread continue
				});
			},
			function (err, result){
				next(err);
			});
	};
	
	// Load the players by sortOrder
	view.query('players', keystone.list('Player').model.find({type: { $ne: 'young' }}).sort('name')).then(function(err, players, next){
			if (err) return next(err);
		fillPlayers(players, next);
	});
	
	if(req.user){
		// Load the young players by sortOrder
		view.query('youngsters', keystone.list('Player').model.find({type: { $eq: 'young' }}).sort('name')).then(function(err, players, next){
				if (err) return next(err);
			fillPlayers(players, next);
		});
	}

	// Render the view
	view.render('player');
	
};
