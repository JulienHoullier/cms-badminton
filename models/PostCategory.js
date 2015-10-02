var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Catégorie'
});

PostCategory.add({
	name: { type: String, required: true },
	default_image: { type: Types.LocalFile ,
		dest: '/data/files',
		prefix: '/files/',
		filename: function(item, file){
			return item.id + '.' + file.extension
		}
	}
});

PostCategory.relationship({ ref: 'Post', path: 'category' });

PostCategory.register();
