{% import "../mixins/panel_title.swig" as PanelTitle %}
{% extends "../layouts/default.swig" %}

{% block content %}

	<div class="occ-last-news container">

		{{ PanelTitle.renderTitle('Dernières Actualités') }}
		
		<div> 
		{% if lastPosts.length %}
			<div id="occ-last-news-carousel" class="carousel occ-panel slide" data-ride="carousel" data-interval="3000">
			    <!-- Indicators -->
			    <ol class="carousel-indicators">
			    {% for post in lastPosts %}
			    	{% set linkClass = '' %}
					{% if loop.first %}					
						{% set linkClass = 'class="active"' %}
					{% endif %}
			      <li data-target="#occ-last-news-carousel" data-slide-to="{{ loop.index0 }}" {{ linkClass | safe }}></li>
			    {% endfor %}
			    </ol>

			    <!-- Wrapper for slides -->
			    <div class="carousel-inner" role="listbox">
			    {% for post in lastPosts %}
			    	{% set activeClass = '' %}
					{% if loop.first %}
						{% set activeClass = 'active' %}
					{% endif %}
					<div class="item {{activeClass}}">
					{{ renderSlide(post) }}
					</div>
			     {% endfor %}
			    </div>
			</div>
		{% else %}
			<h3 class="text-muted">Aucune news pour le moment.</h3>
		{% endif %}
		</div>
	</div>

	<div class="occ-teams-news container">
		{{ PanelTitle.renderTitle('Résultats équipes') }}

        <div class="col-lg-12">
            {% if teams.length %}
                <ul class="nav nav-tabs">
                    <div class="row">
                        <ul class="nav nav-tabs">
                            {% for team in teams %}
                                {% set activeClass = '' %}
                                {% if loop.first %}
                                    {% set activeClass = 'active' %}
                                {% endif %}
                                <li class="{{activeClass}}"><a data-toggle="tab" href="#equipe{{loop.index}}">{{team.name}}</a></li>
                            {% endfor %}
                        </ul>
                    </div>
                </ul>
                <div class="row">
                    <div class="tab-content">
                        {% for team in teams %}
                            {% set activeClass = '' %}
                            {% if loop.first %}
                                {% set activeClass = 'active' %}
                            {% endif %}
                            <div id="equipe{{loop.index}}" class="tab-pane fade in {{activeClass}}">
                                <div class="row">
                                    {% if  matches[team.id].length == 0 %}
                                        <div class="col-md-12 text-center" style="height:360px;">
                                            <h3>Les matches de la prochaine saison se sont pas encore connus.</h3>
                                        </div>
                                    {% else %}
                                        <div class="col-md-6">
                                        <h3>DERNIERE RENCONTRE</h3>
                                        <hr />
                                            <div class="row">
                                                <div class="col-md-8 col-md-offset-2 text-center">
                                                    <div style="border-radius: 8px;background-color:#DFF0D8;height: 40px;line-height: 40px;">
                                                        <h4 style="line-height: 40px;">OCC-BADMINTON 4 : 3 FIB</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12 text-center">
                                                    Le 10/09/2015 à Césson-Sévigné
                                                </div>
                                            </div>
                                            <ul class="nav nav-tabs">
                                                <li class="active success"><a data-toggle="tab" href="#SH1">SH1</a></li>
                                                <li><a data-toggle="tab" href="#SH2">SH2</a></li>
                                                <li><a data-toggle="tab" href="#SD1">SD1</a></li>
                                                <li><a data-toggle="tab" href="#SD2">SD2</a></li>

                                                <li><a data-toggle="tab" href="#DH">DH</a></li>
                                                <li><a data-toggle="tab" href="#DD">DD</a></li>
                                                <li><a data-toggle="tab" href="#DX">DX</a></li>
                                            </ul>
                                    </div>
                                        <div class="col-md-6">
                                            <h3>LISTE DES RENCONTRES</h3>
                                            <hr />
                                            <div class="table-responsive">
                                                <table id="recontresList" class="table table-hover text-center">
                                                    {% for match in matches[team.id] %}
                                                        {% set resultClass = '' %}
                                                        {% if match.occResult > match.versusResult %}
                                                            {% set resultClass = 'success' %}
                                                        {% elseif match.versusResult > match.occResult%}
                                                            {% set resultClass = 'danger' %}
                                                        {% endif %}
                                                        <tr class="{{resultClass}}">
                                                            <td class="col-md-5">
                                                                {% if match.home == 'Yes' %}
                                                                    OCC-BADMINTON
                                                                {% else %}
                                                                    {{match.versus}}
                                                                {% endif %}
                                                            </td>
                                                            <td class="col-md-2">
                                                                {% if match.occResult %}
                                                                    {% if match.home === 'Yes' %}
                                                                        {{match.occResult}} : {{match.versusResult}}
                                                                    {% else %}
                                                                        {{match.versusResult}} : {{match.occResult}}
                                                                    {% endif %}
                                                                {% else %}
                                                                    {% if match.date %}
                                                                        {{match.date|date('d/m/Y')}}
                                                                    {% endif %}
                                                                {% endif %}
                                                            </td>
                                                            <td class="col-md-5">
                                                                {% if match.home == 'Yes' %}
                                                                    {{match.versus}}
                                                                {% else %}
                                                                    OCC-BADMINTON
                                                                {% endif %}
                                                            </td>
                                                        </tr>
                                                    {% endfor %}
                                                </table>
                                            </div>
                                            <nav>
                                              <ul class="pager">
                                                <li><a href="#">Précédent</a></li>
                                                <li><a href="#">Suivant</a></li>
                                              </ul>
                                            </nav>
                                        </div>
                                    {% endif %}
                                </div>
                            </div>
                        {% endfor %}
                    </div>
                </div>
            {% endif %}
        </div>
	</div>

	<div class="container occ-bad-news">
		
		{{ PanelTitle.renderTitle('Bad Français') }}
		<div class="row">
			<div class="col-lg-8 occ-ffbad">
				<ul class="list-group">
				{% for ffbadNew in ffbadNews %}
					<li class="list-group-item">
					<div class="media">
						<div class="media-body">
							<a href="{{ffbadNew.link}}" target="_blank">
								<p class="media-heading">{{ffbadNew.title}}</p>
							</a>
							<p>{{ffbadNew.summary}}</p>
						</div>
					</div>
					</li>
				{% endfor %}
				</ul>
			</div>
			
			<div class="col-lg-4 occ-tuto">
				<div class="embed-responsive embed-responsive-4by3">
					<iframe class="embed-responsive-item" width="300" height="200" src="https://www.youtube.com/embed/DcevUn6J3-E" frameborder="0" allowfullscreen></iframe>
				</div>
			</div>
		</div>

	</div>
{% endblock %}

{%- macro renderSlide(post) -%}
		<div class="occ-last-news-panel media">
			<div class="media-body">
				<h4>
					<a href="/blog/post/{{ post.slug }}" class="text-danger"><p>{{ post.title }}</p></a>
				</h4>
				<h4>
					{% if post.author %}
						<small>Par {{ post.author.name.first }} </small>
					{% endif %}
					{% if post.publishedDate %}
						<small>le {{ post._.publishedDate.format("Do, MMMM YYYY") }}</small>
					{% endif %}
				</h4>
				<blockquote>{{ post.content.brief | safe}}</blockquote>
				<p class="read-more">
					<a href="/blog/post/{{ post.slug }}">Read more...</a>
				</p>
			</div>
			{% if post.image.exists %}
				<div class="image-wrap occ-last-news-panel-img media-right media-middle">
					<img class="img-responsive media-object" src="{{post._.image.fit(250,200) }}">
				</div>
			{% endif %}
		</div>					
{%- endmacro -%}
