{% extends "../layouts/default.swig" %}
{% import "../mixins/panel_title.swig" as PanelTitle%}

{% block content %}

	<div class="container occ-bg">

		{{ PanelTitle.renderTitle("Liste des tournois et inscrits") }}

		<table class="table" id="occ-table-inscrit">
			<thead>
				<tr>
					<th>Tournoi</th>
					<th>Date</th>
					<th>Categorie</th>
					<th>Division</th>
					<th>Inscrits</th>
				</tr>
			</thead>
			<tbody class="occ-table-inscrit">
				{% for tournoiKey, tournoiValue in tournois %}
					{% set loopTournoi = loop %}
					{% set tournoiChanged = true %}
					{% set tournamentDate = tournoiValue.date %}

					{% for categorieName, categorieValue in tournoiValue.categories %}
						{% set loopCategorie = loop %}
						{% set categorieChanged = true %}
						{% set nbPlayerCategorie = categorieValue.nbInscrit %}

						{% for rankingKey, rankingValue in categorieValue.divisions %}
							{% set loopRanking = loop %}
							{% set rankingChanged = true %}

							{% for player in rankingValue %}
								{% set loopPlayer = loop %}
								{% set nbPlayerDivision = loopPlayer.revindex %}

								{% if tournoiChanged and categorieChanged and rankingChanged and loop.first %}
									<tr>
										<td rowspan="{{ tournoiValue.nbInscrit }}">{{ tournoiKey }}</td>
										<td rowspan="{{ tournoiValue.nbInscrit }}">{{ tournamentDate|date('d-m-Y') }}</td>
										<td rowspan="{{ nbPlayerCategorie }}">{{ categorieName }}</td>
										<td rowspan="{{ nbPlayerDivision }}">{{ rankingKey }}</td>
										<td>{{ player }}</td>
									</tr>
									{% set tournoiChanged = false %}
									{% set categorieChanged = false %}
									{% set rankingChanged = false %}

								{% elseif categorieChanged %}
									<tr>
										<td rowspan="{{ nbPlayerCategorie }}">{{ categorieName }}</td>
										<td rowspan="{{ nbPlayerDivision }}">{{ rankingKey }}</td>
										<td>{{ player }}</td>
									</tr>
									{% set categorieChanged = false %}
									{% set rankingChanged = false %}

								{% elseif rankingChanged %}
									<tr>
										<td rowspan="{{ nbPlayerDivision }}">{{ rankingKey }}</td>
										<td>{{ player }}</td>
									</tr>
									{% set rankingChanged = false %}
								{% else %}
									<tr>
										<td>{{ player }}</td>
									</tr>
								{% endif %}

							{% endfor %}
						{% endfor %}
					{% endfor %}
				{% endfor %}
			</tbody>
		</table>
	</div>
{% endblock %}
