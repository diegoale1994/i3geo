<?php
include_once(dirname(__FILE__)."/../safe.php");
verificaBlFerramentas(basename(dirname(__FILE__)),$i3geoBlFerramentas,false);
//
//faz a busca da fun&ccedil;&atilde;o que deve ser executada
//
$retorno = ""; //string que ser&aacute; retornada ao browser via JSON
switch (strtoupper($funcao))
{
/*
Valor: GRAFICOTEMA

Gera graficos automaticamente para os elementos de um tema

<Temas->graficotema>
*/
	case "GRAFICOTEMA":
		$mesmoTema = $_GET["mesmoTema"];
		include_once(dirname(__FILE__)."/../../classesphp/classe_temas.php");
		copiaSeguranca($map_file);
		$m = new Temas($map_file,$tema,$locaplic);
		if($mesmoTema == "true"){
			$mesmoTema = true;
		}
		else{
			$mesmoTema = false;
		}

		$m->graficotema($_GET["lista"],$_GET["tamanho"],$_GET["tipo"],$_GET["outlinecolor"],$_GET["offset"],$mesmoTema);
		$m->salva();
		$_SESSION["contadorsalva"]++;
		redesenhaMapa();
	break;
}
if(isset($map_file) && isset($postgis_mapa) && $map_file != ""){
	restauraCon($map_file,$postgis_mapa);
}
cpjson($retorno);
?>
