<section class="occ-section">
	<h2>
		<img src="/images/calendar.png" class="occ-section-img">
		Agenda du club
	</h2>
	<div>
		{% if events.length %}
			<strong>
				<table class="table table-striped">
					{% for event in events %}
						{% set classTr = '' %}
						{% if event.canceled %}
							{% set classTr = 'occ-event-cancel' %}
						{% endif %}
					<tr>
						<td class="text-right hidden-xs {{classTr}}">{{ moment(event.date).format("dddd") }}</td>
						<td width="20%" class="text-left {{classTr}}">{{ moment(event.date).format("DD MMMM") }}</td>
						<td width="20%" class="{{classTr}}">
						{{ event.startHour }}
						{% if event.endHour %}
						- {{ event.endHour }}
						{% endif %}
						</td>
						<td width="50%" class="text-left">
							<span class="{{classTr}}">{{ event.description }}</span>
						{% if event.canceled %}
							:
							<span class="occ-event-canceled">
							 ANNULÉ
							</span>
						{% endif %}
						</td>
					</tr>
				{% endfor %}
				</table>
			</strong>
		{% else %}
 			<div class="occ-no-element">
				Rien à venir...<br/>
			</div>
		{% endif %}
	</div>
</section>
