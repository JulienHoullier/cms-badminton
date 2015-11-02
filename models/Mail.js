var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Mail Model
 * =============
 */

var Mail = new keystone.List('Mail', {
	label: 'Emails',
	map: { name: 'subject' },
});

Mail.add({
	subject: { type: String, required: true, initial: true },
    categories: { type: Types.Relationship, initial: true, many:true },
	players: { type: Types.Relationship, initial: true, many:true },
	message: { type: Types.Html, label:"Message", required: true}
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

var sendMail = function(to, mail){
	var cat = null;
	if(arguments.length == 2){
		cat = arguments[2];
	}
	new keystone.Email('mail-notification').send({
				to: to,
				from: {
					name: 'OCC-Badminton',
					email: 'contact@occ-badminton.com'
				},
				subject: Mail.subject,
				mail: Mail,
				category, cat
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

		async.each(this.categories,function(cat, next){
                    PostCategory.model.findById()
                    .exec(function(err, cat) {
                    	cat.populateRelated('followers', function(cat){
                    		sendMail(cat.followers, Mail, cat);
                    		next();	
                    	});
                        
                    });
                }, function(err) {
                    next(err);
                });
	}
	else{
		sendMail(this.players, Mail);
	}
};

Mail.defaultColumns = 'subject';
Mail.register();
