var keystone = require('keystone');
	Registration = keystone.list('Registration'),
    Player = keystone.list('Player'),
	Tournament = keystone.list('Tournament'),
	_ = require('underscore'),
	async = require('async');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

		// Init locals
	locals.filters = {
		idTournoi: req.params.idTournoi
	};

    // Récupération du tournoi
	view.on('render', function(next){
		Tournament.model.findOne({ _id: locals.filters.idTournoi }).exec(function(err, result) {
				locals.tournoi = result;
				next(err);
			});
	});
	
    // Récupération du joueur lié à l'utilisateur
	view.on('init', function(next){
		req.user.populate('player', function(err, user){
			locals.player = user.player;
			next(err);
			});
	});

    // Sélection des joueurs pour le partenaire
    view.query('listJoueur2', Player.model.find().sort('name'));

    view.on('post', function(next) {
        var newRegistration = new Registration.model();
        newRegistration.tournament = locals.filters.idTournoi;
        var updater = newRegistration.getUpdateHandler(req);
        
        updater.process(req.body, {
            flashErrors: true,
            fields: 'player1, player2, ranking, category, message',
            errorMessage: "Problème lors de l'enregistrement de l'inscription"
        }, function(err) {
            if (err) {
                locals.validationErrors = err.errors;
            } else {
                console.log(newRegistration);
                locals.registrationSubmitted = true;
            }
            next();
        });
    });

	view.render("tournoi/inscription");
}
