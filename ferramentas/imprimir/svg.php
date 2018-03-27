<style>
body
{margin:20px;font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 14px;width:300px}
A
{text-align:left;font-family: Verdana, Arial, Helvetica, sans-serif;color: #2F4632;}
A:hover
{color: #4142ff;font-weight: normal;font-family: Verdana, Arial, Helvetica, sans-serif;}
</style>
<body>
<?php
/*
About: Licen&ccedil;a

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
Voc&ecirc; deve ter recebido uma c&oacute;pia da Licen&ccedil;a P&uacute;blica Geral do
GNU junto com este programa; se n&atilde;o, escreva para a
Free Software Foundation, Inc., no endere&ccedil;o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
include_once (dirname(__FILE__)."/../../classesphp/sani_request.php");
$_GET = array_merge($_GET,$_POST);
$mapexten = $_GET["mapexten"];
error_reporting(0);
session_name("i3GeoPHP");
if (isset($_GET["g_sid"]))
{session_id($_GET["g_sid"]);}
session_start();
$map_file = $_SESSION["map_file"];
$postgis_mapa = $_SESSION["postgis_mapa"];
require_once (dirname(__FILE__)."/../../ms_configura.php");
include(dirname(__FILE__)."/../blacklist.php");
verificaBlFerramentas(basename(dirname(__FILE__)),$i3geoBlFerramentas,false);
//
//se as extens&otilde;es j&aacute; estiverem carregadas no PHP, vc pode comentar essa linha para que o processamento fique mais r&aacute;pido
//
include_once (dirname(__FILE__)."/../../classesphp/carrega_ext.php");
//
//carrega o phpmapscript
//
$exts = get_loaded_extensions();
if (array_search( "MapScript", $exts) != TRUE)
{
	if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
	{
		if(!@dl('php_mapscript_48.dll'))
		dl('php_mapscript.dll');
	}
	else
	{dl('php_mapscript.so');}
}
require(dirname(__FILE__)."/../../classesphp/funcoes_gerais.php");
error_reporting(0);
$nomes = nomeRandomico();

$map = ms_newMapObj($map_file);
$temp = str_replace(".map","xxx.map",$map_file);
$map->save($temp);
substituiCon($temp,$postgis_mapa);
$map = ms_newMapObj($temp);
if($map->getmetadata("interface") == "googlemaps")
{
	$proj4 = pegaProjecaoDefault("proj4");
	$map->setProjection($proj4);
	$map->set("units",MS_METERS);
	$map->preparequery();
	$map->set("scaledenom",$map->scaledenom * 100000);
}
$v = versao();

$leb = $eb->label;

if($leb->type == "MS_BITMAP"){
	$leb->set("type",MS_TRUETYPE);
	$leb->set("font","Arial");
}
//altera o nome das classes vazias
$numlayers = $map->numlayers;
for ($i=0;$i < $numlayers;$i++)
{
	$layer = $map->getlayer($i);
	if (($layer->data != "") && (strtolower($layer->getmetadata("escondido")) != "sim") && (strtolower($layer->getmetadata("tema")) != "sim"))
	{
		if ($layer->numclasses > 0)
		{
			$classe = $layer->getclass(0);
			if (($classe->name == "") || ($classe->name == " "))
			{$classe->set("name",$layer->getmetadata("tema"));}
		}
	}
	if ($layer->getmetadata("classe") == "NAO")
	{
		$nclasses = $layer->numclasses;
		if ($nclasses > 0)
		{
			for($j=0;$j<$nclasses;$j++)
			{
				$classe = $layer->getclass($j);
				$classe->set("name","classeNula");
			}
		}
	}

	$nclasses = $layer->numclasses;
	if ($nclasses > 0){
		for($j=0;$j<$nclasses;$j++){
			$classe = $layer->getclass($j);
			$leb = false;
			if($v["inteiro"] >= 60200){
				if($classe->numlabels > 0){
					$leb = $classe->getLabel(0);
				}
			}
			else{
				$leb = $classe->label;
			}
			if($leb != false && $leb->type == MS_BITMAP){
				$leb->set("type",MS_TRUETYPE);
				$leb->set("font","Arial");
			}
		}
	}
}
$map->save($temp);
removeLinha("classeNula",$temp);
$map = ms_newMapObj($temp);
substituiCon($temp,$postgis_mapa);
$o = $map->outputformat;
if($mapexten != ""){
	$ext = explode(" ",$mapexten);
	$extatual = $map->extent;
	$extatual->setextent($ext[0],$ext[1],$ext[2],$ext[3]);
}
$map->selectOutputFormat("svg");
$protocolo = explode("/",$_SERVER['SERVER_PROTOCOL']);
//mapa
$imgo = $map->draw();
if($imgo->imagepath == "")
{echo "Erro IMAGEPATH vazio";exit;}
$nomer = ($imgo->imagepath)."mapa".$nomes.".svg";
$imgo->saveImage($nomer);
$nomemapa = strtolower($protocolo[0])."://".$_SERVER['HTTP_HOST'].($imgo->imageurl).basename($nomer);
echo "<p>Utilize a op&ccedil;&atilde;o de altera&ccedil;&atilde;o das propriedades do mapa para ajustar a legenda, tamanho e outras caracter&iacute;sticas antes de gerar os arquivos.</p>";
echo "<p>Arquivos gerados:</p>";
echo "<a style=font-family:Verdana,Arial,Helvetica,sans-serif; href='$nomemapa' target=_blank >Mapa</a><br><br>";
?>
