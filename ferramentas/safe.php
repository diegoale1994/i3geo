<?php
include_once (dirname(__FILE__)."/../classesphp/sani_request.php");
$_GET = array_merge($_GET,$_POST);
if(!empty($_GET["g_sid"])){
	$g_sid = $_GET["g_sid"];
	session_name("i3GeoPHP");
	session_id($g_sid);
	session_start();
	$statusFerramentas = $_SESSION["statusFerramentas"];
	$imgurl = $_SESSION["imgurl"];
	$tmpurl = $_SESSION["tmpurl"];
	$map_file = $_SESSION["map_file"];
	$mapext = $_SESSION["mapext"];
	$locaplic = $_SESSION["locaplic"];
	$mapext = $_SESSION["mapext"];
	$ler_extensoes = $_SESSION["ler_extensoes"];
	$perfil = $_SESSION["perfil"];
	$interface = $_SESSION["interface"];
	$kmlurl = $_SESSION["kmlurl"];
	$mapdir = $_SESSION["mapdir"];
	$imgdir = $_SESSION["imgdir"];
	$contadorsalva = $_SESSION["contadorsalva"];
	$fingerprint = $_SESSION['fingerprint'];
}
else{
	$g_sid = "";
}
//variaveis mais utilizadas
$tema = $_GET["tema"];
$ext = $_GET["ext"];
$funcao = $_GET["funcao"];

include_once(dirname(__FILE__)."/../classesphp/funcoes_gerais.php");

if(isset($fingerprint) && !empty($g_sid))	{
	$f = explode(",",$fingerprint);
	if($f[0] != md5('I3GEOSEC' . $_SERVER['HTTP_USER_AGENT'] . session_id())){
		cpjson(". Tentativa de acesso nao permitida. Inicie um novo mapa.");
		return;
	}
}
include_once(dirname(__FILE__)."/../ms_configura.php");
include_once(dirname(__FILE__)."/blacklist.php");
include_once(dirname(__FILE__)."/../classesphp/classe_vermultilayer.php");
include_once(dirname(__FILE__)."/../classesphp/classe_estatistica.php");

if(isset($logExec) && $logExec["ferramentas"] == true){
	i3GeoLog("prog: ferramentas url: ".implode("&",array_merge($_GET,$_POST)),$_SESSION["dir_tmp"]);
}

//
//substitui a string de conex&atilde;o
//
if(!substituiCon($map_file,$postgis_mapa)){
	unlink($map_file);
	cpjson("erro",$cp);
	return;
}
//
function redesenhaMapa()
{
	global $map_file,$tipoimagem,$cp,$postgis_mapa,$utilizacgi,$locmapserv,$interface,$mapexten;
	substituiCon($map_file,$postgis_mapa);
	if($tipoimagem != "nenhum" && $tipoimagem != "")
	{$utilizacgi = "nao";}
	if (connection_aborted()){exit();}
	if($interface == "googleearth" && $mapexten != ""){
		include_once(dirname(__FILE__)."/../classesphp/classe_navegacao.php");
		$m = new Navegacao($map_file);
		$m->mudaExtensao($mapexten);
		$m->salva();
	}
	include_once(dirname(__FILE__)."/../classesphp/classe_mapa.php");
	$m = New Mapa($map_file);
	$par = $m->parametrosTemas();
	//
	//na interface googlemaps n&atilde;o &eacute; necess&aacute;rio gerar a imagem
	//
	$e = $m->mapa->extent;
	$ext = $e->minx." ".$e->miny." ".$e->maxx." ".$e->maxy;
	$res["mapimagem"] = "";
	$res["mapexten"] = $ext;
	$res["mapres"] = "";
	$res["erro"] = "";
	$res["mapscale"] = "";
	$res["pixelsize"] = "";
	$res["mapimagem"] = "";
	$res["w"] = $m->mapa->width;
	$res["h"] = $m->mapa->height;
	$res["mappath"] = "";
	$res["mapurl"] = "";
	$res["mensagens"] = $m->pegaMensagens();
	$res["tempo"] = microtime(1) - $tempo;
	restauraCon($map_file,$postgis_mapa);
	ob_clean();
	if ($par == "")
	{$retorno = "erro";}
	else
	{$retorno = array("variaveis"=>$res,"temas"=>$par);}
	cpjson($retorno);
}
?>