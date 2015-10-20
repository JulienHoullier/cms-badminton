{% extends "../layouts/mail.swig" %}
{% import "../mixins/show-post.swig" as ShowPost %}

{% block content %}
	<p>Bonjour,</p>
	
	<p>Une actualité considérée comme importante et vous concernant vient d'être ajouter :</span>
	 
	{% ShowPost.showPost(Post, 0, true) %}
	
	<p>Bonne journée<p>
{% endblock %}
