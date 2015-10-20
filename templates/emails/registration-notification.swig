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
		<strong>{{ registration.tournament }}</strong>
	</p>
	
	<p>Dans la catégorie : <strong>{{ registration.category }} {{ registration.level }}</strong> </p>
	
	
	{% if registration.player2.exists %}
		<p>Nos numéros de licence sont : </p>
		<ul>
			<li>{{ registration.player1.full }}: <strong>{{ registration.player1_licence }}</strong></li>
			<li>{{ registration.player2.full }}: <strong>{{ registration.player2_licence }}</strong></li>
		</ul>

	{% else %}
		<p>Mon numéro de licence est : </p>
    		<ul>
    			<li>{{ registration.player1_licence }}</li>
    		</ul>
	{% endif %}
	
	Merci d'avance.

{% endblock %}
