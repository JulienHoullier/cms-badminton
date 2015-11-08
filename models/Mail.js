var keystone = require('keystone');
var Types = keystone.Field.Types;
var async = require('async');

/**
 * Mail Model
 * =============
 */

var Mail = new keystone.List('Mail', {
	label: 'Emails',
	map: { name: 'subject' },
});

Mail.add({
	subject: { type: String, label:'Sujet', required: true, initial: true },
    categories: { type: Types.Relationship, label:'Catégories', ref: 'PostCategory', initial: true, many:true },
	players: { type: Types.Relationship, label:'Joueurs', ref:'Player', initial: true, many:true },
	message: { type: Types.Html, label:"Message", required: true, initial:true }
});

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
	if(arguments.length == 4){
		cat = arguments[3];
	}
	new keystone.Email('email-notification').send({
				to: to,
				from: {
					name: 'OCC-Badminton',
					email: 'contact@occ-badminton.com'
				},
				subject: mail.subject,
				mail: mail,
				category: cat
			}, callback);
};


Mail.schema.methods.sendNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function(err) {
			if (err) {
				console.log(err);
			}
		};
	}
	
	var Mail = this;
	
	if(this.categories && this.categories.length){
		var PostCategory = keystone.list('PostCategory');

		async.each(this.categories,function(cat, callback){
                    PostCategory.model.findById(cat)
                    .exec(function(err, cat) {
						if (err) {
							return callback(err);
						}
						if (cat) {
							cat.populateRelated('followers', function (err) {
								if(err){
									return callback(err);
								}
								sendMail(callback, cat.followers, Mail, cat);
							});
						}
						else{
							return callback({err: 'No category founded with _id set'});	
						}
                    });
                }, function(err) {
					callback(err);
                });
	}
	if(this.players && this.players.length){
		var Player = keystone.list('Player');
		Player.model.find({ _id: { $in: this.players}}).exec(function(err, players){
			if(err){
				return callback(err);
			}

			sendMail(callback, players, Mail);
		});		
	}
};

Mail.defaultColumns = 'subject';
Mail.register();
