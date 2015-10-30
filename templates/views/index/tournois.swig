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
		<table class="table table-striped">
			<thead>
				<tr>
					<th></th>
					<th></th>
					<th class="text-right">Nb d'inscrit</th>
				</tr>
			</thead>
			{% for tournament in tournaments %}
			<tr>
				<td>{{ tournament.date|date("d-m-Y") }}</td>
				<td>{{ tournament.name }}</td>
				<td class="text-right">
					{% if tournament.registrations.length == 0 %}
						{{ tournament.registrations.length }}
					{% else %}
						<a href="/tournois#{{tournament.name}}">
							{{ tournament.registrations.length }}
						</a>
					{% endif %}
				</td>
			</tr>
			{% endfor %}
		</table>
		{% else %}
		<div class="occ-no-element">Aucun tournoi enregistré pour le moment...</div>
		{% endif %}
	</div>
</section>
