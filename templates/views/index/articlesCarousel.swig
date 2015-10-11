<section id="myCarousel" class="carousel slide" data-ride="carousel">
	<h2>
		<img src="/images/shuttlecock.png" class="occ-section-img">
		Dernières actus
		<a href="/blog" class="pull-right">
			<img src="/images/arrow.png" width="16px" height="16px" />
		</a>
	</h2>
	<!-- Indicators -->
	<ol class="carousel-indicators">
			<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
			<li data-target="#myCarousel" data-slide-to="1" class="equipe"></li>
			<li data-target="#myCarousel" data-slide-to="2" class="club"></li>
			<li data-target="#myCarousel" data-slide-to="3" class="ffbad"></li>
	</ol>

	<!-- Wrapper for slides -->
	<div class="carousel-inner" role="listbox">
		{% for article in articles %}
			{% set activeClass = '' %}
					{% if loop.first %}
						{% set activeClass = 'active' %}
					{% endif %}
			<article class="item {{ activeClass }}">

				<div class="pull-right articleDate">
					<div class="day">29</div>
					<div class="month">SEPT</div>
					<div class="year">2015</div>
				</div>

				<h3 class="articleHead">
					{{ article.title }}
				</h3>

				<div class="articleContent">
					<img class="img-responsive center-block" src="/images/defaultnews.jpg" />
					{{ article.content.brief | safe}}
					
					<p class="text-right">
						<a href="/blog/post/{{ article.slug }}">Lire plus...</a>
					</p>
				</div>

			</article>
		{% endfor %}
	</div>

	<!-- Left and right controls -->
	<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
		<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
		<span class="sr-only">Previous</span>
	</a>
	<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
		<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
		<span class="sr-only">Next</span>
	</a>
</section>
