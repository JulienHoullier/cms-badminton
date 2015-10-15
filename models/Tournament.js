var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Tournament Model
 * =============
 */

var Tournament = new keystone.List('Tournament', {
	noedit: true,
	label: 'Tournois',
});

Tournament.add(
	{
		tournament: { type: Types.Text, label:'Tournoi', required: true, initial:true},
		category: {
			type: Types.Select, label:'Catégorie', options: ['SH','SD','DH','DD','DMx'],
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

Tournament.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});

Tournament.schema.post('save', function() {
	if (this.wasNew) {
		this.sendTournamentManagerEmail();
	}
});

Tournament.schema.methods.sendTournamentManagerEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	var subscription = this;
	
	keystone.list('User').model.findOne().where('manage_tournaments', true).exec(function(err, manager) {
		
		if (err) return callback(err);
		
		var players = [subscription.player1_email];
		if(subscription.player2){
			players.push(subscription.player2_email);
		}
		
		new keystone.Email('tournament-notification').send({
			to: manager,
			cc: players,
			from: {
				name: 'OCC-Badminton',
				email: 'contact@occ-badminton.com'
			},
			subject: 'Demande d\'inscription',
			subscription: subscription
		}, callback);
		
	});
};

Tournament.defaultSort = '-createdAt';
Tournament.defaultColumns = 'tournament, player1, category, createdAt';
Tournament.register();
