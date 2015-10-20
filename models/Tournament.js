var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Tournament Model
 * =============
 */

var Tournament = new keystone.List('Tournament', {
	nocreate: true,
	noedit: true,
	label: 'Tournois',
});

Tournament.add({
	tournament: { type: Types.Text, label:'Tournoi', required: true},
	category: {
		type: Types.Select, label:'Catégorie', options: ['Simple', 'Double', 'Mixte']
	},
	message: { type: Types.Markdown, label:'Message' },
	createdAt: { type: Date, default: Date.now },
	status: {
	type: Types.Select, label:'Statut', options: ['Simple', 'Double', 'Mixte']
},
	},
	{ heading: 'Joueur' },
	{
		player1: {type: Types.Name, label: 'Joueur 1', required: true},
		player1_email: {type: Types.Email, label: 'Joueur 1 mail', required: true},
		player1_licence: {type: Types.Number, label: 'Joueur 1 N° Licence', required: true},
	},
	{ heading: 'Partenaire', dependsOn: { category: ['Double', 'Mixte'] } },
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
