var keystone = require('keystone');
var Types = keystone.Field.Types;
var _ = require('underscore');
var mailLib = require('../lib/mail');

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
	photo: { type: Types.CloudinaryImage, label:'Image' },
	email: { type: Types.Email, label:'Email', initial: true, required: true, index: true },
	password: { type: Types.Password, label:'Mot de passe', initial: true, required: true },
	player: { type: Types.Relationship, label:'Joueur', ref: 'Player', initial: true}
}, 'Permissions', {
	isAdmin: { type: Types.Boolean, label:'Administrateur' },
	isUser: { type: Types.Boolean, label:'Utilisateur' },
	isEditor: { type: Types.Boolean, label:'Editeur' },
	isTournamentManager: { type: Types.Boolean, label:'Gère les tournois' },
});

User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin || this.isTournamentManager || this.isEditor; 
});
User.schema.virtual('isValid').get(function() {
	return this.isUser || this.isEditor || this.isTournamentManager || this.isAdmin;
});

/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

User.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	if((this.isModified('isAdmin') || this.isModified('isUser')
		|| this.isModified('isEditor') || this.isModified('isTournamentManager'))
		&& this.isValid) {
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

	var User = this;

	keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {

		if (err) return console.log('Error retrieving admins due to :'+err);

		mailLib.sendMail('userAdmin-notification', callback, 'Demande d\'inscription', admins, {user: User});
	});
};

User.schema.methods.sendUserNotificationEmail = function(callback) {

	var User = this;

	mailLib.sendMail('user-notification', callback, 'Inscription confirmée', [User], {user: User});
};

/**
 * Registration
 */

User.defaultColumns = 'name, email, player, isAdmin, isUser, isEditor, isTournamentManager';
User.register();

