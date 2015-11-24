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
	title: { type: String, label:'Titre', required: true },
	state: { type: Types.Select, label:'Etat', options: 
		[
			{value:'draft', label:'Ebauche'},
			{value:'published', label:'Publiée'}, 
			{value:'archived', label:'Archivée'},
		], 
		default: 'draft', index: true },
	author: { type: Types.Relationship, label:'Auteur', ref: 'User', index: true },
	publishedDate: { type: Types.Date, label:'date de publication', index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage, label:'Image' },
	content: {
		brief: { type: Types.Html, label:'En bref', wysiwyg: true, height: 150 },
		extended: { type: Types.Html, label:'En détail', wysiwyg: true, height: 400 }
	},
	category: { type: Types.Relationship, label:'Catégorie', ref: 'PostCategory'},
	important : {type : Types.Boolean, label:'Important'}
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.schema.pre('save', function(next) {
	if(this.isModified('important') && this.important){
		this.needMail = true;
	}
	next();
});

Post.schema.pre('save', function(next) {
	if(this.isNew && !this.category){
		var Post = this;
		var PostCategory = keystone.list('PostCategory');
		PostCategory.model.findOne({name : 'Club'}, function (err, category) {
			if (!err && category) {
				Post.category = category;
			}
			next();
		});
	}
	else {
		next();
	}
});

Post.schema.post('save', function() {
    if (this.needMail) {
    	this.sendNotificationEmail();
    }
});

Post.schema.methods.sendNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function(err) {console.log(err);};
	}

	var post = this;
	
	var send = function(to){
		
		new keystone.Email('post-notification').send({
				to: to,
				from: {
					name: 'OCC-Badminton',
					email: 'contact@occ-badminton.org'
				},
				subject: 'Info importante',
				post: post
			}, callback);
	};

	if(post.category){	
		Post.model.populate(this, 'category', function (err, post) {

			post.category.populateRelated('followers', function(err){
				if (err) {
					return callback(err);
				}
				send(post.category.followers)
			});
			
		});
	}
	else{
		return callback({err : 'No category no mail'});//no category no send
	}
};

Post.defaultSort = 'state';
Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
