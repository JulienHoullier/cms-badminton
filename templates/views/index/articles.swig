<section>
	<h2>
		<img src="/images/shuttlecock.png">
		Dernières actus
	</h2>
	{% for article in articles %}
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
		<pre>{{ article.content.brief | safe}}</pre>
		<p class="text-right">
			<a href="">Lire plus...</a>
		</p>
	</div>
	{% endfor %}
</section>

