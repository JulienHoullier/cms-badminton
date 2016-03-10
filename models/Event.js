var keystone = require('keystone');
var Types = keystone.Field.Types;
var mailLib = require('../lib/mail');

/**
 * Event Model
 * =============
 */

var Event = new keystone.List('Event', {
	label: 'Evènements'
});

Event.add({
	name: { type: Types.Name, required: true, initial:true },
	description: { type: Types.Email, required: true, initial:true },
	date: { type: Types.Date, required: true, initial:true }
});

Event.hasRoles = function(user){
	if(user) {
		return user.isAdmin;
	}
	return false;
};

Event.defaultSort = '-date';
Event.defaultColumns = 'name, date, description';
Event.register();
