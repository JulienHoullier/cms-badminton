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
	group: { type: Types.Select, options: 'user, editor, admin', default: 'user' },
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

/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin';
User.register();
