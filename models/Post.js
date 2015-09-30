var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	label: 'Actualités',
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	categories: { type: Types.Relationship, ref: 'PostCategory'}
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.schema.pre('save', function() {
	if(this.isNew && this.important);
		this.needMail = true; 
});

Post.schema.post('save', function() {
    if (this.needMail) {
    	this.sendNotificationEmail();
    }
});

Post.schema.methods.sendNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	var post = this;
	
	keystone.list('Player').model.find().where('state', 'confirmed').exec(function(err, players) {
		
		if (err) return callback(err);
	
		new keystone.Email('Post-notification').send({
			to: players,
			from: {
				name: 'OCC-Badminton',
				email: 'webmaster@occ-badminton.org'
			},
			subject: 'Info importante',
			Post: post
		}, callback);
	});
};

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();