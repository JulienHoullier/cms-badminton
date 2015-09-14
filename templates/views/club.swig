{% import "../mixins/panel_title.swig" as PanelTitle %}
{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container occ-bg">

		{{ PanelTitle.renderTitle('Club') }}

		<br><h2><strong>Le club</strong></h2>
		<p>Le club a la volonté d'offrir des créneaux de loisirs et de compétition pour ceux qui le souhaitent. Chacun peut ainsi progresser à son rythme et selon ses envies.</p>
		<p>Malgré des effectifs relativement faibles, mais en constante évolution, nous sommes fiers d'avoir trois équipes engagées en championnat inter-clubs.</p>
		<p><strong>Nous espérons vous voir un jour parmi nous !</strong></p>
		<h2><strong>Le bureau</strong></h2>
		<p>Pour cette année 2014-2015, le bureau du club se compose de:</p>
		<table class="table table-bordered">
			<thead>
				<tr>
					<th style="width:100px;">Fonction</th>
					<th>Nom</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Président</td>
					<td>Solène Vervoitte</td>
				</tr>
				<tr>
					<td>Secrétaire</td>
					<td>Annie Loreau</td>
				</tr>
				<tr>
					<td>Trésorier</td>
					<td>Nathalie Duquesne</td>
				</tr>
				<tr>
					<td>Membre</td>
					<td>Sylvain Duquesne</td>
				</tr>
				<tr>
					<td>Membre</td>
					<td>Benoît Oger</td>
				</tr>
			</tbody>
		</table>
		<br>
		<h2 id="contact"><strong>Contact</strong></h2>
		<blockquote style="padding-left: 40px; font-style: italic">
			<p>Solène VERVOITTE : 06 81 87 14 36</p>
			<p>contact@occ-badminton.org</p>
		</blockquote>
		<br>
	</div>
{% endblock %}
