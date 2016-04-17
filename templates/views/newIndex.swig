{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container">

    			</div>

	<div class="container">
		<div class="row">
			<!-- Colonne gauche (accès aux articles) -->
			<div class="col-md-9">

					{% if annonces.length %}
						<div class="row">
							{% for annonce in annonces %}
								<div class="col-md-12">
									<div class="occ-banner">
										<a href="/blog/post/{{ annonce.slug }}">
											<img src="/images/megaphone.png">
											{{ annonce.title }}
										</a>
									</div>
								</div>
							{% endfor %}
						</div>
					{% endif %}

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

				<div class="row occ-section-social">
					<div class="col-xs-4 text-center">
						<a href="https://twitter.com/OCCBadminton" target="_blank">
							<img alt="Twitter" src="/images/twitter.png" />
						</a>
					</div>
					<div class="col-xs-4 text-center">
						<a href="https://www.facebook.com/groups/449683501877406/?fref=ts" target="_blank"	>
							<img alt="Facebook" src="/images/facebook.png" />
						</a>
					</div>
					<div class="col-xs-4 text-center">
						<a href="/feed" target="_blank">
							<img alt="RSS" src="/images/rss.png" />
						</a>
					</div>
				</div>

				{% include "./index/commentaires.swig" %}

				{% include "./index/twitter.swig" %}

				{% include "./index/video.swig" %}

			</div>

		</div>

	</div>
{% endblock %}
