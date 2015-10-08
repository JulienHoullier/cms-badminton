{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container">
		<div class="row">
			<!-- Colonne gauche (accès aux articles) -->
			<div class="col-md-9">

					{% include "./index/articlesCarousel.swig" %}

					<div class="row">

						<div class="col-md-6">
							{% include "./index/resultats.swig" %}
						</div>

						<div class="col-md-6">
							{% include "./index/tournois.swig" %}
						</div>

					</div>

			</div>

			<!-- Colonne droite (Twitter, tournoi...) -->
			<div class="col-md-3">

				{% include "./index/twitter.swig" %}

				{% include "./index/video.swig" %}

			</div>

		</div>

	</div>
{% endblock %}
