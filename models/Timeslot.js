var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Timeslot Model
 * ==================
 */

var Timeslot = new keystone.List('Timeslot', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Créneau'
});

Timeslot.add({
	name: { type: String, label:'Nom du créneau', required: true, note:"exemple: [Jour] / [Ville]" },
	description: { type: String, label:'Description', initial: true, note:"Jeunes 7-10" },
	startHour: { type: Types.Text, required: true, initial:true, label: "Heure de début", note:"exemple: 20h30"},
	endHour: { type: Types.Text, required: true, initial:true, label: "Heure de fin", note:"exemple: 22h30"}
});

Timeslot.hasRoles = function(user){
	if(user) {
		return user.isAdmin;
	}
	return false;
}

Timeslot.schema.pre('save', function(next) {
	if(this.isNew){
		var timeslotCategory = createName(this);
		
		var PostCategory = keystone.list('PostCategory');
		PostCategory.model.findOne({name : timeslotCategory}, function(err, category){
			if(err){
				console.log(err);
			}
			else if(!category) {
				category = new PostCategory.model({name: timeslotCategory});
				category.save();
			}
			next();
		});
		this.wasNew = true;
	}
	else {
		next();
	}
});

Timeslot.relationship({ ref: 'Player', path: 'players', refPath: 'timeSlot' });

Timeslot.schema.virtual('fullName').get(function() {
	return this.name +"("+this.startHour+"-"+this.endHour+")";
});

Timeslot.register();
