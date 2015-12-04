<aside class="occ-section-social">
	<h2>
		<img src="/images/video.png" class="occ-section-img">
		Comment ... ?
	</h2>
	{% if media %}
	<div class="embed-responsive embed-responsive-4by3">
		{% if media.url %}
			<iframe class="embed-responsive-item" width="300" height="200" src="{{ media.url | raw }}" frameborder="0" allowfullscreen></iframe>
		{% endif %}
		{% if media.embedded %}
			{{ media.embedded | raw }}
		{% endif %}
	</div>
	{% endif %}
	
</aside>
