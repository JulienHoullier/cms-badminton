var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Registration Model
 * =============
 */

var Registration = new keystone.List('Registration', {
	label: 'Inscriptions'
});

Registration.add(
	{
		tournament : {type : Types.Relationship, ref : 'Tournament', label: 'Tournoi', required : true, initial : true},
		ranking : {type : Types.Select, options: 'NC,P1,P2,P3,D9,D8,D7,R6,R5,R4,N3,N2,N1', default: 'NC', label: 'Niveau', required : true, initial : true},
		category: {
			type: Types.Select, label:'Catégorie', options: ['SH','SD','DH','DD','DM'],
			required: true, default: 'SH', initial:true},
		needPayment : {type : Boolean, required : true, label:'Payer par le club', default: true, initial : true},
		message: { type: Types.Markdown, label:'Message', initial:true, noedit: true},
		createdAt: { type: Date, label:'Date de la demande', default: Date.now },
		status: {
			type: Types.Select, label:'Statut', options: [
				{value:'En cours', label:'En cours'},
				{value:'Confirmée', label:'Confirmée'},
				{value:'Terminé', label: 'Tournoi terminé'},
				{value:'Impossible', label:'Impossible'}
			],
			default: 'En cours'
		}
	},
	{ heading: 'Joueur' },
	{
		player1 : { type: Types.Relationship, label:'Joueur 1', ref: 'Player', required: true, initial: true}
	},
	{ heading: 'Partenaire', dependsOn: { category: ['DH', 'DD', 'DM'] } },
	{
		player2 : { type: Types.Relationship, label:'Joueur 2', ref: 'Player', dependsOn: { category: ['DH', 'DD', 'DM'] }, initial: true}
	}
);

Registration.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	this.toValidate = this.isModified('status');
	next();
});

Registration.schema.post('save', function() {
	if (this.wasNew){
		console.log("Inscription prise en compte.");
		this.sendRegistrationManagerEmail();
	}
	if(this.toValidate && this.status == 'Confirmée'){
		console.log("Inscription confirmée.");
		this.sendConfirmationPlayersEmail();
	}
});

Registration.schema.methods.sendRegistrationManagerEmail = function(callback) {

	if ('function' !== typeof callback) {
		callback = function() {};
	}

	this.populate('tournament player1 player2', function(err, registration){

		keystone.list('User').model.findOne().where('isTournamentManager', true).exec(function(err, manager) {

			if (err) return callback(err);

			var emailPlayers = [{'email': registration.player1.email, 'name': registration.player1.name.full}];
			if(registration.player2 != null){
				emailPlayers.push({'email':registration.player2.email, 'name': registration.player2.name.full});
			}

			new keystone.Email('registration-notification').send({
				to: manager,
				cc: emailPlayers,
				mandrillOptions: {cc: emailPlayers},
				from: {
					name: 'OCC-Badminton',
					email: 'contact@occ-badminton.com'
				},
				subject: 'Demande d\'inscription',
				registration: registration
			}, callback);

		});
	});
};

Registration.schema.methods.sendConfirmationPlayersEmail = function(callback) {

	if ('function' !== typeof callback) {
		callback = function() {};
	}

	this.populate('tournament player1 player2', function(err, registration){

		keystone.list('User').model.findOne().where('isTournamentManager', true).exec(function(err, manager) {

			if (err) return callback(err);

			var emailPlayers = [registration.player1.email];
			if(registration.player2 != null){
				emailPlayers.push(registration.player2.email);
			}
			new keystone.Email('registration-confirmation').send({
				to: emailPlayers,
				cc: manager,
				from: {
					name: 'OCC-Badminton',
					email: 'contact@occ-badminton.com'
				},
				subject: 'Confirmation d\'inscription',
				registration: registration
			}, callback);

		});
	});
};


Registration.defaultSort = '-createdAt';
Registration.defaultColumns = 'tournament, player1, category, ranking, status, createdAt';
Registration.register();
