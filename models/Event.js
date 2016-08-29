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
	description: { type: Types.Text, required: true, initial:true },
	date: { type: Types.Date, format: "DD-MM-YYYY", required: true, initial:true },
	startHour: { type: Types.Text, required: true, initial:true, label: "Heure de début", note:"exemple: 20h30" },
	endHour: { type: Types.Text, required: true, initial:true, label: "Heure de fin", note:"exemple: 22h30" },
	canceled: { type: Types.Boolean, required: false, initial:false, label: "Annuler", note:"L'évènement sera barré." }
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
