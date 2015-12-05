var keystone = require('keystone');
var Types = keystone.Field.Types;
var mailLib = require('../lib/mail');

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
		message: { type: Types.Textarea, label:'Message', initial:true, noedit: true},
		createdAt: { type: Date, label:'Date de la demande', default: Date.now },
		status: {
			type: Types.Select, label:'Statut', options: [
				{value:'En cours', label:'En cours'},
				{value:"Liste d'attente", label:"Liste d'attente"},
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
		sendMail(this, 'registration-notification', 'Demande d\'inscription');
	}
	if(this.toValidate && this.status == "Liste d'attente"){
		console.log("Liste d'attente.");
		sendMail(this, 'registration-waiting', 'Inscription : Liste d\'attente');
	}
	if(this.toValidate && this.status == 'Confirmée'){
		console.log("Inscription confirmée.");
		sendMail(this, 'registration-confirmation', 'Confirmation d\'inscription');
	}
});

var sendMail = function(Registration, template, subject, callback){
	Registration.populate('tournament player1 player2', function(err, registration){
		if(err) return console.log('Error populating registration due to: '+err);
		
		keystone.list('User').model.findOne().where('isTournamentManager', true).exec(function(err, manager) {

			if (err) return console.log('Error retrieving tournament manager user due to: '+err);

			var emails = [manager, {'email': registration.player1.email, 'name': registration.player1.name.full}];
			if(registration.player2 != null){
				emails.push({'email':registration.player2.email, 'name': registration.player2.name.full});
			}
			mailLib.sendMail(template, callback, subject, emails, {registration: registration});
		});
	});
}

Registration.defaultSort = '-createdAt';
Registration.defaultColumns = 'tournament, player1, category, ranking, status, createdAt';
Registration.register();
