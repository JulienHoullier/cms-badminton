{% import "../mixins/news.swig" as News %}
{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container">
		{{ News.renderNews('Club', news.newsClub) }}
		{{ News.renderNews('Equipes', news.newsEquipes) }}
		{{ News.renderNews('FFBAD', news.newsFFBAD) }}
	</div>
{% endblock %}
