{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container">
		<div class="panel panel-info">
  		<!-- Default panel contents -->
  		<div class="panel-heading">Liste des joueurs</div>
         
			<table class="table table-hover">
				<thead>
					<tr class="info">
						<th>Prénom</th>
						<th>Nom</th>
						<th>E-mail</th>
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
						<td>{{player.email}}</td>
						<td>{{player.licence}}</td>
						<td>{{player.team.order}}</td>
						<td>{{player.ranking}}</td>
					</tr>
					{% endfor %}
				</tbody>
			</table>
		
	</div>
{% endblock %}
