<?php
/*
 Title: sistemas.php

Fun&ccedil;&otilde;es utilizadas pelo editor do cadastro de sistemas

Sistemas s&atilde;o op&ccedil;&otilde;es adicionais que pode ser inclu&iacute;das na &aacute;rvore de adi&ccedil;&atilde;o de temas do i3Geo

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

i3geo/admin/php/sistemas.php

Parametros:

O par&acirc;metro principal &eacute; "funcao", que define qual opera&ccedil;&atilde;o ser&aacute; executada, por exemplo, sistemas.php?funcao=pegasistemas.

Cada opera&ccedil;&atilde;o possu&iacute; seus pr�prios par&acirc;metros, que devem ser enviados tamb&eacute;m na requisi&ccedil;&atilde;o da opera&ccedil;&atilde;o.
*/
include_once(dirname(__FILE__)."/login.php");

$id_sistema = $_GET["id_sistema"];
$id_funcao = $_GET["id_funcao"];
$id = $_GET["id"];

testaSafeNumerico([$id_sistema,$id_funcao,$id]);

$funcoesEdicao = array(
		"ALTERARSISTEMAS",
		"ALTERARFUNCOES",
		"EXCLUIRSISTEMA",
		"EXCLUIRFUNCAO"
);
if(in_array(strtoupper($funcao),$funcoesEdicao)){
	if(verificaOperacaoSessao("admin/html/sistemas") == false){
		retornaJSON("Vc nao pode realizar essa operacao.");exit;
	}
}
error_reporting(0);
//faz a busca da fun&ccedil;&atilde;o que deve ser executada
switch (strtoupper($funcao))
{
	/*
	 Note:

	Valores que o par&acirc;metro &funcao pode receber. Os par&acirc;metros devem ser enviados na requisi&ccedil;&atilde;o em AJAX.
	*/
	/*
	 Valor: PEGASISTEMAS

	Lista de sistemas

	Retorno:

	{JSON}
	*/
	case "PEGASISTEMAS":
		retornaJSON(pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_sistemas order by nome_sistema"));
		exit;
		break;
		/*
		 Valor: PEGASISTEMA

		Dados de um sistemas

		Parametro:

		id_sistema

		Retorno:

		{JSON}
		*/
	case "PEGASISTEMA":
		retornaJSON(pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_sistemas where id_sistema='$id_sistema'"));
		exit;
		break;
		/*
		 Valor: PEGAFUNCOES

		Lista de fun&ccedil;&otilde;es de um sistema

		Parametro:

		id_sistema

		Retorno:

		{JSON}
		*/
	case "PEGAFUNCOES":
		retornaJSON(pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_sistemasf where id_sistema ='$id_sistema'"));
		exit;
		break;
		/*
		 Valor: PEGAFUNCAO

		Pega os dados de uma fun&ccedil;&atilde;o espec&iacute;fica

		Parametro:

		id_funcao

		Retorno:

		{JSON}
		*/
	case "PEGAFUNCAO":
		retornaJSON(pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_sistemasf where id_funcao ='$id_funcao'"));
		exit;
		break;
		/*
		 Valor: ALTERARSISTEMAS

		Altera os dados de um sistema

		Parametros:

		id_sistema

		perfil_sistema

		nome_sistema

		publicado_sistema

		Retorno:

		{JSON}
		*/
	case "ALTERARSISTEMAS":
		$novo = alterarSistemas();
		$sql = "SELECT * from ".$esquemaadmin."i3geoadmin_sistemas WHERE id_sistema = '".$novo."'";
		retornaJSON(pegaDados($sql));
		exit;
		break;
		/*
		 Valor: ALTERARFUNCOES

		Altera os dados de uma fun&ccedil;&atilde;o

		Parametros:

		id_sistema

		id_funcao

		perfil_funcao

		nome_funcao

		w_funcao

		h_funcao

		abrir_funcao

		Retorno:

		{JSON}
		*/
	case "ALTERARFUNCOES":
		$novo = alterarFuncoes();
		$sql = "SELECT * from ".$esquemaadmin."i3geoadmin_sistemasf WHERE id_funcao = '".$novo."'";
		retornaJSON(pegaDados($sql));
		exit;
		break;
		/*
		 Valor: EXCLUIRSISTEMA

		Exclui um sistema

		Parametros:

		id

		Retorno:

		{JSON}
		*/
	case "EXCLUIRSISTEMA":
		$tabela = "i3geoadmin_sistemas";
		$f = verificaFilhos();
		if(!$f)
		{
			retornaJSON(excluirSistemas());
			exit;
		}
		else
		{
			retornaJSON("erro");
			exit;
		}
		break;
		/*
		 Valor: EXCLUIRFUNCAO

		Exclui uma fun&ccedil;&atilde;o

		Parametros:

		id

		Retorno:

		{JSON}
		*/
	case "EXCLUIRFUNCAO":
		retornaJSON(excluirFuncoes());
		exit;
		break;

}
/*
 Altera o registro de um WS
*/
function alterarSistemas(){
	global $esquemaadmin,$id_sistema;
	try	{
		require_once("conexao.php");
		if($convUTF){
			$_GET["nome_sistema"] = utf8_encode($_GET["nome_sistema"]);
		}
		if($id_sistema != ""){
			$dataCol = array(
					"publicado_sistema" => $_GET["publicado_sistema"],
					"nome_sistema" => $_GET["nome_sistema"],
					"perfil_sistema" => $_GET["perfil_sistema"]
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_sistemas",$dataCol,"WHERE id_sistema = $id_sistema");
			$retorna = $id_sistema;
		}
		else{
			$dataCol = array(
				"publicado_sistema" => '',
				"nome_sistema" => '',
				"perfil_sistema" => ''
			);
			$retorna = i3GeoAdminInsertUnico($dbhw,"i3geoadmin_sistemas",$dataCol,"nome_sistema","id_sistema");
		}
		$dbhw = null;
		$dbh = null;
		return $retorna;
	}
	catch (PDOException $e){
		return "Error!: ";
	}
}
function alterarFuncoes(){
	global $esquemaadmin,$id_sistema,$id_funcao;
	if(empty($_GET["w_funcao"])){
		$_GET["w_funcao"] = 200;
	}
	if(empty($_GET["h_funcao"])){
		$_GET["h_funcao"] = 200;
	}
	try{
		require_once("conexao.php");
		if($convUTF){
			$_GET["nome_funcao"] = utf8_encode($_GET["nome_funcao"]);
		}
		if($id_funcao != ""){
			$dataCol = array(
				"nome_funcao" => $_GET["nome_funcao"],
				"perfil_funcao" => $_GET["perfil_funcao"],
				"w_funcao" => $_GET["w_funcao"],
				"h_funcao" => $_GET["h_funcao"],
				"abrir_funcao" => $_GET["abrir_funcao"]
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_sistemasf",$dataCol,"WHERE id_funcao = $id_funcao");
			$retorna = $id_sistema;
		}
		else{
			$dataCol = array(
				"nome_funcao" => '',
				"perfil_funcao" => '',
				"w_funcao" => '',
				"h_funcao" => '',
				"abrir_funcao" => '',
				"id_sistema" => $id_sistema
			);
			$retorna = i3GeoAdminInsertUnico($dbhw,"i3geoadmin_sistemasf",$dataCol,"nome_funcao","id_funcao");
		}
		$dbhw = null;
		$dbh = null;
		return $retorna;
	}
	catch (PDOException $e)
	{
		return "Error!: ";
	}
}
function excluirFuncoes()
{
	global $id,$esquemaadmin;
	try {
		include("conexao.php");
		$sql = "DELETE from ".$esquemaadmin."i3geoadmin_sistemasf WHERE id_funcao = $id";
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
function excluirSistemas()
{
	global $id,$esquemaadmin;
	try {
		include("conexao.php");
		$sql = "DELETE from ".$esquemaadmin."i3geoadmin_sistemas WHERE id_sistema = $id";
		$dbhw->query($sql);
		i3GeoAdminInsertLog($dbhw,$sql);
		$dbhw = null;
		$dbh = null;
		return $id;
	}
	catch (PDOException $e){
		return "Error!: ";
	}
}

?>