var keystone = require('keystone');
var Types = keystone.Field.Types;
var MediaTypes = require('../lib/MediaType');

/**
 * Media Model
 * =============
 */

var Media = new keystone.List('Media', {
	label: 'Médias',
	map: { name: 'type' }
});

var TypeOptions = [];
Object.keys(MediaTypes).forEach(function (key) { TypeOptions.push(MediaTypes[key])});

Media.add({
	type: {type: Types.Select , label:'Type',  options: TypeOptions, initial:true, required:true},
	url: { type: Types.Url, initial:true },
	embedded: { type: Types.Html, initial:true }
});

Media.defaultSort = '-name';
Media.defaultColumns = 'name';
Media.register();
