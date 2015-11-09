{% extends "../../layouts/default.swig" %}
{% import "../../mixins/panel_title.swig" as PanelTitle%}

{% block content %}

	<div class="container occ-bg">
		{{ PanelTitle.renderTitle("Inscription au tournoi") }}

		<h2>{{ tournoi.name }}</h2>
	</div>


{% endblock %}
