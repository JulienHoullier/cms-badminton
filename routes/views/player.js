var keystone = require('keystone');
var classement = require('../../lib/classement');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'player';

	view.on('init', function(next) {

		// Load the players by sortOrder
		keystone.list('Player').model.find({type: { $ne: 'young' }}).populate('team').sort('name').exec(function (err, results){

			if (err || !results.length) {
				return next(err);
			}

			locals.players = results;

			// Ajout des classements aux joueurs
			async.each(locals.players, function (player, next){
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
		});
	});

	// Render the view
	view.render('player');
	
};
