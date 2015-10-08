<section id="myCarousel" class="carousel slide" data-ride="carousel">
	<h2>
		<img src="/images/shuttlecock.png" class="occ-section-img">
		Dernières actus
		<a href="/blog" class="pull-right">
			<img src="/images/link.png" class="occ-section-link"/>
		</a>
	</h2>
	<!-- Indicators -->
	<ol class="carousel-indicators">
			<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
			<li data-target="#myCarousel" data-slide-to="1"></li>
			<li data-target="#myCarousel" data-slide-to="2"></li>
			<li data-target="#myCarousel" data-slide-to="3"></li>
	</ol>

	<!-- Wrapper for slides -->
	<div class="carousel-inner" role="listbox">
		{% for article in articles %}
			{% set activeClass = '' %}
					{% if loop.first %}
						{% set activeClass = 'active' %}
					{% endif %}
			<article class="item {{ activeClass }}">
				<h3 class="articleHead">
					<img src="/images/ffbad.png" height="24" width="24">
					{{ article.title }}
				</h3>
				<div class="articleContent">
					<div class="pull-left">
						<div class="large">29</div>
						<div class="month small">SEPT</div>
						<div class="year small">2015</div>
					</div>
					{{ article.content.brief | safe}}
					<p class="text-right">
						<a href="">Lire plus...</a>
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
