{% for article in articles %}
	<div class="container-fluid">
		<h3 class="articleHead">
			{% if loop.first or loop.last %}
			<img src="/images/equipe.png">
			{% else %}
			<img src="/images/shuttlecock2.png">
			{% endif %}
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
		
	</div>
{% endfor %}