var keystone = require('keystone'),
	Registration = keystone.list('Registration'),
	Tournament = keystone.list('Tournament'),
	_ = require('underscore'),
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
					// On gère une map des inscrits par division et catégorie.

					if(tournois[registration.tournament.name] == null){
						tournois[registration.tournament.name] = {nbInscrit : 0, date : registration.tournament.date, categories : {}};
					}
					if(tournois[registration.tournament.name]['categories'][registration.category] == null){
						tournois[registration.tournament.name]['categories'][registration.category] = {nbInscrit: 0, divisions: {}} ;
					}
					if(tournois[registration.tournament.name]['categories'][registration.category]['divisions'][registration.ranking] == null){
						tournois[registration.tournament.name]['categories'][registration.category]['divisions'][registration.ranking] = [];
					}
					// Ajout du joueur ou de l'équipe au tournoi.
					tournois[registration.tournament.name]['categories'][registration.category]['divisions'][registration.ranking].push(registration.player1.full);
					// Incrémentation du nombre d'inscrit au tournoi et à la catégorie.
					tournois[registration.tournament.name]['categories'][registration.category].nbInscrit ++;
					tournois[registration.tournament.name].nbInscrit ++;
					if(!_.isEmpty(registration.player2.full)){
						tournois[registration.tournament.name]['categories'][registration.category]['divisions'][registration.ranking].push(registration.player2.full);
						tournois[registration.tournament.name]['categories'][registration.category].nbInscrit ++;
						tournois[registration.tournament.name].nbInscrit ++;
					}
				}
				next();
			});
			// Tri par dates des tournois
			var sortedTournois = _.sortBy(_.pairs(tournois), function (tournoi){
				return tournoi[1].date;
			});
			locals.inscrits = sortedTournois;
			next(err);
		});
	});

	// Sélection des prochains tournois
	view.on('init', function(next){
		Tournament.model.find()
		.where('registrationDeadLine').gte(today)
		.sort('date')
		.exec(function(err, tournaments){
			locals.tournois = tournaments;
			next(err);
		});
	});

	// Render the view
	view.render('tournois');
}
