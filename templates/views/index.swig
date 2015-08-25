{% import "../mixins/news.swig" as News %}
{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-4">
				{{ News.renderNews('Club', news.newsClub) }}
			</div>
			<div class="col-md-4">
				{{ News.renderNews('Equipes', news.newsEquipes) }}
			</div>
			<div class="col-md-4">		
				{{ News.renderNews('FFBAD', news.newsFFBAD) }}
			</div>
		</div>
	</div>
{% endblock %}
