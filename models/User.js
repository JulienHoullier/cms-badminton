var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User', {
	label: 'Utilisateurs',
});

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	group: { type: Types.Select, options: 'unauthorized, user, editor, admin', default: 'unauthorized' },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.group === 'admin';
});


/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'Player' });

User.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	if(this.isModified('group') && this.group != 'unauthorized'){
		this.sendUserNotif = true;
	}
	next();
});

User.schema.post('save', function() {
    if (this.wasNew) {
    	this.sendAdminNotificationEmail();
    }
    if(this.sendUserNotif){
    	this.sendUserNotificationEmail();
    }
});

User.schema.methods.sendAdminNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	var User = this;
	
	keystone.list('User').model.find().where('group', 'admin').exec(function(err, admins) {
		
		if (err) return callback(err);
		
		new keystone.Email('UserAdmin-notification').send({
			to: admins,
			from: {
				name: 'OCC-Badminton',
				email: 'webmaster@occ-badminton.org'
			},
			subject: 'Demande d`\'inscription',
			User: User
		}, callback);
	});
};

User.schema.methods.sendUserNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	new keystone.Email('User-notification').send({
			to: this.email,
			from: {
				name: 'OCC-Badminton',
				email: 'webmaster@occ-badminton.org'
			},
			subject: 'Inscription confirmée',
			User: this
		}, callback);
};

/**
 * Registration
 */

User.defaultColumns = 'name, email, group';
User.register();

