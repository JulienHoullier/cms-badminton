{% extends "../layouts/mail.swig" %}

{% block content %}
	<p>Bonjour à tous, voici la liste des prochains tournois. Vous devez vous y inscrire via le nouveau site du club :</p>
	<br/><br/>
	<a href="http://www.occ-badminton.org/tournois">http://www.occ-badminton.org/tournois</a>
	<br/><br/>
	Vous y retrouverez également la liste des joueurs déjà inscrits dans les différents tournois à venir.
	<br/><br/>
	N'hésitez bien entendu pas si vous avez des questions sur le fonctionnement des tournois. 
	<br/><br/>
	
	<ol>
		{% for tournoi in tournois %}
		<li> Le {{tournoi._.date.format("DD-MM-YYYY")}} à {{ tournoi.name }}
		{% endfor %}
	</ol>
	
	<br/><br/>
	Sylvain Duquesne
	<br/><br/>
	sylvain.duquesne@univ-rennes1.fr
{% endblock %}