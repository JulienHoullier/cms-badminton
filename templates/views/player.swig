{% extends "../layouts/default.swig" %}
{% import "../mixins/panel_title.swig" as PanelTitle%}
{% import "../mixins/account_mandatory.swig" as NeedAccount%}

{% block content %}

	<div class="container occ-bg">

		{{ PanelTitle.renderTitle("Liste des joueurs adultes de l'OCC") }}

		<table class="table">
			<thead>
				<tr>
					<th>Prénom</th>
					<th>Nom</th>
					<th>N° Licence</th>
					{# <th>Equipe</th> #}
					<th>Classement</th>
				</tr>
			</thead>
			<tbody class="occ-table-joueurs">
				{% for player in players %}
				<tr>
					<td>{{player.name.first}}</td>
					<td>{{player.name.last}}</td>
					<td>{{player.licence}}</td>
					{# <td>{{player.team.order}}</td> #}
					<td>{{player.ranking}}</td>
				</tr>
				{% endfor %}
			</tbody>
		</table>


		{{ PanelTitle.renderTitle("Liste des joueurs jeunes de l'OCC") }}

		{%- if user -%}
			{%- if not youngsters or youngsters.length == 0 -%}
				<p>Aucun jeune inscrit pour le moment</p>
			{%- else -%}

			<table class="table">
				<thead>
					<tr>
						<th>Prénom</th>
						<th>Nom</th>
						<th>N° Licence</th>
						{# <th>Equipe</th> #}
						<th>Classement</th>
					</tr>
				</thead>
				<tbody class="occ-table-joueurs">
					{% for player in youngsters %}
					<tr>
						<td>{{player.name.first}}</td>
						<td>{{player.name.last}}</td>
						<td>{{player.licence}}</td>
						{# <td>{{player.team.order}}</td> #}
						<td>{{player.ranking}}</td>
					</tr>
					{% endfor %}
				</tbody>
			</table>
			{%- endif -%}
		{%- else -%}
			{{ NeedAccount.render() }}
		{%- endif -%}

	</div>
{% endblock %}
