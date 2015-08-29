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
	name: { type: Types.Name, required: true },
	url: { type: Types.Url , required: true, initial: true },
	img_url: { type: Types.Url },
	value: { type: Number }
});

Sponsor.defaultColumns = 'name, url';
Sponsor.register();
