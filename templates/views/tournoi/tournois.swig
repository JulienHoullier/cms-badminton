{% extends "../../layouts/default.swig" %}
{% import "../../mixins/panel_title.swig" as PanelTitle%}

{% block content %}

	<div class="container occ-bg">

		{{ PanelTitle.renderTitle("Prochains tournois") }}

		<table class="table" id="occ-table-tournois">
			<thead>
				<th width="30%">Date</th>
				<th width="50%">Tournoi</th>
				<th class="text-center" width="20%">Inscription</th>
			</thead>
			<tbody>
				{% for tournoi in tournois %}
					<tr>
						<td>{{tournoi._.date.format("DD-MM-YYYY")}}</td>
						<td>{{tournoi.name}}</td>
						<td class="text-center">
							<a class="occ-theme-color" href="/tournois/{{tournoi.id}}/inscription">
								<img src="/images/inscription.png" />
							</a>
						</td>
					</tr>
				{% endfor %}
			</tbody>
		</table>

		{{ PanelTitle.renderTitle("Liste des inscrits du club") }}

		<table class="table table-bordered" id="occ-table-inscrit">
			<thead>
				<tr>
					<th class="text-center">Date</th>
					<th class="text-center">Tournoi</th>
					<th class="text-center">Categorie</th>
					<th class="text-center">Division</th>
					<th class="text-center">Inscrits</th>
					<th class="text-center">Statut</th>
				</tr>
			</thead>
				{% for tournoi in inscrits %}
				{% set tournoiKey = tournoi[0] %}
				{% set tournoiValue = tournoi[1] %}

				<tbody id="{{tournoiKey}}">
					{% set isNewTournoi = true %}
					{% set tournamentDate = tournoiValue.dateAffichable %}

					{% for categorieName, categorieValue in tournoiValue.categories %}
						{% set isNewCategorie = true %}
						{% set nbPlayerCategorie = categorieValue.nbInscrit %}

						{% for rankingKey, rankingValue in categorieValue.divisions %}
							{% set isNewRanking = true %}

							{% for player in rankingValue %}
								{% set nbPlayerDivision = loop.revindex %}
								<tr>
								{% if isNewTournoi %}
									<td rowspan="{{ tournoiValue.nbInscrit }}"><strong>{{ tournamentDate }}</strong></td>
									<td rowspan="{{ tournoiValue.nbInscrit }}"><strong>{{ tournoiKey }}</strong></td>
									{% set isNewTournoi = false %}
								{% endif %}
								{% if isNewCategorie %}
									<td rowspan="{{ nbPlayerCategorie }}" class="occ-theme-color text-center">{{ categorieName }}</td>
									{% set isNewCategorie = false %}
								{% endif %}
								{% if isNewRanking %}
									<td rowspan="{{ nbPlayerDivision }}" class="occ-theme-color text-center">{{ rankingKey }}</td>
									{% set isNewRanking = false %}
								{% endif %}
									<td>
										{{ player.name[0] }}
										{% if player.name[1] %}
											<br/>
											{{ player.name[1] }}
										{% endif %}
									</td>
									<td>{{ player.status }}</td>
								</tr>
							{% endfor %}
						{% endfor %}
					{% endfor %}
					</tbody>
				{% endfor %}
		</table>

		{{ PanelTitle.renderTitle("Prochains tournois") }}

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
