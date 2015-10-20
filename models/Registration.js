var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Registration Model
 * =============
 */

var Registration = new keystone.List('Registration', {
	noedit: true,
	label: 'Inscriptions',
});

Registration.add(
	{
		tournament: { type: Types.Text, label:'Tournoi', required: true, initial:true},
		category: {
			type: Types.Select, label:'Catégorie', options: ['SH','SD','DH','DD','DM'],
			required: true, default: 'SH', initial:true},
		message: { type: Types.Markdown, label:'Message', initial:true},
		createdAt: { type: Date, default: Date.now },
		status: {
			type: Types.Select, label:'Statut', options: [
				{value:'in_progress', label:'En cours'},
				{value:'validated', label:'Confirmée'},
				{value:'impossible', label:'Impossible'},
			],
			default: 'in_progress'
		},
		level: { type: Types.Text, label:'Niveau', required: true, initial:true},
	},
	{ heading: 'Joueur'},
	{
		player1: {type: Types.Name, label: 'Joueur 1', required: true, initial:true},
		player1_email: {type: Types.Email, label: 'Joueur 1 mail', required: true, initial:true},
		player1_licence: {type: Types.Number, label: 'Joueur 1 N° Licence', required: true, initial:true},
	},
	{ heading: 'Partenaire', dependsOn: { category: ['DH', 'DD', 'DMx'] } },
	{
		player2: {type: Types.Name, label:'Joueur 2'},
		player2_email: {type: Types.Email, label: 'Joueur 2 mail'},
		player2_licence: { type: Types.Number, label:'Joueur 2 N° Licence'},
	}
);

Registration.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});

Registration.schema.post('save', function() {
	if (this.wasNew) {
		this.sendRegistrationManagerEmail();
	}
});

Registration.schema.methods.sendRegistrationManagerEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	var registration = this;
	
	keystone.list('User').model.findOne().where('isTournamentManager', true).exec(function(err, manager) {
		
		if (err) return callback(err);
		
		var players = [registration.player1_email];
		if(registration.player2){
			players.push(registration.player2_email);
		}
		
		new keystone.Email('registration-notification').send({
			to: manager,
			cc: players,
			from: {
				name: 'OCC-Badminton',
				email: 'contact@occ-badminton.com'
			},
			subject: 'Demande d\'inscription',
			registration: registration
		}, callback);
		
	});
};

Registration.defaultSort = '-createdAt';
Registration.defaultColumns = 'tournament, player1, category, createdAt';
Registration.register();
