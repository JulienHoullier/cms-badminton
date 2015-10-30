{% extends "../layouts/default.swig" %}
{% import "../mixins/panel_title.swig" as PanelTitle%}

{% block content %}

	<div class="container occ-bg">

		{{ PanelTitle.renderTitle("Liste des inscrits") }}

		<table class="table table-bordered" id="occ-table-inscrit">
			<thead>
				<tr>
					<th class="text-center">Date</th>
					<th class="text-center">Tournoi</th>
					<th class="text-center">Categorie</th>
					<th class="text-center">Division</th>
					<th class="text-center">Inscrits</th>
				</tr>
			</thead>
				{% for tournoi in inscrits %}
				{% set tournoiKey = tournoi[0] %}
				{% set tournoiValue = tournoi[1] %}

				<tbody id="{{tournoiKey}}">
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
								<tr>
								{% if tournoiChanged and categorieChanged and rankingChanged and loop.first %}
										<td rowspan="{{ tournoiValue.nbInscrit }}"><strong>{{ tournamentDate|date('d-m-Y') }}</strong></td>
										<td rowspan="{{ tournoiValue.nbInscrit }}"><strong>{{ tournoiKey }}</strong></td>
										<td rowspan="{{ nbPlayerCategorie }}" class="occ-theme-color text-center">{{ categorieName }}</td>
										<td rowspan="{{ nbPlayerDivision }}" class="occ-theme-color text-center">{{ rankingKey }}</td>
										<td>{{ player }}</td>
									{% set tournoiChanged = false %}
									{% set categorieChanged = false %}
									{% set rankingChanged = false %}

								{% elseif categorieChanged %}
										<td rowspan="{{ nbPlayerCategorie }}" class="occ-theme-color text-center">{{ categorieName }}</td>
										<td rowspan="{{ nbPlayerDivision }}" class="occ-theme-color text-center">{{ rankingKey }}</td>
										<td>{{ player }}</td>
									{% set categorieChanged = false %}
									{% set rankingChanged = false %}

								{% elseif rankingChanged %}
										<td rowspan="{{ nbPlayerDivision }}" class="occ-theme-color text-center">{{ rankingKey }}</td>
										<td>{{ player }}</td>
									{% set rankingChanged = false %}
								{% else %}
										<td>{{ player }}</td>
								{% endif %}
								</tr>
							{% endfor %}
						{% endfor %}
					{% endfor %}
					</tbody>
				{% endfor %}
		</table>

		{{ PanelTitle.renderTitle("Autres tournois") }}

		<table class="table" id="occ-table-tournois">
			<thead>
				<th width="30%">Date</th>
				<th width="70%">Tournoi</th>
			</thead>
			<tbody>
				{% for tournoi in tournois %}
					<tr>
						<td>{{tournoi.date|date('d-m-Y')}}</td>
						<td>{{tournoi.name}}</td>
					</tr>
				{% endfor %}
			</tbody>
		</table>
	</div>
{% endblock %}
