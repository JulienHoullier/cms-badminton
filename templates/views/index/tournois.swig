<section class="occ-section">
	<h2>
		<img src="/images/tournament-cup2.png" class="occ-section-img">
		Tournois à venir
		<a href="/tournois#tournois" class="pull-right">
			<img src="/images/plus.png" width="16px" height="16px" />
		</a>
	</h2>
	<div class="occ-section-little">
		{% if tournaments.length %}
		<p class="text-right" style="margin-right: 5px"><strong>Nb d'inscrit</strong></p>
		<table class="table table-striped">
			{% for tournament in tournaments %}
			<tr>
				<td class="occ-tournament-date">{{ tournament.date|date("d-m-Y") }}</td>
				<td class="occ-tournament-resume">{{ tournament.name }}</td>
				<td class="occ-tournament-nb-inscrit text-right">
					{% if tournament.registrations.length == 0 %}
						{{ tournament.registrations.length }}
					{% else %}
						<a href="/tournois#inscrits">
							{{ tournament.nbInscrit }}
						</a>
					{% endif %}
				</td>
			</tr>
			{% endfor %}
		</table>
		{% else %}
		<div class="occ-no-element">Pas de tournoi à venir pour le moment...</div>
		{% endif %}
	</div>
</section>
