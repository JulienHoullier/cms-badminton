{% extends "../layouts/mail.swig" %}

{% block content %}
	
	{% if category %}
	<p>Cet email est adressé aux joeurs appartenant à la catégorie : <strong>{{category.name}}</strong></p>
	{% endif %}

	{{ mail.message | safe}}

{% endblock %}
