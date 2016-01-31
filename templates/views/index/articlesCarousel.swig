<section id="newsCarousel" class="carousel slide occ-section" data-ride="carousel">
	<h2>
		<img src="/images/shuttlecock.png" class="occ-section-img">
		Dernières actus
		<a href="/blog" class="pull-right">
			<img src="/images/plus.png" width="16px" height="16px" />
		</a>
	</h2>
	<!-- Indicators -->
	<ol class="carousel-indicators">
		 {% for article in articles %}
	    	{% set linkClass = '' %}
			{% if loop.first %}
				{% set linkClass = 'class="active"' %}
			{% endif %}
	      <li data-target="#newsCarousel" data-slide-to="{{ loop.index0 }}" {{ linkClass | safe }}></li>
	    {% endfor %}
	</ol>

	<!-- Wrapper for slides -->
	<div class="carousel-inner" role="listbox">
		{% for article in articles %}
			{% set activeClass = '' %}
					{% if loop.first %}
						{% set activeClass = 'active' %}
					{% endif %}
			<article class="occ-article item {{ activeClass }}">

				<div class="row">
					<div class="occ-article-date visible-md-block visible-lg-block">
						<div class="day">{{ article.publishedDate.toString().split(' ')[2] }}</div>
						<div class="month">{{ article.publishedDate.toString().split(' ')[1] }}</div>
						<div class="year">{{ article.publishedDate.toString().split(' ')[3] }}</div>
					</div>

					<div class="col-md-6">
						{% set urlImg = '/images/defaultnews.jpg' %}
						{% if article.image.exists %}
							{% set urlImg = article._.image.pad(379, 300) %}
						{% else %}
							{% if article.category && article.category.default_image.exists %}
								{% set urlImg = article.category._.default_image.pad(379, 300) %}
							{% endif %}
						{% endif %}

						<img src="{{ urlImg }}" class="visible-md-block visible-lg-block" width="100%" height="300">
					</div>

					<div class="col-md-6">
						<h3 class="occ-article-head">
							<a href="/blog/post/{{ article.slug }}">
							{{ article.title }}
							</a>
						</h3>

						<div class="occ-article-content">
							{{ article.content.brief | safe}}
						</div>

						<span class="visible-xs-inline visible-sm-inline occ-theme-color">
							Le {{ article.publishedDate.toString().split(' ')[2] }} {{ article.publishedDate.toString().split(' ')[1] }} {{ article.publishedDate.toString().split(' ')[3] }}
						</span>

					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="text-right occ-article-content"> 
							<a href="/blog/post/{{ article.slug }}#comments">
							{% set badgeClass = 'badge' %}
							{% if article.nbComment > 0 %}
								{% set badgeClass = badgeClass +' badge-important' %}
							{% endif %}
							Commentaires <span class="{{ badgeClass }}">{{ article.nbComment }}</span>
							</a>
						</div>
					</div>
				</div>
			</article>
		{% endfor %}
	</div>

	<!-- Left and right controls -->
	<a class="left carousel-control" href="#newsCarousel" role="button" data-slide="prev">
		<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
		<span class="sr-only">Previous</span>
	</a>
	<a class="right carousel-control" href="#newsCarousel" role="button" data-slide="next">
		<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
		<span class="sr-only">Next</span>
	</a>
</section>
