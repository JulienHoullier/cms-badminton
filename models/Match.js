var keystone = require('keystone');
var Types = keystone.Field.Types;
var mailLib = require('../lib/mail');

const matchEvent= 'Rencontre à domicile contre ';
/**
 * Match Model
 * =============
 */

var Match = new keystone.List('Match', {
	label: 'Rencontres'
});

Match.add({
	team: { type: Types.Relationship, ref: 'Team', label:'Equipe', required: true, initial: true, index: true },
    matchNumber: { type: Number, label:'Journée', required: true, initial: true, index: true, note: 'Sert a definir l\'ordre' },
	versus: { type: Types.Text, label:'Contre', required: true, initial: true, index: true },
	date: { type: Types.Date, format: 'DD-MM-YYYY', label:'Date', note: 'Si vous fixez la date, un mail sera envoyé aux membres de l\'équipe' },
    home: { type: Types.Select, label:'A domicile ?', options: [
		{ value: 'Yes', label: 'Oui' },
		{ value: 'No', label: 'Non' }
	] },
	location: { type: Types.Location, label:'Adresse de la salle'},
    result: { type: Types.LocalFile, dest: '/data/files', label:'Feuille de match' },
    occResult: { type: Number, label:'Score OCC' },
    versusResult: { type: Number, label:'Score adverse' }
});

Match.hasRoles = function(user){
	if(user) {
		return user.isEditor || user.isAdmin;
	}
	return false;
};

Match.schema.pre('save', function(next) {
	this.needNotif = (!this.isNew && this.isModified('date'));
	this.needEvent = this.isModified('date');
	next();
});

Match.schema.post('save', function() {
	if (this.needNotif) {
		this.sendNotificationEmail();
	}
	if(this.needEvent){
		this.getOrCreateEvent();
	}
});

Match.schema.methods.sendNotificationEmail = function(callback) {
	
	var Match = this;
	
	keystone.list('Team').model.findById(this.team).exec(function(err, team) {
		
		if (err) return console.log('Error retrieving team due to :'+err);
		
		team.populateRelated('players', function (err) {
			if (err) {
				return console.log('Error retrieving players due to :'+err);
			}
			mailLib.sendMail('match-notification', callback, 'Journée de championnat', team.players, {match:Match});
		});
	});
};

Match.schema.methods.getOrCreateEvent = function() {

	var Match = this;

	keystone.list('Event').model.findOne().where('name').text().search(matchEvent).language('fr').where('date').equals(Match.date).exec(function(err, event) {

		if (err) return console.log('Error retrieving event due to :'+err);

		if(event){
			if(event.date !== Match.date){
				event.date = Match.date;
				event.save();
			}
		}
		else if(!event && Match.date){
			var Event = new keystone.list('Event');
			var newEvent = Event.model(
				{
					name : matchEvent + Match.versus, 
					date : Match.date
				}
			);
			newEvent.save();
		}
	});
};

Match.defaultSort = '-matchNumber';
Match.defaultColumns = 'team, versus, date';
Match.register();
