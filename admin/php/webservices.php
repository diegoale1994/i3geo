<?php
/*
 Title: webservices.php

Fun&ccedil;&otilde;es utilizadas pelo editor do cadastro de Web Services

&Eacute; utilizado nas fun&ccedil;&otilde;es em AJAX da interface de edi&ccedil;&atilde;o

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

i3geo/admin/php/webservices.php

Parametros:

O par&acirc;metro principal &eacute; "funcao", que define qual opera&ccedil;&atilde;o ser&aacute; executada, por exemplo, webservices.php?funcao=pegaws

Cada opera&ccedil;&atilde;o possu&iacute; seus pr�prios par&acirc;metros, que devem ser enviados tamb&eacute;m na requisi&ccedil;&atilde;o da opera&ccedil;&atilde;o.

*/
error_reporting(0);

//a funcao PEGAWS pode ser executada por outros programas

$funcoesEdicao = array(
		"ALTERARWS",
		"EXCLUIR"
);
if(in_array(strtoupper($funcao),$funcoesEdicao)){
	include_once(dirname(__FILE__)."/login.php");
	$id_ws = $_GET["id_ws"];
	$id = $_GET["id"];
	testaSafeNumerico([$id,$id_ws]);
	if(verificaOperacaoSessao("admin/html/webservices") == false){
		retornaJSON("Vc nao pode realizar essa operacao.");exit;
	}
}
//faz a busca da fun&ccedil;&atilde;o que deve ser executada
switch (strtoupper($funcao))
{
	/*
	 Note:

	Valores que o par&acirc;metro &funcao pode receber. Os par&acirc;metros devem ser enviados na requisi&ccedil;&atilde;o em AJAX.
	*/
	/*
	 Valor: PEGAWS

	Lista de servi&ccedil;os cadastrados

	Retorno:

	{JSON}
	*/
	case "PEGAWS":
		if(isset($tipows) && $tipows != "")	{
			$sql = "SELECT id_ws,nome_ws,tipo_ws from ".$esquemaadmin."i3geoadmin_ws where tipo_ws = '".strtoupper($_GET["tipows"])."' order by tipo_ws,nome_ws ";
		}
		else{
			$sql = "SELECT id_ws,nome_ws,tipo_ws from ".$esquemaadmin."i3geoadmin_ws order by tipo_ws,nome_ws";
		}
		retornaJSON(pegaDados($sql));
		exit;
		break;
		/*
		 Valor: PEGADADOS

		Dados de um servico

		Parametro:

		id_ws {string}

		Retorno:

		{JSON}
		*/
	case "PEGADADOS":
		retornaJSON(pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_ws where id_ws='$id_ws'"));
		exit;
		break;
		/*
		 Valor: ALTERARWS

		Altera um registro

		Parametros:

		id_ws

		desc_ws

		nome_ws

		link_ws

		autor_ws

		tipo_ws

		Retorno:

		{JSON}
		*/
	case "ALTERARWS":
		$novo = alterarWS();
		$sql = "SELECT * from ".$esquemaadmin."i3geoadmin_ws WHERE id_ws = '".$novo."'";
		retornaJSON(pegaDados($sql));
		exit;
		break;
		/*
		 Valor: EXCLUIR

		Exclui um registro

		Parametro:

		id {string}

		Retorno:

		{JSON}
		*/
	case "EXCLUIR":
		retornaJSON(excluirWS());
		exit;
		break;

}
/*
 Altera o registro de um WS
*/
function alterarWS(){
	global $esquemaadmin,$id_ws;
	$desc_ws = $_GET["desc_ws"];
	$nome_ws = $_GET["nome_ws"];
	$link_ws = $_GET["link_ws"];
	$autor_ws = $_GET["autor_ws"];
	$tipo_ws = $_GET["tipo_ws"];
	try{
		require_once("conexao.php");
		if($convUTF){
			$nome_ws = utf8_encode($nome_ws);
			$desc_ws = utf8_encode($desc_ws);
			$autor_ws = utf8_encode($autor_ws);
		}
		if($id_ws != ""){
			$dataCol = array(
				"desc_ws" => $desc_ws,
				"nome_ws" => $nome_ws,
				"link_ws" => $link_ws,
				"autor_ws" => $autor_ws,
				"tipo_ws" => $tipo_ws
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_ws",$dataCol,"WHERE id_ws = $id_ws");
			$retorna = $id_ws;
		}
		else{
			$dataCol = array(
				"desc_ws" => '',
				"nome_ws" => '',
				"link_ws" => '',
				"autor_ws" => '',
				"tipo_ws" => '',
				"nacessos" => 0,
				"nacessosok" => 0
			);
			$retorna = i3GeoAdminInsertUnico($dbhw,"i3geoadmin_ws",$dataCol,"nome_ws","id_ws");
		}
		$dbhw = null;
		$dbh = null;
		return $retorna;
	}
	catch (PDOException $e){
		return "Error!: ";
	}
}
function excluirWS(){
	global $id,$esquemaadmin;
	try{
		include("conexao.php");
		$sql = "DELETE from ".$esquemaadmin."i3geoadmin_ws WHERE id_ws = $id";
		$dbhw->query($sql);
		i3GeoAdminInsertLog($dbhw,$sql);
		$dbhw = null;
		$dbh = null;
		return "ok";
	}
	catch (PDOException $e){
		return "Error!: ";
	}
}
function adicionaAcesso($id_ws,$sucesso){
	global $esquemaadmin;
	try	{
		if($id_ws == ""){
			return;
		}
		include("conexao.php");
		$dados = pegaDados("select * from ".$esquemaadmin."i3geoadmin_ws WHERE id_ws = $id_ws");
		if(count($dados) == 0){
			return;
		};
		if($dados[0]["nacessos"] == ""){
			$dados[0]["nacessos"] = 0;
		}
		$acessos = $dados[0]["nacessos"] + 1;

		if($sucesso)
			$ok = $dados[0]["nacessosok"] + 1;
		else
			$ok = $dados[0]["nacessosok"];

		if($ok == ""){
			$ok = 0;
		}
		$dataCol = array(
			"nacessos" => $acessos,
			"nacessosok" => $ok
		);
		i3GeoAdminUpdate($dbhw,"i3geoadmin_ws",$dataCol,"WHERE id_ws = $id_ws");
		$dbhw = null;
		$dbh = null;
	}
	catch (PDOException $e){
		return "Error!: ";
	}
}
?>