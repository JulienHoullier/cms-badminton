var keystone = require('keystone');
var Types = keystone.Field.Types;
var async = require('async');
var mailLib = require('../lib/mail');
/**
 * Mail Model
 * =============
 */

var Mail = new keystone.List('Mail', {
	label: 'Emails',
	map: { name: 'subject' }
});

Mail.add({
	subject: { type: String, label:'Sujet', required: true, initial: true },
    type: { type: Types.Select, label:'Type de mail', required:true, initial:true, options: [
		{ value: 'category', label: 'Pour une(des) catégorie(s)' },
		{ value: 'player', label: 'Pour un(des) joueur(s)' },
		{ value: 'mail', label: 'Pour un(des) mails' }
	]  },
	categories: { type: Types.Relationship, label:'Catégories', ref: 'PostCategory', dependsOn: { type: 'category' }, initial: true, many:true, note: 'Le mail sera envoyé aux joueurs suivants ces catégories' },
	players: { type: Types.Relationship, label:'Joueurs', ref:'Player', dependsOn: { type: 'player' }, initial: true, many:true, note: 'Sélectionner la liste des joueurs' },
	email: { type: Types.Email, label:'E-mails', dependsOn: { type: 'mail' }, initial: true, note: 'Entrer les emails cibles' },
	message: { type: Types.Html, label:'Message', wysiwyg: true, required: true, initial:true}
});

Mail.hasRoles = function(user){
	if(user) {
		return user.isAdmin;
	}
	return false;
};

Mail.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});

Mail.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

var sendMail = function(callback, to, mail){
	var cat = null;
	if(arguments.length === 4){
		cat = arguments[3];
	}
	mailLib.sendMail('email-notification', callback, mail.subject, to, {mail:mail, category:cat});
};


Mail.schema.methods.sendNotificationEmail = function(callback) {
	
	var Mail = this;
	
	if(this.type === 'category' && this.categories){
		var PostCategory = keystone.list('PostCategory');

		async.each(this.categories,function(cat, callback){
                    PostCategory.model.findById(cat)
                    .exec(function(err, cat) {
						if (err) {
							callback(err);
							return;
						}
						if (cat) {
							cat.populateRelated('followers', function (err) {
								if(err){
									callback(err);
									return;
								}
								sendMail(callback, cat.followers, Mail, cat);
							});
						}
						else{
							callback({err:'No category founded with _id set'});
						}
                    });
                }, function(err) {
					console.log('Error processing categories list due to: '+err);
                });
	}
	
	if(this.type === 'player' && this.players){
		var Player = keystone.list('Player');
		Player.model.find({ _id: { $in: this.players}}).exec(function(err, players){
			if(err){
				return console.log('Error retrieving players due to: '+ err);
			}
			sendMail(callback, players, Mail);
		});		
	}

	if(this.type === 'mail'&& this.email){
		sendMail(callback, [{email: this.email}], this);
	}
};

Mail.defaultColumns = 'subject';
Mail.register();
