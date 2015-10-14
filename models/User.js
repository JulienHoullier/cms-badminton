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
	name: { type: Types.Name, label:'Nom', required: true, index: true },
	email: { type: Types.Email, label:'Email', initial: true, required: true, index: true },
	password: { type: Types.Password, label:'Mot de passe', initial: true, required: true }
}, 'Permissions', {
	group: { type: Types.Select, label:'Permissions', options: 
		[
			{value:'unauthorized', label:'Banni'},
			{value:'user', label:'utilisateur simple'},
			{value:'editor', label:'Editeur'},
			{value:'admin', label:'Administrateur'}
		],
		default: 'unauthorized' },
	manage_tournaments: { type: Types.Boolean, label:'Gère les inscriptions aux tournois' }
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
		callback = function(err) {
			if (err) {
				console.log(err);
			}
		};
	}
	
	var User = this;
	
	keystone.list('User').model.find().where('group', 'admin').exec(function(err, admins) {
		
		if (err) return callback(err);
		
		console.log('admins :'+JSON.stringify(admins));
		
		new keystone.Email('userAdmin-notification').send({
			to: admins,
			from: {
				name: 'OCC-Badminton',
				email: 'contact@occ-badminton.org'
			},
			subject: 'Demande d`\'inscription',
			User: User
		}, callback);
	});
};

User.schema.methods.sendUserNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function(err) {
			if (err) {
				console.log(err);
			}
		};
	}

	var User = this;

	console.log('admins :'+JSON.stringify(User));
	
	new keystone.Email('user-notification').send({
			to: User.email,
			from: {
				name: 'OCC-Badminton',
				email: 'contact@occ-badminton.org'
			},
			subject: 'Inscription confirmée',
			User: User
		}, callback);
};

/**
 * Registration
 */

User.defaultColumns = 'name, email, group';
User.register();

