{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container">
		<div class="panel panel-info">
		<!-- Default panel contents -->
			{% for team in teams %}
				<div class="panel-heading">{{ team.name }}</div>
				<table class="table table-hover">
					<thead>
						<tr class="info">
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
	</div>
{% endblock %}
