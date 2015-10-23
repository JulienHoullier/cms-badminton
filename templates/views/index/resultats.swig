<section class="occ-section">
	<h2>
		<img src="/images/resultats.png" class="occ-section-img">
		Derniers résultats
		{# <a href="/resultats" title="Voir tous les résultats" class="pull-right">
			<img src="/images/plus.png" width="16px" height="16px" />
		</a> #}
	</h2>
	<div class="occ-section-little">
		{% if lastResults.length %}
			<table class="table table-striped">
				{% for result in lastResults %}
					{% set img = 'good' %}
					{% if result.occResult == result.versusResult %}
						{% set img = 'neutral' %}
					{% elseif result.occResult < result.versusResult %}
						{% set img = 'sad' %}
					{% endif %}
					<tr>
						<td width="10%"><img src="/images/{{img}}.png"></td>
						<td width="40%" class="text-left">{{ result.team.name }}</td>
						<td class="text-right" width="5%">{{ result.occResult }}</td>
						<td width="5%" class="text-left">{{ result.versusResult }}</td>
						<td class="text-right" width="40%">{{ result.versus }}</td>
					</tr>
				{% endfor %}
			</table>
		{% else %}
			<div class="occ-no-element">
				Aucun résultat pour le moment...<br/>
				Mais les équipes sont prêtes ! :-)
			</div>
			<table class="table table-striped">
				<tr>
					<td width="10%"><img src="/images/good.png"></td>
					<td width="40%" class="text-left">Equipe 1</td>
					<td class="text-right" width="5%">?</td>
					<td width="5%" class="text-left">?</td>
					<td class="text-right" width="40%">Vitré 2</td>
				</tr>
				<tr>
					<td width="10%"><img src="/images/good.png"></td>
					<td width="40%" class="text-left">Equipe 2</td>
					<td class="text-right" width="5%">?</td>
					<td width="5%" class="text-left">?</td>
					<td class="text-right" width="40%">Gosné 1</td>
				</tr>
				<tr>
					<td width="10%"><img src="/images/good.png"></td>
					<td width="40%" class="text-left">Equipe 3</td>
					<td class="text-right" width="5%">?</td>
					<td width="5%" class="text-left">?</td>
					<td class="text-right" width="40%">REC 4</td>
				</tr>
				<tr>
					<td width="10%"><img src="/images/good.png"></td>
					<td width="40%" class="text-left">Equipe H</td>
					<td class="text-right" width="5%">?</td>
					<td width="5%" class="text-left">?</td>
					<td class="text-right" width="40%">CPB 1</td>
				</tr>
			</table>
		{% endif %}
	</div>
</section>
