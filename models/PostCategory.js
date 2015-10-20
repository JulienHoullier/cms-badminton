var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Catégories'
});

PostCategory.add({
	name: { type: String, label:'Nom', required: true }
});

PostCategory.relationship({ ref: 'Post', path: 'categories', label:'Catégories' });

PostCategory.register();
