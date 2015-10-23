{% extends "../layouts/default.swig" %}
{% import "../mixins/panel_title.swig" as PanelTitle%}

{% block content %}

	<div class="container occ-bg">

		{{ PanelTitle.renderTitle("Liste des tournois et inscrits") }}

	</div>
{% endblock %}
