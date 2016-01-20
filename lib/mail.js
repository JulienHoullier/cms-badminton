var keystone = require('keystone');

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
			to: {email : 'contact@occ-badminton.org'},
			mandrillOptions: {cc: cci},
			from: {
				name: 'OCC-Badminton',
				email: 'contact@occ-badminton.org'
			},
			subject: subject,
		}
		
		if(options){
			for(key in options) {
				message[key] = options[key];
			}
		}
		
		new keystone.Email(template).send(message, callback);
	}
};
