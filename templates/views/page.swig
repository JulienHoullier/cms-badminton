{% import "../mixins/panel_title.swig" as PanelTitle %}
{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container occ-bg occ-container">
		
		{{ PanelTitle.renderTitle(page.title) }}

		{{ page.content | raw }}
	
	</div>	
{% endblock %}
