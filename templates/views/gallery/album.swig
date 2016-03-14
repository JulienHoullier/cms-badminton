{% extends "../../layouts/default.swig" %}
{% import "../../mixins/panel_title.swig" as PanelTitle %}

{% block content %}
	<div class="container occ-bg">

		{{ PanelTitle.renderTitle(album.name) }}

		<div  class="occ-album">		
			{% if album.images.length %}
				<div class="row">
					{% for photo in album.images %}
						<a class="gallery-image col-md-4" rel="album" href="{{ photo.limit(900,600)}}">
							<img src="{{ photo.limit(300,300) }}" title="test" class="occ-hero-img" />	
						</a>							
					{% endfor %}
				</div>
			{% else %}
				<h3 class="text-muted">Aucune photo pour le moment.</h3>
			{% endif %}
		</div>
	</div>
{% endblock %}


{% block js %}
	<link rel="stylesheet" href="../js/fancyBox/jquery.fancybox.css" type="text/css" media="screen" />
    <script type="text/javascript" src="../js/fancyBox/jquery.fancybox.pack.js"></script>
	<script type="text/javascript">
	
		jQuery(function($) {
			$('.gallery-image').fancybox({
				prevEffect: 'none',
				nextEffect: 'none',
				closeBtn: false
			});
		});
	</script>
{% endblock %}
