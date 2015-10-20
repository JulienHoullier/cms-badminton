{% extends "../layouts/default.swig" %}
{% import "../mixins/panel_title.swig" as PanelTitle %}

{% macro showPost(post, index, first) %}
	{% set className = "timeline-item--even" %}
	{% if index % 2 == 1 %}
		{% set className = "timeline-item--odd" %}
	{% endif %}
	<div class="timeline-item {{className}}">
		<div class="timeline-item-node"></div>
		<div class="timeline-item-inner">
			<div class="row">
					<div class="articleDate visible-md-block visible-lg-block">
						<div class="day">{{ post.publishedDate.toString().split(' ')[2] }}</div>
						<div class="month">{{ post.publishedDate.toString().split(' ')[1] }}</div>
						<div class="year">{{ post.publishedDate.toString().split(' ')[3] }}</div>
					</div>

					<div class="col-md-7">
						{% set urlImg = '/images/defaultnews.jpg' %}
						{% if post.image.exists %}
							{% set urlImg = post.image.url %}
						{% endif %}

						<img src="{{ urlImg }}" class="visible-md-block visible-lg-block img-responsive">
					</div>

					<div class="col-md-5">
						<h3 class="articleHead">
							{{ post.title }}
						</h3>

						<div class="articleContent">
							{{ post.content.brief | safe}}
						</div>

						<span class="visible-xs-inline visible-sm-inline articleDateXs">
							Le {{ post.publishedDate.toString().split(' ')[2] }} {{ post.publishedDate.toString().split(' ')[1] }} {{ post.publishedDate.toString().split(' ')[3] }}
						</span>

						<p class="text-right articleContent">
							<a href="/blog/post/{{ post.slug }}">Lire plus...</a>
						</p>
					</div>

				</div>
		</div>
	</div>
{% endmacro %}

{% block intro %}
	

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
		{{ PanelTitle.renderTitle('Blog') }}
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
