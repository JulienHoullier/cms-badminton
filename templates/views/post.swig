{% extends "../layouts/default.swig" %}

{% block content %}
		<div class="row">
			<div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
				<article class="occ-post">
					<p>
						<a href="/blog">&larr; Retour aux actualités</a>
					</p>
					<hr>
					{% if not data.post %}
						<h2>Article inconnue.</h2>
					{% else %}
						<header>
							<h1 class="text-caps text-danger">{{ data.post.title }}</h1>							
							{% if data.post.publishedDate %}
								le {{ data.post._.publishedDate.format('DD/MM/YYYY') }}
							{% endif %}
							{% if data.post.categories and data.post.categories.length %}
								dans la catégorie :
								{% for cat in data.post.categories %}
									<a href="/blog/{{ cat.key }}">{{ cat.name }}</a>
									{% if loop.index < data.post.categories.length - 1 %}, {% endif %}
								{% endfor %}
							{% endif %}
							{% if data.post.author %}
								par {{ data.post.author.name.first }}
							{% endif %}
						</header>
						<div class="post">
							{% if data.post.image.exists %}
								<div class="image-wrap">
									<img src="{{ data.post._.image.fit(750,450) }}" class="img-responsive">
								</div>
							{% endif %}
							{{ data.post.content.full | raw }}
						</div>
					{% endif %}
				</article>
			</div>
		</div>
{% endblock %}
