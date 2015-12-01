{% extends "../layouts/mail.swig" %}
{% block title %}
	<h3>Inscription à un tournoi<h3>
{% endblock %}

{% block content %}
	<p>Bonjour,</p>
	{% if registration.player2.exists %}
		<p>Nous souhaiterions nous inscrire au tournoi de : 
	{% else %}
		<p>Je souhaiterais m'inscrire au tournoi de : 
	{% endif %}
		<strong>{{ registration.tournament.name }}</strong>
	</p>
	
	<p>Dans la catégorie : <strong>{{ registration.category }} {{ registration.ranking }}</strong> </p>
	
	
	{% if registration.player2_licence %}
		<p>Nos informations de licence sont : </p>
		<ul>
			<li>{{ registration.player1.name.full }}: <strong>{{ registration.player1.licence }}</strong></li>
			<li>{{ registration.player2.name.full }}: <strong>{{ registration.player2.licence }}</strong></li>
		</ul>

	{% else %}
		<p>Mes informations de licence sont : </p>
    		<ul>
    			<li>{{ registration.player1.name.full }}: <strong>{{ registration.player1.licence }}</strong></li>
    		</ul>
	{% endif %}

	{% if registration.message %}
		Message complémentaire : {{registration.message}}
	{% endif %}

	<br/>
	<br/>
	Merci d'avance.

{% endblock %}
