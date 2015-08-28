var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Match Model
 * =============
 */

var Match = new keystone.List('Match');

Match.add({
	team: { type: Types.Relationship, ref: 'Team', required: true, initial: true, index: true },
	versus: { type: Types.Text, required: true, initial: true, index: true },
	date: { type: Date },
	location: { type: Types.Location },
	result: { type: Types.LocalFile, dest: '/data/files' }	
});


Match.schema.pre('save', function(next) {
	if (this.isModified('date')) {
		this.needNofif;
	}
});

Match.schema.post('save', function() {
	if (this.needNotif) {
		this.sendNotificationEmail();
	}
});

Match.schema.methods.sendNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	var Match = this;
	
	keystone.list('Team').model.findById(this._id).populate('players').exec(function(err, admins) {
		
		if (err) return callback(err);
		
		new keystone.Email('Match-notification').send({
			to: admins,
			from: {
				name: 'OCC-Badminton',
				email: 'contact@occ-badminton.com'
			},
			subject: 'Match de championnat - OCC-Badminton',
			Match: Match
		}, callback);
		
	});
	
};

Match.defaultSort = '-date';
Match.defaultColumns = 'team, versus, date';
Match.register();
