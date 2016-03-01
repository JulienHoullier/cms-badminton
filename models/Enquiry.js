var keystone = require('keystone');
var Types = keystone.Field.Types;
var mailLib = require('../lib/mail');

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true,
	label: 'Requêtes'
});

Enquiry.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	enquiryType: { type: Types.Select, options: [
		{ value: 'message', label: 'Juste laisser un message' },
		{ value: 'question', label: 'J\'ai une question' },
		{ value: 'other', label: 'Autre...' }
	] },
	message: { type: Types.Markdown, required: true },
	createdAt: { type: Date, default: Date.now }
});

Enquiry.hasRoles = function(user){
	if(user) {
		return user.isAdmin;
	}
	return false;
};

Enquiry.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});

Enquiry.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Enquiry.schema.methods.sendNotificationEmail = function(callback) {
	
	var enquiry = this;
	
	keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {
		
		if (err) return callback(err);
		if(admins){
			mailLib.sendMail('enquiry-notification', callback, 'Nouvelle réclamation', admins, {enquiry: enquiry});
		}
	});
};

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
