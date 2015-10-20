var keystone = require('keystone');
var Types = keystone.Field.Types;

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
	
	if ('function' !== typeof callback) {
		callback = function(err) {
			if (err) {
				console.log(err);
			}
		};
	}
	
	var Match = this;
	
	keystone.list('Team').model.findById(this.team).exec(function(err, team) {
		
		if (err) return callback(err);
		
		team.populateRelated('players', function (err) {
			if (err) {
				return callback(err);
			}
			new keystone.Email('match-notification').send({
				to: team.players,
				from: {
					name: 'OCC-Badminton',
					email: 'contact@occ-badminton.com'
				},
				subject: 'Journée de championnat',
				match: Match
			}, callback);
		});
	});
};

Match.defaultSort = '-matchNumber';
Match.defaultColumns = 'team, versus, date';
Match.register();
