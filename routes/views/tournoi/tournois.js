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

	// Chargement des prochaines inscriptions
	view.on('render', function(next){
		Registration.model.find()
		.populate('tournament player1 player2')
		.exec(function(err, registrations){

				if(err) {
					console.log('Erreur pendant le chargement des inscriptions : '+err);
					return next(err);
				}

				if(registrations) {
					var tournois = {};
					async.each(registrations, function (registration, next) {
						if (registration.tournament && registration.tournament.date > today) {
							// Si l'inscription fait parti d'un prochain tournoi
							// On gère une map des inscrits par division et catégorie.

							// Ajout d'un tournoi
							if (tournois[registration.tournament.name] == null) {
								tournois[registration.tournament.name] = {
									nbInscrit: 0,
									date: registration.tournament._.date.format("DD-MM-YYYY"), // Problème d'affichage des dates
									categories: {}
								};
							}

							// Ajout de la catégorie au tournoi
							if (tournois[registration.tournament.name]['categories'][registration.category] == null) {
								tournois[registration.tournament.name]['categories'][registration.category] = {
									nbInscrit: 0,
									divisions: {}
								};
							}

							// Ajout de la division à la catégorie du tournoi
							if (tournois[registration.tournament.name]['categories'][registration.category]['divisions'][registration.ranking] == null) {
								tournois[registration.tournament.name]['categories'][registration.category]['divisions'][registration.ranking] = [];
							}

							// Ajout du joueur ou de l'équipe au tournoi.
							tournois[registration.tournament.name]['categories'][registration.category]['divisions'][registration.ranking].push({
								name: [registration.player1.name.full],
								status : registration.status
							});

							// Incrémentation du nombre d'inscrit au tournoi et à la catégorie.
							tournois[registration.tournament.name]['categories'][registration.category].nbInscrit++;
							tournois[registration.tournament.name].nbInscrit++;

							var byRanking = tournois[registration.tournament.name]['categories'][registration.category]['divisions'][registration.ranking];
							var lastInscrit = byRanking[byRanking.length - 1];
							if (registration.player2 != null) {
								lastInscrit.name.push(registration.player2.name.full);
							}
						}
						next();
					}, function (err) {
						//should not happens since we do not use err in function to populate tournois array
						if (err) {
							console.log('Erreur pendant le chargement des inscriptions : '+err);
						}
						else{
							// Tri par dates des tournois
							var sortedTournois = _.sortBy(_.pairs(tournois), function (tournoi) {
								return tournoi[1].date;
							});
							locals.inscrits = sortedTournois;
						}
						next();
					});
				}
				else{
					next();
				}
		});
	});

	// Sélection des prochains tournois
	view.on('render', function(next){
		Tournament.model.find()
		.where('date').gte(today)
		.sort('date')
		.exec(function(err, tournaments){
			locals.tournois = tournaments;
			next(err);
		});
	});

	// Render the view
	view.render('tournoi/tournois');
}
