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
    club : {type : Types.Text, label: 'Club', required: true, initial: true},
    date : {type : Types.Date, label: 'Date du tournoi', required: true, initial: true, format : 'DD/MM/YYYY'},
    registrationDeadLine : {type : Types.Date, label: 'Date limite d\'inscription', required: true, initial: true},
    registrationEmail : {type : Types.Email, label: 'Mail de l\'organisateur'},
    duration : {type : Number, label: 'Durée'},
    price : {type : Number, label: 'Prix'},        //prix de l'inscription
    location : {type : Types.Location, label: 'Lieu'}
});

Tournament.defaultColums = 'name, club, date';
Tournament.register();
