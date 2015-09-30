var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */

var Page = new keystone.List('Page', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Page.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'show, hide', default: 'show', index: true },
	content: { type: Types.Html, wysiwyg: true, height: 800 },
});

Page.schema.virtual('url').get(function() {
	return '/pages/' + this.slug;
});

Page.defaultColumns = 'title, state|20%';
Page.register();
