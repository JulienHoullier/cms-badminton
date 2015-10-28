var keystone = require('keystone'),
	Registration = keystone.list('Registration'),
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
		Registration.model.find()
		.populate('tournament')
		.exec(function(err, registrations){
			if(err) next(err);
			var tournois = {};
			async.each(registrations,function(registration, next){
				if(registration.tournament.registrationDeadLine > today){
					// Si l'inscription fait parti d'un prochain tournoi
					if(tournois[registration.tournament.name] == null){
						tournois[registration.tournament.name] = {date : registration.tournament.date, categories : {}};
					}
					if(tournois[registration.tournament.name]['categories'][registration.category] == null){
						tournois[registration.tournament.name]['categories'][registration.category] = {rankings : {}} ;
					}
					if(tournois[registration.tournament.name]['categories'][registration.category]['rankings'][registration.ranking] == null){
						tournois[registration.tournament.name]['categories'][registration.category]['rankings'][registration.ranking] = [];
					}
					tournois[registration.tournament.name]['categories'][registration.category]['rankings'][registration.ranking].push(registration.player1.first);
				}
				next();
			});
			console.log(tournois);
			locals.tournois = tournois;
			next(err);
		});
	});

	// Render the view
	view.render('tournois');
}

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
