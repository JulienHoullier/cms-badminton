{%- macro renderNews(title, news) -%}
	{%- if news -%}
		<div class="news jumbotron">
			<p>News {{title}}</p>
			{%- for article in news -%}
			
			<div>
				<h4>{{ article.title }}</h4>
				<div class="jumbotron">
					{{ article.content }}
				</div>
			</div>					
			{%- endfor %}
		</div>
	{%- endif -%}
{%- endmacro -%}
