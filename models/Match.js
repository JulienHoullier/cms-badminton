var keystone = require('keystone');
var Types = keystone.Field.Types;
var mailLib = require('../lib/mail');

/**
 * Match Model
 * =============
 */

var Match = new keystone.List('Match', {
	label: 'Rencontres'
});

var storage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('/data/files'), // required; path where the files should be stored
		publicPath: '/public/files' // path where files will be served
	}
});

Match.add({
	team: { type: Types.Relationship, ref: 'Team', label:'Equipe', required: true, initial: true, index: true },
    matchNumber: { type: Number, label:'Journée', required: true, initial: true, index: true},
	versus: { type: Types.Text, label:'Contre', required: true, initial: true, index: true },
	date: { type: Date, label:'Date' },
    home: { type: Types.Select, label:'A domicile ?', options: [
		{ value: 'Yes', label: 'Oui' },
		{ value: 'No', label: 'Non' }
	] },
	location: { type: Types.Location, label:'Adresse de la salle'},
    result: { type: Types.File, storage: storage, label:'Feuille de match' },
    occResult: { type: Number, label:'Score OCC' },
    versusResult: { type: Number, label:'Score adverse' }
});

Match.hasRoles = function(user){
	if(user) {
		return user.isEditor || user.isAdmin;
	}
	return false;
};

Match.schema.pre('save', function(next) {
	this.needNotif = (!this.isNew && this.isModified('date'));
	next();
});

Match.schema.post('save', function() {
	if (this.needNotif) {
		this.sendNotificationEmail();
	}
});

Match.schema.methods.sendNotificationEmail = function(callback) {
	
	var Match = this;
	
	keystone.list('Team').model.findById(this.team).exec(function(err, team) {
		
		if (err) return console.log('Error retrieving team due to :'+err);
		
		team.populateRelated('players', function (err) {
			if (err) {
				return console.log('Error retrieving players due to :'+err);
			}
			mailLib.sendMail('match-notification', callback, 'Journée de championnat', team.players, {match:Match});
		});
	});
};

Match.defaultSort = '-matchNumber';
Match.defaultColumns = 'team, versus, date';
Match.register();
