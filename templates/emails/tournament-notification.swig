{% extends "../layouts/mail.swig" %}
{% block title %}
	<h3>Inscription à un tournoi<h3>
{% endblock %}

{% block content %}
	<p>Bonjour,</p>
	{% if subscription.player2.exists %}
		<p>Nous souhaiterions nous inscrire au tournoi de : 
	{% else %}
		<p>Je souhaiterais m'inscrire au tournoi de : 
	{% endif %}
		<strong>{{ subscription.tournament }}</strong>
	</p>
	
	<p>Dans la catégorie : <strong>{{ subscription.category }} {{ subscription.level }}</strong> </p>
	
	
	{% if subscription.player2.exists %}
		<p>Nos numéros de licence sont : </p>
		<ul>
			<li>{{ subscription.player1.full }}: <strong>{{ subscription.player1_licence }}</strong></li>
			<li>{{ subscription.player2.full }}: <strong>{{ subscription.player2_licence }}</strong></li>
		</ul>

	{% else %}
		<p>Mon numéro de licence est : </p>
    		<ul>
    			<li>{{ subscription.player1_licence }}</li>
    		</ul>
	{% endif %}
	
	Merci d'avance.

{% endblock %}
