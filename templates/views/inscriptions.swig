{% extends "../layouts/default.swig" %}
{% import "../mixins/panel_title.swig" as PanelTitle%}

{% block content %}
	<div class="occ-bg container">
		
		{{ PanelTitle.renderTitle('Inscriptions') }}
		
		<br><br>
		<h2>Tarifs 2015 - 2016</h2>
		<p>Les tarifs pour cette année sont :</p>
		<ul>
			<li>Adhésion Loisir Jeune : 80.00€</li>
			<li>Adhésion Licence Jeune : 95.00€</li>
			<li>Adhésion Loisir Adulte : 85.00€</li>
			<li>Adhésion Licence Adulte : 105.00€</li>
		</ul>

		<h2>Dossier d'inscription</h2>
		<p><em><strong>Attention !</strong> Le club ne réceptionnera que les <u>dossiers complets</u> !</em></p>
		<p>Lorsque votre dossier est complet, après vous être renseigné sur les disponibilités, vous pouvez l'apporter au début d'un créneau d'entrainement (lundi ou mercredi).</p>
		<p>Le dossier d'inscription se compose des documents suivants:</p>
		<p><u>Joueurs majeurs nés en 1975 ou avant</u></p>
		<ul>
			<li>Fiche d'inscription <strong>Adulte</strong></li>
			<li>Certificat médical <strong>FFBaD</strong> complété par un médecin</li>
			<li>Réglement intérieur du club signé</li>
			<li>Adhésion par chèque à l'ordre de <em>OCC Badminton</em> ou par chèques vacances</li>
			<li>Photo d'identité récente</li>
			<li>Formulaire de demande de licence si vous êtes intéressé</li>
		</ul>
		<p><u>Joueurs majeurs nés entre 1976 et 1996 (inclus)</u></p>
		<ul>
			<li>Fiche d'inscription <strong>Adulte</strong></li>
			<li>Certificat médical complété par un médecin (version FFBaD en cas de demande de licence)</li>
			<li>Réglement intérieur du club signé</li>
			<li>Adhésion par chèque à l'ordre de <em>OCC Badminton</em> ou par chèques vacances</li>
			<li>Photo d'identité récente</li>
			<li>Formulaire de demande de licence si vous êtes intéressé</li>
		</ul>
		<p><u>Joueurs mineurs</u></p>
		<ul>
			<li>Fiche d'inscription <strong>Enfant</strong></li>
			<li>Certificat médical complété par un médecin (version FFBaD en cas de demande de licence)</li>
			<li>Réglement intérieur du club signé</li>
			<li>Adhésion par chèque à l'ordre de <em>OCC Badminton</em> ou par chèques vacances ou par coupon/chèque sport</li>
			<li>Photo d'identité récente</li>
			<li>Formulaire de demande de licence si vous êtes intéressé</li>
		</ul>
		<p><u>Téléchargements</u>
        <!--</br><em>Les liens ne seront actifs qu'à partir du 15 août 2013. Revenez plus tard ....</em>--></p>
		<span class="glyphicon glyphicon-save-file"></span>
		<a href="telecharger/OCCBadminton-InscriptionAdulte2015-2016.pdf" target="_blank"><em>Télécharger la fiche d'inscription Adulte</em></a><br>
		<span class="glyphicon glyphicon-save-file"></span>
		<a href="telecharger/OCCBadminton-InscriptionEnfant2015-2016.pdf" target="_blank"><em>Télécharger la fiche d'inscription Enfant</em></a><br>
		<span class="glyphicon glyphicon-save-file"></span>
		<a href="telecharger/OCCBadminton-ReglementInterieur2015-2016.pdf" target="_blank"><em>Télécharger le réglement intérieur OCC Badminton</em></a><br>
		<span class="glyphicon glyphicon-save-file"></span>
		<a href="telecharger/FFBaD-Certificat.pdf" target="_blank"><em>Télécharger le certificat médical FFBaD</em></a><br>
		<span class="glyphicon glyphicon-save-file"></span>
		<a href="telecharger/OCCBadminton-InformationsGénérales2015-2016.pdf" target="_blank"><em>Télécharger le récapitulatif 2015-2016</em></a><br>

		<h2>Licence FFBaD</h2>
		<p>Cette licence n’est pas nécessaire pour jouer au club, assister aux entrainements et participer aux manifestations internes au club.
		La licence FFBaD est cependant indispensable pour vous inscrire aux manifestations officielles déclarées à la Fédération: tournois et rencontres inter-clubs.</p>
		<p>Le licence est indépendante du créneau d'entrainement. Elle peut être demandée quelque soit votre niveau de cours.</p>
		<p><strong>La licence peut être demandée à n'importe quel moment de l'année</strong>.</p>
		<span class="glyphicon glyphicon-save-file"></span>
		<a href="telecharger/DemandeLicenceFFBaD2015-2016.pdf" target="_blank"><em>Télécharger le formulaire de demande de licence</em></a>
		<br>
		<br>
	</div>	
{% endblock %}
