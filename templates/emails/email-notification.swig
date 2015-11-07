{% extends "../layouts/mail.swig" %}

{% block content %}
	
	{% if category %}
	<p>Destinataires: Membres de <strong>{{category.name}}</strong></p>
	{% endif %}

	<p>{{ mail.message | safe}}</p>

{% endblock %}
