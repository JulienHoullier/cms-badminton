var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Team Model
 * =============
 */

var Team = new keystone.List('Team', {
	map: { name: 'number' }
}

Team.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	TeamType: { type: Types.Select, options: [
		{ value: 'message', label: 'Just leaving a message' },
		{ value: 'question', label: 'I\'ve got a question' },
		{ value: 'other', label: 'Something else...' }
	] },
	message: { type: Types.Markdown, required: true },
	createdAt: { type: Date, default: Date.now }
});

Team.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});

Team.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Team.schema.methods.sendNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	var Team = this;
	
	keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {
		
		if (err) return callback(err);
		
		new keystone.Email('Team-notification').send({
			to: admins,
			from: {
				name: 'OCC-Badminton',
				email: 'contact@occ-badminton.com'
			},
			subject: 'New Team for OCC-Badminton',
			Team: Team
		}, callback);
		
	});
	
};

Team.defaultSort = '-createdAt';
Team.defaultColumns = 'name, email, TeamType, createdAt';
Team.register();
