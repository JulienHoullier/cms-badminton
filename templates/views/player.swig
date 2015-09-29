{% extends "../layouts/default.swig" %}
{% import "../mixins/panel_title.swig" as PanelTitle%}

{% block content %}

	<div class="container occ-bg occ-container">

		{{ PanelTitle.renderTitle('Joueurs') }}

		<div class="panel panel-info">

			<table class="table table-hover">
				<thead>
					<tr class="info">
						<th>Prénom</th>
						<th>Nom</th>
						<th>E-mail</th>
						<th>N° License</th>
						<th>Equipe</th>
					</tr>
				</thead>
				<tbody>
					{% for player in players %}
					<tr>
						<td>{{player.name.first}}</td>
						<td>{{player.name.last}}</td>
						<td>{{player.email}}</td>
						<td>{{player.licence}}</td>
						<td>{{player.team.order}}</td>
					</tr>
					{% endfor %}
				</tbody>
			</table>
		</div>
	</div>
{% endblock %}
