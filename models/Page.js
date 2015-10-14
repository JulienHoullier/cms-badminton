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
	title: { type: String, label:'Titre', required: true },
	state: { type: Types.Select, label:'Affichage', options: [
		{value:'show', label:'Afficher dans le menu'}, 
		{value:'hide', label:'Masquer'}
	], default: 'show', index: true },
		content: { type: Types.Html, label:'Contenu', wysiwyg: true, height: 800 },
});

Page.schema.virtual('url').get(function() {
	return '/pages/' + this.slug;
});

Page.defaultColumns = 'title, state|20%';
Page.register();
