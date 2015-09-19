var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Player Model
 * =============
 */

var Player = new keystone.List('Player', {
	map: { name: 'name' },
	label: 'Joueurs',
	autokey: { path: 'slug', from: 'email', unique: true }
});

Player.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true, initial: true },
	phone: { type: String },
	licence: {type: Number },
	type: { type: Types.Select, options: [
		{ value: 'competitor', label: 'Licence compétition' },
		{ value: 'leisure', label: 'Licence loisir' },
		{ value: 'young', label: 'Jeune' }
	], default: 'leisure' },
	state: { type: Types.Select, options: [
		{ value: 'new', label: 'Pré-inscrit' },
		{ value: 'confirmed', label: 'Inscription complétée' },
		{ value: 'aborted', label: 'Inscription annulée' }
	], default: 'new' },
	timeSlot: { type: Types.Select, options: [
		{ value: 'monday_middle', label: 'Lundi intermédiaire 19h/20h30' },
		{ value: 'monday_newbie', label: 'Lundi débutant  20h30/22h' },
		{ value: 'wednesday_strong', label: 'Mercredi confirmé 20h30/22h' },
		{ value: 'friday_middle', label: 'Vendredi intermédiaire 20h/21h30' },
	], required: true, initial: true },
	team: { type: Types.Relationship, ref: 'Team', index: true }
});

Player.schema.methods.needConfirmNotification = function() {
    return this.state == 'confirmed';
}


Player.schema.pre('save', function() {
	this.needConfirm = this.isModified('state') && needConfirmNotification(); 
});

Player.schema.post('save', function() {
    if (this.needConfirm) {
    	this.sendNotificationEmail();
    }
});

Player.schema.methods.sendNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	var Player = this;
	
	new keystone.Email('Player-notification').send({
			to: this.email,
			from: {
				name: 'OCC-Badminton',
				email: 'j.houllier@gmail.com'
			},
			subject: 'Inscription validée à l\'OCC-Badminton',
			Player: Player
		}, callback);
};


Player.defaultColumns = 'name, email, type, state';
Player.register();
