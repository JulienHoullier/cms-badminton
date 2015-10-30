{% extends "../layouts/default.swig" %}

{% block content %}
		<div class="row">
			<div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
				<p>
					<a href="/blog" class="occ-theme-color">&larr; Retour aux actualités</a>
				</p>
				<hr>
				<article class="occ-post occ-bg">
					{% if not data.post %}
						<h2>Article inconnu.</h2>
					{% else %}
						<header>
							<h1 class="text-caps text-danger">{{ data.post.title }}</h1>
							<span>
							{% if data.post.publishedDate %}
								le {{ data.post._.publishedDate.format('DD/MM/YYYY') }}
							{% endif %}
							{% if data.post.category %}
								dans la catégorie :
								<a href="/blog/{{ data.post.category.key }}" class="occ-theme-color">{{ data.post.category.name }}</a>
							{% endif %}
							{% if data.post.author %}
								par {{ data.post.author.name.first }}
							{% endif %}
							<span>
						</header>
						<div class="occ-post-content">

							{{ data.post.content.full | raw }}

							{% if data.post.image.exists %}
								<div class="image-wrap">
									<img src="{{ data.post._.image.fit(750,450) }}" class="img-responsive">
								</div>
							{% endif %}
							
						</div>
					{% endif %}
				</article>
			</div>
		</div>
{% endblock %}
