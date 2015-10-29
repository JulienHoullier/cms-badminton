var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Catégories'
});

PostCategory.add({
	name: { type: String, label:'Nom', required: true },
	default_image: { type: Types.CloudinaryImage, label:'Image par défaut' },
});

PostCategory.relationship({ ref: 'Post', path: 'posts', refPath: 'category', label:'Catégories' });
PostCategory.relationship({ ref: 'Player', path: 'followers', refPath: 'interests', label:'Abonnés' });

PostCategory.register();
