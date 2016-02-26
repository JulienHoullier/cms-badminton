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

Match.add({
	team: { type: Types.Relationship, ref: 'Team', required: true, initial: true, index: true },
    matchNumber: { type: Number, required: true, initial: true, index: true},
	versus: { type: Types.Text, required: true, initial: true, index: true },
	date: { type: Date },
    home: { type: Types.Select, options: [
		{ value: 'Yes', label: 'Oui' },
		{ value: 'No', label: 'Non' }
	] },
	location: { type: Types.Location },
    result: { type: Types.LocalFile, dest: '/data/files' },
    occResult: { type: Number },
    versusResult: { type: Number }
});

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
