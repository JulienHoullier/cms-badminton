var keystone = require('keystone');
var Types = keystone.Field.Types;

var localStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: './frontend/public/files',
    publicPath: '/files',
	format: function(item, file){
            return '<img src="' + file.href + '" style="max-width: 300px">'
        }
  },
});
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
	link: {type : Types.Url, label: 'Lien du tournoi', note:'Si présent, il sera utilisé à la place de la description et les fichiers'},
	description: {type : Types.Html},
	files: {type: Types.File, storage: localStorage, label: 'Fichiers'}
        
});

Tournament.relationship({ ref: 'Registration', path: 'registrations', refPath: 'tournament' });

Tournament.hasRoles = function(user){
	if(user) {
		return user.isAdmin || user.isTournamentManager;
	}
	return false;
};

Tournament.defaultColumns = 'name, club, date';
Tournament.register();
