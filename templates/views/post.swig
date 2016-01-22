{% extends "../layouts/default.swig" %}
{% import "../mixins/commenting.swig" as Commenting%}

{% block content %}
		<div class="row">
			<div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
				<p>
					<a href="/blog" class="occ-theme-color">&larr; Retour aux actualités</a>
				</p>
				<hr>
				<article class="occ-post occ-bg">
					{% if not post %}
						<h2>Article inconnu.</h2>
					{% else %}
						<header>
							{% if post.image.exists %}
								<div class="image-wrap ">
									<img src="{{ post._.image.fit(300,180) }}" class="img-responsive">
								</div>
							{% endif %}
							<h1 class="text-caps text-danger">{{ post.title }}</h1>
							<span>
							{% if post.publishedDate %}
								le {{ post._.publishedDate.format('DD/MM/YYYY') }}
							{% endif %}
							{% if post.category %}
								dans la catégorie :
								<a href="/blog/{{ post.category.key }}" class="occ-theme-color">{{ post.category.name }}</a>
							{% endif %}
							{% if post.author %}
								par {{ post.author.name.first }}
							{% endif %}
							<span>
						</header>
						<div class="occ-post-content">

							{{ post.content.full | raw }}
							
						</div>
						<div>
							{{Commenting.comment-form()}}
							{{Commenting.comment-thread(comments)}}
						</div>
					{% endif %}
				</article>
			</div>
		</div>
{% endblock %}
