var keystone = require('keystone');
var Email = require('keystone-email');

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
					console.log(err);
				}
				else{
					console.log(info);
				}
			};
		}
		var cci = to.map(function(contact){ 
			var result = {email: contact.email};
			if(contact.name){
				result.name = contact.name.full;
			}
			return result;
		});
		
		var message = {
			apiKey: process.env.MAILGUN_APIKEY,
			domain: process.env.MAILGUN_SANDBOX,
			to: to,
			cc: process.env.MAIL_CC,
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
			new Email(template, keystone.get('email options')).send(options, message, callback);
		}
		else{
			console.log("mail message: "+JSON.stringify(message));
		}
	}
};
