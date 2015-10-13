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
    name : {type : Types.Text, required: true},
    club : {type : Types.Text, required: true, initial: true},
    date : {type : Types.Date, required: true, initial: true, format : 'DD/MM/YYYY'},
    registrationDeadLine : {type : Types.Date, required: true, initial: true},
    registrationEmail : {type : Types.Email},
    duration : {type : Number},
    //categories : {type    //[Jeune,Vétérans,Sénior]
    //ranking :             //[D9, D8, D7 ...]
    //table :               //[SH, SD, DH, DD, DM]
    price : {type : Number},        //prix de l'inscription
    location : {type : Types.Location}
});


Tournament.defailtColums = 'name, club, date';
Tournament.register();
