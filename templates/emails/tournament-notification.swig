{% extends "../layouts/mail.swig" %}
{% block title %}
	<h3>Inscription à un tournoi<h3>
{% endblock %}

{% block content %}
	<p>Bonjour,</p>
	{% if subscription.player2 %}
		<p>Nous souhaiterions nous inscrire au tournoi de : 
	{% else %}
		<p>Je souhaiterais m'inscrire au tournoi de : </p>
	{% endif %}
		<span>{{ subscription.tournament }}
	</p>
	
	<p>Dans la catégorie : {{ subscription.category }}</p>
	
	
	{% if subscription.player2 %}
		<p>Nos numéros de licence sont : </p>
		<ul>
			<li>{{ subscription.player1}}: {{ subscription.player1_licence }}</li>
			<li>{{ subscription.player2}}: {{ subscription.player2_licence }}</li>
		</ul>

	{% else %}
		<p>Mon numéro de licence est : </p>
    		<ul>
    			<li>{{ subscription.player1_licence }}</li>
    		</ul>
	{% endif %}
	
	Merci d'avance.

{% endblock %}
