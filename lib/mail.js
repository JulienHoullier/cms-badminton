var keystone = require('keystone');
var Email = require('keystone-email');

const EXT = '.html';

module.exports = {
	/**
	 * Send an email using keystone configuration
	 * @param callback, to call when mail sent
	 * @param subject, to indicate in mail
	 * @param to, the list of person targeted. format [{email: <email_to_target>, (name : <name_to_target>) optional}, ...]
	 * @param options, the couple key,value to pass at the mail template
	 */
	sendMail: function (template, callback, subject, to, options){

		if ('function' !== typeof callback) {
			callback = function(err,info) {
				if (err) {
					return console.log(err);
				}
				return console.log(info);
			};
		}
		
		var toMsg = to.map(function(contact){ 
			var result = contact.email;
			if(contact.name){
				result = {name : contact.name.full, email: contact.email};
			}
			return result;
		});
		
		var bcc = to.map(function(contact){ 
			return contact.email;
		});
		
		var message = {
			apiKey: process.env.MAILGUN_APIKEY,
			domain: process.env.MAILGUN_SANDBOX,
			to: toMsg,
			cc: process.env.MAIL_CC,
			bcc: bcc,
			from: {
				name: process.env.DB_NAME,
				email: process.env.MAIL_CC
			},
			subject: subject,
		};
		
		if(!options){
			options = {};
		}
		if(keystone.get('email locals')){
			Object.assign(options, keystone.get('email locals'));
		}
		
		if(process.env.MAIL_ACTIVATED){
			new Email(template+EXT, keystone.get('email options')).send(options, message, callback);
		}
		else{
			console.log("mail message: "+JSON.stringify(message));
		}
	}
};
