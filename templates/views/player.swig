{% extends "../layouts/default.swig" %}
{% import "../mixins/panel_title.swig" as PanelTitle%}

{% block content %}

	<div class="container occ-bg">

		{{ PanelTitle.renderTitle('Joueurs') }}

  		<!-- Default panel contents -->
  		<div class="panel-heading">Liste des joueurs licenciés de l'OCC</div>
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Prénom</th>
						<th>Nom</th>
						<th>N° License</th>
						<th>Equipe</th>
						<th>Classement</th>
					</tr>
				</thead>
				<tbody>
					{% for player in players %}
					<tr>
						<td>{{player.name.first}}</td>
						<td>{{player.name.last}}</td>
						<td>{{player.licence}}</td>
						<td>{{player.team.order}}</td>
						<td>{{player.ranking}}</td>
					</tr>
					{% endfor %}
				</tbody>
			</table>
	</div>
{% endblock %}
