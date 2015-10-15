{% extends "../layouts/mail.swig" %}
{% import "../mixins/show-post.swig" as ShowPost %}

{% block content %}
	<p>Bonjour,</p>
	
	<p>Une actualité considérée comme importante et vous concernant vient d'être ajoutée :</span>
	<blockquote style='border-width: 1px 1px 1px 5px; border-style: solid; border-color: #EEE;border-left-color:#BF1E2D; padding-left:10px'>
		{{ ShowPost.showPost(post, 0, true) }}
	</blockquote>
	<p>Bonne journée<p>
{% endblock %}
