{% import "../mixins/news.swig" as News %}
{% extends "../layouts/default.swig" %}

{% block content %}


	<div class="container-fluid">
	{% if lastPosts.length %}
		<div id="myCarousel" class="carousel slide jumbotron" data-ride="carousel" data-wrap="false">
		    <!-- Indicators -->
		    <ol class="carousel-indicators">
		    {% for post in lastPosts %}
		    	{% set linkClass = '' %}
				{% if loop.first %}					
					{% set linkClass = 'class="active"' %}
				{% endif %}
		      <li data-target="#myCarousel" data-slide-to="{{ loop.index0 }}" {{ linkClass | safe }}></li>
		    {% endfor %}
		    </ol>


		    <!-- Wrapper for slides -->
		    <div class="carousel-inner" role="listbox">
		    {% for post in lastPosts %}
		    	{% set activeClass = '' %}
				{% if loop.first %}
					{% set activeClass = 'active' %}
				{% endif %}
		      <div class="item {{activeClass}}">
		        {{ renderSlide(post) }}
		      </div>
		     {% endfor %}
		    </div>
		  </div>
		</div>
	{% else %}
		<h3 class="text-muted">Aucune news pour le moment.</h3>
	{% endif %}
	</div>
{% endblock %}

{%- macro renderSlide(post) -%}
		<div class="panel-primary">
			<div class="panel-header">
				<h4 class="lead">
					<a href="/blog/post/{{ post.slug }}">{{ post.title }}</a>
				</h4>
				<h4>
					{% if post.author %}
						<small>Par {{ post.author.name.first }} </small>
					{% endif %}
					{% if post.publishedDate %}
						<small>le {{ post._.publishedDate.format("Do, MMMM YYYY") }}</small>
					{% endif %}
				</h4>
			</div>
			<div class="panel-body">
				<blockquote>{{ post.content.brief | safe}}</blockquote>
			</div>
		</div>					
{%- endmacro -%}