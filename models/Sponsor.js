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
	name: { type: String, required: true },
	url: { type: Types.Url , required: true, initial: true },
	img_url: { type: Types.Url },
	amount: { type: Number }
});

Sponsor.defaultSort = '-amount';
Sponsor.defaultColumns = 'name, url, amount';
Sponsor.register();
