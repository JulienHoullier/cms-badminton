{% extends "../layouts/default.swig" %}
{% import "../mixins/commenting.swig" as Commenting%}

{%- block head %}
  <meta property="og:url"           content="http://www.occ-badminton.org/blog/post/{{post.slug}}" />
  <meta property="og:type"          content="article" />
  <meta property="og:title"         content="{{post.title}}" />
  <meta property="og:description"   content="{{post.content.brief | safe}}" />
  <meta property="og:image"         content="{{post.image.url}}" />
{% endblock %}

{% block content %}
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.5";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>
  <div class="container">
				<p class="occ-fg">
					<a href="/blog" class="occ-theme-color">&larr; Retour aux actualités</a>
				</p>
				<hr>
				<article class="occ-post occ-bg">
					{% if not post %}
						<h2>Article inconnu.</h2>
					{% else %}
						<header>
							{% if post.image.exists %}
								<div class="image-wrap" style="float: right">
									<img src="{{ post._.image.fit(300,180) }}" class="img-responsive">
								</div>
							{% endif %}
							<div>
								<h1 class="text-caps text-danger text-center">{{ post.title }}</h1>
								<span>
								{% if post.publishedDate %}
									le {{ post._.publishedDate.format('DD/MM/YYYY') }}
								{% endif %}
								{% if post.category %}
									dans la catégorie :
									<a href="/blog/{{ post.category.key }}" class="occ-theme-color">{{ post.category.name }}</a>
								{% endif %}
								{% if post.author %}
									par {{ post.author.name.first }}
								{% endif %}
								</span>
								<span>
									<span class="occ-social-button">
									  <a href="https://twitter.com/share" class="twitter-share-button" data-via="OCCBadminton">Tweet</a>
									  <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
									</span>
									<span class="occ-social-button">
									  <div class="fb-share-button" data-href="http://www.occ-badminton.org/blog/post/{{post.slug}}" data-layout="button_count"></div>
									</span>
								</span>
							</div>
						</header>
						<div class="occ-post-content row">
							{{ post.content.full | raw }}
						</div>
						<div id="comments">
							{{ Commenting.commentForm() }}
							{{ Commenting.commentThread(comments) }}
						</div>
					{% endif %}
				</article>
  </div>
{% endblock %}
