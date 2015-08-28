{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container">
		<div class="row">
			<div class="table-responsive">          
				<table class="table">
					<thead>
						<tr>
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
							<td>{{player.name.firstname}}</td>
							<td>{{player.name.LASTname}}</td>
							<td>{{player.email}}</td>
							<td>{{player.name.licence}}</td>
							<td>{{player.team.order}}</td>
						</tr>
						{% endfor %}
					</tbody>
				</table>
			</div>
		</div>
	</div>
{% endblock %}
