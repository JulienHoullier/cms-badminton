{# TODO:
   Jade email templates inherit a default base that's included with Keystone,
   the Swig templates need this to be ported across and bundled directly. #}
{% import "../mixins/show-post.swig" as ShowPost %}

{% block body-contents %}
	<h1>Hi {{ first_name }}</h1>,
	<p class="text-larger">Une actualité importante a été ajoutée sur le site <a href="http://occ-badminton.org">http://occ-badminton.org</a>:</p>
	{% if post.author.name.full %}
		<p class="text-larger">Poster par <strong>{{ enquiry.name.full }}</strong></p>
	{% endif %}
	{{ ShowPost.showPost(post, 0, true, "http://occ-baminton.org") }}
{% endblock %}
