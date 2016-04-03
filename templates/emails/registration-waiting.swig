{% extends "../layouts/mail.swig" %}
{% block title %}
	<h3>Inscription à un tournoi en liste d'attente<h3>
{% endblock %}

{% block content %}
	<p>Bonjour,</p>
	{% if registration.player2 %}
		<p>Vous avez été inscrits
	{% else %}
		<p>Tu as été inscrit(e)
	{% endif %}
		<b>en liste d'attente</b> au tournoi <strong>{{ registration.tournament.name }}</strong> 
	 	dans le tableau <strong>{{ registration.category }} {{ registration.ranking }}</strong> </p>
	 	(date: {{ registration.tournament._.date.format("DD/MM/YYYY") }}).
	</p>
	{% if registration.responseMessage %}
		<p>{{ registration.responseMessage | safe }}</p>
	{% endif %}
	<br/>
	A bientot,<br/>
	Sylvain

{% endblock %}
