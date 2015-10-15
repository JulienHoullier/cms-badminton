{% extends "../layouts/mail.swig" %}

{% block content %}
	<p>Bonjour {{ first_name }},</p>
	<p class="text-larger">Une demande a été postée sur le site {{ brand }}:</p>
	{% if enquiry.name.full or enquiry.email %}
		<p class="text-larger">Par
			{% if enquiry.name.full %}
				<strong>{{ enquiry.name.full }}</strong>
			{% endif %}
			{% if enquiry.name.full and enquiry.email %}
				{% if enquiry.email %}(<a href="mailto:{{ enquiry.email }}">{{ enquiry.email }}</a>){% endif %}
			{% endif %}
		</p>
	{% endif %}
	{% if enquiry.phone %}
		<p class="text-larger">Téléphone : {{ enquiry.phone }}</p>
	{% endif %}
	{% if enquiry.enquiryType %}
		<p class="text-larger">{{ enquiry._.enquiryType.format() }}</p>
	{% endif %}
	{% if enquiry.message %}
		{{ enquiry.message.html | safe }}
	{% endif %}
	<p class="text-muted">Envoyé le {{ enquiry._.createdAt.format() }}</p>
	<p><a href="/keystone/enquiries/{{ enquiry.id }}">Accéder à l'Admin</a></p>
{% endblock %}
