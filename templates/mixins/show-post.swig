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
