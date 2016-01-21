var keystone = require('keystone');
var Types = keystone.Field.Types;
var twitterClient = require('../lib/twitterClient');
var mailLib = require('../lib/mail');

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	label: 'Actualités',
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add(
	{
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
		category: { type: Types.Relationship, label:'Catégorie', ref: 'PostCategory'}
	}, 
	{ heading:'Réseaux sociaux', dependsOn:{ state: 'published' }}, 
	{
		important : {type : Types.Boolean, label:'Diffusion par mail', dependsOn:{ state: 'published' }},
		socialVisible : {type : Types.Boolean, label:'Visible sur réseaux sociaux', dependsOn:{ state: 'published' }},
		socialized : {type : Types.Boolean, label: 'Déjà publiée', noedit:true, dependsOn:{ state: 'published' }}
		 // Indique que le post a déjà été publié sur les réseaux sociaux.
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

/*************************
 * PRE-SAVE
 ************************/
Post.schema.pre('save', function(next) {
	this.needMail = this.isModified('important') && this.important;
	next();
});
Post.schema.pre('save', function(next) {
	if(this.isNew && !this.category){
		var Post = this;
		var PostCategory = keystone.list('PostCategory');
		// Ajout de la catégorie par défaut "Club", si pas de catégorie sélectionnée
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

/*************************
 * POST-SAVE
 ************************/
Post.schema.post('save', function() {
    if (this.needMail) {
    	this.sendNotificationEmail();
    }
});
Post.schema.post('save', function(post) {
    if (this.socialVisible
    	&& !this.socialized ) {
    	// Tweet si le statut passe à "published" ou que l'article n'a pas été publié sur les réseaux sociaux.
    	this.populate('author category', function (err, post){
			var status = buildTweet(post.title, post.author.name.first, post.slug, post.category.name);
			twitterClient.tweet(status, function(error){
				if(error) {
					console.log("Twitter Error : ");
					console.log(error);
				} else {
					post.socialized = true;
					post.save(function(err){
						if(err) console.log(err);
					});
				}
			});
    	});
    }
});

/**
 * Construction du message Twitter
 * @param  {String} title    Titre de l'article
 * @param  {String} author   Autheur de l'article
 * @param  {String} slug     id unique de l'url
 * @param  {String} category Categorie de l'article
 * @return {String}          Statut à poster sur Twitter
 */
function buildTweet(title, author, slug, category){
	var tweet = title;
	tweet += " " + process.env.DOMAIN_NAME+"/blog/post/"+ slug;
	tweet += " par " + author;
	if(category){
		tweet += " #" + category.replace(/\s+/g, '');
	}
	return tweet;
}

Post.schema.methods.sendNotificationEmail = function(callback) {

	var post = this;

	if(post.category){
		Post.model.populate(this, 'category', function (err, post) {

			post.category.populateRelated('followers', function(err){
				if (err) {
					return console.log('Error retriving followers due to: '+err);
				}
				mailLib.sendMail('post-notification', callback, 'Info importante', post.category.followers, {post: post});
			});

		});
	}
	else{
		return console.log('No category no mail');//no category no send
	}
};

Post.defaultSort = '-publishedDate';
Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
