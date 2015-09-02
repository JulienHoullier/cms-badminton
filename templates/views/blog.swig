{% extends "../layouts/default.swig" %}

{% macro showPost(post, index, first) %}
	

	{% set className = "timeline-item--even" %}
	{% if index % 2 == 1 %}
		{% set className = "timeline-item--odd" %}
	{% endif %}
	<div class="timeline-item {{className}}">
		<div class="timeline-item-node"></div>
		<div class="timeline-item-inner">
			<h4 class="text-caps text-danger">{{ post.title }}</h4>
			<h6>{{post._.publishedDate.format('DD/MM/YYYY')}}</h6>
			{% if post.categories and post.categories.length %}
			<br>in
				{% for cat in post.categories %}
					<a href="/blog/{{ cat.key }}">{{ cat.name }}</a>
					{% if loop.index < post.categories.length - 1 %}, {% endif %}
				{% endfor %}
			{% endif %}
			<p>{{ post.content.brief | safe }}</p>
			{% if post.content.extended %}
				<p class="read-more">
					<a href="/blog/post/{{ post.slug }}">Read more...</a>
				</p>
			{% endif %}
		</div>
	</div>
{% endmacro %}

{% block intro %}
		{% set title = "Blog" %}

		{% if data.categories.length %}
			<div class="container occ-categories">
				<h2>Catégories</h2>
				<div>
					<a href="/blog" class="btn {% if not data.category %}btn-primary{% else %}btn-default{% endif %}">Toutes catégories</a>
					{% for cat in data.categories %}
						<a href="/blog/{{ cat.key }}" class="btn {% if data.category and data.category.id == cat.id %}btn-primary{% else %}btn-default{% endif %}">{{ cat.name }}</a>
					{% endfor %}
				</div>
			</div>
		{% endif %}

		{% if data.category %}
			{% set title = data.category.name %}
		{% endif %}
		<div class="container occ-blog-title">
			<h1 class="center-block">{{ title }}</h1>
		</div>
{% endblock %}

{% block content %}
	<div class="container occ-blog-posts">
		<div class="row">
			<div class="timeline">
				<div class="timeline-path"></div>
				<div class="timeline-item--offset"></div>
				{% for post in data.posts.results %}
					{{ showPost(post, loop.index, loop.first) }}
				{% endfor %}
			</div>
		</div>
	</div>
{% endblock %}
