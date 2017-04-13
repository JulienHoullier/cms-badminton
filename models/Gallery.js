var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Albums'
});

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Types.Date, default: Date.now, note:'Definit l\'ordre d\'apparition' },
	heroImage: { type: Types.CloudinaryImage, autoCleanup : true, note:'Si remplit, l\'image représentant l\'album' },
	images: { type: Types.CloudinaryImages, autoCleanup : true }
});

Gallery.hasRoles = function(user){
	if(user) {
		return user.isEditor || user.isAdmin;
	}
	return false;
};

Gallery.register();
