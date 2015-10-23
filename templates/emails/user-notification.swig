{% extends "../layouts/mail.swig" %}

{% block content %}
	<p>Bonjour <strong>{{user.name.full}}</strong>,</p>
	
	<p>Votre compte sur le site OCC-badminton est maintenant validé.</span> 
	
	<p>Connectez vous dès à présent pour bénéficier des contenus réservés aux membres.</p>
	<p><a href="/keystone/signin">Connexion</a></p>
	
	</p>Bienvenu</p>
{% endblock %}
