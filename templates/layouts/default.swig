{% import "../mixins/flash-messages.swig" as FlashMessages %}

<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<title>{{ title|default("OCC-Badminton") }}</title>
		<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">

		{# Customise the stylesheet for your site by editing /public/styles/site.less
		//- All .less files will be automatically compiled and minified in production. #}
		<link href="/styles/site.min.css" rel="stylesheet">

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
		<header class="flagBar">
			<div class="container header-flag">
				<div class="row visible-md visible-lg">
					<img src="/images/occ-logo.png" alt="" id="occ-logo">
				</div>
			</div>
			
			<div class="container">
				<nav class="navbar navbar-inverse row" id="header-nav">
					<div class="container-fluid">
						<div class="navbar-header row">
					      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#occ-header-navbar" aria-expanded="false">
					        <span class="sr-only">Menu</span>
					        <span class="icon-bar"></span>
					        <span class="icon-bar"></span>
					        <span class="icon-bar"></span>
					      </button>
					      <a class="navbar-brand visible-sm visible-xs" href="#">OCC Badminton</a>
					    </div>
						<div class="collapse navbar-collapse" id="occ-header-navbar">
							<ul class="nav navbar-nav navbar-left">
								{%- for link in navLinks -%}
									{%- set linkClass = '' -%}
									{%- if link.key == section -%}
										{%- set linkClass = 'active' -%}
									{%- endif %}
									<li class="{{link.key}} {{ linkClass | safe }}">
										<a href="{{ link.href }}">{{ link.label }}</a>
									</li>
								{%- endfor %}
							</ul>
							<ul class="nav navbar-nav navbar-right">
								{% if user -%}
									{%- if user.canAccessKeystone -%}
										<li><a href="/keystone">Open Keystone</a></li>
									{%- endif -%}
									<li><a href="/keystone/signout">Sign Out</a></li>
								{%- else -%}
									<li><a href="/keystone/signin">Sign In</a></li>
								{%- endif %}
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</header>	
			
		</div>

		{# BODY #}
		<div id="body">
			{# The Intro block appears above flash messages (used for temporary information display) #}
			{%- block intro -%}{%- endblock -%}

			{# Flash messages allow you to display once-off status messages to users, e.g. form
			   validation errors, success messages, etc. #}
			{{ FlashMessages.renderMessages(messages) }}

			{# The content block should contain the body of your template"s content #}
			{%- block content -%}{%- endblock -%}
		</div>

		<div class="flagBar" style="margin-top:30px">
			<div class="container">
				<p class="row">The sponsors</p>
			</div>
		</div>

		{# FOOTER #}
		<footer class="flagBar">
			<div class="container">
			{# You don"t _have_ to include a link saying your site is powered by KeystoneJS, but we appreciate it! #}
				<p class="text-right">Powered by <a href="http://keystonejs.com" target="_blank">KeystoneJS</a>.</p>
			</div>
		</footer>

		{# JAVASCRIPT #}

		{# jQuery 1.11.1 is included by default, and required by both Bootstrap
			and the KeystoneJS Content Editor. If you are not targeting IE8,
			you can upgrade to 2.1.3 (also bundled) for better performance. #}
		<script src="/js/jquery/jquery-1.11.2.min.js"></script>

		{# Customise which Bootstrap javascript files are served by including
			them specifically here, instead of bootstrap-3.3.4.min.js #}
		<script src="/js/bootstrap/bootstrap-3.3.4.min.js"></script>

		{# The KeystoneJS Content Editor provides support for ks-editable data attributes,
			which generate links to edit content for users who can access Keystone #}
		{% if user and user.canAccessKeystone -%}
			<script src="/keystone/js/content/editor.js"></script>
		{%- endif -%}

		{# Add scripts that are globally required by your site here. #}

		{# Include template-specific javascript files by extending the js block #}
		{%- block js -%}{%- endblock -%}
	</body>
</html>
