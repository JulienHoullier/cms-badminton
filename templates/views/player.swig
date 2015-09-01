{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="table-responsive">          
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
{% endblock %}
