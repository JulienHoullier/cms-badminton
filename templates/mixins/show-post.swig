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
			</article>
		</div>
	</div>
{% endmacro %}
