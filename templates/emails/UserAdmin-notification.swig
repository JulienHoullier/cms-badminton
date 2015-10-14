{% extends "../layouts/mail.swig" %}

{% block content %}
	<p>Bonjour,</p>
	
	<p>Un utilisateur vient de créer un compte sur le site avec le mail : {{User.mail}}.</span> 
	
	<p>Connectez vous à l'administration pour valider ou refuser sa demande</p>
	<p><a href="/keystone/users">Accéder à l'Admin</a></p>
	
	</p>Merci</p>
{% endblock %}
