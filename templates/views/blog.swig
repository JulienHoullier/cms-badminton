{% extends "../layouts/default.swig" %}
{% import "../mixins/panel_title.swig" as PanelTitle %}

{% block intro %}

	{% if data.categories.length %}
			<div class="container occ-categories">
				<h2>Catégories</h2>
				<div class="occ-list-categorie">
					<a href="/blog" class="btn {% if not data.category %}btn-primary{% else %}btn-default{% endif %}">Toutes catégories</a>
					{% for cat in data.categories %}
						{% if cat.postCount > 0 %}
						<a href="/blog/{{ cat.key }}" class="btn {% if data.category and data.category.id == cat.id %}btn-primary{% else %}btn-default{% endif %}">{{ cat.name }}   <span class="badge">{{cat.postCount }}</span></a>
						{% endif %}
					{% endfor %}
				</div>
			</div>
		{% endif %}
{% endblock %}


{% block content %}
	<div class="container occ-blog-posts">
		<h1 class="center-block">Blog</h1>
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

{% macro showPost(post, index, first) %}
	{% set className = "even" %}
	{% if index % 2 == 1 %}
		{% set className = "odd" %}
	{% endif %}
	<div class="timeline-item timeline-item--{{className}}">
		<div class="timeline-item-node"></div>
		<div class="timeline-item-inner">
			<article class="occ-article-blog">
				<div class="occ-article-date occ-article-date-{{className}} visible-md-block visible-lg-block">
					<div class="day">{{ post.publishedDate.toString().split(' ')[2] }}</div>
					<div class="month">{{ post.publishedDate.toString().split(' ')[1] }}</div>
					<div class="year">{{ post.publishedDate.toString().split(' ')[3] }}</div>
				</div>

				<h2 class="occ-article-head">
					{{ post.title }}
				</h2>

				<div class="occ-article-content">
					{{ post.content.brief | safe}}
				</div>

				<span class="visible-xs-inline visible-sm-inline occ-theme-color">
					Le {{ post.publishedDate.toString().split(' ')[2] }} {{ post.publishedDate.toString().split(' ')[1] }} {{ post.publishedDate.toString().split(' ')[3] }}
				</span>

				<p class="text-right occ-article-content">
					<a href="/blog/post/{{ post.slug }}">Lire plus...</a>
				</p>
				<div class="row">
					<div class="col-md-12">
						<div class="text-right occ-article-content"> 
							{% set badgeClass = 'badge' %}
							{% if post.nbComment > 0 %}
								{% set badgeClass = badgeClass +' badge-important' %}
							{% endif %}
							Commentaires <span class="{{badgeClass}}">{{ post.nbComment }}</span>
						</div>
					</div>
				</div>
			</article>
		</div>
	</div>
{% endmacro %}
