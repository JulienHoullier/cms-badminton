{% extends "../layouts/mail.swig" %}

{% block content %}
	<p>Bonjour,</p>
	
	<p>La date du match, opposant votre équipe à <strong>{{match.versus}}</strong>, vient d'être fixée au <strong>{{match._.date.format("Do MMM YYYY") }}</strong>.
	
	<p>Sportivement<p>
{% endblock %}
