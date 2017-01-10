<!doctype html>
<html xml:lang="fr-fr" lang="fr-fr">
<head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
    /* Fonts and Content */
    body, td { font-family: 'Helvetica Neue', Arial, Helvetica, Geneva, sans-serif; font-size:14px; }
    h2{ padding-top:12px; /* ne fonctionnera pas sous Outlook 2007+ */color:#0E7693; font-size:22px; }

    </style>
</head>
<body style="margin:0px; padding:0px; -webkit-text-size-adjust:none; background-color:{{theme.email_bg}}">

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:{{theme.email_bg}}" >
        <tbody>
            <tr>
                <td align="center">
                    <table  cellpadding="0" cellspacing="0" border="0">
                        <tbody>                            
                            <!-- entete -->
                            <tr class="pagetoplogo">
                                <td class="w640"  width="640">
                                    <table  class="w640"  width="640" cellpadding="0" cellspacing="0" border="0" style="background-color:{{theme.color}}">
                                        <tbody>
                                            <tr>
                                                <td class="w30"  width="30"></td>
                                                <td  class="w580"  width="580" valign="middle" align="left">
                                                        <img class="w580" style="text-decoration: none; color:#476688; font-size:30px; margin-top:10px; margin-bottom:10px; float:left" src="{{logo_src}}" alt="Mon Logo" width="{{logo_width}}" height="{{logo_height}}"/>
                                                    	<h2 style="color:white; font-size:22px; padding-top:12px; padding-left:130px">
															{{subject}}
														</h2>
                                                </td> 
                                                <td class="w30"  width="30"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- separateur horizontal -->
                            <tr>
                                <td  class="w640"  width="640" height="1" bgcolor="{{theme.color}}"></td>
                            </tr>

                             <!-- contenu -->
                            <tr class="content">
                                <td class="w640" class="w640"  width="640" bgcolor="#{{theme.email_bg}}">
                                    <table class="w640"  width="640" cellpadding="0" cellspacing="0" border="0">
                                        <tbody>
                                            <tr>
                                                <td  class="w30"  width="30"></td>
                                                <td  class="w580"  width="580">
                                                    <!-- une zone de contenu -->
                                                    <table class="w580"  width="580" cellpadding="0" cellspacing="0" border="0">
                                                        <tbody>                                                            
                                                            <tr>
                                                                <td class="w580"  width="580">
                                                                    <div align="left" class="article-content">
                                                                        {%- block content -%}{%- endblock -%}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                         
                                                        </tbody>
                                                    </table>                                                   
                                                </td>
                                                <td class="w30" class="w30"  width="30"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!--  separateur horizontal de 15px de  haut-->
                            <tr>
                                <td class="w640"  width="640" height="15" bgcolor="#ffffff"></td>
                            </tr>

                            <!-- pied de page -->
                            <tr class="pagebottom">
                                <td class="w640"  width="640">
                                    <table class="w640"  width="640" cellpadding="0" cellspacing="0" border="0">
                                        <tbody>
                                            <tr>
                                                <td colspan="5" height="10"></td>
                                            </tr>
                                            <tr>
                                                <td class="w30"  width="30"></td>
                                                <td class="w580"  width="580" valign="top">
                                                    <p align="middle" class="pagebottom-content-left">
                                                        <a style="color:#ded605;" href="/#/"><span style="color:#ded605;">Accéder au site</span></a>
                                                         - 
                                                        <a style="color:#ded605;" href="mailto:	infos@fib35.com"><span style="color:#255D5C;">Contact</span></a>
                                                    </p>
                                                </td>

                                                <td class="w30"  width="30"></td>
                                            </tr>
                                            <tr>
                                                <td colspan="5" height="10"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="w640"  width="640" height="60"></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>
