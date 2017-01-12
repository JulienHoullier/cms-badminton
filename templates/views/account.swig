{% import "../mixins/panel_title.swig" as PanelTitle %}
{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container">

		{{ PanelTitle.renderTitle("Créez votre compte utilisateur") }}

		<form class="form-horizontal form-inscription occ-fg" method="POST">
			<input type="hidden" name="_csrf" value="{{csrf_token_value}}">
			<div class="form-group">
				<label for="name.first" class="col-sm-2 control-label">Prénom</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" name="name.first" id="prenom" placeholder="Prénom">
				</div>
			</div>
			<div class="form-group">
				<label for="name.last" class="col-sm-2 control-label">Nom</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" name="name.last" id="nom" placeholder="Nom">
				</div>
			</div>
			<div class="form-group">
				<label for="email" class="col-sm-2 control-label">E-mail</label>
				<div class="col-sm-10">
					<input type="email" class="form-control" name="email" id="email" placeholder="E-mail">
				</div>
			</div>
			<div class="form-group">
				<label for="password" class="col-sm-2 control-label">Mot de passe</label>
				<div class="col-sm-10">
					<input type="password" class="form-control" name="password" id="password" placeholder="Password">
				</div>
			</div>
			<div class="form-group">
				<label for="password_confirm" class="col-sm-2 control-label">Confirmation</label>
				<div class="col-sm-10">
					<input type="password" class="form-control" name="password_confirm" id="password_confirm" placeholder="Confirmation">
				</div>
			</div>
			<button type="submit" class="btn btn-primary">S'inscrire</button>
		</form>

	</div>
{% endblock %}
