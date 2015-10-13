<section>
	<h2>
		<img src="/images/resultats.png" class="occ-section-img">
		Derniers résultats
		<a href="/resultats" title="Voir tous les résultats" class="pull-right">
			<img src="/images/plus.png" width="16px" height="16px" />
		</a>
	</h2>
	<div class="occ-section-resultats">
		{% if lastResults %}
			<table class="table table-striped">
				{% for result in lastResults %}
					{% set %}
					<tr>
						<td width="10%"><img src="/images/good.png"></td>
						<td width="40%">{{ result.team.name }}</td>
						<td class="text-left" width="5%">{{ result.occResult }}</td>
						<td width="5%">{{ result.versusResult }}</td>
						<td class="text-right" width="40%">{{ result.versus }}</td>
					</tr>
				{% endfor %}
			</table>
		{% else %}
			<div class="occ-no-element">
				Aucun résultat pour le moment...
			</div>
		{% endif %}
	</div>
</section>
