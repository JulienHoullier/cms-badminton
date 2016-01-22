var keystone = require('keystone');

var app = keystone;

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post
	};
	
	var Post = keystone.list('Post');
	var PostComment = keystone.list('PostComment');

	// Load the current post
	view.on('init', function (next) {
		var q = Post.model.findOne({
			state: 'published',
			slug: locals.filters.post,
		}).populate('author categories');

		q.exec(function (err, result) {
			if(err) {
				console.log(err);
			}
			else{
				locals.post = result;
			}
			next(err);
		});

	});
	
	
	// Load other posts
	//view.query('posts', Post.model.find()
	//		.where('state', 'published')
	//		.sort('-publishedDate')
	//		.populate('author')
	//		.limit('4'));
	
	// Load comments on the Post
	view.query('comments', PostComment.model.find()
			.where('post', locals.post)
			.where('commentState', 'published')
			.where('author').ne(null)
			.populate('author', 'name')
			.sort('-publishedOn'));
	
	// Create a Comment
	view.on('post', { action: 'comment.create' }, function (next) {

		var newComment = new PostComment.model({
			state: 'published',
			post: locals.post.id,
			author: locals.user.id,
		});

		var updater = newComment.getUpdateHandler(req);

		updater.process(req.body, {
			fields: 'content',
			flashErrors: true,
			logErrors: true,
		}, function (err) {
			if (err) {
				validationErrors = err.errors;
			} else {
				req.flash('success', 'Votre commentaire a été ajouté.');
				return res.redirect('/blog/post/' + locals.post.key + '#comment-id-' + newComment.id);
			}
			next();
		});

	});

	// Delete a Comment
	view.on('get', { remove: 'comment' }, function (next) {

		if (!req.user) {
			req.flash('error', 'Vous devez être connecté pour supprimer un commentaire.');
			return next();
		}

		PostComment.model.findOne({
				_id: req.query.comment,
				post: locals.post.id,
			})
			.exec(function (err, comment) {
				if (err) {
					if (err.name === 'CastError') {
						req.flash('error', 'Le commentaire ' + req.query.comment + ' n\'a pas été trouvé.');
						return next();
					}
					return res.err(err);
				}
				if (!comment) {
					req.flash('error', 'Le commentaire ' + req.query.comment + ' n\'a pas été trouvé.');
					return next();
				}
				if (comment.author != req.user.id) {
					req.flash('error', 'Désolé, seul l\'auteur d\'un commentaire peut le supprimer');
					return next();
				}
				comment.commentState = 'archived';
				comment.save(function (err) {
					if (err) return res.err(err);
					req.flash('success', 'Votre commentaire a été supprimé.');
					return res.redirect('/blog/post/' + locals.post.key);
				});
			});
	});

	view.on('render', function(next) {
		console.log('comments : '+locals.comments);
		console.log('post : '+locals.post);
		PostComment.model.find()
			.where('post', locals.post)
			.where('commentState', 'published')
			.where('author').ne(null)
			.populate('author', 'name')
			.sort('-publishedOn').exec(function(err, comments){
				if(err) {
					console.log(err);
				}
				if(comments){
					console.log('get comments');
				}
				console.log('passe ici');
				next();
			});
	});
		
	// Render the view
	view.render('post');
	
};
