var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Registered Model
 * =============
 */

var Registered = new keystone.List('Registered', {
	label: 'Inscrits',
});

Registered.add({
    tournament : {type : Types.Relationship, ref : 'Tournament', required : true, initial : true},
    player : {type : Types.Relationship, ref : 'Player', required : true, initial : true},
    category : {type : Types.Select, options: 'Jeune,Vétérans,Sénior', default: 'Vétérans', required : true, initial : true},
    ranking : {type : Types.Select, options: 'D9,D8,D7,R6,R5,R4,N3,N2,N1', default: 'D9', required : true, initial : true},
    table : {type : Types.Select, options: 'SH,SD,DH,DD,DM', default: 'SH', required : true, initial : true},
    price : {type : Number, required : true, initial : true}
});


Registered.defaultColumns = 'tournament, player, table, ranking';
Registered.register();
