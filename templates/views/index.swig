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

                <div class="occ-container-team-list">
                    <ul class="occ-team-list">
                        {% for team in teams %}
                            {% set activeClass = '' %}
                            {% if loop.first %}
                                {% set activeClass = 'active' %}
                            {% endif %}
                            <li class="{{activeClass}}"><a data-toggle="tab" href="#equipe{{loop.index}}">{{team.name}}</a></li>
                        {% endfor %}
                    </ul>
                </div>

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
                                            <h3>Les matches de la prochaine saison ne sont pas encore connus.</h3>
                                        </div>
                                    {% else %}
                                        <div class="col-md-6">
                                        <h3>DERNIÈRE RENCONTRE</h3>
                                        <hr />
                                        {% set lastResult = lastResults[team.id] %}
                                        {% if lastResult and lastResult.occResult %}
                                            {% set resultClass = '' %}
                                            {% if lastResult.occResult > lastResult.versusResult %}
                                                {% set resultClass = 'Win' %}
                                            {% elseif lastResult.versusResult > lastResult.occResult%}
                                                {% set resultClass = 'Loose' %}
                                            {% endif %}
                                            <div class="row">
                                                <div class="col-xs-10 col-xs-offset-1 text-center occ-last-match-result occ-last-{{resultClass}}">
                                                    <div class="col-md-5">
                                                        <H4>
                                                            {% if lastResult.home == 'Yes' %}
                                                                OCC-BADMINTON
                                                            {% else %}
                                                                {{lastResult.versus|upper}}
                                                            {% endif %}
                                                        </H4>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <H4>
                                                            {% if lastResult.home === 'Yes' %}
                                                                {{lastResult.occResult}} : {{lastResult.versusResult}}
                                                            {% else %}
                                                                {{lastResult.versusResult}} : {{lastResult.occResult}}
                                                            {% endif %}
                                                        </H4>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <H4>
                                                            {% if lastResult.home == 'Yes' %}
                                                                {{lastResult.versus|upper}}
                                                            {% else %}
                                                                OCC-BADMINTON
                                                            {% endif %}
                                                        </H4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12 text-center">
                                                    {% if lastResult.date %}
                                                        {{lastResult.date|date('d/m/Y')}}
                                                    {% endif %}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12 text-center">
                                                    {% if lastResult.home == 'Yes' %}
                                                        Césson-Sévigné
                                                    {% else %}
                                                        {{lastResult.location.state|capitalize}}
                                                    {% endif %}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-10 col-xs-offset-1 occ-detail-list-container">
                                                    <ul class="nav nav-tabs occ-detailResult" role="tablist">
                                                        <li class="occ-last-{{lastResult.resultDetails.sh1}}">SH1</li>
                                                        <li class="occ-last-{{lastResult.resultDetails.sh2}}">SH2</li>
                                                        <li class="occ-last-{{lastResult.resultDetails.sd1}}">SD1</li>
                                                        <li class="occ-last-{{lastResult.resultDetails.sd2}}">SD2</li>
                                                        <li class="occ-last-{{lastResult.resultDetails.dh}}">DH</li>
                                                        <li class="occ-last-{{lastResult.resultDetails.dd}}">DD</li>
                                                        <li class="occ-last-{{lastResult.resultDetails.dx1}}">DX1</li>
                                                        <li class="occ-last-{{lastResult.resultDetails.dx2}}">DX2</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        {% else %}
                                            <div class="col-md-12 text-center">
                                                <h3>Les matches n'ont pas encore commencés.</h3>
                                            </div>
                                        {% endif %}
                                    </div>
                                        <div class="col-md-6">
                                            <h3>LISTE DES RENCONTRES</h3>
                                            <hr />
                                            <div class="table-responsive occ-results-matches-container">
                                                <table id="rencontresList{{loop.index}}" class="table table-hover text-center rencontresList">
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
                                                                    {{match.versus|upper}}
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
                                                                    {{match.versus|upper}}
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
                                                <li><a id="previousResults{{loop.index}}" href="#">Précédent</a></li>
                                                <li><a id="nextResults{{loop.index}}" href="#">Suivant</a></li>
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



{%- block js -%}
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js"></script>
    <script type="text/javascript">

        jQuery(function($) {
            var rowHeight = 37;     //hauteur d'une ligne du tableau
            var matchDisplay = 5;   //nombre de match à afficher

            {% for team in teams %}

                //Initialisation des variables
                var matches{{loop.index}} = {{matches[team.id].length}};
                var rowNumber{{loop.index}} = matches{{loop.index}}-matchDisplay;

                {% if  matches[team.id].length == 0 %}
                    var i{{loop.index}} = 0;
                {% else %}
                    {% set lastResult = lastResults[team.id] %}
                    var i{{loop.index}} = {{lastResult.matchNumber}};
                {% endif %}

                if({{matches[team.id].length}} < matchDisplay){
                    i{{loop.index}} = 0;
                }else if(matches{{loop.index}} > matches{{loop.index}} - matchDisplay){
                    i{{loop.index}} = matches{{loop.index}} - matchDisplay;
                }

                //positionnement du tableau
                $('#rencontresList{{loop.index}}').css('margin-top',-i{{loop.index}}*rowHeight+'px');

                //au click sur suivant
                $('#nextResults{{loop.index}}').click(_.throttle(function(){
                    console.log(i{{loop.index}});
                    if(i{{loop.index}}+1 <= rowNumber{{loop.index}}){
                        var currentMargin = parseInt($('#rencontresList{{loop.index}}').css('margin-top').replace("px", ""))-rowHeight;
                        $('#rencontresList{{loop.index}}').css('margin-top',currentMargin+'px');
                        i{{loop.index}}++;
                    }
                    return false;
                },500));

                //au click sur précédent
                $('#previousResults{{loop.index}}').click(_.throttle(function(){
                    console.log(i{{loop.index}});
                    if(i{{loop.index}}-1 >= 0){
                        var currentMargin = parseInt($('#rencontresList{{loop.index}}').css('margin-top').replace("px", ""))+rowHeight;
                        $('#rencontresList{{loop.index}}').css('margin-top',currentMargin+'px');
                        i{{loop.index}}--;
                    }
                    return false;
                },500));

            {% endfor %}

        });
    </script>
{%- endblock -%}

















