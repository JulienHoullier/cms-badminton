{%- macro commentForm() -%}
	<form method='post' style="margin-bottom: 40px; margin-top: 40px;">
		<input type='hidden' name='action' value='comment.create'/>
		<div class="media">
			<div class="pull-left">
				{%- if  user %}
					{%- set photo_url = "http://placehold.it/80x80" %}
					{%- if  user.photo.exists %}
						{%- set photo_url = user._.photo.thumbnail(80,80) %}
					{%- endif %}
					<img src="{{ photo_url }}" alt="{{user.name.full}}" width="80" height="80" class="img-rounded"/>
				{%- else -%}
					<img src='http://placehold.it/80x80' alt='Comment author placeholder' width="80" height="80" class="img-rounded"/>
				{%- endif %}
			</div>
			<div class="media-body">
				{%- if  user %}
					<textarea name='content' placeholder="Ajouter un commentaire..." style="margin-bottom: 10px; min-height: 80px; resize: vertical;" class="form-control"></textarea>
					<button type='submit' class="btn btn-primary">Ajouter un commentaire</button>
				{%- else -%}
					<textarea name='content' placeholder="Connectez vous pour commenter..." disabled=true style="margin-bottom: 10px; min-height: 80px; resize: vertical;" class="form-control"></textarea>
					<ul class="list-inline">
						<li><a href="/keystone/signin" class="btn btn-sm btn-primary">Connectez vous pour commenter</a></li>
					</ul>
				{%- endif %}
			</div>
		</div>
	</form>
{%- endmacro -%}
{%- macro commentPost(comment) -%}
	{%- if  comment.author -%}
		<div id="comment-id-{{comment.id}}" style="margin-top: 20px;">
			<div class="media">
				<div class="pull-left">
					{% set photo_url = 'http://placehold.it/80x80' %}
					{%- if  comment.author.photo.exists -%}
						{% set photo_url = comment.author._.photo.thumbnail(80,80) %}
					{%- endif -%}
					<img src="{{ photo_url }}" alt="{{comment.author.name.full}}" width="80" height="80" class="img-rounded"/>
				</div>
				<div class="media-body">
					<p>
						<strong>{{comment.author.name.full}}</strong>
						{%- if user && user.id === comment.author.id -%}
							|  &middot; 
							<a href="?remove=comment&comment={{comment.id}}" title='Delete this comment' rel='tooltip' data-placement='left' class="comment-delete js-delete-confirm">Supprimer</a>
						{% endif %}
					</p>
					<p>{{comment.content | safe}}</p>
				</div>
			</div>
		</div>
	{%- endif -%}
{%- endmacro -%}
<<<<<<< HEAD
{%- macro commentThread(comments) -%}
	{%- if comments.length -%}
		{%- for comment in comments -%}
			{{ commentPost(comment) }}
=======
{%- macro comment-thread(comments) -%}
	{%- if comments.length -%}
		{%- for comment in comments -%}
			{{ comment-post(comment) }}
>>>>>>> add start comment dev
		{%- endfor -%}
	{%- endif -%}
{%- endmacro -%}
