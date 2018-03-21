<?php
/*
Title: rsscomentariostemas

Monta um arquivo XML no padr&atilde;o RSS contendo os coment&aacute;rios postados para os temas cadastrados.

<http://localhost/i3geo/admin/rsscomentariostemas.php>

Parametros:

id_tema {numeric} - (opcional) id do tema para mostrar apenas os coment&aacute;rios de um tema

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist&eacute;rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@gmail.com

Este programa &eacute; software livre; voc&ecirc; pode redistribu&iacute;-lo
e/ou modific&aacute;-lo sob os termos da Licen&ccedil;a P&uacute;blica Geral
GNU conforme publicada pela Free Software Foundation;

Este programa &eacute; distribu&iacute;do na expectativa de que seja &uacute;til,
por&eacute;m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl&iacute;cita
de COMERCIABILIDADE OU ADEQUA&Ccedil;&Atilde;O A UMA FINALIDADE ESPEC&Iacute;FICA.
Consulte a Licen&ccedil;a P&uacute;blica Geral do GNU para mais detalhes.
Voc&ecirc; deve ter recebido uma c�pia da Licen&ccedil;a P&uacute;blica Geral do
GNU junto com este programa; se n&atilde;o, escreva para a
Free Software Foundation, Inc., no endere&ccedil;o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.

Arquivo:

i3geo/admin/rsscomentariostemas.php
*/

error_reporting(0);
if(!isset($locaplic)){
	include(dirname(__FILE__)."/../ms_configura.php");
}
include_once(dirname(__FILE__)."/../classesphp/sani_request.php");
$parametros = array_merge($_POST,$_GET);
include_once($locaplic."/admin/php/xml.php");

if(empty($parametros["id_tema"])){
	$parametros["id_tema"] = "";
}
echo header("Content-type: application/xml");
echo geraRSScomentariosTemas($locaplic,$parametros["id_tema"]);
?>
