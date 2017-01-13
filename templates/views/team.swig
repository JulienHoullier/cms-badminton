{% extends "../layouts/default.swig" %}
{% import "../mixins/panel_title.swig" as PanelTitle%}

{% block content %}
	<div class="container">
	
		<!-- Default panel contents -->
		{% for team in teams %}
			{{ PanelTitle.renderTitle('Equipe '+team.name ) }}
			
			<table class="table">
				<thead>
					<tr>
						<th>Prénom</th>
						<th>Nom</th>
						<th>Classement</th>
					</tr>
				</thead>
				<tbody>
					{% for player in team.players %}
						<tr>
							<td>{{player.name.first}}</td>
							<td>{{player.name.last}}</td>
							<td>{{player.ranking}}</td>
						</tr>
					{% endfor %}
				</tbody>
			</table>
		{% endfor %}

	</div>
{% endblock %}
