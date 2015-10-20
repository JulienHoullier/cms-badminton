<section class="occ-section">
	<h2>
		<img src="/images/tournament-cup2.png" class="occ-section-img">
		Tournois
		<a href="/tournois" class="pull-right">
			<img src="/images/plus.png" width="16px" height="16px" />
		</a>
	</h2>
	<div class="occ-section-little">
		{% if tournaments %}
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
				<td>{{ tournament.date }}</td>
				<td>{{ tournament.city }}</td>
				<td class="text-right">
					<a href="/tournois#{{tournament.city}}">{{ tournament.registration.length }}</a>
				</td>
			</tr>
			{% endfor %}
		</table>
		{% else %}
		<div class="occ-no-element">Aucun tournoi enregistré pour le moment...</div>
		{% endif %}
	</div>
</section>
