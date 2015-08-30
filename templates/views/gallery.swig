{% extends "../layouts/default.swig" %}

{% block intro %}
	<h1 class="lead">Photos</h1>
{% endblock %}

{% block content %}
	<div>
		{% if galleries.length %}
			{% for gallery in galleries %}
				<h2>{{ gallery.name }}
					{% if gallery.publishedDate %}
						<span class="pull-right text-muted">{{ gallery._.publishedDate.format("Do MMM YYYY") }}</span>
					{% endif %}
				</h2>

				<div class="row gallery-images">
					{% if gallery.heroImage.exists %}
						<a class="col-sm-4 col-md-4 gallery-image" rel="gallery" title="{{gallery.name + ' hero image'}}" href="{{gallery._.heroImage.limit(900,600)}}">
							<img src="{{ gallery._.heroImage.limit(680,680) }}" class="img-rounded">
						</a>
						<div class="col-sm-8 col-md-8">
							<div class="row">
								{% for image in gallery.images %}
									<a class="col-xs-4 col-sm-4 col-md-3 gallery-image" rel="gallery" title="{{ gallery.name + ' image ' + (i+1)}}" href="{{ image.limit(900,600)}}">
										<img src="{{ image.limit(300,300) }}" class="img-rounded">
									</a>
								{% endfor %}
							</div>
						</div>
					{% else %}
						{% for image in gallery.images %}
							<a class="col-xs-6 col-sm-4 col-md-3 gallery-image" rel="gallery" title="{{gallery.name + ' image ' + (i+1)}}" href="{{image.limit(900,600)}}">
								<img src="{{ image.limit(300,300) }}" class="img-rounded">
							</a>
						{% endfor %}
					{% endif %}
				</div>
			{% endfor %}
		{% else %}
			<h3 class="text-muted">There are no image galleries yet.</h3>
		{% endif %}
	</div>
{% endblock %}

{% block js %}
	<link rel="stylesheet" href="js/fancyBox/jquery.fancybox.css" type="text/css" media="screen" />
    <script type="text/javascript" src="js/fancyBox/jquery.fancybox.pack.js"></script>
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