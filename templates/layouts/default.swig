{% import "../mixins/flash-messages.swig" as FlashMessages %}

<!doctype html>
<html xml:lang="fr-fr" lang="fr-fr">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>{{ title|default("OCC-Badminton") }}</title>
		<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">

		{# Customise the stylesheet for your site by editing /public/styles/site.less
		//- All .less files will be automatically compiled and minified in production. #}
		<link href="/styles/site.min.css" rel="stylesheet">
		<link href='https://fonts.googleapis.com/css?family=Roboto:300' rel='stylesheet' type='text/css'>
		{# This file provides the default styling for the KeystoneJS Content Editor #}
		{%- if user and user.canAccessKeystone -%}
			<link href="/keystone/styles/content/editor.min.css" rel="stylesheet">
		{%- endif -%}

		{# HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries
		   Safely remove this block if you are not targeting IE8 #}
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->

		{# Include template-specific stylesheets by extending the css block #}
		{%- block css %}{% endblock -%}

		{# Add any other template-specific HEAD tags by extending the head block #}
		{%- block head %}{% endblock %}
	</head>
	<body>

		{# HEADER #}
		<header class="occ-bg">
			<div id="occ-header-flag" class="container visible-md visible-lg">
				<img src="/images/occ-logo.png" alt="" class="img-rounded" id="occ-logo">
			</div>
		</header>

		<div id="occ-navbar" class="occ-bg" data-spy="affix" data-offset-top="197">
				<nav class="navbar navbar-default container" id="occ-header-nav">
					<div class="navbar-header">
				      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#occ-header-navbar" aria-expanded="false">
				        <span class="sr-only">Menu</span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				      </button>
				      <a class="navbar-brand visible-sm visible-xs" href="#">OCC Badminton</a>
				    </div>
					<div class="collapse navbar-collapse row" id="occ-header-navbar">
						<ul class="nav navbar-nav navbar-left">
							{%- for link in navLinks -%}
								{%- set linkClass = '' -%}
								{%- if link.key == section -%}
									{%- set linkClass = 'active' -%}
								{%- endif %}
								{%- if link.href -%}
									<li class="linkMenu {{ linkClass | safe }}">
										<a href="{{ link.href }}">{{ link.label }}</a>
									</li>
								{%- else -%}
									<li class="dropdown linkMenu {{ linkClass | safe }}">
							          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ link.label }} <span class="caret"></span></a>
							          <ul class="dropdown-menu">
							          	{%- for page in link.pages -%}
							            <li><a href="{{ page.href }}">{{ page.label }}</a></li>
							            {%- endfor %}
							          </ul>
							        </li>
								{%- endif %}
							{%- endfor %}
						</ul>
						<ul class="nav navbar-nav navbar-right">
							{% if user -%}
								{%- if user.canAccessKeystone -%}
									<li><a class="btn" href="/keystone">Administration</a></li>
								{%- endif -%}
								<li><a class="btn" href="/keystone/signout">Déconnexion</a></li>
							{%- else -%}
								<li><a class="btn" href="/keystone/signin">Connexion</a></li>
								<li><a class="btn" href="/account">S'inscrire</a></li>
							{%- endif %}
						</ul>
					</div>
				</nav>
		</div>

		{# BODY #}
		<main>
			{# The Intro block appears above flash messages (used for temporary information display) #}
			{%- block intro -%}{%- endblock -%}

			{# Flash messages allow you to display once-off status messages to users, e.g. form
			   validation errors, success messages, etc. #}
			{{ FlashMessages.renderMessages(messages) }}

			{# The content block should contain the body of your template"s content #}
			{%- block content -%}{%- endblock -%}
		</main>

		<div class="occ-bg">
			<div class="container">
				<h4>Partenaires</h4>
				{% if sponsors && sponsors.length > 0%}
				<div id="occ-sponsor-bar" class="scroll-text">
					<ul>
					{% for sponsor in sponsors %}
						<li><a href="{{sponsor.url}}" class="thumbnail"><img src="{{sponsor.img_url}}" alt="{{sponsor.name}}"/></a></li>
					{% endfor %}
					</ul>
				</div>

				{% else %}
				<p>The sponsors are empty</p>
				{% endif %}
			</div>
		</div>

		{# FOOTER #}
		<footer class="occ-bg">
			<div class="container">
				<p class="text-right"><a href="/pages/a-propos">À propos</a> du site web.</p>
			</div>
		</footer>

		{# JAVASCRIPT #}

		{# jQuery 1.11.1 is included by default, and required by both Bootstrap
			and the KeystoneJS Content Editor. If you are not targeting IE8,
			you can upgrade to 2.1.3 (also bundled) for better performance. #}
		<script src="/js/jquery/jquery-2.1.3.min.js"></script>

		{# Customise which Bootstrap javascript files are served by including
			them specifically here, instead of bootstrap-3.3.4.min.js #}
		<script src="/js/bootstrap/bootstrap-3.3.4.min.js"></script>

		{# scrollbox jQuery plugin #}
		<script src="/js/jquery/jquery.scrollbox.min.js"></script>

		{# The KeystoneJS Content Editor provides support for ks-editable data attributes,
			which generate links to edit content for users who can access Keystone #}
		{% if user and user.canAccessKeystone -%}
			<script src="/keystone/js/content/editor.js"></script>
		{%- endif -%}

		{# Add scripts that are globally required by your site here. #}

		{# Include template-specific javascript files by extending the js block #}
		{%- block js -%}
		<script type="text/javascript">
			jQuery(function($) {
				$('#occ-sponsor-bar').scrollbox(
				{
				  direction: 'h',
				  distance: 110
				});
			});
		</script>
		{%- endblock -%}
	</body>
</html>
