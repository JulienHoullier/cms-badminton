{% extends "../layouts/mail.swig" %}

{% block content %}
	
	{% if category %}
	<p>Destinataires: Membres de <strong>{{category.name}}</strong></p>
	{% endif %}

	{{ mail.message | safe}}

{% endblock %}
