var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Tournament Model
 * =============
 */

var Tournament = new keystone.List('Tournament', {
	map: { name: 'name' },
    label: 'Tournois',
    defaultSort : '-date'
});

Tournament.add({
    name : {type : Types.Text, label: 'Nom', required: true},
    club : {type : Types.Text, label: 'Club'},
    date : {type : Types.Date, label: 'Date du tournoi', required: true, initial: true, format : 'DD/MM/YYYY', index: true},
    registrationDeadLine : {type : Types.Date, label: 'Date limite d\'inscription'},
    registrationEmail : {type : Types.Email, label: 'Mail de l\'organisateur'},
    duration : {type : Number, label: 'Durée'},
    price : {type : Types.Money, label: 'Prix'},        //prix de l'inscription
    location : {type : Types.Location, label: 'Lieu'}
});

Tournament.relationship({ ref: 'Registration', path: 'registrations', refPath: 'tournament' });

Tournament.defaultColumns = 'name, club, date';
Tournament.register();
