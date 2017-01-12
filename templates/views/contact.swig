{% extends "../layouts/default.swig" %}
{% import "../mixins/panel_title.swig" as PanelTitle %}

{% block content %}
	<div class="container">

		{{ PanelTitle.renderTitle('Nous contacter') }}
		
		{% if enquirySubmitted %}
			<h3>Merci de votre participation </p></h3>
		{% else %}
			<div class="row">
				<div class="col-sm-8 col-md-6 col-lg-12">
					<form method="post">
						<input type="hidden" name="action" value="contact">
						{% set className = "" %}
						{% if validationErrors.name %}
							{% set className = "has-error" %}
						{% endif %}
						<div class="form-group {{ className }}">
							<label>
								<span>Nom</span>
								<input type="text" name="name.full" value="{{ formData['name.full'] | default('') }}" class="form-control">
							</label>
						</div>
						{% set className = "" %}
						{% if validationErrors.email %}
							{% set className = "has-error" %}
						{% endif %}
						<div class="form-group {{ className }}">
							<label>
								<span>Email</span>
								<input type="email" name="email" value="{{ formData.email | default('') }}" class="form-control">
							</label>
						</div>
						<div class="form-group">
							<label>
								<span>Téléphone</span>
								<input type="text" name="phone" value="{{ formData.phone | default('') }}" placeholder="(optionel)" class="form-control">
							</label>
						</div>
						{% set className = "" %}
						{% if validationErrors.enquiryType %}
							{% set className = "has-error" %}
						{% endif %}
						<div class="form-group {{ className }}">
							<label>
								<span>Pour quelle raison nous contactez-vous ?</span>
								<select name="enquiryType" class="form-control">
									<option value="">(Choissiez en une)</option>
									{% for type in enquiryTypes %}
										{% set selected = "" %}
										{% if formData.enquiryType === type.value %}
											{% set selected = " selected" %}
										{% endif %}
										<option value="{{ type.value }}"{{ selected }}>{{ type.label }}</option>
									{% endfor %}
								</select>
						</div>
						{% set className = "" %}
						{% if validationErrors.message %}
							{% set className = "has-error" %}
						{% endif %}
						<div class="form-group {{ className }}">
							<label>
								<span>Message</span>
								<textarea name="message" placeholder="Laissez-nous votre message..." rows="4" class="form-control">{{ formData.message }}</textarea>
							</label>
						</div>
						<div class="form-actions">
							<button type="submit" class="btn btn-primary">Envoyer</button>
						</div>
						<br/>
					</form>
				</div>
			</div>
		{% endif %}
	</div>
{% endblock %}
