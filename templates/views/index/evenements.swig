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
					<tr class="{{classTr}}">
						<td class="text-right hidden-xs">{{ event._.date.format("dddd") }}</td>
						<td width="20%" class="text-left">{{ event._.date.format("DD-MM-YYYY") }}</td>
						<td width="20%">
						{{ event.startHour }}
						{% if event.endHour %}
						- {{ event.endHour }}
						{% endif %}
						</td>
						<td width="50%" class="text-left">
							{{ event.description }}
						{% if event.canceled %}
							:
							<span>
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
