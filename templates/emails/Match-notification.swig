{% extends "../layouts/mail.swig" %}

{% block content %}
	<p>Bonjour,</p>
	
	<p>La date du match, opposant votre équipe à <span style="font-weight:bold">{{Match.versus}}, vient d'être fixée au {{Match.date}}.</span> 
	
	
	<p>Bon match<p>
{% endblock %}
