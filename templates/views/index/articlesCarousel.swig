<section id="newsCarousel" class="carousel slide" data-ride="carousel">
	<h2>
		<img src="/images/shuttlecock.png" class="occ-section-img">
		Dernières actus
		<a href="/blog" class="pull-right">
			<img src="/images/arrow.png" width="16px" height="16px" />
		</a>
	</h2>
	<!-- Indicators -->
	<ol class="carousel-indicators">
			<li data-target="#newsCarousel" data-slide-to="0" class="active"></li>
			<li data-target="#newsCarousel" data-slide-to="1" class="equipe"></li>
			<li data-target="#newsCarousel" data-slide-to="2" class="club"></li>
			<li data-target="#newsCarousel" data-slide-to="3" class="ffbad"></li>
	</ol>

	<!-- Wrapper for slides -->
	<div class="carousel-inner" role="listbox">
		{% for article in articles %}
			{% set activeClass = '' %}
					{% if loop.first %}
						{% set activeClass = 'active' %}
					{% endif %}
			<article class="item {{ activeClass }}">

				<div class="row">
					<div class="articleDate">
						<div class="day">{{ article.publishedDate.toString().split(' ')[2] }}</div>
						<div class="month">{{ article.publishedDate.toString().split(' ')[1] }}</div>
						<div class="year">{{ article.publishedDate.toString().split(' ')[3] }}</div>
					</div>

					<div class="col-md-7">
						{% set urlImg = '/images/defaultnews.jpg' %}
						{% if article.image.exists %}
							{% set urlImg = article.image.url %}
						{% endif %}

						<img src="{{ urlImg }}" class="img-responsive">
					</div>		

					<div class="col-md-5">
						<h3 class="articleHead">
							{{ article.title }}
						</h3>

						<div class="visible-md-block visible-lg-block">
							{{ article.content.brief | safe}}
						</div>

						<p class="text-right">
							<a href="/blog/post/{{ article.slug }}">Lire plus...</a>
						</p>
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
