<?php
/*
Title: editormapfile.php

Fun&ccedil;&otilde;es utilizadas pelo editor de arquivos mapfile.

&Eacute; utilizado nas fun&ccedil;&otilde;es em AJAX da interface de edi&ccedil;&atilde;o de mapfiles

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
Voc&ecirc; deve ter recebido uma copia da Licen&ccedil;a P&uacute;blica Geral do
	GNU junto com este programa; se n&atilde;o, escreva para a
Free Software Foundation, Inc., no endere&ccedil;o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.

Arquivo:

i3geo/admin/php/editormapfile.php

Parametros:

O par&acirc;metro principal &eacute; "funcao", que define qual opera&ccedil;&atilde;o ser&aacute; executada, por exemplo, editormapfile.php?funcao=pegaMapfiles

Cada opera&ccedil;&atilde;o possu&iacute; seus proprios par&acirc;metros, que devem ser enviados tamb&eacute;m na requisi&ccedil;&atilde;o da opera&ccedil;&atilde;o.

*/
include_once(dirname(__FILE__)."/login.php");

$id = $_GET["id"];

testaSafeNumerico([$id]);

$codigoMap = $_GET["codigoMap"];
$codigomap = $_GET["codigomap"];
$codigoLayer = $_GET["codigoLayer"];
$nomelayer = $_GET["nomelayer"];
$movimento = $_GET["movimento"];

$funcoesEdicao = array(
		"CRIARNOVOMAP",
		"EDITASIMBOLO",
		"LIMPARCACHEMAPFILE",
		"EXCLUIRMAPFILE",
		"REFAZERLAYER",
		"CLONARMAPFILE",
		"CRIARNOVOLAYER",
		"EXCLUIRLAYER",
		"AUTOCLASSESLAYER",
		"CRIARNOVACLASSE",
		"EXCLUIRCLASSE",
		"CRIARNOVOESTILO",
		"EXCLUIRESTILO",
		"ALTERARESTILO",
		"ALTERARCONEXAO",
		"ALTERARTITULO",
		"ALTERARNOMETEMA",
		"ALTERARDISPO",
		"ALTERARCOMPORT",
		"ALTERARMETADADOS",
		"ALTERARGERAL",
		"ALTERARCLASSEGERAL",
		"ALTERARCLASSELABEL",
		"DOWNLOADGVP",
		"ALTERAREDITAVEL",
		"PEGAPLUGIN",
		"GRAVAPLUGIN",
		"REMOVEPLUGIN",
		"DOWNLOADGVP"
);
if(in_array(strtoupper($funcao),$funcoesEdicao)){
	if(verificaOperacaoSessao("admin/html/editormapfile") == false){
		retornaJSON("Vc nao pode realizar essa operacao.");exit;
	}
}
if(in_array(strtoupper($funcao),$funcoesEdicao)){
	$f = @fopen("$locaplic/temas/teste.txt",w);
	@fclose($f);
	if (!file_exists("$locaplic/temas/teste.txt")){
		retornaJSON("sem direito de escrita na pasta temas");exit;
	}
	if(verificaOperacaoSessao("admin/html/editormapfile") == false){
		retornaJSON("Vc nao pode realizar essa operacao.");exit;
	}
	unlink("$locaplic/temas/teste.txt");
}
error_reporting(0);
//define o parametro de output do resultado da funcao
//algumas funcoes podem ser inseridas com include em outros programas
//nesse caso, defina output como "retorno"
//caso contrario sera definido como json
if(empty($_GET["output"])){
	$output = "json";
} else {
	$output = $_GET["output"];
}
//faz a busca da fun&ccedil;&atilde;o que deve ser executada
switch (strtoupper($funcao))
{
	/*
	Note:

	Valores que o par&acirc;metro &funcao pode receber. Os par&acirc;metros devem ser enviados na requisi&ccedil;&atilde;o em AJAX.
	*/
	/*
	Valor: CRIARNOVOMAP

	Cria um novo mapfile

	Parametros:

	nome - t&iacute;tulo do novo tema

	codigo - texto que ser&aacute; usado como nome do arquivo mapfile

	it - {opcional} t&iacute;tulo em italiano

	en - {opcional} t&iacute;tulo em ingl&ecirc;s

	es - {opcional} t&iacute;tulo em espanhol

	Retorno:

	{JSON}
	*/
	case "CRIARNOVOMAP":
		$resultado = criarNovoMap();
		if($output == "retorno"){
			return $resultado;
		}else{
			retornaJSON($resultado);
			exit;
		}
	break;
	case "PEGAPLUGIN":
		$mapfile = $locaplic."/temas/".$codigoMap.".map";
		$mapa = ms_newMapObj($mapfile);
		$layer = $mapa->getlayerbyname($codigoLayer);
		retornaJSON($layer->getmetadata("PLUGINI3GEO"));
	break;
	case "GRAVAPLUGIN":
		$mapfile = $locaplic."/temas/".$codigoMap.".map";
		$mapa = ms_newMapObj($mapfile);
		$layer = $mapa->getlayerbyname($codigoLayer);
		$layer->setmetadata("PLUGINI3GEO",$_GET["plugin"]);
		$mapa->save($mapfile);
		removeCabecalho($mapfile);
		retornaJSON("ok");
	break;
	case "REMOVEPLUGIN":
		$mapfile = $locaplic."/temas/".$codigoMap.".map";
		$mapa = ms_newMapObj($mapfile);
		$layer = $mapa->getlayerbyname($codigoLayer);
		$layer->setmetadata("PLUGINI3GEO","");
		$mapa->save($mapfile);
		removeCabecalho($mapfile);
		retornaJSON("ok");
		break;
	case "DOWNLOADGVP":
		if(file_exists($locaplic."/temas/".$codigoMap.".gvp")){
			ob_end_clean();
			header('Content-type: application/octet-stream');
			header('Content-Disposition: attachment; filename='.$codigoMap.'.gvp');
			echo file_get_contents($locaplic."/temas/".$codigoMap.".gvp");
		}
		else{
			echo "Arquivo nao encontrado";
		}
		exit;
	break;
	/*
	Valor: EDITASIMBOLO

	Lista os s&iacute;mbolos de um determinado tipo

	Parametros:

	tipo {string} - tipo de layer

	onclick {string} - fun&ccedil;&atilde;o javascript que ser&aacute; executada ao se clicar no s&iacute;mbilo

	Retorno:

	{JSON}
	*/
	case "EDITASIMBOLO":
		include_once(dirname(__FILE__)."/../../classesphp/classe_legenda.php");
		$versao = versao();
		$versao = $versao["principal"];
		if($base == "" || !isset($base)){
			$base = "";
			if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
			{
				$base = $locaplic."/aplicmap/geral1windowsv".$versao.".map";
			}
			else
			{
				if($base == "" && file_exists('/var/www/i3geo/aplicmap/geral1debianv'.$versao.'.map')){
					$base = "/var/www/i3geo/aplicmap/geral1debianv".$versao.".map";
				}
				if($base == "" && file_exists('/var/www/html/i3geo/aplicmap/geral1fedorav'.$versao.'.map')){
					$base = "/var/www/html/i3geo/aplicmap/geral1fedorav".$versao.".map";
				}
				if($base == "" && file_exists('/opt/www/html/i3geo/aplicmap/geral1fedorav'.$versao.'.map')){
					$base = "/opt/www/html/i3geo/aplicmap/geral1v".$versao.".map";
				}
				if($base == "")
				{
					$base = $locaplic."/aplicmap/geral1v".$versao.".map";
				}
			}
		}
		else{
			if(!file_exists($base))
			{
				$base = $locaplic."/aplicmap/".$base;
			}
		}
		$base = str_replace(".map","",$base).".map";
		$m = new Legenda($base,$locaplic);
		retornaJSON($m->listaSimbolos($tipo,$dir_tmp,"",$_GET["onclick"],8,1,true));
		exit;
		break;
		/*
		Valor: PEGALAYERS

		Lista os layers existentes em um mapfile

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		Retorno:

		{JSON}
		*/
	case "PEGALAYERS":
		retornaJSON(pegaLayers());
		exit;
		break;
		/*
		Valor: PEGAITENSLAYER

		Lista os itens da tabela de atributos de um layer

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		Retorno:

		{JSON}
		*/
	case "PEGAITENSLAYER":
		retornaJSON(pegaItensLayer());
		exit;
		break;
		/*
		Valor: LIMPARCACHEMAPFILE

		Apaga o diretorio contendo o cache de um tema (mapfile)

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		Retorno:

		{JSON}
		*/
	case "LIMPARCACHEMAPFILE":
		error_reporting(0);
		$mapfile = $locaplic."/temas/".$codigoMap.".map";
		$mapa = ms_newMapObj($mapfile);
		$nomes = $mapa->getalllayernames();
		if($cachedir != ""){
			$d = $cachedir;
		}
		else{
			$d = $dir_tmp."/cache";
		}
		foreach($nomes as $nome)
		{
			$dirs[] = $d."/".$nome;
			$dirs[] = $d."/googlemaps/".$nome;
			foreach($dirs as $dir){
				rrmdir($dir);
			}
		}
		retornaJSON("ok");
		exit;
		break;
		/*
		Valor: EXCLUIRMAPFILE

		Exclui um mapfile.

		So &eacute; poss&iacute;vel excluir se o mapfile n&atilde;o estiver vinculado a nenhum tema ou no da &aacute;rvore de temas

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		Retorno:

		{JSON}
		*/
	case "EXCLUIRMAPFILE":
		//pega oid do tema
		$dados = pegaDados("SELECT id_tema from ".$esquemaadmin."i3geoadmin_temas WHERE codigo_tema = '".$codigoMap."'");
		if(count($dados) > 0){
			$id = $dados[0]["id_tema"];
		}
		else{
			$id = "";
			$f = "";
		}
		$tabela = "mapfiles";
		$coluna = "id_tema";
		if($id != ""){
			$f = verificaFilhos();
		}
		if($f && $f != ""){
			retornaJSON("erro");
			exit;
		}
		else{
			if(file_exists("$locaplic/temas/".$codigoMap.".map")){
				unlink("$locaplic/temas/".$codigoMap.".map");
			}
			else{
				if(file_exists("$locaplic/temas/".$codigoMap.".gvp")){
					unlink("$locaplic/temas/".$codigoMap.".gvp");
				}
				if(file_exists("$locaplic/temas/".$codigoMap.".php")){
					unlink("$locaplic/temas/".$codigoMap.".php");
				}
			}
			$tabela = "i3geoadmin_temas";
			if($id && $id != ""){
				exclui($esquemaadmin.$tabela,$coluna,$id);
			}
			retornaJSON("ok");
			exit;
		}
		break;
		/*
		Valor: REFAZERLAYER

		Altera um layer existente em um mapfile com base em um layer existente em outro mapfile

		Parametros:

		codigomap {string} - nome do mapfile existente em i3geo/temas que ser&aacute; atualizado (sem .map)

		maporigem {string} - nome completo do arquivo mapfile que contem o layer que ser&aacute; utilizado para alterar o original

		nomelayer {string} - codigo do layer em mapfile que ser&aacute; utilizado para atualizar codigoMap

		Retorno:

		{JSON}
		*/
	case "REFAZERLAYER":
		retornaJSON(refazerLayer());
		exit;
		break;
		/*
		Valor: CLONARMAPFILE

		Copia um mapfile existente

		Parametros:

		codigomap {string} - nome do mapfile existente em i3geo/temas que ser&aacute; clonado (sem .map)

		novomap {string} - nome do mapfile que ser&aacute; criado

		Retorno:

		{JSON}
		*/
	case "CLONARMAPFILE":
		retornaJSON(clonarMapfile());
		exit;
		break;
		/*
		Valor: CRIARNOVOLAYER

		Cria um novo layer em um mapfile

		O novo layer receber&aacute; um nome aleat�rio, que pode ser modificado posteriormente. Por default, esse novo layer ser&aacute; do tipo linear

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		Retorno:

		{JSON}
		*/
	case "CRIARNOVOLAYER":
		retornaJSON(criarNovoLayer());
		exit;
		break;
		/*
		Valor: EXCLUIRLAYER

		Exclui um layer de um mapfile

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		Retorno:

		{JSON}
		*/
	case "EXCLUIRLAYER":
		retornaJSON(excluirLayer());
		exit;
		break;

		/*
		Valor: LISTACLASSES

		Lista as classes da legenda de um layer em um mapfile

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		Retorno:

		{JSON}
		*/
	case "LISTACLASSES":
		retornaJSON(listaClasses());
		exit;
		break;
		/*
		Valor: AUTOCLASSESLAYER

		Cria classes em um layer com base na tabela de atributos

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		itemExpressao - item da tabela de atributos que cont&eacute;m os valores &uacute;nicos para as classes

		itemNome - item da tabela de atributos que cont&eacute;m os nomes de cada classe

		Retorno:

		{JSON}
		*/
	case "AUTOCLASSESLAYER":
		autoClassesLayer();
		retornaJSON(listaClasses());
		exit;
		break;
		/*
		Valor: CRIARNOVACLASSE

		Cria uma nova classe em um layer

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		Retorno:

		{JSON}
		*/
	case "CRIARNOVACLASSE":
		retornaJSON(criarNovaClasse());
		exit;
		break;
		/*
		Valor: EXCLUIRCLASSE

		Cria uma nova classe em um layer

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		indiceClasse {numerico} - &iacute;ndice da classe (de 0 at&eacute; n&uacute;mero de classes-1)

		Retorno:

		{JSON}
		*/
	case "EXCLUIRCLASSE":
		excluirClasse();
		retornaJSON(listaClasses());
		exit;
		break;
		/*
		Valor: LISTAESTILOS

		Lista de estilos existentes em uma classe de um layer

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		indiceClasse {numerico} - &iacute;ndice da classe (de 0 at&eacute; n&uacute;mero de classes-1)

		Retorno:

		{JSON}
		*/
	case "LISTAESTILOS":
		retornaJSON(listaEstilos());
		exit;
		break;
		/*
		Valor: CRIARNOVOESTILO

		Adiciona um novo estilo em uma classe

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		indiceClasse {numerico} - &iacute;ndice da classe (de 0 at&eacute; n&uacute;mero de classes-1)

		Retorno:

		{JSON}
		*/
	case "CRIARNOVOESTILO":
		retornaJSON(criarNovoEstilo());
		exit;
		break;
		/*
		Valor: EXCLUIRESTILO

		Exclui um estilo de uma classe

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		indiceClasse {numerico} - &iacute;ndice da classe (de 0 at&eacute; n&uacute;mero de classes-1)

		indiceEstilo {numerico} - &iacute;ndice do estilo (de 0 at&eacute; n&uacute;mero de estilos-1)

		Retorno:

		{JSON}
		*/
	case "EXCLUIRESTILO":
		excluirEstilo();
		retornaJSON(listaEstilos());
		exit;
		break;
		/*
		Valor: PEGAESTILO

		Obt&eacute;m os dados de um estilo de uma classe

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		indiceClasse {numerico} - &iacute;ndice da classe (de 0 at&eacute; n&uacute;mero de classes-1)

		indiceEstilo {numerico} - &iacute;ndice do estilo (de 0 at&eacute; n&uacute;mero de estilos-1)

		Retorno:

		{JSON}
		*/
	case "PEGAESTILO":
		retornaJSON(pegaEstilo());
		exit;
		break;
		/*
		Valor: ALTERARESTILO

		Altera um estilo de uma classe

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		indiceClasse {numerico} - &iacute;ndice da classe (de 0 at&eacute; n&uacute;mero de classes-1)

		indiceEstilo {numerico} - &iacute;ndice do estilo (de 0 at&eacute; n&uacute;mero de estilos-1)

		angle

		maxwidth

		minwidth

		width

		outlinecolor

		backgroundcolor

		antialias

		offsety

		offsetx

		maxsize

		minsize

		size

		color

		symbolname

		Retorno:

		{JSON}
		*/
	case "ALTERARESTILO":
		alterarEstilo();
		retornaJSON(pegaEstilo());
		exit;
		break;
		/*
		Valor: PEGACONEXAO

		Obt&eacute;m os valores dos elementos de conex&atilde;o com uma base de dados de um layer

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		Retorno:

		{JSON}
		*/
	case "PEGACONEXAO":
		retornaJSON(pegaConexao());
		exit;
		break;
		/*
		Valor: ALTERARCONEXAO

		Altera os valores dos elementos de conex&atilde;o com uma base de dados de um layer

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		connection

		connectiontype

		data

		tileitem

		tileindex

		type

		Retorno:

		{JSON}
		*/
	case "ALTERARCONEXAO":
		$retorno = alterarConexao();
		if($testar == "false")
			retornaJSON(pegaConexao());
		else
			retornaJSON(array("url"=>$retorno));
		exit;
		break;
		/*
		Valor: PEGAMETADADOS

		Obt&eacute;m os valores dos elementos de metadados de um layer

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		Retorno:

		{JSON}
		*/
	case "PEGAMETADADOS":
		retornaJSON(pegaMetadados());
		exit;
		break;
		/*
		Valor: PEGATITULO

		Obt&eacute;m os valores de titulo, descricao, etc

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		Retorno:

		{JSON}
		*/
	case "PEGATITULO":
		retornaJSON(pegaTitulo());
		exit;
		break;
	case "ALTERARTITULO":
		alterarTitulo();
		retornaJSON(pegaTitulo());
		exit;
		break;
	case "ALTERARNOMETEMA":
		alterarNomeTema();
		$codigoLayer = $codigoMap;
		retornaJSON(pegaTitulo());
		exit;
		break;
	case "PEGADISPO":
		retornaJSON(pegaDispo());
		exit;
		break;
	case "ALTERARDISPO":
		alterarDispo();
		alteraTemas();
		retornaJSON(pegaDispo());
		exit;
		break;
	case "PEGACOMPORT":
		retornaJSON(pegaComport());
		exit;
		break;
	case "ALTERARCOMPORT":
		alterarComport();
		retornaJSON(pegaComport());
		exit;
		break;
	case "PEGAEDITAVEL":
		retornaJSON(pegaEditavel());
		exit;
		break;
	case "ALTERAREDITAVEL":
		alterarEditavel();
		retornaJSON(pegaEditavel());
		exit;
		break;

		/*
		Valor: ALTERARMETADADOS

		Altera os valores dos elementos de metadados de um layer

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		iconetema

		ltempoformatodata

		ltempoiteminicio

		ltempoitemfim

		ltempoitemtitulo

		ltempoitemdescricao

		ltempoitemtip

		ltempoitemimagem

		ltempoitemicone

		ltempoitemlink

		description_template

		palletestep

		palletefile

		arquivodownload

		aplicaextensao

		classestamanho

		classessimbolo

		classescor

		classesnome

		classesitem

		mensagem

		identifica

		transitioneffect

		extensao

		escondido

		download

		escala

		tema

		classe

		tip

		itenslink

		itens

		itensdesc

		editorsql

		cache

		permitecomentario

		itembuscarapida

		Retorno:

		{JSON}
		*/
	case "ALTERARMETADADOS":
		alterarMetadados();
		retornaJSON(pegaMetadados());
		exit;
		break;
		/*
		Valor: PEGAGERAL

		Obt&eacute;m os valores dos elementos de configura&ccedil;&atilde;o geral de um layer

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		Retorno:

		{JSON}
		*/
	case "PEGAGERAL":
		retornaJSON(pegaGeral());
		exit;
		break;
		/*
		Valor: ALTERARGERAL

		Modifica os valores dos elementos de configura&ccedil;&atilde;o geral de um layer

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		testar

		name

		projection

		sizeunits

		status

		toleranceunits

		tolerance

		symbolscale

		opacity

		offsite

		minscale

		maxscale

		labelsizeitem

		labelminscale

		labelmaxscale

		labelitem

		group

		filteritem

		type

		filter

		Retorno:

		{JSON}
		*/
	case "ALTERARGERAL":
		$retorno = alterarGeral();
		if($testar == "false")
		{
			$codigoLayer = $name;
			retornaJSON(pegaGeral());
		}
		else
			retornaJSON(array("url"=>$retorno));
		exit;
		break;
		/*
		Valor: PEGACLASSEGERAL

		Obt&eacute;m os valores dos elementos de configura&ccedil;&atilde;o geral de uma classe

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		indiceClasse {numerico} - &iacute;ndice da classe (de 0 at&eacute; n&uacute;mero de classes-1)

		Retorno:

		{JSON}
		*/
	case "PEGACLASSEGERAL":
		retornaJSON(pegaClasseGeral());
		exit;
		break;
		/*
		Valor: ALTERARCLASSEGERAL

		Altera os valores dos elementos de configura&ccedil;&atilde;o geral de uma classe

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		indiceClasse {numerico} - &iacute;ndice da classe (de 0 at&eacute; n&uacute;mero de classes-1)

		status

		minscale

		maxscale

		name

		expression

		keyimage

		title

		Retorno:

		{JSON}
		*/
	case "ALTERARCLASSEGERAL":
		alterarClasseGeral();
		retornaJSON(pegaClasseGeral());
		exit;
		break;
		/*
		Valor: PEGACLASSELABEL

		Obt&eacute;m os valores dos elementos de configura&ccedil;&atilde;o da topon&iacute;mia de uma classe

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		indiceClasse {numerico} - &iacute;ndice da classe (de 0 at&eacute; n&uacute;mero de classes-1)

		Retorno:

		{JSON}
		*/
	case "PEGACLASSELABEL":
		retornaJSON(pegaClasseLabel());
		exit;
		break;
		/*
		Valor: ALTERARCLASSELABEL

		Altera os valores dos elementos de configura&ccedil;&atilde;o da topon&iacute;mia de uma classe

		Parametros:

		codigoMap {string} - nome do mapfile (sem .map)

		codigoLayer {string} - 'name' do layer existente no mapfile

		indiceClasse {numerico} - &iacute;ndice da classe (de 0 at&eacute; n&uacute;mero de classes-1)

		autoangle

		encoding

		force

		partials

		mindistance

		minfeaturesize

		wrap

		antialias

		buffer

		angle

		offsety

		offsetx

		position

		maxsize

		minsize

		size

		backgroundshadowsizey

		backgroundshadowsizex

		shadowsizey

		shadowsizex

		shadowcolor

		outlinecolor

		color

		backgroundshadowcolor

		backgroundcolor

		type

		font

		Retorno:

		{JSON}
		*/
	case "ALTERARCLASSELABEL":
		alterarClasseLabel();
		retornaJSON(pegaClasseLabel());
		exit;
		break;
	case "MOVIMENTANO":
		$res = sobeDesce();
		retornaJSON($res);
		exit;
		break;
	case "ADICIONAGRUPOUSRTEMA":
		retornaJSON(adicionaGrupoUsrTema());
		exit;
		break;
	case "EXCLUIRGRUPOUSRTEMA":
		retornaJSON(excluirGrupoUsrTema());
		exit;
		break;
}
function clonarMapfile()
{
	global $codigomap, $locaplic;
	error_reporting(0);
	$arqtema = $locaplic."/temas/".$codigomap.".map";
	$novotema = $locaplic."/temas/".$_GET["novomap"].".map";
	copy($arqtema,$novotema);
	$mapa = ms_newMapObj($novotema);
	$layer = @$mapa->getlayerbyname($codigomap);
	$layer->set("name",$novomap);
	$mapa->save($novotema);
	removeCabecalho($novotema);
	return array("data"=>"ok");
}
function refazerLayer()
{
	global $nomelayer, $codigomap, $locaplic;

	$maporigem = $_GET["maporigem"];
	$cache = $_GET["cache"];

	error_reporting(0);
	if(empty($cache)){
		$cache = "";
	}
	$mapa = ms_newMapObj($maporigem);
	$arqtema = $locaplic."/temas/".$codigomap.".map";
	$mapatema = ms_newMapObj($arqtema);
	$layeroriginal = @$mapatema->getlayerbyname($codigomap);
	$layernovo = @$mapa->getlayerbyname($nomelayer);
	if($layeroriginal != "" && $layernovo != "")
	{
		$plugin = $layeroriginal->getmetadata("PLUGINI3GEO");
		$layeroriginal->set("status",MS_DELETE);
		$nl = ms_newLayerObj($mapatema,$layernovo);
		$nl->set("name",$codigomap);
		$nl->setmetadata("PLUGINI3GEO",$plugin);
		$nl->setmetadata("nomeoriginal","");
		$nl->setmetadata("arquivotemaoriginal","");
		$nl->setmetadata("olopacity","");
		$nl->setmetadata("olstatus","");
		$nl->setmetadata("gmopacity","");
		$nl->setmetadata("gmstatus","");
		$nl->setmetadata("FILTROORIGINAL","");
		$nl->setmetadata("DATAORIGINAL","");
		$nl->setmetadata("cache",$cache);
		$numclasses = $nl->numclasses;
		if ($numclasses > 0)
		{
			for ($i=0; $i < $numclasses; $i++)
			{
				$classe = $nl->getClass($i);
				$classe->set("title","");
			}
		}
		$mapatema->save($arqtema);
		removeCabecalho($arqtema);
		return array("data"=>"ok");
	}
	return "erro";
}
function sobeDesce()
{
	global $movimento,$tipo,$codigoMap,$codigoLayer,$locaplic;

	$indiceClasse = $_GET["indiceClasse"];
	$indiceEstilo = $_GET["indiceEstilo"];
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	if($movimento == "sobe")
	{
		if($tipo == "layer")
		{
			$indice = $layer->index;
			$mapa->moveLayerUp($indice);
		}
		if($tipo == "classe")
		{
			$layer->moveclassup($indiceClasse);
		}
		if($tipo == "estilo")
		{
			$classe = $layer->getclass($indiceClasse);
			$classe->movestyleup($indiceEstilo);
		}

	}
	if($movimento == "desce")
	{
		if($tipo == "layer")
		{
			$indice = $layer->index;
			$mapa->moveLayerDown($indice);
		}
		if($tipo == "classe")
		{
			$layer->moveclassdown($indiceClasse);
		}
		if($tipo == "estilo")
		{
			$classe = $layer->getclass($indiceClasse);
			$classe->movestyledown($indiceEstilo);
		}
	}
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
//essa funcao e usada tambem por i3geo/ferramentas/upload/upload.php
function criarNovoMap(){
	global $locaplic,$esquemaadmin;

	$arq = $locaplic."/temas/".$_GET["codigo"].".map";
	if(empty($_GET["acessopublico"])){
		$_GET["acessopublico"] = "SIM";
	}
	if(!file_exists($arq)){
		if(empty($_GET["tipoLayer"])){
			$_GET["tipoLayer"] = "line";
		}
		$dados[] = "MAP";
		$dados[] = "SYMBOLSET ../symbols/simbolosv6.sym";
		$dados[] = 'FONTSET   "../symbols/fontes.txt"';
		$dados[] = "LAYER";
		$dados[] = '	NAME "'.$_GET["codigo"].'"';
		$dados[] = '	TEMPLATE "none.htm"';
		if(!empty($_GET["metaestat"]) && $_GET["metaestat"] == "SIM"){
			$dados[] = '	CONNECTIONTYPE POSTGIS';
			$tipoLayer = "polygon";
		}
		elseif(!empty($conexao)){
			$dados[] = '	CONNECTIONTYPE POSTGIS';
			$dados[] = '	CONNECTION "'.$_GET["conexao"].'"';
		}
		$dados[] = "	TYPE ".$_GET["tipoLayer"];
		if(empty($_GET["data"])){
			$dados[] = '	DATA ""';
			$dados[] = '	CONNECTION ""';
		}
		else{
			$dados[] = '	DATA "'.$_GET["data"].'"';
		}
		$dados[] = '	STATUS DEFAULT';
		$dados[] = '	METADATA';
		$dados[] = '		TEMA "'.$_GET["nome"].'"';
		$dados[] = '		CLASSE "SIM"';
		$tipoa_tema = "";
		if(!empty($_GET["metaestat"]) && $_GET["metaestat"] == "SIM"){
			$dados[] = '		METAESTAT "SIM"';
			//para marcar no banco de dados de administracao
			$tipoa_tema = "META";
			//METAESTAT_CODIGO_TIPO_REGIAO
			//ID_MEDIDA_VARIAVEL
		}
		$acessopublico = $_GET["acessopublico"];
		$dados[] = '		permiteogc "'.$acessopublico.'"';
		$dados[] = '		permitedownload "'.$acessopublico.'"';
		$dados[] = '		permitekml "'.$acessopublico.'"';
		$dados[] = '		permitekmz "'.$acessopublico.'"';

		$dados[] = '	END';
		$dados[] = '    CLASS';
		$dados[] = '        NAME ""';
		$dados[] = '        STYLE';
		$dados[] = '        	COLOR 0 0 0';
		$dados[] = '        	SIZE 12';
		if($tipoLayer == "point"){
			$dados[] = "        	SYMBOL 'ponto'";
		}
		$dados[] = '        END';
		$dados[] = '    END';
		$dados[] = "END";
		$dados[] = "END";
		$fp = fopen($arq,"w");
		foreach ($dados as $dado)
		{
			fwrite($fp,$dado."\n");
		}

		include("conexao.php");
		if($convUTF){
			$_GET["nome"] = utf8_encode($_GET["nome"]);
			$_GET["desc"] = utf8_encode($_GET["desc"]);
		}
		$dataCol = array(
			"link_tema" => '',
			"kml_tema" => $acessopublico,
			"kmz_tema" => $acessopublico,
			"ogc_tema" => $acessopublico,
			"download_tema" => $acessopublico,
			"desc_tema" => '',
			"tipoa_tema" => $tipoa_tema,
			"tags_tema" => '',
			"nome_tema" => $_GET["nome"],
			"codigo_tema" => $_GET["codigo"],
			"it" => $_GET["it"],
			"es" => $_GET["es"],
			"en" => $_GET["en"]
		);
		i3GeoAdminInsert($dbhw,"i3geoadmin_temas",$dataCol);
		$dbh = null;
		$dbhw = null;
		return "ok";
	}
	return "erro";
}
function criarNovoLayer()
{
	global $locaplic,$codigoMap;

	include_once("$locaplic/classesphp/funcoes_gerais.php");
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$nl = ms_newLayerObj($mapa);
	$nl->set("name",nomeRandomico());
	$nl->set("type",MS_LAYER_LINE);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return array("layers"=>(array($nl->name)));
}
function autoClassesLayer()
{
	global $codigoMap,$codigoLayer,$locaplic,$dir_tmp,$postgis_mapa;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	include_once("$locaplic/classesphp/classe_alteraclasse.php");
	error_reporting(0);
	$nometemp = $dir_tmp."/".nomerandomico().".map";

	$versao = versao();
	$versao = $versao["principal"];
	if($base == "" || !isset($base)){
		$base = "";
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{
			$base = $locaplic."/aplicmap/geral1windowsv".$versao.".map";
		}
		else
		{
			if($base == "" && file_exists('/var/www/i3geo/aplicmap/geral1debianv'.$versao.'.map')){
				$base = "/var/www/i3geo/aplicmap/geral1debianv".$versao.".map";
			}
			if($base == "" && file_exists('/var/www/html/i3geo/aplicmap/geral1fedorav'.$versao.'.map')){
				$base = "/var/www/html/i3geo/aplicmap/geral1fedorav".$versao.".map";
			}
			if($base == "" && file_exists('/opt/www/html/i3geo/aplicmap/geral1fedorav'.$versao.'.map')){
				$base = "/opt/www/html/i3geo/aplicmap/geral1v".$versao.".map";
			}
			if($base == "")
			{
				$base = $locaplic."/aplicmap/geral1v".$versao.".map";
			}
		}
	}
	else{
		if(!file_exists($base))
		{
			$base = $locaplic."/aplicmap/".$base;
		}
	}

	$mapageral = ms_newMapObj($base);

	$numlayers = $mapageral->numlayers;
	for ($i=0;$i < $numlayers;$i++)
	{
		$layertemp = $mapageral->getlayer($i);
		$layertemp->set("status",MS_DELETE);
	}

	$mapatemp = ms_newMapObj($mapfile);
	$numlayers = $mapatemp->numlayers;
	for ($i=0;$i < $numlayers;$i++){
		$layertemp = $mapatemp->getlayer($i);
		//troca string de conexao com alias
		$lcon = $layertemp->connection;
		if ($layertemp->connectiontype == MS_POSTGIS){
			if (in_array($lcon,array_keys($postgis_mapa))){
				$layertemp->set("connection",$postgis_mapa[$lcon]);
			}
		}
		ms_newLayerObj($mapageral, $layertemp);
	}
	$mapageral->save($nometemp);
	$m = new Alteraclasse($nometemp,$codigoLayer);
	$m->valorunico($_GET["itemExpressao"],"",$_GET["itemNome"]);
	$m->salva();
	$mapatemp = ms_newMapObj($nometemp);

	$numlayers = $mapatemp->numlayers;
	for ($i=0;$i < $numlayers;$i++){
		$layertemp = $mapatemp->getlayer($i);
		//troca string de conexao com alias
		if ($layertemp->connectiontype == MS_POSTGIS){
			$layertemp->set("connection",$lcon);
		}
	}

	$mapatemp->save($mapfile);
	removeCabecalho($mapfile);
}
function criarNovaClasse()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$nl = $mapa->getlayerbyname($codigoLayer);
	$dados = array();
	if(strtoupper($nl->getmetadata("metaestat")) === "SIM"){
		return "erro";
	}
	$nclasses = $nl->numclasses;
	$classe = ms_newClassObj($nl);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	$dados[] = array("indice"=>($nclasses),"nome"=>(""));
	return $dados;
}
function criarNovoEstilo()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$nl = $mapa->getlayerbyname($codigoLayer);
	$classObj = $nl->getclass($_GET["indiceClasse"]);
	$numestilos = $classObj->numstyles;
	$nestilo = ms_newStyleObj($classObj);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	$dados[] = array("estilo"=>$numestilos);
	return $dados;
}
function pegaItensLayer()
{
	global $codigoMap,$locaplic,$codigoLayer,$postgis_mapa;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$lcon = $layer->connection;
	if ($layer->connectiontype == MS_POSTGIS){
		if (in_array($lcon,array_keys($postgis_mapa))){
			$layer->set("connection",$postgis_mapa[$lcon]);
		}
	}
	$layer->open();
	$itens = $layer->getitems();
	$layer->close();
	$dados["itens"] = $itens;
	return $dados;
}
function adicionaGrupoUsrTema(){
	global $id_tema,$id_grupo,$locaplic,$esquemaadmin;
	include($locaplic."/admin/php/conexao.php");
	$sql = "select * from ".$esquemaadmin."i3geousr_grupotema where id_tema = $id_tema and id_grupo = $id_grupo";
	$q = $dbh->query($sql,PDO::FETCH_ASSOC);
	if($q){
		$teste = $q->fetchAll();
		if(count($teste) == 0){
			$dataCol = array(
				"id_tema" => $id_tema,
				"id_grupo" => $id_grupo
			);
			i3GeoAdminInsert($dbhw,"i3geousr_grupotema",$dataCol);
		}
	}
	return "ok";
}
function excluirGrupoUsrTema(){
	global $id_tema,$id_grupo,$locaplic,$esquemaadmin;
	include($locaplic."/admin/php/conexao.php");
	$sql = "DELETE from ".$esquemaadmin."i3geousr_grupotema where id_tema = ? and id_grupo = ? ";
	$prep = $dbhw->prepare($sql);
	$prep->execute(array($id_tema,$id_grupo));
	i3GeoAdminInsertLog($dbhw,$sql,array($id_tema,$id_grupo));
	return "ok";
}
function pegaLayers()
{
	global $codigoMap,$locaplic,$esquemaadmin;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	//echo $mapfile;exit;
	$mapa = ms_newMapObj($mapfile);
	$layers = $mapa->getalllayernames();
	$dados["layers"] = $layers;
	//lista de grupo de usuarios
	$gruposusr = array();
	include($locaplic."/admin/php/conexao.php");
	$sql = "
		select ".$esquemaadmin."i3geoadmin_temas.codigo_tema, ".$esquemaadmin."i3geousr_grupos.id_grupo,
		".$esquemaadmin."i3geousr_grupos.nome, ".$esquemaadmin."i3geousr_grupos.descricao,
		".$esquemaadmin."i3geousr_grupotema.id_tema
		from
		".$esquemaadmin."i3geoadmin_temas
		join ".$esquemaadmin."i3geousr_grupotema
		on ".$esquemaadmin."i3geousr_grupotema.id_grupo = ".$esquemaadmin."i3geousr_grupos.id_grupo
		join ".$esquemaadmin."i3geousr_grupos
		on ".$esquemaadmin."i3geoadmin_temas.id_tema = ".$esquemaadmin."i3geousr_grupotema.id_tema
		where codigo_tema = '".$codigoMap."'
	";
	$q = $dbh->query($sql,PDO::FETCH_ASSOC);
	if($q){
		$gruposusr = $q->fetchAll();
	}
	$dados["gruposusr"] = $gruposusr;
	return $dados;
}
function listaClasses()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	if(strtoupper($layer->getmetadata("metaestat")) === "SIM"){
		return $dados;
	}
	$nclasses = $layer->numclasses;
	for($i=0;$i<$nclasses;++$i)
	{
		$classe = $layer->getclass($i);
		$texto = $classe->name;
		$dados[] = array("indice"=>$i,"nome"=>base64_encode($texto));
	}
	return $dados;
}
function listaEstilos()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	if(strtoupper($layer->getmetadata("metaestat")) === "SIM"){
		return $dados;
	}
	$classe = $layer->getclass($_GET["indiceClasse"]);
	$numestilos = $classe->numstyles;
	for($i=0;$i<$numestilos;++$i)
	{
		$dados[] = array("estilo"=>$i);
	}
	return $dados;
}

function excluirLayer()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$nl = $mapa->getlayerbyname($codigoLayer);
	$nl->set("status",MS_DELETE);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
function excluirClasse()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$nl = $mapa->getlayerbyname($codigoLayer);
	$classObj = $nl->getclass($_GET["indiceClasse"]);
	$classObj->set("status",MS_DELETE);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
function excluirEstilo()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$nl = $mapa->getlayerbyname($codigoLayer);
	$classObj = $nl->getclass($_GET["indiceClasse"]);
	$classObj->deletestyle($_GET["indiceEstilo"]);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
function pegaComport()
{
	global $codigoMap,$codigoLayer,$locaplic,$postgis_mapa;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$v = versao();
	$dados["aplicaextensao"] = $layer->getmetadata("aplicaextensao");
	$dados["permitecomentario"] = $layer->getmetadata("permitecomentario");
	$dados["temporizador"] = $layer->getmetadata("temporizador");
	$dados["classe"] = $layer->getmetadata("classe");
	$dados["legendaimg"] = $layer->getmetadata("legendaimg");
	$dados["escondido"] = $layer->getmetadata("escondido");
	$dados["identifica"] = $layer->getmetadata("identifica");
	$dados["transitioneffect"] = $layer->getmetadata("transitioneffect");
	$dados["status"] = $layer->status;
	$dados["offsite"] = $layer->offsite->red.",".$layer->offsite->green.",".$layer->offsite->blue;
	$v["principal"] == "4" ? $dados["opacity"] = $layer->transparency : $dados["opacity"] = $layer->opacity;
	$dados["maxscale"] = $layer->maxscaledenom;
	$dados["minscale"] = $layer->minscaledenom;
	$dados["labelitem"] = $layer->labelitem;
	$dados["labelmaxscale"] = $layer->labelmaxscaledenom;
	$dados["labelminscale"] = $layer->labelminscaledenom;
	$dados["symbolscale"] = $layer->symbolscaledenom;
	$dados["tolerance"] = $layer->tolerance;
	$dados["toleranceunits"] = $layer->toleranceunits;
	$dados["sizeunits"] = $layer->sizeunits;

	$dados["codigoMap"] = $codigoMap;
	$dados["codigoLayer"] = $codigoLayer;
	return $dados;
}
function alterarComport()
{
	global $dir_tmp,$codigoMap,$codigoLayer,$locaplic;
	$v = versao();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$layer->setmetadata("aplicaextensao",$_GET["aplicaextensao"]);
	$layer->setmetadata("permitecomentario",$_GET["permitecomentario"]);
	$layer->setmetadata("temporizador",$_GET["temporizador"]);
	$layer->setmetadata("classe",$_GET["classe"]);
	$layer->setmetadata("legendaimg",$_GET["legendaimg"]);
	$layer->setmetadata("escondido",$_GET["escondido"]);
	$layer->setmetadata("identifica",$_GET["identifica"]);
	$layer->setmetadata("transitioneffect",$_GET["transitioneffect"]);
	$layer->set("status",$_GET["status"]);
	if($_GET["offsite"] == -1 || $_GET["offsite"] == "null")
	{
		$_GET["offsite"] = "-1,-1,-1";
	}
	$cor = $layer->offsite;
	$c = explode(",",$_GET["offsite"]);
	if(count($c) < 3)
		$c = explode(" ",$_GET["offsite"]);
	$cor->setrgb($c[0],$c[1],$c[2]);
	$layer->offsite->red.",".$layer->offsite->green.",".$layer->offsite->blue;
	$v["principal"] == "4" ? $layer->set("transparency",$_GET["opacity"]) : $layer->set("opacity",$_GET["opacity"]);
	$layer->set("maxscaledenom",$_GET["maxscale"]);
	$layer->set("minscaledenom",$_GET["minscale"]);
	$layer->set("labelitem",$_GET["labelitem"]);
	$layer->set("labelmaxscaledenom",$_GET["labelmaxscale"]);
	$layer->set("labelminscaledenom",$_GET["labelminscale"]);
	$layer->set("symbolscaledenom",$_GET["symbolscale"]);
	$layer->set("tolerance",$_GET["tolerance"]);
	$layer->set("toleranceunits",$_GET["toleranceunits"]);
	$layer->set("sizeunits",$_GET["sizeunits"]);

	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
function pegaTitulo()
{
	global $codigoMap,$codigoLayer,$locaplic,$postgis_mapa;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$dados["name"] = $layer->name;
	$dados["tema"] = mb_convert_encoding($layer->getmetadata("tema"),"UTF-8","ISO-8859-1");
	$dados["iconetema"] = $layer->getmetadata("iconetema");
	$dados["mensagem"] = mb_convert_encoding($layer->getmetadata("mensagem"),"UTF-8","ISO-8859-1");
	$dados["escala"] = $layer->getmetadata("escala");
	$dados["extensao"] = $layer->getmetadata("extensao");
	$dados["group"] = $layer->group;
	$dados["codigoMap"] = $codigoMap;
	$dados["codigoLayer"] = $codigoLayer;
	return $dados;
}
function alterarNomeTema(){
	global $locaplic,$codigoMap, $esquemaadmin;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoMap);
	if($layer){
		$layer->setmetadata("tema",$_GET["novoNome"]);
		$mapa->save($mapfile);
		removeCabecalho($mapfile);
		include("conexao.php");
		if($convUTF){
			$_GET["novoNome"] = utf8_encode($_GET["novoNome"]);
		}
		$dataCol = array(
			"nome_tema" => $_GET["novoNome"]
		);
		i3GeoAdminUpdate($dbhw,"i3geoadmin_temas",$dataCol," WHERE codigo_tema='$codigoMap'");
		$dbhw = null;
		$dbh = null;
	}
	return "ok";
}
function alterarTitulo()
{
	global $dir_tmp,$codigoMap,$codigoLayer,$locaplic;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);

	$layer->set("name",$_GET["name"]);
	$layer->setmetadata("tema",$_GET["tema"]);
	$layer->setmetadata("iconetema",$_GET["iconetema"]);
	$layer->setmetadata("mensagem",$_GET["mensagem"]);
	$layer->setmetadata("escala",$_GET["escala"]);
	$layer->setmetadata("extensao",$_GET["extensao"]);
	$layer->set("group",$_GET["group"]);

	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	$codigoLayer = $_GET["name"];
	return "ok";
}
function pegaDispo()
{
	global $codigoMap,$codigoLayer,$locaplic,$postgis_mapa;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$dados["download"] = $layer->getmetadata("download");
	$dados["arquivodownload"] = $layer->getmetadata("arquivodownload");
	$dados["arquivokmz"] = $layer->getmetadata("arquivokmz");
	$dados["ogc_tema"] = $layer->getmetadata("permiteogc");
	$dados["download_tema"] = $layer->getmetadata("permitedownload");
	$dados["kml_tema"] = $layer->getmetadata("permitekml");
	$dados["kmz_tema"] = $layer->getmetadata("permitekmz");
	$dados["codigoMap"] = $codigoMap;
	$dados["codigoLayer"] = $codigoLayer;
	return $dados;
}
function pegaEditavel()
{
	global $codigoMap,$codigoLayer,$locaplic,$postgis_mapa;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$dados["editavel"] = $layer->getmetadata("EDITAVEL"); //SIM ou NAO
	$dados["colunaidunico"] = $layer->getmetadata("COLUNAIDUNICO");
	$dados["tabelaeditavel"] = $layer->getmetadata("TABELAEDITAVEL");
	$dados["esquematabelaeditavel"] = $layer->getmetadata("ESQUEMATABELAEDITAVEL");
	$dados["colunageometria"] = $layer->getmetadata("COLUNAGEOMETRIA");
	$dados["codigoMap"] = $codigoMap;
	$dados["codigoLayer"] = $codigoLayer;
	return $dados;
}
function alterarEditavel()
{
	global $dir_tmp,$codigoMap,$codigoLayer,$locaplic;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$layer->setmetadata("EDITAVEL",$_GET["editavel"]);
	$layer->setmetadata("COLUNAIDUNICO",$_GET["colunaidunico"]);
	$layer->setmetadata("TABELAEDITAVEL",$_GET["tabelaeditavel"]);
	$layer->setmetadata("ESQUEMATABELAEDITAVEL",$_GET["esquematabelaeditavel"]);
	$layer->setmetadata("COLUNAGEOMETRIA",$_GET["colunageometria"]);
	$layer->setmetadata("cache","");
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
function alterarDispo()
{
	global $dir_tmp,$codigoMap,$codigoLayer,$locaplic;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$layer->setmetadata("download",$_GET["download"]);
	$layer->setmetadata("arquivodownload",$_GET["arquivodownload"]);
	$layer->setmetadata("arquivokmz",$_GET["arquivokmz"]);
	$layer->setmetadata("permiteogc",$_GET["ogc_tema"]);
	$layer->setmetadata("permitekml",$_GET["kml_tema"]);
	$layer->setmetadata("permitekmz",$_GET["kmz_tema"]);
	$layer->setmetadata("permitedownload",$_GET["download_tema"]);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
//essa funcao existe tambem em menutemas.php
function alteraTemas(){
	global $esquemaadmin,$codigoLayer,$locaplic;
	include("conexao.php");
	$dataCol = array(
		"download_tema" => $_GET["download_tema"],
		"ogc_tema" => $_GET["ogc_tema"],
		"kml_tema" => $_GET["kml_tema"],
		"kmz_tema" => $_GET["kmz_tema"]
	);
	i3GeoAdminUpdate($dbhw,"i3geoadmin_temas",$dataCol,"WHERE codigo_tema = '$codigoLayer'");
	$dbhw = null;
	$dbh = null;
}

function pegaConexao()
{
	global $codigoMap,$codigoLayer,$locaplic,$postgis_mapa;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$dados["connection"] = $layer->connection;
	$dados["connectiontype"] = $layer->connectiontype;
	$dados["data"] = $layer->data;
	$dados["tileindex"] = $layer->tileindex;
	$dados["tileitem"] = $layer->tileitem;
	$dados["cache"] = $layer->getmetadata("cache");
	$dados["tiles"] = $layer->getmetadata("tiles");
	$dados["cortepixels"] = $layer->getmetadata("cortepixels");
	if($dados["cortepixels"] == ""){
		$dados["cortepixels"] = 0;
	}
	if($dados["tileindex"] == ""){
		$dados["tileitem"] = "";
	}
	if(is_array($postgis_mapa))
		$dados["postgis_mapa"] = array_keys($postgis_mapa);
	else
		$dados["postgis_mapa"] = $postgis_mapa;
	$dados["codigoMap"] = $codigoMap;
	$dados["codigoLayer"] = $codigoLayer;
	$dados["type"] = $layer->type;
	$dados["filter"] = $layer->getfilterstring();
	if($dados["filter"]== ""){
		$dados["filter"] = "";
	}
	$dados["filteritem"] = $layer->filteritem;
	$dados["projection"] = $layer->getProjection();
	if($dados["projection"] == "null")
	{
		$dados["projection"] = "";
	}
	$dados["projection"] = str_replace("+i","i",$dados["projection"]);
	$dados["convcaracter"] = $layer->getmetadata("convcaracter");
	//informacoes sobre a integracao com o sistema de metadados estatisticos
	$dados["metaestat"] = $layer->getmetadata("metaestat");
	if($dados["metaestat"] == ""){
		$dados["metaestat"] = "NAO";
	}
	$dados["metaestat_id_medida_variavel"] = $layer->getmetadata("metaestat_id_medida_variavel");

	$dados["colunas"] = implode(",",pegaItens($layer));

	if($layer->connectiontype == 7 || $layer->connectiontype == 9){
		$dados["tipooriginal"] = $layer->getmetadata("tipooriginal");
	}
	return $dados;
}
function alterarConexao()
{
	global $esquemaadmin,$dir_tmp,$codigoMap,$codigoLayer,$locaplic;
	if($_GET["data"] != ""){
		$_GET["data"] =  base64_decode($_GET["data"]);
	}
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	//quando o layer estiver conectado com o METAESTAT, alguns parametros sao default
	include("conexao.php");
	//e necessario atualizar o banco de dados de administracao, por isso e feito a verificacao do registro ou nao do mapfile no banco
	$sql = "SELECT * from ".$esquemaadmin."i3geoadmin_temas where codigo_tema = '$codigoMap'";
	$dados = pegaDados($sql);
	if(count($dados) == 0){
		$dataCol = array(
			"tipoa_tema" => "META",
			"nome_tema" => $codigoMap,
			"codigo_tema" => $codigoMap,
			"kml_tema" => "SIM",
			"kmz_tema" => "NAO",
			"ogc_tema" => "SIM",
			"download_tema" => "SIM",
			"tags_tema" => "",
			"link_tema" => "",
			"desc_tema" => ""
		);
		i3GeoAdminInsert($dbhw,"i3geoadmin_temas",$dataCol);
	}
	if(strtoupper($metaestat) == "SIM"){
		$_GET["connectiontype"] = 6;
		$_GET["filteritem"] = "";
		$_GET["filter"] = "";
		$_GET["data"] = "";
		$_GET["connection"] = "";
		$dataCol = array(
			"tipoa_tema" => "META"
		);
		i3GeoAdminUpdate($dbhw,"i3geoadmin_temas",$dataCol,"WHERE codigo_tema = '$codigoMap'");
		$layer->setmetadata("metaestat","SIM");
		$layer->setmetadata("METAESTAT_ID_MEDIDA_VARIAVEL",$_GET["metaestat_id_medida_variavel"]);
	}
	else{
		$layer->setmetadata("METAESTAT_CODIGO_TIPO_REGIAO","");
		$layer->setmetadata("METAESTAT_ID_MEDIDA_VARIAVEL","");
		$layer->setmetadata("metaestat","");
		$dataCol = array(
			"tipoa_tema" => ""
		);
		i3GeoAdminUpdate($dbhw,"i3geoadmin_temas",$dataCol,"WHERE codigo_tema = '$codigoMap'");
	}
	$layer->set("connection",$_GET["connection"]);
	if(ms_GetVersionInt() > 50201){
		$layer->setconnectiontype($_GET["connectiontype"]);
	}
	else{
		$layer->set("connectiontype",$_GET["connectiontype"]);
	}
	$layer->set("data",$_GET["data"]);
	$layer->set("tileitem",$_GET["tileitem"]);
	$layer->set("tileindex",$_GET["tileindex"]);
	$layer->set("type",$_GET["type"]);
	if($_GET["type"] == 0){
		$c = $layer->getClass(0);
		$e = $c->getStyle(0);
		if($e->symbolname == ""){
			$e->set("symbolname","ponto");
		}
	}
	if($_GET["type"] == 1){
		$c = $layer->getClass(0);
		$e = $c->getStyle(0);
		if($e->symbolname == "" || $e->symbolname == "ponto"){
			$e->set("symbolname","linha");
		}
	}
	if($_GET["type"] == 2){
		$c = $layer->getClass(0);
		$e = $c->getStyle(0);
		if($e->symbolname == "linha" || $e->symbolname == "ponto"){
			$e->set("symbolname"," ");
		}
	}
	$layer->setfilter($_GET["filter"]);
	$layer->set("filteritem",$_GET["filteritem"]);
	if($layer->getprojection() == MS_TRUE)
		$layer->setprojection($_GET["projection"]);
	if($layer->getprojection() == MS_FALSE && $_GET["projection"] != "")
		$layer->setprojection($_GET["projection"]);
	if($layer->connectiontype == 7 || $layer->connectiontype== 9){
		$layer->setmetadata("tipooriginal",$_GET["tipooriginal"]);
	}
	$layer->setmetadata("cache",$_GET["cache"]);
	$layer->setmetadata("tiles",$_GET["tiles"]);
	if($_GET["cortepixels"] == ""){
		$_GET["cortepixels"] = 0;
	}
	$layer->setmetadata("cortepixels",$_GET["cortepixels"]);

	$layer->setmetadata("convcaracter",$_GET["convcaracter"]);
	if($_GET["testar"] == "true")
	{
		$nome = $dir_tmp."/".$codigoMap.".map";
		$mapa->save($nome);
		removeCabecalho($nome,true);
		return $nome;
	}
	else
	{
		$mapa->save($mapfile);
		removeCabecalho($mapfile);
		return "ok";
	}
}
function pegaMetadados()
{
	global $codigoMap,$codigoLayer,$locaplic,$postgis_mapa;
	//error_reporting(0);
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$dados["type"] = $layer->type;
	$dados["connectiontype"] = $layer->connectiontype;
	$dados["itens"] = $layer->getmetadata("itens");
	$dados["itensdesc"] = mb_convert_encoding($layer->getmetadata("itensdesc"),"UTF-8","ISO-8859-1"); //$layer->getmetadata("itensdesc");
	$dados["itenslink"] = $layer->getmetadata("itenslink");
	$dados["tip"] = $layer->getmetadata("tip");
	$dados["classesitem"] = $layer->getmetadata("classesitem");
	$dados["classesnome"] = $layer->getmetadata("classesnome");
	$dados["classescor"] = $layer->getmetadata("classescor");
	$dados["classessimbolo"] = $layer->getmetadata("classessimbolo");
	$dados["classestamanho"] = $layer->getmetadata("classestamanho");
	$dados["palletefile"] = $layer->getmetadata("palletefile");
	$dados["palletestep"] = $layer->getmetadata("palletestep");
	$dados["description_template"] = $layer->getmetadata("description_template");
	$dados["editorsql"] = $layer->getmetadata("editorsql");
	$dados["codigoMap"] = $codigoMap;
	$dados["codigoLayer"] = $codigoLayer;
	$lcon = $layer->connection;
	if ($layer->connectiontype == MS_POSTGIS){
		if (in_array($lcon,array_keys($postgis_mapa)))
		{
			//echo $postgis_mapa[$lcon];exit;
			$layer->set("connection",$postgis_mapa[$lcon]);
		}
	}
	$dados["colunas"] = implode(" ,",pegaItens($layer));
	$layer->set("connection",$lcon);

	$dados["ltempoformatodata"] = $layer->getmetadata("ltempoformatodata");
	$dados["ltempoiteminicio"] = $layer->getmetadata("ltempoiteminicio");
	$dados["ltempoitemfim"] = $layer->getmetadata("ltempoitemfim");
	$dados["ltempoitemtitulo"] = $layer->getmetadata("ltempoitemtitulo");
	$dados["ltempoitemdescricao"] = $layer->getmetadata("ltempoitemdescricao");
	$dados["ltempoconvencode"] = $layer->getmetadata("ltempoconvencode");
	$dados["ltempoitemtip"] = $layer->getmetadata("ltempoitemtip");
	$dados["ltempoitemimagem"] = $layer->getmetadata("ltempoitemimagem");
	$dados["ltempoitemicone"] = $layer->getmetadata("ltempoitemicone");
	$dados["ltempoitemlink"] = $layer->getmetadata("ltempoitemlink");

	$dados["itembuscarapida"] = $layer->getmetadata("itembuscarapida");
	if($layer->connectiontype == 7 || $layer->connectiontype == 9){
		$dados["wms_srs"] = $layer->getmetadata("wms_srs");
		$dados["wms_name"] = $layer->getmetadata("wms_name");
		$dados["wms_server_version"] = $layer->getmetadata("wms_server_version");
		$dados["wms_format"] = $layer->getmetadata("wms_format");
		$dados["wms_auth_username"] = $layer->getmetadata("wms_auth_username");
		$dados["wms_auth_password"] = $layer->getmetadata("wms_auth_password");
		$dados["wms_auth_type"] = $layer->getmetadata("wms_auth_type");
		$dados["wms_connectiontimeout"] = $layer->getmetadata("wms_connectiontimeout");
		$dados["wms_latlonboundingbox"] = $layer->getmetadata("wms_latlonboundingbox");
		$dados["wms_proxy_auth_type"] = $layer->getmetadata("wms_proxy_auth_type");

		$dados["wms_proxy_host"] = $layer->getmetadata("wms_proxy_host");
		$dados["wms_proxy_port"] = $layer->getmetadata("wms_proxy_port");
		$dados["wms_proxy_type"] = $layer->getmetadata("wms_proxy_type");
		$dados["wms_proxy_username"] = $layer->getmetadata("wms_proxy_username");
		$dados["wms_proxy_password"] = $layer->getmetadata("wms_proxy_password");
		$dados["wms_sld_body"] = $layer->getmetadata("wms_sld_body");
		$dados["wms_sld_url"] = $layer->getmetadata("wms_sld_url");
		$dados["wms_style"] = $layer->getmetadata("wms_style");
		$dados["wms_bgcolor"] = $layer->getmetadata("wms_bgcolor");
		$dados["wms_transparent"] = $layer->getmetadata("wms_transparent");
		$dados["wms_time"] = $layer->getmetadata("wms_time");
		$dados["wms_tile"] = $layer->getmetadata("wms_tile");
	}
	return $dados;
}
function alterarMetadados()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	if(strtoupper($layer->getmetadata("metaestat")) === "SIM"){
		return "erro. Layer METAESTAT";
	}
	$_GET["itens"] = str_replace(", ",",",$_GET["itens"]);
	$_GET["itens"] = str_replace(" ,",",",$_GET["itens"]);
	$layer->setmetadata("itens",$_GET["itens"]);
	$_GET["itensdesc"] = str_replace(", ",",",$_GET["itensdesc"]);
	$_GET["itensdesc"] = str_replace(" ,",",",$_GET["itensdesc"]);
	$layer->setmetadata("itensdesc",$_GET["itensdesc"]);
	$layer->setmetadata("itenslink",$_GET["itenslink"]);
	$_GET["tip"] = str_replace(", ",",",$_GET["tip"]);
	$_GET["tip"] = str_replace(" ,",",",$_GET["tip"]);
	$layer->setmetadata("tip",$_GET["tip"]);
	$layer->setmetadata("classesitem",$_GET["classesitem"]);
	$layer->setmetadata("classesnome",$_GET["classesnome"]);
	$layer->setmetadata("classescor",$_GET["classescor"]);
	$layer->setmetadata("classessimbolo",$_GET["classessimbolo"]);
	$layer->setmetadata("classestamanho",$_GET["classestamanho"]);
	$layer->setmetadata("palletefile",$_GET["palletefile"]);
	$layer->setmetadata("palletestep",$_GET["palletestep"]);
	$layer->setmetadata("description_template",$_GET["description_template"]);
	$layer->setmetadata("editorsql",$_GET["editorsql"]);
	$layer->setmetadata("ltempoformatodata",$_GET["ltempoformatodata"]);
	$layer->setmetadata("ltempoiteminicio",$_GET["ltempoiteminicio"]);
	$layer->setmetadata("ltempoitemfim",$_GET["ltempoitemfim"]);
	$layer->setmetadata("ltempoitemtitulo",$_GET["ltempoitemtitulo"]);
	$layer->setmetadata("ltempoconvencode",$_GET["ltempoconvencode"]);
	$layer->setmetadata("ltempoitemdescricao",$_GET["ltempoitemdescricao"]);
	$layer->setmetadata("ltempoitemtip",$_GET["ltempoitemtip"]);
	$layer->setmetadata("ltempoitemimagem",$_GET["ltempoitemimagem"]);
	$layer->setmetadata("ltempoitemicone",$_GET["ltempoitemicone"]);
	$layer->setmetadata("ltempoitemlink",$_GET["ltempoitemlink"]);

	$layer->setmetadata("itembuscarapida",$_GET["itembuscarapida"]);
	if($layer->connectiontype == 7 || $layer->connectiontype== 9){
		$layer->setmetadata("wms_srs",$_GET["wms_srs"]);
		$layer->setmetadata("wms_name",$_GET["wms_name"]);
		$layer->setmetadata("wms_server_version",$_GET["wms_server_version"]);
		$layer->setmetadata("wms_format",$_GET["wms_format"]);
		if($_GET["wms_auth_username"] != ""){
			$layer->setmetadata("wms_auth_username",$_GET["wms_auth_username"]);
			$layer->setmetadata("wms_auth_password",$_GET["wms_auth_password"]);
			$layer->setmetadata("wms_auth_type",$_GET["wms_auth_type"]);
		}
		$layer->setmetadata("wms_connectiontimeout",$_GET["wms_connectiontimeout"]);
		if($_GET["wms_latlonboundingbox"] != "")
		{
			$layer->setmetadata("wms_latlonboundingbox",$_GET["wms_latlonboundingbox"]);
		}
		if($_GET["wms_proxy_host"] != ""){
			$layer->setmetadata("wms_proxy_auth_type",$_GET["wms_proxy_auth_type"]);
			$layer->setmetadata("wms_proxy_host",$_GET["wms_proxy_host"]);
			$layer->setmetadata("wms_proxy_port",$_GET["wms_proxy_port"]);
			$layer->setmetadata("wms_proxy_type",$_GET["wms_proxy_type"]);
			$layer->setmetadata("wms_proxy_username",$_GET["wms_proxy_username"]);
			$layer->setmetadata("wms_proxy_password",$_GET["wms_proxy_password"]);
		}
		if($_GET["wms_sld_body"] != "")
		{
			$layer->setmetadata("wms_sld_body",$_GET["wms_sld_body"]);
		}
		if($_GET["wms_sld_url"] != "")
		{
			$layer->setmetadata("wms_sld_url",$_GET["wms_sld_url"]);
		}
		$layer->setmetadata("wms_style",$_GET["wms_style"]);
		if($_GET["wms_bgcolor"] != "")
			$layer->setmetadata("wms_bgcolor",$_GET["wms_bgcolor"]);
		if($_GET["wms_transparent"] != "")
			$layer->setmetadata("wms_transparent",$_GET["wms_transparent"]);
		if($_GET["wms_time"] != "")
			$layer->setmetadata("wms_time",$_GET["wms_time"]);
		if($_GET["wms_tile"] != "")
			$layer->setmetadata("wms_tile",$_GET["wms_tile"]);
		$layer->setmetadata("tipooriginal",$_GET["tipooriginal"]);
	}
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
function pegaClasseGeral()
{
	global $codigoMap,$codigoLayer,$locaplic;

	error_reporting(0);
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$classe = $layer->getclass($_GET["indiceClasse"]);
	$dados["name"] = base64_encode($classe->name);
	$dados["title"] = base64_encode($classe->title);
	$temp = $classe->getExpressionString();
	//$temp = str_replace("[","_C",$temp);
	//$temp = str_replace("]","C_",$temp);
	//$temp = str_replace("'","_A_",$temp);
	//substitui caracteres que d&atilde;o problemas
	$dados["expression"] = base64_encode($temp);
	$dados["keyimage"] = $classe->keyimage;
	$dados["maxscale"] = $classe->maxscaledenom;
	$dados["minscale"] = $classe->minscaledenom;
	$dados["status"] = $classe->status;
	//$dados["text"] = $classe->getTextString();
	$dados["codigoMap"] = $codigoMap;
	$dados["codigoLayer"] = $codigoLayer;
	$dados["indiceClasse"] = $_GET["indiceClasse"];
	$dados["colunas"] = implode(" ,",pegaItens($layer));
	return $dados;
}
function alterarClasseGeral()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	if(strtoupper($layer->getmetadata("metaestat")) === "SIM"){
		return "erro. Layer METAESTAT";
	}
	$classe = $layer->getclass($_GET["indiceClasse"]);
	$classe->set("name",base64_decode($_GET["name"]));
	$classe->set("title",base64_decode($_GET["title"]));
	$classe->setexpression(base64_decode($_GET["expression"]));
	$classe->set("keyimage",$_GET["keyimage"]);
	$classe->set("maxscaledenom",$_GET["maxscale"]);
	$classe->set("minscaledenom",$_GET["minscale"]);
	$classe->set("status",$_GET["status"]);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
function pegaClasseLabel()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$classe = $layer->getclass($_GET["indiceClasse"]);

	$v = versao();
	$vi = $v["inteiro"];
	if($vi >= 60200){
		$nlabels = $classe->numlabels;
		if($nlabels > 0){
			$label = $classe->getLabel(0);
		}
		else{
			$label = "";
		}
	}
	else{
		$label = $classe->label;
	}
	if ($label != "")
	{
		$dados["font"] = $label->font;
		$dados["type"] = $label->type;
		//$dados["backgroundcolor"] = $label->backgroundcolor->red.",".$label->backgroundcolor->green.",".$label->backgroundcolor->blue;
		//$dados["backgroundshadowcolor"] = $label->backgroundshadowcolor->red.",".$label->backgroundshadowcolor->green.",".$label->backgroundshadowcolor->blue;
		$dados["color"] = $label->color->red.",".$label->color->green.",".$label->color->blue;
		$dados["outlinecolor"] = $label->outlinecolor->red.",".$label->outlinecolor->green.",".$label->outlinecolor->blue;
		$dados["shadowcolor"] = $label->shadowcolor->red.",".$label->shadowcolor->green.",".$label->shadowcolor->blue;
		$dados["shadowsizex"] = $label->shadowsizex;
		$dados["shadowsizey"] = $label->shadowsizey;
		//$dados["backgroundshadowsizex"] = $label->backgroundshadowsizex;
		//$dados["backgroundshadowsizey"] = $label->backgroundshadowsizey;
		$dados["size"] = $label->size;

		$dados["minsize"] = $label->minsize;
		$dados["maxsize"] = $label->maxsize;
		$dados["position"] = $label->position;
		$dados["offsetx"] = $label->offsetx;
		$dados["offsety"] = $label->offsety;
		$dados["angle"] = $label->angle;
		//$dados["autoangle"] = $label->autoangle;
		$dados["buffer"] = $label->buffer;
		//$dados["antialias"] = $label->antialias;
		$dados["wrap"] = $label->wrap;
		$dados["minfeaturesize"] = $label->minfeaturesize;
		$dados["autominfeaturesize"] = $label->autominfeaturesize;
		$dados["mindistance"] = $label->mindistance;
		$dados["partials"] = $label->partials;
		$dados["force"] = $label->force;
		$dados["encoding"] = $label->encoding;
	}
	$dados["codigoMap"] = $codigoMap;
	$dados["codigoLayer"] = $codigoLayer;
	$dados["indiceClasse"] = $indiceClasse;
	$dados["colunas"] = implode(" ,",pegaItens($layer));
	$arq = $locaplic."/symbols/fontes.txt";
	$h = fopen ($arq,"r");
	while ($i = fscanf ($h, "%s\t%s\t"))
	{
		list ($f,$g) = $i;
		$nome[] = $f;
	}
	$dados["fontes"] = $nome;
	return $dados;
}
function alterarClasseLabel()
{
	global $codigoMap,$codigoLayer,$locaplic;
	if(!isset($_GET["text"])){
		$_GET["text"] = "";
	}
	else{
		$_GET["text"] = "[".$_GET["text"]."]";
	}
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	if(strtoupper($layer->getmetadata("metaestat")) === "SIM"){
		return "erro. Layer METAESTAT";
	}
	$classe = $layer->getclass($_GET["indiceClasse"]);
	$v = versao();
	$vi = $v["inteiro"];
	if($vi >= 60300){
		while($classe->numlabels > 0){
			$classe->removeLabel(0);
		}
	}
	if($text == ""){
		if($vi >= 60300){
			$indiceLabel = $classe->addLabel(new labelObj());
			$label = $classe->getLabel($indiceLabel);
		}
		else{
			$label = $classe->label;
		}
	}
	elseif ($vi >= 60300 && $classe->numlabels == 0){
		if($wrap != ""){
			$s = "CLASS LABEL WRAP '$wrap' TEXT '".$_GET["text"]."' END END";
			$classe->updateFromString($s);
		}
		else{
			$s = "CLASS LABEL TEXT '".$_GET["text"]."' END END";
			$classe->updateFromString($s);
		}
	}

	if($vi >= 60300){
		$label = $classe->getLabel(0);
	}
	else{
		$label = $classe->label;
	}

	if($wrap != ""){
		$label->set("maxlength",1);
	}
	if($_GET["fonte"] != "bitmap"){
		//para funcionar na versao 7 do mapserver
		$label->updateFromString("LABEL type truetype END");
		$label->set("font",$_GET["fonte"]);
		$label->set("size",$_GET["tamanho"]);
	}
	else{
		//para funcionar na versao 7 do mapserver
		$label->updateFromString("LABEL type bitmap END");
		$t = MS_TINY;
		if ($_GET["tamanho"] > 5 ){
			$t = MS_TINY;
		}
		if ($_GET["tamanho"] >= 7 ){
			$t = MS_SMALL;
		}
		if ($_GET["tamanho"] >= 10 ){
			$t = MS_MEDIUM;
		}
		if ($_GET["tamanho"] >= 12 ){
			$t = MS_LARGE;
		}
		if ($_GET["tamanho"] >= 14 ){
			$t = MS_GIANT;
		}
		$label->set("size",$t);
	}
	if ($label != ""){
		//$label->set("type",$type);
		corE($label,$_GET["backgroundcolor"],"backgroundcolor");
		corE($label,$_GET["backgroundshadowcolor"],"backgroundshadowcolor");
		corE($label,$_GET["color"],"color");
		corE($label,$_GET["outlinecolor"],"outlinecolor");
		if(!empty($_GET["sombra"]) && !empty($_GET["backgroundshadowsizex"])){
			corE($label,$_GET["sombra"],"backgroundshadowcolor",$_GET["backgroundshadowsizex"],$_GET["backgroundshadowsizey"]);
		}
		$label->set("shadowsizex",$_GET["shadowsizex"]);
		$label->set("shadowsizey",$_GET["shadowsizey"]);
		//$label->set("backgroundshadowsizex",$backgroundshadowsizex);
		//$label->set("backgroundshadowsizey",$backgroundshadowsizey);

		$label->set("minsize",$_GET["minsize"]);
		$label->set("maxsize",$_GET["maxsize"]);
		//$label->set("position",$position);

		$label->set("offsetx",$_GET["offsetx"]);
		$label->set("offsety",$_GET["offsety"]);
		$label->set("angle",$_GET["angle"]);

		//$label->set("autoangle",$autoangle);
		//$label->set("buffer",$buffer);
		//$label->set("antialias",$antialias);
		$label->set("wrap",$_GET["wrap"]);
		$label->set("minfeaturesize",$_GET["minfeaturesize"]);
		$label->set("mindistance",$_GET["mindistance"]);
		$label->set("partials",$_GET["partials"]);
		$label->set("force",$_GET["force"]);
		$label->set("encoding",$_GET["encoding"]);

		$p = array("MS_AUTO"=>MS_AUTO,"MS_UL"=>MS_UL,"MS_LR"=>MS_LR,"MS_UR"=>MS_UR,"MS_LL"=>MS_LL,"MS_CR"=>MS_CR,"MS_CL"=>MS_CL,"MS_UC"=>MS_UC,"MS_LC"=>MS_LC,"MS_CC"=>MS_CC);
		$label->set("position",$p[$_GET["position"]]);
	}
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
function pegaEstilo()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$nclasses = $layer->numclasses;
	$classe = $layer->getclass($_GET["indiceClasse"]);
	$estilo = $classe->getstyle($_GET["indiceEstilo"]);
	$dados["symbolname"] = $estilo->symbolname;

	$dados["color"] = $estilo->color->red.",".$estilo->color->green.",".$estilo->color->blue;
	$dados["size"] = $estilo->size;
	$dados["minsize"] = $estilo->minsize;
	$dados["maxsize"] = $estilo->maxsize;
	$dados["offsetx"] = $estilo->offsetx;
	$dados["offsety"] = $estilo->offsety;

	//$dados["antialias"] = $estilo->antialias;

	$dados["backgroundcolor"] = $estilo->backgroundcolor->red.",".$estilo->backgroundcolor->green.",".$estilo->backgroundcolor->blue;
	$dados["outlinecolor"] = $estilo->outlinecolor->red.",".$estilo->outlinecolor->green.",".$estilo->outlinecolor->blue;
	$dados["width"] = $estilo->width;

	$dados["minwidth"] = $estilo->minwidth;
	$dados["maxwidth"] = $estilo->maxwidth;
	$dados["angle"] = $estilo->angle;
	$dados["codigoMap"] = $codigoMap;

	$dados["codigoLayer"] = $codigoLayer;
	$dados["indiceClasse"] = $indiceClasse;
	$dados["indiceEstilo"] = $indiceEstilo;
	$dados["type"] = $layer->type;
	return $dados;
}
function alterarEstilo()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	if(strtoupper($layer->getmetadata("metaestat")) === "SIM"){
		return "erro. Layer METAESTAT";
	}
	$nclasses = $layer->numclasses;
	$classe = $layer->getclass($_GET["indiceClasse"]);
	$estilo = $classe->getstyle($_GET["indiceEstilo"]);
	if(!empty($_GET["symbolname"])){
		$estilo->set("symbolname",$_GET["symbolname"]);
	}
	if(empty($_GET["symbolname"])){
		$estilo->set("symbolname"," ");
	}
	corE($estilo,$color,"color");

	$estilo->set("size",$_GET["size"]);
	$estilo->set("minsize",$_GET["minsize"]);
	$estilo->set("maxsize",$_GET["maxsize"]);
	$estilo->set("offsetx",$_GET["offsetx"]);
	$estilo->set("offsety",$_GET["offsety"]);
	$estilo->set("antialias",$_GET["antialias"]);
	corE($estilo,$_GET["backgroundcolor"],"backgroundcolor");
	corE($estilo,$_GET["outlinecolor"],"outlinecolor");
	$estilo->set("width",$_GET["width"]);
	$estilo->set("minwidth",$_GET["minwidth"]);
	$estilo->set("maxwidth",$_GET["maxwidth"]);
	$estilo->set("angle",$_GET["angle"]);
	//$estilo->set("opacity",$opacity);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}

function removeCabecalho($arq,$symbolset=true)
{
	global $dir_tmp;
	//remove o cache OGC
	$nomeMapfileTmp = $dir_tmp."/ogc_".md5($arq).".map";
	$nomeMapfileTmp = str_replace(",","",$nomeMapfileTmp);
	$nomeMapfileTmp = str_replace(" ","",$nomeMapfileTmp);
	chmod($nomeMapfileTmp,0777);
	unlink($nomeMapfileTmp);
	//echo $nomeMapfileTmp;exit;
	//remove o cache OGC
	$handle = fopen($arq, "r");
	if ($handle)
	{
		$cabeca = array();
		if($symbolset)
		{
			$cabeca[] = "MAP\n";
			//$final[] = "SYMBOLSET ../symbols/simbolos.sym\n";
			//$final[] = "FONTSET   ".'"'."../symbols/fontes.txt".'"'."\n";
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
	$testar = array("LEGENDAWMS","LEGENDAIMG","KEYIMAGE","TILEINDEX","TILEITEM","SYMBOL","LABELITEM","FILTERITEM","GROUP","ENCODING","TIP","CLASSE","ITENSDESC","CLASSESNOME","ITENSLINK","ESCALA","CLASSESSIMBOLO","MENSAGEM","EXTENSAO","CLASSESITEM","ESCONDIDO","CLASSESCOR","DOWNLOAD","CLASSESTAMANHO","ITENS","TEMA","APLICAEXTENSAO","IDENTIFICA","TRANSITIONEFFECT");
	foreach ($final as $f)
	{
		//
		//remove resultados em branco
		//e grava a linha
		//
		$teste = strtoupper($f);
		$teste = trim($teste);
		$teste = str_replace(array(" ","'",'"'),"",$teste);
		//$teste = str_replace("'","",$teste);
		//$teste = str_replace('"',"",$teste);
		$teste = preg_replace('/[\n\r\t ]*/', '', $teste);
		$passou = true;
		foreach ($testar as $t)
		{
			if($teste == $t){
				$passou = false;
			}
		}
		if($passou == true){
			fwrite($handle,$f);
		}
	}
	fclose($handle);
	chmod($arq, 0666);
}
function rrmdir($dir) {
	if (is_dir($dir)) {
		chmod($dir,0777);
		$objects = scandir($dir);
		foreach ($objects as $object) {
			if ($object != "." && $object != "..") {
				chmod($dir."/".$object,0777);
				if (filetype($dir."/".$object) == "dir") rrmdir($dir."/".$object); else unlink($dir."/".$object);
			}
		}
		reset($objects);
		rmdir($dir);
	}
}
?>
