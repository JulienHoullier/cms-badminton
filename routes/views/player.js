var keystone = require('keystone');
var classement = require('../../lib/classement');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'player';

	var fillPLayers= function (players, next){
		// Ajout des classements aux joueurs
			async.each(players, function (player, next){
				classement(player.licence, function(err, data){
					if(!err && data && data.length == 3){
						player.ranking = data[0] + " / " + data[1] + " / " + data[2];	
					} else {
						player.ranking = 'Indisponible';
					}
					next(err);
				});
			},
			function (err){
				next(err);
			});
	}
	// Load the players by sortOrder
	view.query('players', keystone.list('Player').model.find({type: { $ne: 'young' }}).populate('team').sort('name')).then(function(err, players, next){
			if (err) return next(err);
			fillPLayers(players, next);
	});
	
	if(req.user){
		// Load the young players by sortOrder
		view.query('youngsters', keystone.list('Player').model.find({type: { $eq: 'young' }}).sort('name')).then(function(err, players, next){
				if (err) return next(err);
				fillPLayers(players, next);
		});
	}

	// Render the view
	view.render('player');
	
};
