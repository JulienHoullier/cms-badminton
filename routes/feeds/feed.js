var keystone = require('keystone');
var RSS = require('rss');
var _ = require('underscore');

exports = module.exports = function(req, res) {

	// TODO : Remplacer le base url par une conf d'environnement.

	// Création du flux
	var feed = new RSS({
		title: keystone.get('brand'),
		description: "Toute l'actualité de l'OCC Badminton",
		feed_url: keystone.get('domain name')+'/feed',
		site_url: keystone.get('domain name'),
		image_url: keystone.get('domain name')+'/images/occ-logo.png',
		webMaster: 'Julien Houllier, Marc Bouteiller',
		language: 'fr',
		categories: ['Badminton','Cesson Sévigné'],
		ttl: '60',
	});

	/**
	 * Ajoute un item au flux RSS.
	 * @param {Post.js} post Objet Post
	 */
	var addItem = function(post){
		feed.item({
			title: post.title,
			description: post.content.brief,
			url: keystone.get('domain name')+'/blog/post/' + post.slug,
			author: post.author.name.full,
			date: post.publishedDate,
			enclosure: {url: post.image}
		});
	}

	// Récupération des posts pour les ajouter au flux.
	keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate')
		.populate('author category')
		.exec(function(err, results) {
				if(err) res.status(500).send('Erreur de récupération des articles.');

				_.each(results, addItem);
	
				res.type('application/rss+xml');
				res.send(feed.xml({indent: true}));
			});
};
