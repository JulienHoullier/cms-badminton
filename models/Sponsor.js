var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Sponsor Model
 * =============
 */

var Sponsor = new keystone.List('Sponsor', {
	map: { name: 'name' },
	label: 'Sponsors',
	autokey: { path: 'slug', from: 'name', unique: true }
});

Sponsor.add({
	name: { type: String, label:'Nom', required: true },
	url: { type: Types.Url, label:'URL', required: true, initial: true },
	img_url: { type: Types.Url, label:'Image URL' },
	amount: { type: Number, label:'Somme versée' }
});

Sponsor.hasRoles = function(user){
	if(user) {
		return user.isAdmin;
	}
	return false;
};

Sponsor.defaultSort = '-amount';
Sponsor.defaultColumns = 'name, url, amount';
Sponsor.register();
