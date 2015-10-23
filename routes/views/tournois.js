var keystone = require('keystone'),
	Tournament = keystone.list('Tournament'),
	_ = require('underscore');
	async = require('async');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var today = new Date();

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'tournois';

	// Sélection des 5 prochains tournois
	view.on('init', function(next){
		Tournament.model.find()
		.where('registrationDeadLine').gte(today)
		.sort('date')
		.exec(function(err, tournaments){
			if(err) next(err);
			async.each(tournaments,function(tournament, next){
				// Peuple la relations avec les inscriptions
				tournament.populateRelated('registrations', function (err) {
					// Regroupe par catégorie / niveau
					var mapCategory = [];
					var mapRanking = [];
					async.each(tournament.registrations, function(err, registration){

					});
					next(err);
				});
			});
			next(err);
		});
	});

	// Render the view
	view.render('tournois');
}
