{% import "../mixins/news.swig" as News %}
{% extends "../layouts/default.swig" %}

{% block content %}


	<div class="occ-last-news container">

		<div class="occ-title-panel">
			<div class="occ-title-string"></div>
			<div class="occ-title-text">
				<span class="h1">Dernières actualités</span>
			</div>
			<div class="occ-title-string"></div>
		</div>
		<div> 
		{% if lastPosts.length %}
			<div id="occ-last-news-carousel" class="carousel occ-panel slide" data-ride="carousel" data-interval="3000">
			    <!-- Indicators -->
			    <ol class="carousel-indicators">
			    {% for post in lastPosts %}
			    	{% set linkClass = '' %}
					{% if loop.first %}					
						{% set linkClass = 'class="active"' %}
					{% endif %}
			      <li data-target="#occ-last-news-carousel" data-slide-to="{{ loop.index0 }}" {{ linkClass | safe }}></li>
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
	</div>
	<div class="occ-teams-news container">

		<div class="occ-title-panel">
			<div class="occ-title-string"></div>
			<div class="occ-title-text">
				<span class="h1">Résultats équipes</span>
			</div>
			<div class="occ-title-string"></div>
		</div>

		<div class="row">
			{% for teamResult in teamResults %}
			<div class="col-lg-4 occ-post">
				<h4>Résultat équipe {{teamResult.team.order}}</h4>
				<img src="{{teamResult.image}}" />
			</div>
			{% endfor %}
		</div>
	</div>

	<div class="container occ-bad-news">
		
		<div class="occ-title-panel">
			<div class="occ-title-string"></div>
			<div class="occ-title-text">
				<span class="h1">Bad Français</span>
			</div>
			<div class="occ-title-string"></div>
		</div>

		<div class="row">
			
			<div class="col-lg-8 occ-ffbad">
				<ul class="list-group">
				{% for ffbadNew in ffbadNews %}
					<li class="list-group-item">
						<div class="media">
							<div class="media-body">
								<a href="{{ffbadNew.link}}" target="_blank">
									<p class="media-heading">{{ffbadNew.title}}</p>
								</a>
								<p>{{ffbadNew.summary}}</p>
							</div>
						</div>
					</li>
				{% endfor %}
				</ul>
			</div>

			<div class="col-lg-4 occ-tuto">
				<div class="embed-responsive embed-responsive-4by3">
					<iframe class="embed-responsive-item" width="300" height="200" src="https://www.youtube.com/embed/DcevUn6J3-E" frameborder="0" allowfullscreen></iframe>
				</div>
			</div>
		</div>

	</div>
{% endblock %}

{%- macro renderSlide(post) -%}
		<div class="occ-last-news-panel media">
			<div class="media-body">
				<h4>
					<a href="/blog/post/{{ post.slug }}" class="text-danger"><p>{{ post.title }}</p></a>
				</h4>
				<h4>
					{% if post.author %}
						<small>Par {{ post.author.name.first }} </small>
					{% endif %}
					{% if post.publishedDate %}
						<small>le {{ post._.publishedDate.format("Do, MMMM YYYY") }}</small>
					{% endif %}
				</h4>
				<blockquote>{{ post.content.brief | safe}}</blockquote>
				<p class="read-more">
					<a href="/blog/post/{{ post.slug }}">Read more...</a>
				</p>
			</div>
			{% if post.image.exists %}
				<div class="image-wrap occ-last-news-panel-img media-right media-middle">
					<img class="img-responsive media-object" src="{{post._.image.fit(250,200) }}">
				</div>
			{% endif %}
		</div>
{%- endmacro -%}
