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
			var tournois = [];
			// [
			// 	{
			// 		tournoi: 'test',
			// 		categories: [
			// 			{
			// 				categorie : 'SH',
			// 				niveaux:[
			// 					{
			// 						niveau: 'D8',
			// 						inscrits: ["bla", "bla"]
			// 					},
			// 					{
			// 						niveau: 'D9',
			// 						inscrits: ["bla"]
			// 					},
			// 				]
			// 			},
			// 			{
			// 				categorie : 'DH',
			// 				niveaux:[
			// 					{
			// 						niveau: 'D8',
			// 						inscrits: ["bla - bla", "bla"]
			// 					},
			// 					{
			// 						niveau: 'D9',
			// 						inscrits: ["bla - bla"]
			// 					},
			// 				]
			// 			}
			// 		]
			// 	}
			// ]
			async.each(tournaments,function(tournament, next){
				var tournoi = {};
				tournois.push(tournoi);

				tournoi.tournoi  = tournament.name;
				tournoi.date = tournament.date;
				// Peuple la relations avec les inscriptions
				tournament.populateRelated('registrations', function (err) {
					// Regroupe par catégorie / niveau
					async.each(tournament.registrations, function(registration, next){
						if(!_.has(tournoi,'categories')){
							table.categories = [];
						}
						var category = {};
						category.rankings = [];
						category.table = registration.category;
						category.rankings.push(registration.ranking);
						table.categories.push(category);
						next();
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
