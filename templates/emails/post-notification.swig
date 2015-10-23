{% extends "../layouts/mail.swig" %}

{% block content %}
	<p>Bonjour,</p>
	
	<p>Une actualité considérée comme importante et vous concernant vient d'être ajoutée :</span>
	<blockquote style='border-width: 1px 1px 1px 5px; border-style: solid; border-color: #EEE;border-left-color:#BF1E2D; padding-left:10px'>
		{{ showPost(post) }}
	</blockquote>
	<p>Bonne journée<p>
{% endblock %}

{% macro showPost(post) %}
	<div>
		<div>
			<article>
				<h4>{{ post.title }}</h4>
				<h6>Postée le {{post._.publishedDate.format('DD/MM/YYYY')}}
				{% if post.category %}
				<br>Dans la catégorie : 
					{{ post.category.name }}
				{% endif %}
				</h6>
				<p>{{ post.content.brief | safe }}</p>
				{% if post.content.extended %}
					<p class="read-more">
						<a href="/blog/post/{{ post.slug }}">Read more...</a>
					</p>
				{% endif %}
			</article>
		</div>
	</div>
{% endmacro %}
