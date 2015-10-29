{% extends "../layouts/default.swig" %}
{% import "../mixins/panel_title.swig" as PanelTitle%}

{% block content %}

	<div class="container occ-bg">

		{{ PanelTitle.renderTitle("Liste des tournois et inscrits") }}

		<table class="table table-bordered" id="occ-table-inscrit">
			<thead>
				<tr>
					<th class="text-center">Tournoi</th>
					<th class="text-center">Date</th>
					<th class="text-center">Categorie</th>
					<th class="text-center">Division</th>
					<th class="text-center">Inscrits</th>
				</tr>
			</thead>
			<tbody>
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
									<tr id="{{tournoiKey}}">
										<td rowspan="{{ tournoiValue.nbInscrit }}"><strong>{{ tournoiKey }}</strong></td>
										<td rowspan="{{ tournoiValue.nbInscrit }}"><strong>{{ tournamentDate|date('d-m-Y') }}</strong></td>
										<td rowspan="{{ nbPlayerCategorie }}" class="occ-theme-color text-center">{{ categorieName }}</td>
										<td rowspan="{{ nbPlayerDivision }}" class="occ-theme-color text-center">{{ rankingKey }}</td>
										<td>{{ player }}</td>
									</tr>
									{% set tournoiChanged = false %}
									{% set categorieChanged = false %}
									{% set rankingChanged = false %}

								{% elseif categorieChanged %}
									<tr>
										<td rowspan="{{ nbPlayerCategorie }}" class="occ-theme-color text-center">{{ categorieName }}</td>
										<td rowspan="{{ nbPlayerDivision }}" class="occ-theme-color text-center">{{ rankingKey }}</td>
										<td>{{ player }}</td>
									</tr>
									{% set categorieChanged = false %}
									{% set rankingChanged = false %}

								{% elseif rankingChanged %}
									<tr>
										<td rowspan="{{ nbPlayerDivision }}" class="occ-theme-color text-center">{{ rankingKey }}</td>
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
