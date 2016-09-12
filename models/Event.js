var keystone = require('keystone');
var Types = keystone.Field.Types;
var mailLib = require('../lib/mail');

/**
 * Event Model
 * =============
 */

var Event = new keystone.List('Event', {
	label: 'Evènements',
	map: { name: 'description' }
});

Event.add({
	description: { type: Types.Text, required: true, initial:true },
	date: { type: Types.Date, format: "DD-MM-YYYY", required: true, initial:true },
	startHour: { type: Types.Text, required: true, initial:true, label: "Heure de début", note:"exemple: 20h30" },
	endHour: { type: Types.Text, required: true, initial:true, label: "Heure de fin", note:"exemple: 22h30" },
	weekly: { type: Types.Boolean, required: false, initial:true, label: "Hebdomadaire" },
	endDate: { type: Types.Date, required: true, initial:true, label: "Date de fin", dependsOn:{weekly:true} },
	canceled: { type: Types.Boolean, required: false, initial:false, label: "Annuler", note:"L'évènement sera barré." }
});

Event.hasRoles = function(user){
	if(user) {
		return user.isAdmin;
	}
	return false;
};

// Enregistrement Hebdomadaire jusqu'à la date de fin.
Event.schema.post('save', function() {
		var testDate = new Date(this.date);
		testDate.setDate(testDate.getDate() + 7);
		console.log(testDate);
    if (this.weekly && testDate <= this.endDate) {
			var newDate = this.date;
			newDate.setDate(newDate.getDate() + 7);
			var event = new Event.model({
				description: this.description,
				date : newDate,
				startHour: this.startHour,
				endHour: this.endHour,
				endDate: this.endDate,
				weekly: true
			});
			// réutilise le post-save
			event.save(function(err){
				console.log(err);
			});
    }
});

Event.defaultSort = '-date';
Event.defaultColumns = 'name, date, description';
Event.register();
