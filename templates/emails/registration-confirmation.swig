{% extends "../layouts/mail.swig" %}
{% block title %}
	<h3>Inscription à un tournoi<h3>
{% endblock %}

{% block content %}
	<p>Bonjour,</p>
	{% if registration.player2 %}
		<p>Vous avez bien été inscrits
	{% else %}
		<p>Tu as bien été inscrit(e)
	{% endif %}
	 	au tournoi <strong>{{ registration.tournament.name }}</strong> 
	 	dans le tableau <strong>{{ registration.category }} {{ registration.ranking }}</strong> </p>
	 	(date: {{ registration.tournament._.date.format("DD/MM/YYYY") }}).
	</p>
	<br/>
	A bientot,<br/>
	Sylvain

{% endblock %}
