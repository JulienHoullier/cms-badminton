{% extends "../../layouts/default.swig" %}
{% import "../../mixins/panel_title.swig" as PanelTitle%}

{% block content %}

	<div class="container occ-bg">
		{{ PanelTitle.renderTitle("Inscription au tournoi") }}

		<h2 class="text-center">{{ tournoi.name }} ({{ tournoi.club }})</h2>

		<form class="form-horizontal form-inscription">
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="categorie" class="col-sm-2 control-label">Joueur</label>
						<div class="col-sm-10">
							<input class="form-control" type="text" placeholder="{{ playerName }}" readonly>
						</div>
					</div>
					 <div class="form-group">
						<label for="categorie" class="col-sm-2 control-label">Catégorie</label>
						<div class="col-sm-10">
							<select class="form-control">
								<option value="SH">Simple Homme</option>
								<option value="SD">Simple Dame</option>
								<option value="DH">Double Homme</option>
								<option value="DD">Double Dame</option>
								<option value="DM">Double Mixte</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="division" class="col-sm-2 control-label">Division</label>
						<div class="col-sm-10">
							<select class="form-control" id="division">
								<option value="NC">NC</option>
								<option value="P1">P1</option>
								<option value="P2">P2</option>
								<option value="P3">P3</option>
								<option value="D9">D9</option>
								<option value="D8">D8</option>
								<option value="D7">D7</option>
								<option value="R6">R6</option>
								<option value="R5">R5</option>
								<option value="R4">R4</option>
								<option value="N3">N3</option>
								<option value="N2">N2</option>
								<option value="N1">N1</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="categorie" class="col-sm-2 control-label">Joueur 2</label>
						<div class="col-sm-10">
							<select class="form-control" id="division">
                                <option value="">-- Sélectionnez votre partenaire --</option>
                                {% for joueur2 in listJoueur2 %}
                                    <option value="{{joueur2.id}}">{{joueur2.name.full}}</option>
                                {% endfor %}
                            </select>
						</div>
					</div>
				</div>
			</div>
            <button type="submit" class="btn btn-primary">Envoyer</button>
		</form>

	</div>


{% endblock %}
