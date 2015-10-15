var keystone = require('keystone');
var classement = require('../../lib/classement');
var async = require('async');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'teams';

	view.on('render', function(next) {

		// Load the players by sortOrder
		keystone.list('Team').model.find().populate('players').sort('order').exec(function (err, results){

			if (err || !results.length) {
				return next(err);
			}

			locals.teams = results;
			//next(err);
			// Ajout des classements aux joueurs
			async.each(locals.teams, function (team, next){
				async.each(team.players, function (player, next) {
					classement(player.licence, function(err, data){
						if(!err){
							player.ranking = data[0] + " / " + data[1] + " / " + data[2];
						} else {
							player.ranking = 'Indisponible';
						}
						next(err);
					});
				},function(err){next(err);});
			},function(err){next(err);});
		});
	});
	// Render the view
	view.render('teams');

};
