{% extends "../layouts/default.swig" %}
{% import "../mixins/panel_title.swig" as PanelTitle %}
{% import "../mixins/show-post.swig" as ShowPost %}

{% block intro %}

	{% if data.categories.length %}
			<div class="container occ-categories">
				<h2>Catégories</h2>
				<div class="occ-list-categorie">
					<a href="/blog" class="btn {% if not data.category %}btn-primary{% else %}btn-default{% endif %}">Toutes catégories</a>
					{% for cat in data.categories %}
						<a href="/blog/{{ cat.key }}" class="btn {% if data.category and data.category.id == cat.id %}btn-primary{% else %}btn-default{% endif %}">{{ cat.name }}</a>
					{% endfor %}
				</div>
			</div>
		{% endif %}
		<div class="container occ-blog-title">
			<h1 class="center-block">{{ title }}</h1>
		</div>
{% endblock %}


{% block content %}
	<div class="container occ-blog-posts">
		{{ PanelTitle.renderTitle('Blog') }}
		<div class="row">
			<div class="timeline">
				<div class="timeline-path"></div>
				<div class="timeline-item--offset"></div>
				{% for post in data.posts.results %}
					{{ ShowPost.showPost(post, loop.index, loop.first) }}
				{% endfor %}
			</div>
		</div>
	</div>
{% endblock %}
