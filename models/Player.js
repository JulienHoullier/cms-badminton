var keystone = require('keystone');
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Player Model
 * =============
 */

var Player = new keystone.List('Player', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Player.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true, initial: true },
	phone: { type: String },
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
	], required: true, initial: true }
});

Player.schema.methods.needNotification = function() {

	Player.model.findById(this.id).executer()
    return this.state == 'new';
}


Player.schema.pre('save', function(next) {
    if (this.isModified('state') && this.isNew() && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});

Player.defaultColumns = 'name, email, type, state';
Player.register();
