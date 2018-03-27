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
Valor: TELAREMOTA

Registra um ID para permitir o acesso ao mapa atual por outro navegador.

O ID &eacute; adicionado � string $_SESSION["fingerprint"] separado por ','

<Mapa->telaRemota>
*/
	case "TELAREMOTA":
		$codigo = nomeRandomico();
		$_SESSION["fingerprint"] .= ",".$codigo;
		$retorno = $codigo;
	break;

}
if(isset($map_file) && isset($postgis_mapa) && $map_file != ""){
	restauraCon($map_file,$postgis_mapa);
}
cpjson($retorno);
?>