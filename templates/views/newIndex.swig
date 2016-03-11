{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container">
    				
    			</div>
    			
	<div class="container">
		<div class="row">
			<div class="col-lg-12"> 
				<div class ="occ-black">
					<img src="http://res.cloudinary.com/occ-badminton/image/upload/v1457627752/media_cka3j8.jpg" 
					height="110"/>
					<h4>Sincères condoléances</h4>
					<p>Notre club de badminton a récemment perdu l’un de ses joueurs. Thomas jouait au sein de l’équipe Hommes depuis le début de la saison, et était particulièrement apprécié de ses coéquipiers. L’ensemble du bureau, joueurs  et entraineurs de l’OCC Badminton adressent tout leur soutien à la famille et aux proches de Thomas dans cette douloureuse épreuve.</p>
				</div>
			</div>
                				
			<!-- Colonne gauche (accès aux articles) -->
			<div class="col-md-9">

					<div class="row">
						<div class="col-md-12">							
							<div class="occ-banner">
								<a href="/pages/tournoi-occ">
									<img src="/images/megaphone.png">
									5ème tournoi officiel Double Mixte - 13 Mars 2016
								</a>
							</div>
						</div>
					</div>

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
