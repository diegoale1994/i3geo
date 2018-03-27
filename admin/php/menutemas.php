<?php
/*
Title: menutemas.php

Fun&ccedil;&otilde;es utilizadas nas opera&ccedil;&otilde;es de manuten&ccedil;&atilde;o de menus, grupo, subgrupos e temas

&Eacute; utilizado nas fun&ccedil;&otilde;es em AJAX da interface de edi&ccedil;&atilde;o da &aacute;rvore de menus para edi&ccedil;&atilde;o de cada um de seus componentes

Essas fun&ccedil;&otilde;es complementam <arvore.php>

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
Voc&ecirc; deve ter recebido uma  da Licen&ccedil;a P&uacute;blica Geral do
	GNU junto com este programa; se n&atilde;o, escreva para a
Free Software Foundation, Inc., no endere&ccedil;o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.

Arquivo:

i3geo/admin/php/menutemas.php

Parametros:

O par&acirc;metro principal &eacute; "funcao", que define qual opera&ccedil;&atilde;o ser&aacute; executada, por exemplo, menutemas.php?funcao=pegaMenus

Cada opera&ccedil;&atilde;o possu&iacute; seus proprios par&acirc;metros, que devem ser enviados tamb&eacute;m na requisi&ccedil;&atilde;o da opera&ccedil;&atilde;o.

*/
include_once(dirname(__FILE__)."/login.php");
$funcoesEdicao = array(
		"ALTERAMENUS",
		"ALTERAGRUPOS",
		"ALTERASUBGRUPOS",
		"ATUALIZAMINIATURA",
		"ALTERATEMAS",
		"ALTERATAGS",
		"ALTERAPERFIS",
		"EXCLUIRREGISTRO"
);
if(in_array(strtoupper($funcao),$funcoesEdicao)){
	if(verificaOperacaoSessao("admin/html/arvore") == false){
		retornaJSON("Vc nao pode realizar essa operacao.");exit;
	}
}

$codigo_tema = $_GET["codigo_tema"];
$id = $_GET["id"];

testaSafeNumerico([$id]);

if(!isset($funcao))
{
	$funcao = "";
}
if(!isset($idioma))
{
	$idioma = "pt";
}
if($idioma == "")
{
	$idioma = "pt";
}

//faz a busca da fun&ccedil;&atilde;o que deve ser executada
switch (strtoupper($funcao))
{
	/*
	Note:

	Valores que o par&acirc;metro &funcao pode receber. Os par&acirc;metros devem ser enviados na requisi&ccedil;&atilde;o em AJAX.
	*/

		/*
		Valor: PEGAMENUS

		Lista de menus contendo todas as colunas

		Retorno:

		{JSON}
		*/
	case "PEGAMENUS":
		if(isset($id_menu) && $id_menu != "")
		{
			$dados = pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_menus where id_menu = $id_menu order by nome_menu");
		}
		else{
			$dados = pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_menus order by nome_menu");
		}
		retornaJSON($dados);
		exit;
		break;
		/*
		Valor: PEGAMENUS2

		Lista de menus contendo apenas colunas selecionadas

		Retorno:

		{JSON}
		*/
	case "PEGAMENUS2":
		if($idioma == "pt")
		{
			$coluna = "nome_menu";
		}
		else
		{$coluna = $idioma;
		}
		if(isset($id_menu) && $id_menu != "")
		{
			$dados = pegaDados("SELECT publicado_menu,perfil_menu,aberto,desc_menu,id_menu,$coluna as nome_menu from ".$esquemaadmin."i3geoadmin_menus where id_menu = $id_menu order by nome_menu");
		}
		else
		{$dados = pegaDados("SELECT publicado_menu,perfil_menu,aberto,desc_menu,id_menu,$coluna as nome_menu from ".$esquemaadmin."i3geoadmin_menus order by nome_menu");
		}
		retornaJSON($dados);
		exit;
		break;
		/*
		Valor: PEGATAGS

		Lista de tags

		Retorno:

		{JSON}
		*/
	case "PEGATAGS":
		$sql = "SELECT * from ".$esquemaadmin."i3geoadmin_tags order by nome";
		retornaJSON(pegaDados($sql));
		exit;
		break;
		/*
		Valor: PEGATAGSPORMAPFILE

		Lista de tags por mapfile

		Retorno:

		{JSON}
		*/
	case "PEGATAGSPORMAPFILE":
		if($idioma == "pt")
		{
			$coluna = "nome_tema";
		}
		else
		{$coluna = $idioma;
		}

		$q = pegaDados("select link_tema,tags_tema,codigo_tema,$coluna as nome_tema from ".$esquemaadmin."i3geoadmin_temas");
		$temas = array();
		$temaExiste = array();
		foreach($q as $row)
		{
			$ts = html_entity_decode($row['tags_tema']);
			$i = $row['codigo_tema'];
			$nome = $row['nome_tema'];
			$link = $row['link_tema'];
			$tags = explode(" ",$ts);
			foreach($tags as $t)
			{
				if (removeAcentos($t) == $tag)
				{
					if(!isset($temaExiste[$i]))
					{
						$temas[] = array("codigoMap"=>$i,"nome"=>$nome,"link"=>$link);
						$temaExiste[$i] = 0;
					}
				}
			}
		}
		retornaJSON($temas);
		exit;
		break;
		/*
		Valor: PEGAPERFIS

		Lista de perfis

		Retorno:

		{JSON}
		*/
	case "PEGAPERFIS":
		$dados = pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_perfis order by perfil");
		if(count($dados) == 0){
			$dados = array("id_perfil"=>"","perfil"=>"");
		}
		retornaJSON($dados);
		exit;
		break;
		/*
		Valor: ALTERAMENUS

		Altera os dados de um menu

		Parametros:

		nome_menu

		desc_menu

		id_menu

		aberto

		perfil_menu

		publicado_menu

		en_menu

		es_menu

		it_menu

		Retorno:

		{JSON}
		*/
	case "ALTERAMENUS":
		$retorna = alteraMenus();
		if(isset($id_menu) && $id_menu != ""){
			retornaJSON(pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_menus where id_menu = $id_menu order by nome_menu"));
		}
		else{
			retornaJSON($retorna);
		}
		exit;
		break;
		/*
		Valor: PEGAGRUPOS

		Lista de grupos com todas as colunas

		Retorno:

		{JSON}
		*/
	case "PEGAGRUPOS":
		if(isset($id_grupo) && $id_grupo != "")
		{
			$dados = pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_grupos WHERE id_grupo = $id_grupo order by nome_grupo");
		}
		else{
			$dados = pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_grupos order by nome_grupo");
		}
		retornaJSON($dados);
		exit;
		break;
		/*
		Valor: PEGAGRUPOS2

		Lista de grupos contendo as colunas principais

		Retorno:

		{JSON}
		*/
	case "PEGAGRUPOS2":
		$nome = "nome_grupo";
		if($idioma != "pt"){
			$nome = $idioma;
		}
		$dados = pegaDados("SELECT desc_grupo,id_grupo,$nome as 'nome_grupo' from ".$esquemaadmin."i3geoadmin_grupos order by $nome");
		retornaJSON($dados);
		exit;
		break;
		/*
		Valor: ALTERAGRUPOS

		Altera os dados de um grupo

		Parametros:

		nome

		desc

		id

		en

		es

		it

		Retorno:

		{JSON}
		*/
	case "ALTERAGRUPOS":
		alteraGrupos();
		if(isset($id_grupo) && $id_grupo != "")	{
			retornaJSON(pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_grupos WHERE id_grupo = $id_grupo"));
		}
		else{
			retornaJSON("ok");
		}
		exit;
		break;
		/*
		Valor: PEGASUBGRUPOS

		Lista de subgrupos com todas as colunas

		Retorno:

		{JSON}
		*/
	case "PEGASUBGRUPOS":
		if(isset($id_subgrupo) && $id_subgrupo != ""){
			$dados = pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_subgrupos WHERE id_subgrupo = $id_subgrupo order by nome_subgrupo");
		}
		else{
			$dados = pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_subgrupos order by nome_subgrupo");
		}
		retornaJSON($dados);
		exit;
		break;
		/*
		Valor: PEGASUBGRUPOS2

		Lista de grupos contendo as colunas principais

		Retorno:

		{JSON}
		*/
	case "PEGASUBGRUPOS2":
		$nome = "nome_subgrupo";
		if($idioma != "pt"){
			$nome = $idioma;
		}
		$dados = pegaDados("SELECT desc_subgrupo,id_subgrupo,$nome as 'nome_subgrupo' from ".$esquemaadmin."i3geoadmin_subgrupos order by nome_subgrupo");
		retornaJSON($dados);
		exit;
		break;
		/*
		Valor: ALTERASUBGRUPOS

		Altera os dados de um subgrupo

		Parametros:

		nome

		desc

		id

		en

		es

		it

		Retorno:

		{JSON}
		*/
	case "ALTERASUBGRUPOS":
		alteraSubGrupos();
		if(isset($id_subgrupo) && $id_subgrupo != "")	{
			retornaJSON(pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_subgrupos WHERE id_subgrupo = $id_subgrupo"));
		}
		else{
			retornaJSON("ok");
		}
		exit;
		break;
		/*
		Valor: PEGATEMAS

		Lista de temas com todas as colunas

		Retorno:

		{JSON}
		*/
	case "PEGATEMAS":
		$sql = "SELECT * from ".$esquemaadmin."i3geoadmin_temas where id_tema = '$id_tema'";
		retornaJSON(pegaDados($sql));
		exit;
		break;
		/*
		Valor: PEGATEMAPORMAPFILE

		Lista os dados de um tema procurando registros com base no nome do mapfile

		Parametro:

		codigo_tema - nome do mapfile sem ".map"

		Retorno:

		{JSON}
		*/
	case "PEGATEMAPORMAPFILE":
		$sql = "SELECT * from ".$esquemaadmin."i3geoadmin_temas where codigo_tema = '$codigo_tema'";
		$dados = pegaDados($sql);
		if(is_array($dados) && count($dados) == 0)
		{
			registraTema();
			$dados = pegaDados($sql);
		}
		$imagem = "";
		if(file_exists($locaplic."/temas/miniaturas/".$codigo_tema.".map.grande.png"))
		{
			$imagem = $codigo_tema.".map.grande.png";
		}
		$dados[0]["imagem"] = $imagem;
		if(is_array($dados) && count($dados) > 1)
		{
			$dados = "erro. Mais de um mapfile com mesmo c�digo registrado no banco";
		}
		retornaJSON($dados);
		exit;
		break;
		/*
		Valor: PEGATEMAS2

		Lista de temas com as colunas principais

		Retorno:

		{JSON}
		*/
	case "PEGATEMAS2":
		retornaJSON(pegaTemas2());
		exit;
		break;
		/*
		Valor: ATUALIZAMINIATURA

		Atualiza as imagens das miniaturas de um tema

		Retorno:

		{JSON}
		*/
	case "ATUALIZAMINIATURA":
		retornaJSON(atualizaMiniatura($_GET["tema"]));
		exit;
		break;
		/*
		Valor: ALTERATEMAS

		Altera os dados de um tema

		Parametros:

		nome

		desc

		id

		codigo

		tipoa

		download

		ogc

		kml

		link

		tags

		kmz

		locaplic

		Retorno:

		{JSON}
		*/
	case "ALTERATEMAS":
		//$r ser&aacute; igual ao novo id criado, no caso de inser&ccedil;&atilde;o de um novo tema
		$r = alteraTemas();
		if($id == ""){
			retornaJSON($r);
		}
		else{
			retornaJSON(pegaDados("select * from ".$esquemaadmin."i3geoadmin_temas where id_tema = $id"));
		}
		exit;
		break;
		/*
		Valor: ALTERATAGS

		Altera os dados de um tag

		Parametros:

		nome

		id

		Retorno:

		{JSON}
		*/
	case "ALTERATAGS":
		$novo = alteraTags();
		$sql = "SELECT * from ".$esquemaadmin."i3geoadmin_tags WHERE id_tag = '".$novo."'";
		retornaJSON(pegaDados($sql));
		exit;
		break;
		/*
		Valor: ALTERAPERFIS

		Altera os dados de um perfil

		Parametros:

		perfil

		id

		Retorno:

		{JSON}
		*/
	case "ALTERAPERFIS":
		$novo = alteraPerfis();
		$sql = "SELECT * from ".$esquemaadmin."i3geoadmin_perfis WHERE id_perfil = '".$novo."'";
		retornaJSON(pegaDados($sql));
		exit;
		break;

	case "EXCLUIRREGISTRO":
		$tabela = $_GET["tabela"];
		if($tabela == "grupos")
		{
			$tabela = "i3geoadmin_grupos";
			$coluna = "id_grupo";
			$filhos = verificaFilhos();
			if($filhos)
			{
				retornaJSON("erro");
				exit;
			}
		}
		if($tabela == "tags")
		{
			$tabela = "i3geoadmin_tags";
			$coluna = "id_tag";
			//excluiTagTemas($id);
		}
		if($tabela == "perfis")
		{
			$tabela = "i3geoadmin_perfis";
			$coluna = "id_perfil";
			excluiPerfil($id);
		}
		if($tabela == "subgrupos")
		{
			$tabela = "i3geoadmin_subgrupos";
			$coluna = "id_subgrupo";
			$filhos = verificaFilhos();
			if($filhos)
			{
				retornaJSON("erro");
				exit;
			}
		}
		if($tabela == "temas")
		{
			$tabela = "i3geoadmin_temas";
			$coluna = "id_tema";
			$filhos = verificaFilhos();
			if($filhos)
			{
				retornaJSON("erro");
				exit;
			}
		}
		if($tabela == "menus")
		{
			$tabela = "i3geoadmin_menus";
			$coluna = "id_menu";
			$filhos = verificaFilhos();
			if($filhos){
				retornaJSON("erro");
				exit;
			}
		}
		retornaJSON(exclui($esquemaadmin.$tabela,$coluna,$id));
		exit;
		break;

	case "LISTAMAPSTEMAS":
		retornaJSON(listaMapsTemas());
		exit;
		break;
		/*
		Valor: VERIFICAORFAOS

		Verifica se existem temas sem o correspondente mapfile

		Retorno:

		{JSON}
		*/
	case "VERIFICAORFAOS":
		retornaJSON(verificaOrfaos());
		exit;
		break;
}
function excluiPerfil($id)
{
	global $esquemaadmin;
	require_once("conexao.php");
	$perfil = "";
	foreach($dbh->query("select * from ".$esquemaadmin."i3geoadmin_perfis where perfil = '$id'") as $row){
		$perfil = $row["perfil"];
	}
	if($perfil == ""){
		return;
	}
	$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_mapas");
	foreach($q as $row){
		$t = $row['perfil_mapa'];
		$i = $row['id_mapa'];
		$ts = str_replace($perfil,"",$t);
		if($t != $ts){
			$dataCol = array(
				"perfil_mapa" => $ts
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_mapas",$dataCol,"WHERE id_mapa = $i");
		}
	}
	$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_menus");
	foreach($q as $row){
		$t = $row['perfil_menu'];
		$i = $row['id_menu'];
		$ts = str_replace($perfil,"",$t);
		if($t != $ts){
			$dataCol = array(
				"perfil_menu" => $ts
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_menus",$dataCol,"WHERE id_menu = $i");
		}
	}
	$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_n1");
	foreach($q as $row){
		$t = $row['perfil_n1'];
		$i = $row['id_n1'];
		$ts = str_replace($perfil,"",$t);
		if($t != $ts){
			$dataCol = array(
				"perfil_n1" => $ts
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_n1",$dataCol,"WHERE id_n1 = $i");
		}
	}
	$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_n2");
	foreach($q as $row){
		$t = $row['perfil_n2'];
		$i = $row['id_n2'];
		$ts = str_replace($perfil,"",$t);
		if($t != $ts){
			$dataCol = array(
				"perfil_n2" => $ts
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_n2",$dataCol,"WHERE id_n2 = $i");
		}
	}
	$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_n3");
	foreach($q as $row){
		$t = $row['perfil_n3'];
		$i = $row['id_n3'];
		$ts = str_replace($perfil,"",$t);
		if($t != $ts){
			$dataCol = array(
				"perfil_n3" => $ts
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_n3",$dataCol,"WHERE id_n3 = $i");
		}
	}
	$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_raiz");
	foreach($q as $row){
		$t = $row['perfil'];
		$i = $row['id_raiz'];
		$ts = str_replace($perfil,"",$t);
		if($t != $ts){
			$dataCol = array(
				"perfil" => $ts
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_raiz",$dataCol,"WHERE id_raiz = $i");
		}
	}
	$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_sistemasf");
	foreach($q as $row){
		$t = $row['perfil_funcao'];
		$i = $row['id_funcao'];
		$ts = str_replace($perfil,"",$t);
		if($t != $ts){
			$dataCol = array(
				"perfil_funcao" => $ts
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_sistemasf",$dataCol,"WHERE id_funcao = $i");
		}
	}
}
function excluiTagTemas($id)
{
	global $esquemaadmin;
	require_once("conexao.php");
	$q1 = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_tags where id_tag = $id");
	foreach($q1 as $row){
		$nometag = $row["nome"];
	}
	if($nometag == ""){
		return;
	}
	$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_temas");
	foreach($q as $row){
		$t = $row['tags_tema'];
		$i = $row['id_tema'];
		$ts = str_replace($nometag,"",$t);
		if($t != $ts){
			$dataCol = array(
				"tags_tema" => $ts
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_temas",$dataCol,"WHERE id_tema = $i");
		}
	}
}
/*
Pega a lista de temas

Parameters:

filtro - texto para filtrar os dados
*/
function pegaTemas()
{
	global $esquemaadmin;
	try
	{
		$resultado = array();
		require_once("conexao.php");
		foreach($dbh->query("SELECT * from ".$esquemaadmin."i3geoadmin_temas order by nome_tema") as $row)
		{
			$continua = true;
			if(isset($_GET["filtro"]) && $_GET["filtro"] != "")
			{
				$continua = false;
				if ($row['codigo_tema'] == $_GET["filtro"])
				{
					$continua = true;
				}
				$testanome = mb_convert_encoding($_GET["filtro"],"UTF-8","ISO-8859-1");
				if (!stristr($row['nome_tema'],$testanome) === FALSE)
				{
					$continua = true;
				}
				if (!stristr($row['tags_tema'],$testanome) === FALSE)
				{
					$continua = true;
				}
			}
			if($row['codigo_tema'] == ""){
				$continua = true;
			}
			if ($continua)
				$resultado[] = array(
						"nome_tema"=>$row['nome_tema'],
						"codigo_tema"=>$row['codigo_tema'],
						"id_tema"=>$row['id_tema'],
						"desc_tema"=>$row['desc_tema'],
						"link_tema"=>$row['link_tema'],
						"tipoa_tema"=>$row['tipoa_tema'],
						"download_tema"=>$row['download_tema'],
						"ogc_tema"=>$row['ogc_tema'],
						"kml_tema"=>$row['kml_tema'],
						"kmz_tema"=>$row['kmz_tema'],
						"tags_tema"=>$row['tags_tema']
				);
		}
		$dbh = null;
		$dbh = null;
		return $resultado;
	}
	catch (PDOException $e)
	{
		return "Error!: ";
	}
}
function pegaTemas2()
{
	global $esquemaadmin;
	try
	{
		$resultado = array();
		require_once("conexao.php");
		foreach($dbh->query("SELECT codigo_tema,nome_tema,id_tema from ".$esquemaadmin."i3geoadmin_temas order by nome_tema") as $row)
		{
			$continua = true;
			if(isset($_GET["filtro"]) && $_GET["filtro"] != "")
			{
				$continua = false;
				if ($row['codigo_tema'] == $_GET["filtro"])
				{
					$continua = true;
				}
				$testanome = mb_convert_encoding($_GET["filtro"],"UTF-8","ISO-8859-1");
				if (!stristr($row['nome_tema'],$testanome) === FALSE)
				{
					$continua = true;
				}
			}
			if($row['codigo_tema'] == ""){
				$continua = true;
			}
			if ($continua)
				$resultado[] = array(
						"nome_tema"=>$row['nome_tema'],
						"codigo_tema"=>$row['codigo_tema'],
						"id_tema"=>$row['id_tema']
				);
		}
		$dbh = null;
		$dbh = null;
		return $resultado;
	}
	catch (PDOException $e)
	{
		return "Error!: ";
	}
}
/*
Altera o registro de um menu. Se id for vazio acrescenta o registro
*/
function alteraMenus()
{
	global $esquemaadmin,$id_menu;
	$en = $_GET["en"];
	$es = $_GET["es"];
	$it = $_GET["it"];
	try
	{
		$retorna = "";
		include("conexao.php");
		if($convUTF){
			$_GET["nome_menu"] = utf8_encode($_GET["nome_menu"]);
			$_GET["desc_menu"] = utf8_encode($_GET["desc_menu"]);
			$en = utf8_encode($en);
			$es = utf8_encode($es);
			$it = utf8_encode($it);
		}
		if($id_menu != ""){
			$dataCol = array(
				"en" => $en,
				"es" => $es,
				"it" => $it,
				"publicado_menu" => $_GET["publicado_menu"],
				"aberto" => $_GET["aberto"],
				"nome_menu" => $_GET["nome_menu"],
				"desc_menu" => $_GET["desc_menu"],
				"perfil_menu" => $_GET["perfil_menu"]
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_menus",$dataCol,"WHERE id_menu = $id_menu");
			$retorna = "ok";
		}
		else{
			$dataCol = array(
				"en" => "",
				"es" => "",
				"it" => "",
				"publicado_menu" => "",
				"aberto" => "SIM",
				"nome_menu" => "",
				"desc_menu" => "",
				"perfil_menu" => ""
			);
			$retorna = i3GeoAdminInsertUnico($dbhw,"i3geoadmin_menus",$dataCol,"nome_menu","id_menu");
		}
		$dbhw = null;
		$dbh = null;
		return $retorna;
	}
	catch (PDOException $e){
		return "Error!: ";
	}
}
function alteraPerfis(){
	global $perfil,$id,$esquemaadmin;
	try
	{
		$dbh = "";
		include("conexao.php");
		if($convUTF) $perfil = utf8_encode($perfil);
		$retorna = "";
		if($id != ""){
			$original = "";
			foreach($dbh->query("select * from ".$esquemaadmin."i3geoadmin_perfis where id_perfil = $id") as $row){
				$original = $row["perfil"];
			}
			$dataCol = array(
					"perfil" => $perfil
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_perfis",$dataCol,"WHERE id_perfil = $id");

			if($original != ""){
				$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_mapas");
				foreach($q as $row){
					$t = $row['perfil_mapa'];
					$i = $row['id_mapa'];
					$ts = str_replace($original,$perfil,$t);
					if($t != $ts){
						$dataCol = array(
							"perfil_mapa" => $ts
						);
						i3GeoAdminUpdate($dbhw,"i3geoadmin_mapas",$dataCol,"WHERE id_mapa = $i");
					}
				}
				$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_menus");
				foreach($q as $row){
					$t = $row['perfil_menu'];
					$i = $row['id_menu'];
					$ts = str_replace($original,$perfil,$t);
					if($t != $ts){
						$dataCol = array(
							"perfil_menu" => $ts
						);
						i3GeoAdminUpdate($dbhw,"i3geoadmin_menus",$dataCol,"WHERE id_menu = $i");
					}
				}
				$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_n1");
				foreach($q as $row){
					$t = $row['n1_perfil'];
					$i = $row['id_n1'];
					$ts = str_replace($original,$perfil,$t);
					if($t != $ts){
						$dataCol = array(
							"n1_perfil" => $ts
						);
						i3GeoAdminUpdate($dbhw,"i3geoadmin_n1",$dataCol,"WHERE id_n1 = $i");
					}
				}
				$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_n2");
				foreach($q as $row){
					$t = $row['n2_perfil'];
					$i = $row['id_n2'];
					$ts = str_replace($original,$perfil,$t);
					if($t != $ts){
						$dataCol = array(
							"n2_perfil" => $ts
						);
						i3GeoAdminUpdate($dbhw,"i3geoadmin_n2",$dataCol,"WHERE id_n2 = $i");
					}
				}
				$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_n3");
				foreach($q as $row){
					$t = $row['n3_perfil'];
					$i = $row['id_n3'];
					$ts = str_replace($original,$perfil,$t);
					if($t != $ts){
						$dataCol = array(
							"n3_perfil" => $ts
						);
						i3GeoAdminUpdate($dbhw,"i3geoadmin_n3",$dataCol,"WHERE id_n3 = $i");
					}
				}
				$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_raiz");
				foreach($q as $row){
					$t = $row['perfil'];
					$i = $row['id_raiz'];
					$ts = str_replace($original,$perfil,$t);
					if($t != $ts){
						$dataCol = array(
							"perfil" => $ts
						);
						i3GeoAdminUpdate($dbhw,"i3geoadmin_raiz",$dataCol,"WHERE id_raiz = $i");
					}
				}
				$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_sistemas");
				foreach($q as $row)
				{
					$t = $row['perfil_sistema'];
					$i = $row['id_sistema'];
					$ts = str_replace($original,$perfil,$t);
					if($t != $ts){
						$dataCol = array(
							"perfil_sistema" => $ts
						);
						i3GeoAdminUpdate($dbhw,"i3geoadmin_sistemas",$dataCol,"WHERE id_sistema = $i");
					}
				}
				$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_sistemasf");
				foreach($q as $row){
					$t = $row['perfil_funcao'];
					$i = $row['id_funcao'];
					$ts = str_replace($original,$perfil,$t);
					if($t != $ts){
						$dataCol = array(
							"perfil_funcao" => $ts
						);
						i3GeoAdminUpdate($dbhw,"i3geoadmin_sistemasf",$dataCol,"WHERE id_funcao = $i");
					}
				}
			}
			$retorna = $id;
		}
		else{
			$dataCol = array(
				"perfil" => $perfil
			);
			i3GeoAdminInsert($dbhw,"i3geoadmin_perfis",$dataCol);
			$id = $dbh->query("SELECT * FROM ".$esquemaadmin."i3geoadmin_perfis");
			$id = $id->fetchAll();
			$id = intval($id[count($id)-1]['id_perfil']);
			$retorna = $id;
		}
		$dbhw = null;
		$dbh = null;
		return $retorna;
	}
	catch (PDOException $e){
		return "Error!: ";
	}
}
function alteraTags(){
	global $id,$esquemaadmin;
	$nome = $_GET["nome"];
	try{
		$dbh = "";
		include("conexao.php");
		if($convUTF) $nome = utf8_encode($nome);
		$retorna = "";
		if($id != ""){
			if(!verificaDuplicados("select * from ".$esquemaadmin."i3geoadmin_tags where nome = '$nome'",$dbh)){
				$original = "";
				$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_tags where id_tag = $id");
				foreach($q as $row){
					$original = $row["nome"];
				}
				$dataCol = array(
					"nome" => $nome
				);
				i3GeoAdminUpdate($dbhw,"i3geoadmin_tags",$dataCol,"WHERE id_tag = $id");
			}
			$retorna = $id;
		}
		else{
			$dataCol = array(
				"nome" => $nome
			);
			i3GeoAdminInsert($dbhw,"i3geoadmin_tags",$dataCol);
			$id = $dbh->query("SELECT * FROM ".$esquemaadmin."i3geoadmin_tags");
			$id = $id->fetchAll();
			$id = intval($id[count($id)-1]['id_tag']);
			$retorna = $id;
		}
		$dbhw = null;
		$dbh = null;
		return $retorna;
	}
	catch (PDOException $e){
		return "Error!: ";
	}
}
/*
Altera o registro de um grupo. Se id for vazio acrescenta o registro
*/
function alteraGrupos()
{
	global $id_grupo,$esquemaadmin;
	try{
		require(dirname(__FILE__)."/conexao.php");
		if($convUTF){
			$_GET["nome_grupo"] = utf8_encode($_GET["nome_grupo"]);
			$_GET["desc_grupo"] = utf8_encode($_GET["desc_grupo"]);
			$_GET["en"] = utf8_encode($_GET["en"]);
			$_GET["es"] = utf8_encode($_GET["es"]);
			$_GET["it"] = utf8_encode($_GET["it"]);
		}
		if($id_grupo != ""){
			$dataCol = array(
				"en" => $_GET["en"],
				"es" => $_GET["es"],
				"it" => $_GET["it"],
				"nome_grupo" => $_GET["nome_grupo"],
				"desc_grupo" => $_GET["desc_grupo"]
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_grupos",$dataCol,"WHERE id_grupo = $id_grupo");
		}
		else{
			$dataCol = array(
				"nome_grupo" => $_GET["nome_grupo"],
				"desc_grupo" => "",
				"en" => "",
				"es" => "",
				"it" => ""
			);
			$id_grupo = i3GeoAdminInsertUnico($dbhw,"i3geoadmin_grupos",$dataCol,"nome_grupo","id_grupo");
		}
		$dbhw = null;
		$dbh = null;
		return $id_grupo;
	}
	catch (PDOException $e){
		return "Error!: ";
	}
}
/*
Altera o registro de um sub-grupo. Se id for vazio acrescenta o registro
*/
function alteraSubGrupos()
{
	global $id_subgrupo,$esquemaadmin;
	try{
		require(dirname(__FILE__)."/conexao.php");
		if($convUTF){
			$_GET["nome_subgrupo"] = utf8_encode($_GET["nome_subgrupo"]);
			$_GET["desc_subgrupo"] = utf8_encode($_GET["desc_subgrupo"]);
			$_GET["en"] = utf8_encode($_GET["en"]);
			$_GET["es"] = utf8_encode($_GET["es"]);
			$_GET["it"] = utf8_encode($_GET["it"]);
		}
		$retorna = "";
		if($id_subgrupo != ""){
			$dataCol = array(
					"en" => $_GET["en"],
					"es" => $_GET["es"],
					"it" => $_GET["it"],
					"nome_subgrupo" => $_GET["nome_subgrupo"],
					"desc_subgrupo" => $_GET["desc_subgrupo"]
			);
			i3GeoAdminUpdate($dbhw,"i3geoadmin_subgrupos",$dataCol,"WHERE id_subgrupo = $id_subgrupo");
		}
		else{
			$dataCol = array(
					"nome_subgrupo" => $_GET["nome_subgrupo"],
					"desc_subgrupo" => "",
					"en" => "",
					"es" => "",
					"it" => ""
			);
			$id_subgrupo = i3GeoAdminInsertUnico($dbhw,"i3geoadmin_subgrupos",$dataCol,"nome_subgrupo","id_subgrupo");
		}
		$dbhw = null;
		$dbh = null;
		return $id_subgrupo;
	}
	catch (PDOException $e)
	{
		return "Error!: ";
	}
}
/*
Registra um mapfile na tabela de temas
*/
function registraTema()
{
	global $codigo_tema,$esquemaadmin;
	try
	{
		$retorna = "ok";
		include("conexao.php");
		$sql = "SELECT * from ".$esquemaadmin."i3geoadmin_temas where codigo_tema = '$codigo_tema'";
		$dados = pegaDados($sql);
		if(count($dados) == 0){
			$dataCol = array(
				"tipoa_tema" => '',
				"nome_tema" => $codigo_tema,
				"codigo_tema" => $codigo_tema,
				"kml_tema" => 'SIM',
				"kmz_tema" => 'NAO',
				"ogc_tema" => 'SIM',
				"download_tema" => 'SIM',
				"tags_tema" => '',
				"link_tema" => '',
				"desc_tema" => ''
			);
			i3GeoAdminInsert($dbhw,"i3geoadmin_temas",$dataCol);
		}
		$dbhw = null;
		$dbh = null;
		return "ok";
	}
	catch (PDOException $e){
		return "Error!: ";
	}
}
/*
Altera o registro de um tema. Se id for vazio acrescenta o registro
*/
function alteraTemas()
{
	global $esquemaadmin,$id,$locaplic;
	//error_reporting(0);
	try{
		$retorna = "ok";
		include("conexao.php");
		$nomeo = $_GET["nome"];
		if($convUTF){
			$_GET["nome"] = utf8_encode($_GET["nome"]);
			$_GET["desc"] = utf8_encode($_GET["desc"]);
			$_GET["tags"] = utf8_encode($_GET["tags"]);
			$_GET["en"] = utf8_encode($_GET["en"]);
			$_GET["es"] = utf8_encode($_GET["es"]);
			$_GET["it"] = utf8_encode($_GET["it"]);
		}
		if($id != ""){
			$dataCol = array(
					"en" => $_GET["en"],
					"es" => $_GET["es"],
					"it" => $_GET["it"],
					"tags_tema" => $_GET["tags"],
					"link_tema" => $_GET["link"],
					"nome_tema" => $_GET["nome"],
					"desc_tema" => $_GET["desc"],
					"codigo_tema" => $_GET["codigo"],
					"tipoa_tema" => $_GET["tipoa"],
					"download_tema" => $_GET["download"],
					"ogc_tema" => $_GET["ogc"],
					"kml_tema" => $_GET["kml"]
			);
			if(isset($_GET["kmz"])){
				$dataCol["kmz_tema"] = $_GET["kmz"];
			}
			i3GeoAdminUpdate($dbhw,"i3geoadmin_temas",$dataCol,"WHERE id_tema = $id");

			$retorna = $id;
			if(!isset($_GET["kmz"])){
				$_GET["kmz"] = "nao";
			}
			$sql = "SELECT * from ".$esquemaadmin."i3geoadmin_temas where id_tema = $id";
			$q = $dbh->query($sql,PDO::FETCH_ASSOC);
			$resultado = $q->fetchAll();
			$mapfile = $resultado[0]["codigo_tema"];
			if(file_exists($locaplic."/temas/".$mapfile.".map")){
				$mapfile = $locaplic."/temas/".$mapfile.".map";
				if($mapa = @ms_newMapObj($mapfile)){
					$mapa = ms_newMapObj($mapfile);
					$numlayers = $mapa->numlayers;
					for ($i=0;$i < $numlayers;$i++){
						$layer = $mapa->getlayer($i);
						$layer->setmetadata("permitedownload",strtolower($_GET["download"]));
						$layer->setmetadata("download",strtolower($_GET["download"]));
						$layer->setmetadata("permiteogc",strtolower($_GET["ogc"]));
						$layer->setmetadata("permitekml",strtolower($_GET["kml"]));
						$layer->setmetadata("permitekmz",strtolower($_GET["kmz"]));
						//zera os metadados do sistema METAESTAT
						if($_GET["tipoa"] != "META"){
							$layer->setmetadata("METAESTAT_CODIGO_TIPO_REGIAO","");
							$layer->setmetadata("METAESTAT_ID_MEDIDA_VARIAVEL","");
							$layer->setmetadata("metaestat","");
						}
						if(count($_GET["nomes"]) == 1){
							$layer->setmetadata("tema",$nomeo);
						}
					}
					$mapa->save($mapfile);
					removeCabecalho($mapfile);
				}
			}
		}
		else{
			$dataCol = array(
				"en" => "",
				"es" => "",
				"it" => "",
				"tags_tema" => "",
				"link_tema" => "",
				"nome_tema" => "",
				"desc_tema" => "",
				"codigo_tema" => "",
				"tipoa_tema" => "",
				"download_tema" => "",
				"ogc_tema" => "",
				"kml_tema" => ""
			);
			if(isset($kmz)){
				$dataCol["kmz_tema"] = "";
			}
			$retorna = i3GeoAdminInsertUnico($dbhw,"i3geoadmin_temas",$dataCol,"nome_tema","id_tema");
		}
		//verifica se &eacute; necess&aacute;rio adicionar algum tag novo
		$_GET["tags"] = explode(" ",$_GET["tags"]);

		foreach($_GET["tags"] as $tag){
			if(!(verificaDuplicados("select * from ".$esquemaadmin."i3geoadmin_tags where nome = '$tag'",$dbh))){
				$dataCol = array(
					"nome" => $tag
				);
				i3GeoAdminInsert($dbhw,"i3geoadmin_tags",$dataCol);
			}
		}
		$dbhw = null;
		$dbh = null;
		return $retorna;
	}
	catch (PDOException $e){
		return "Error!: ";
	}
}
/*
Retorna a lista de mapfiles do diretorio i3geo/temas

*/
function listaMapsTemas()
{
	global $locaplic,$esquemaadmin;
	$arquivos = array();
	if (is_dir($locaplic."/temas"))
	{
		if ($dh = opendir($locaplic."/temas"))
		{
			$extensao = "";
			while (($file = readdir($dh)) !== false)
			{
				$extensao = "";
				if(!stristr($file, '.map') === FALSE){
					$extensao = "map";
				}
				if(!stristr($file, '.php') === FALSE){
					//$extensao = "php";
				}
				if(!stristr($file, '.gvp') === FALSE){
					$extensao = "gvp";
				}
				if($extensao != "")
				{
					$file = str_replace(".".$extensao,"",$file);
					if(isset($_GET["letra"]) && $_GET["letra"] != "")
					{
						if(strtolower(substr(basename($file),0,strlen($_GET["letra"]))) == strtolower($_GET["letra"])){
							$arquivos[] = array("nome"=>$file,"extensao"=>$extensao);
						}
					}
					else
					{$arquivos[] = array("nome"=>$file,"extensao"=>$extensao);
					}
				}
				$extensao = "";
			}
		}
		closedir($dh);
	}
	sort($arquivos);
	//
	//pega o nome de cada tema filtrando a listagem se for o caso
	//
	$sql = "select * from ".$esquemaadmin."i3geoadmin_temas ";
	$filtro = $_GET["filtro"];
	if(isset($filtro) && $filtro != ""){
		$filtro = explode(",",$filtro);
		$filtro = $filtro[0]." ".$filtro[1]." '".$filtro[2]."' or ".$filtro[0]." ".$filtro[1]." '".strtoupper($filtro[2])."'";
		$sql .= "where $filtro";
	}
	$dbh = "";
	include($locaplic."/admin/php/conexao.php");
	$q = $dbh->query($sql,PDO::FETCH_ASSOC);
	$regs = $q->fetchAll();
	//pega os grupos de usuarios que podem acessar o tema
	$grpids = array();
	$sql = "select nome,descricao,a.id_grupo,id_tema from ".$esquemaadmin."i3geousr_grupotema as a,".$esquemaadmin."i3geousr_grupos as b where a.id_grupo = b.id_grupo";
	$q = $dbh->query($sql,PDO::FETCH_ASSOC);
	if($q){
		$gs = $q->fetchAll();
		//agrupa o array
		foreach($gps as $g){
			array_push($grpids[$g["id_tema"]],array("id_grupo"=>$g["id_grupo"],"nome"=>$g["nome"],"descricao"=>$g["descricao"]));
		}
	}
	$nomes = array();
	$ids = array();
	foreach($regs as $reg){
		$nomes[$reg["codigo_tema"]] = $reg["nome_tema"];
		$ids[$reg["codigo_tema"]] = $reg["id_tema"];
	}
	$lista = array();
	foreach($arquivos as $arq){
		$extensao = $arq["extensao"];
		$arq = $arq["nome"];
		$nT = explode(".",$arq);
		$n = $nomes[$nT[0]];
		if(!$n){
			$n = "";
		}
		$id = $ids[$nT[0]];
		if(!$id){
			$id = "";
		}
		//pega os grupos de usuarios
		$grupousr = $grpids[$id];
		if(!$grupousr){
			$grupousr = "";
		}
		$imagem = "";
		if(file_exists($locaplic."/temas/miniaturas/".$arq.".map.mini.png")){
			$imagem = $arq.".map.mini.png";
		}
		if($_GET["checaNomes"] == "true"){
			if($extensao == "map"){
				if(file_exists($locaplic."/temas/".$arq.".map")){
					$handle = fopen($locaplic."/temas/".$arq.".map", "r");
					while (!feof($handle)){
						$linha = fgets($handle);
						if(stripos($linha,"'TEMA'") !== false || stripos($linha,'"TEMA"') !== false){
							$ntema = str_replace(array("'TEMA'",'"TEMA"',"'tema'",'"tema"'),"",$linha);
							$ntema = trim(str_replace(array("'",'"'),"",$ntema));
							if($n != $ntema && $n != utf8_encode($ntema) && $n != ""){
								$n .= "<span style=color:red;margin-left:5px >".utf8_encode($ntema)."</span>";
							}
							break;
						}
					}
					fclose($handle);
				}
			}
		}
		if($_GET["checaNames"] == "true"){
			if($extensao == "map"){
				if(file_exists($locaplic."/temas/".$arq.".map")){
					$handle = fopen($locaplic."/temas/".$arq.".map", "r");
					//deve buscar dentro de LAYER pois pode haver simbolos antes
					$elayer = false;
					while (!feof($handle)){
						$linha = trim(fgets($handle));
						if(stripos($linha,"LAYER") === 0){
							$elayer = true;
						}
						if($elayer == true && stripos($linha,"NAME") === 0){
							$ntema = ltrim($linha,"NAMEname");
							$ntema = trim(str_replace(array("'",'"'),"",$ntema));
							if($arq != $ntema){
								$n .= "<img style='margin-left:3px;' src='../imagens/face-sad.png' title='Nome do LAYER diferente do nome do arquivo' />";
							}
							break;
						}
					}
					fclose($handle);
				}
			}
		}
		if(isset($filtro) && $filtro != "" && $n != ""){
			$lista[] = array("grupousr"=>$grupousr,"id_tema"=>$id,"nome"=>$n,"codigo"=>$arq,"imagem"=>$imagem,"extensao"=>$extensao);
		}
		if(!isset($filtro) || $filtro == ""){
			$lista[] = array("grupousr"=>$grupousr,"id_tema"=>$id,"nome"=>$n,"codigo"=>$arq,"imagem"=>$imagem,"extensao"=>$extensao);
		}
	}

	return $lista;
}
/*
Retorna a lista de temas sem mapfiles

*/
function verificaOrfaos()
{
	global $locaplic,$esquemaadmin;
	$arquivos = array();
	//
	//pega o nome de cada tema
	//
	$sql = "select nome_tema,codigo_tema,id_tema from ".$esquemaadmin."i3geoadmin_temas ";
	$dbh = "";
	include($locaplic."/admin/php/conexao.php");
	$q = $dbh->query($sql,PDO::FETCH_ASSOC);
	$regs = $q->fetchAll();
	$nomes = array();
	foreach($regs as $reg){
		if(!file_exists($locaplic."/temas/".$reg["codigo_tema"].".map") && !file_exists($locaplic."/temas/".$reg["codigo_tema"].".php")){
			$nomes[] = array("nome_tema"=>$reg["nome_tema"],"codigo_tema"=>$reg["codigo_tema"],"id_tema"=>$reg["id_tema"]);
		}
	}
	sort($nomes);
	return $nomes;
}
function removeCabecalho($arq,$symbolset=true)
{
	$handle = fopen($arq, "r");
	if ($handle)
	{
		$cabeca = array();
		if($symbolset)
		{
			$cabeca[] = "MAP\n";
		}
		$grava = false;
		while (!feof($handle))
		{
			$linha = fgets($handle);
			if($symbolset)
			{
				if(strpos(strtoupper($linha),"SYMBOLSET") !== false)
				{
					$cabeca[] = $linha;
				}
				if(strpos(strtoupper($linha),"FONTSET") !== false)
				{
					$cabeca[] = $linha;
				}
			}
			if(strtoupper(trim($linha)) == "LAYER")
			{
				$grava = true;
			}
			if($grava)
			{
				$final[] = rtrim($linha, "\r\n") . PHP_EOL;
			}
		}
		fclose($handle);
	}
	$final = array_merge($cabeca,$final);
	$handle = fopen($arq, "w+");
	foreach ($final as $f)
	{
		//
		//remove resultados em branco
		//e grava a linha
		//
		$teste = strtoupper($f);
		$teste = trim($teste);
		$teste = str_replace(" ","",$teste);
		$teste = str_replace("'","",$teste);
		$teste = str_replace('"',"",$teste);
		$teste = preg_replace('/[\n\r\t ]*/', '', $teste);
		$testar = array("KEYIMAGE","TILEINDEX","TILEITEM","SYMBOL","LABELITEM","FILTERITEM","GROUP","ENCODING","TIP","CLASSE","ITENSDESC","CLASSESNOME","ITENSLINK","ESCALA","CLASSESSIMBOLO","MENSAGEM","EXTENSAO","CLASSESITEM","ESCONDIDO","CLASSESCOR","DOWNLOAD","CLASSESTAMANHO","ITENS","TEMA","APLICAEXTENSAO","IDENTIFICA");
		$passou = true;
		foreach ($testar as $t){
			if($teste == $t){
				$passou = false;
			}
		}
		if($passou){
			fwrite($handle,$f);
		}
	}
	fclose($handle);
	chmod($arq, 0666);
}
function atualizaMiniatura(){
	global $locaplic;
	$tipo = "foo";
	include_once(dirname(__FILE__)."/../../classesphp/funcoes_gerais.php");
	require(dirname(__FILE__)."/../../geraminiatura.php");
	verificaMiniatura($_GET["tema"],"todos",true);
	return "ok";
}
?>
