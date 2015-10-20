var keystone = require('keystone');
var Types = keystone.Field.Types;
var _ = require('underscore');

/**
 * User Model
 * ==========
 */
var roles = [
{value : 'editor', label:'Editeur'},
{value : 'tournamentManager', label:'Gestion des tournois'},
{value : 'admin', label:'admin'},
]


var User = new keystone.List('User', {
	label: 'Utilisateurs',
});

User.add({
	name: { type: Types.Name, label:'Nom', required: true, index: true },
	email: { type: Types.Email, label:'Email', initial: true, required: true, index: true },
	password: { type: Types.Password, label:'Mot de passe', initial: true, required: true },
	state:{ type: Types.Select, label:'Permissions', options: 
		[
			{value:'unauthorized', label:'Banni'},
			{value:'authorized', label:'Accepté'}
		],
		required: true,
		default:  'unauthorized'
	}
});

var rolesType = {};

_.each(roles, function(def) {
	rolesType[def.value] = {type : Types.Boolean, label: def.label};
});

User.add('Roles', rolesType);


// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.roles === 'admin';
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

