var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Match Model
 * =============
 */

var Match = new keystone.List('Match');

Match.add({
	versus: { type: Types.Text, required: true, initial: true, index: true},
	date: { type: Date },
	location: { type: Types.Location },
	result: { type: Types.LocalFile, dest: '/data/files' },
	createdAt: { type: Date, default: Date.now }
});

Match.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Match.schema.methods.sendNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	var Match = this;
	
	keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {
		
		if (err) return callback(err);
		
		new keystone.Email('Match-notification').send({
			to: admins,
			from: {
				name: 'OCC-Badminton',
				email: 'contact@occ-badminton.com'
			},
			subject: 'New Match for OCC-Badminton',
			Match: Match
		}, callback);
		
	});
	
};

Match.defaultSort = '-createdAt';
Match.defaultColumns = 'name, email, MatchType, createdAt';
Match.register();
