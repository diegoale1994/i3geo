<?php
/*
Title: funcoes_login.php

Controle das requisi&ccedil;&otilde;es em Ajax utilizadas para gerenciar login de usu&aacute;rio e controle de acesso

Recebe as requisi&ccedil;&otilde;es feitas em JavaScript (AJAX) e retorna o resultado para a interface.

O par&acirc;metro "funcao" define qual a opera&ccedil;&atilde;o que ser&aacute; executada. Esse par&acirc;metro &eacute; verificado em um bloco "switch ($funcao)".

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Edmar Moretti
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

i3geo/classesphp/funcoes_login.php

Parametros:

funcao - op&ccedil;&atilde;o que ser&aacute; executada (veja abaixo a lista de Valores que esse par&acirc;metro pode assumir).

Retorno:

O resultado da opera&ccedil;&atilde;o ser&aacute; retornado em um objeto CPAINT.

A constru&ccedil;&atilde;o da string JSON &eacute; feita preferencialmente pelas fun&ccedil;&otilde;es nativas do PHP.
Para efeitos de compatibilidade, uma vez que at&eacute; a vers&atilde;o 4.2 a string JSON era construida pelo CPAINT,
o objeto CPAINT ainda &eacute; definido, por&eacute;m, a fun&ccedil;&atilde;o cpjson verifica se as fun&ccedil;&otilde;es nativas do PHPO (json)
est&atilde;o instaladas, se estiverem, utiliza-se a fun&ccedil;&atilde;o nativa, se n&atilde;o, utiliza-se o CPAINT para gerar o JSON.

Exemplo de chamada CPAINT (Ajax) do lado do cliente (javascript):

var p = "classesphp/mapa_controle.php?funcao=crialente&resolucao=1.5&g_sid="+g_sid

var cp = new cpaint()

cp.set_response_type("JSON")

cp.call(p,"lente",ajaxabrelente)

*/
error_reporting(0);
//
//pega as variaveis passadas com get ou post
//
include_once(dirname(__FILE__)."/../safe.php");
include_once(dirname(__FILE__)."/admin.php");

//verifica se o login pode ser realizado
if(isset($i3geoPermiteLogin) && $i3geoPermiteLogin == false){
	header ( "HTTP/1.1 403 Login desativado" );
	exit ();
}
//$i3geoPermiteLoginIp vem de ms_configura.php
if(isset($i3geoPermiteLoginIp)){
	checaLoginIp($i3geoPermiteLoginIp);
}

error_reporting(0);
session_write_close();
session_name("i3GeoLogin");
//se o usuario estiver tentando fazer login
if(!empty($_POST["usuario"]) && !empty($_POST["senha"])){
	logoutUsuario();
	session_regenerate_id();
	$_SESSION = array();
	session_start();
	$funcao = "login";
}
else{//se nao, verifica se o login ja existe realmente
	if(!empty($_COOKIE["i3geocodigologin"])){
		session_id($_COOKIE["i3geocodigologin"]);
		session_start();
		if($_SESSION["usuario"] != $_COOKIE["i3geousuariologin"]){
			logoutUsuario();
			cpjson("logout");
		}
	}
	else{//caso nao exista, retorna um erro
		logoutUsuario();
		cpjson("erro");
	}
}
//var_dump($_SESSION);exit;
$retorno = "logout"; //string que ser&aacute; retornada ao browser via JSON
switch (strtoupper($funcao))
{
	/*
	Valor: LOGIN

	Verifica usu&aacute;rio e senha e registra id da sessao que guarda o resultado.

	*/
	case "LOGIN":
		$usuario = $_POST["usuario"];
		$senha = $_POST["senha"];

		$teste = autenticaUsuario($usuario,$senha);
		if($teste == "muitas tentativas"){
			logoutUsuario();
			header ( "HTTP/1.1 403 Muitas tentativas" );
			exit;
		}
		if($teste != false){
			$_SESSION["usuario"] = $usuario;
			$_SESSION["id_usuario"] = $teste["usuario"]["id_usuario"];
			$_SESSION["senha"] = $senha;
			$_SESSION["papeis"] = $teste["papeis"];
			$_SESSION["operacoes"] = $teste["operacoes"];
			$_SESSION["gruposusr"] = $teste["gruposusr"];
			$fingerprint = 'I3GEOLOGIN' . $_SERVER['HTTP_USER_AGENT'];
			//var_dump($_SESSION["operacoes"]);exit;
			$_SESSION['fingerprint'] = md5($fingerprint . session_id());
			$editor = "nao";
			foreach($_SESSION["papeis"] as $p){
				if($p < 3){
					$editor = "sim";
				}
			}
			$retorno = array("id"=>session_id(),"nome"=>$teste["usuario"]["nome_usuario"],"editor"=>$editor);
			cpjson($retorno);
		}
		else{
			logoutUsuario();
			cpjson("logout");
		}
	break;
	/*
	Valor: VALIDAOPERACAOUSUARIO

	Verifica se um usuario pode executar uma operacao

	Para que o usuario possa executar a operacao, o papel ao qual ele pertence deve estar registrado em operacoespaeis no banco de administracao

	Se $operacao for vazio, e retornado "sim", o que permite que a verificacao apenas confirme que o login esta correto na sessao

	Paremeter:

	$operacao - operacao que sera verificada
	*/
	case "VALIDAOPERACAOSESSAO":
		$retorno = "nao";
		if($_GET["operacao"] == ""){
			$retorno = "sim";
		}
		else{
			if(verificaOperacaoSessao($_GET["operacao"]) == true){
				$retorno = "sim";
			}
			else{
				//logoutUsuario();
				$retorno = "naopermitido";
			}
		}
		cpjson($retorno);
	break;
	/*
	Valor: RECUPERARSENHA

	Cria uma nova senha para um usuario enviando-a por e-mailo

	Paremeter:

	$usuario
	*/
	case "RECUPERARSENHA":
		$retorno = false;
		if(!empty($_POST["usuario"])){
			$retorno = recuperarSenha($_POST["usuario"]);
		}
		cpjson($retorno);
	break;
	/*
	Valor: ALTERARSENHA

	Altera a senha de um usuario

	Paremeter:

	$usuario

	$novasenha
	*/
	case "ALTERARSENHA":
		$retorno = false;
		if(!empty($_POST["usuario"])){
			$retorno = alterarSenha($_POST["usuario"],$_POST["novaSenha"]);
		}
		cpjson($retorno);
	break;
}
function alterarSenha($usuario,$novaSenha){
	include(dirname(__FILE__)."/conexao.php");
	$dados = pegaDados("select * from ".$esquemaadmin."i3geousr_usuarios where senha = '".md5($_SESSION["senha"])."' and login = '$usuario' and ativo = 1",$locaplic);
	if(count($dados) > 0){
		$dbhw->query("UPDATE ".$esquemaadmin."i3geousr_usuarios SET senha='".md5($novaSenha)."' WHERE login = '$usuario'");
		$_SESSION["senha"] = $novaSenha;
		$to      = $dados[0]["email"];
		$subject = 'nova senha i3geo';
		$message = "Sua senha foi alterada";
		mail($to, $subject, $message);
		return true;
	}
	else{
		return false;
	}
}
function recuperarSenha($usuario){
	include(dirname(__FILE__)."/conexao.php");
	$novaSenha = rand(9000,1000000);
	$dados = pegaDados("select * from ".$esquemaadmin."i3geousr_usuarios where login = '$usuario' and ativo = 1",$locaplic);
	if(count($dados) > 0){
		$dbhw->query("UPDATE ".$esquemaadmin."i3geousr_usuarios SET senha='".md5($novaSenha)."' WHERE login = '$usuario'");
		$to      = $dados[0]["email"];
		$subject = 'nova senha i3geo';
		$message = $novaSenha;
		mail($to, $subject, $message);
		return true;
	}
	else{
		return false;
	}
}
//
//verifica se um determinado papel esta registrado na variavel SESSION
//
function verificaPapelSessao($id_papel){
	$resultado = false;
	if(validaSessao()){
		foreach($_SESSION["papeis"] as $p){
			if($p["id_papel"] == 1 || $p["id_papel"] == $id_papel){
				return true;
			}
		}
	}
	return $resultado;
}
//
//verifica se uma determinada operacao esta registrada na variavel SESSION
//
function verificaOperacaoSessao($operacao){

	$resultado = false;
	//a validacao consulta $_SESSION, que e definida no login
	if(validaSessao()){
		//verifica se e administrador, caso positivo, permite qq operacao
		foreach($_SESSION["papeis"] as $p){
			if($p == 1){
				return true;
			}
		}
		if(!empty($_SESSION["operacoes"][$operacao])){
			$resultado = true;
		}
	}
	return $resultado;
}
//
//verifica se o usuario esta logado
//
function validaSessao(){
	$fingerprint = 'I3GEOLOGIN' . $_SERVER['HTTP_USER_AGENT'];
	if($_SESSION['fingerprint'] != md5($fingerprint . session_id())){
		return false;
	}
	if($_SESSION["usuario"] != $_COOKIE["i3geousuariologin"]){
		return false;
	}
	return true;
}
//
//faz a autenticacao de um usuario baseado no login e senha
//registra as operacoes, papeis e grupos do usuario na SESSION
//
function autenticaUsuario($usuario,$senha){
	include(dirname(__FILE__)."/conexao.php");
	$senhamd5 = md5($senha);
	$senhaHash = password_hash($senha, PASSWORD_DEFAULT);
	//faz um teste de tentativas de acesso
	$nomeArquivo = $dir_tmp."/a".md5($usuario."testeTentativas").intval(time() / 1000);
	if(!file_exists($dir_tmp)){
		return false;
	}
	if(file_exists($nomeArquivo)){
		$tentativas = (int) file_get_contents($nomeArquivo);
		if($tentativas > 3){
			return "muitas tentativas";
		}
		$tentativas = $tentativas + 1;
		file_put_contents($nomeArquivo, $tentativas);
	}
	else {
		file_put_contents($nomeArquivo, 1);
	}
	//verifica se o usuario esta cadastrado no ms_configura.php em $i3geomaster
	//echo "select * from ".$esquemaadmin."i3geousr_usuarios where login = '$usuario' and (senha = '$senhamd5' or senha = '$senha') and ativo = 1";exit;
	//exit;
	if(verificaMaster($usuario,$senha) == true){
		$pa = pegaDados("select * from ".$esquemaadmin."i3geousr_papelusuario ",$dbh,false);
		$op = pegadados("SELECT O.codigo FROM ".$esquemaadmin."i3geousr_operacoes AS O",$dbh,false);
		$gr = pegadados("SELECT * from ".$esquemaadmin."i3geousr_grupos ",$dbh,false);
		//var_dump($gr);exit;
		$operacoes = array();
		foreach($op as $o){
			$operacoes[$o["codigo"]] = true;
		}
		$papeis = array();
		foreach($pa as $p){
			$papeis[] = $p["id_papel"];
		}
		$gruposusr = array();
		foreach($gr as $p){
			$gruposusr[] = $p["id_grupo"];
		}
		$master = array();
		$master["id_usuario"] = "master";
		$master["nome_usuario"] = "master";
		$r = array("usuario"=>$master,"papeis"=>$papeis,"operacoes"=>$operacoes,"gruposusr"=>$gruposusr);
		$dbh = null;
		$dbhw = null;
		file_put_contents($nomeArquivo, 1);
		return $r;
	}
	else{
		//verifica se a senha e uma string ou pode ser um md5
		$ok = false;
		$dados = array();
		if(strlen($senha) == 32){
			$dados = pegaDados("select id_usuario,nome_usuario from ".$esquemaadmin."i3geousr_usuarios where login = '$usuario' and senha = '$senhamd5' and ativo = 1",$dbh,false);
		}
		else{
			$dados = pegaDados("select id_usuario,nome_usuario from ".$esquemaadmin."i3geousr_usuarios where login = '$usuario' and (senha = '$senhamd5' or senha = '$senha') and ativo = 1",$dbh,false);
		}
		if(count($dados) > 0){
			$ok = true;
		}
		//testa tambem com a nova forma de armazenamento de senha usando password_hash
		if($ok == false){
			$usuarios = pegaDados("select senha,id_usuario,nome_usuario from ".$esquemaadmin."i3geousr_usuarios where login = '$usuario' and ativo = 1",$dbh,false);
			foreach($usuarios as $d){
				if (password_verify($d["senha"], $senhaHash)){
					$ok = true;
					$dados = array("id_usuario"=>$d["id_usuario"],"nome_usuario"=>$d["nome_usuario"]);
				}
			}
			$usuarios = null;
		}
		if($ok == true){
			$pa = pegaDados("select * from ".$esquemaadmin."i3geousr_papelusuario where id_usuario = ".$dados[0]["id_usuario"],$dbh,false);
			$op = pegadados("SELECT O.codigo, PU.id_usuario FROM ".$esquemaadmin."i3geousr_operacoes AS O JOIN ".$esquemaadmin."i3geousr_operacoespapeis AS OP ON O.id_operacao = OP.id_operacao JOIN ".$esquemaadmin."i3geousr_papelusuario AS PU ON OP.id_papel = PU.id_papel	WHERE id_usuario = ".$dados[0]["id_usuario"],$dbh,false);
			$gr = pegadados("SELECT * from ".$esquemaadmin."i3geousr_grupousuario where id_usuario = ".$dados[0]["id_usuario"],$dbh,false);
			$operacoes = array();
			foreach($op as $o){
				$operacoes[$o["codigo"]] = true;
			}
			$papeis = array();
			foreach($pa as $p){
				$papeis[] = $p["id_papel"];
			}
			$gruposusr = array();
			foreach($gr as $p){
				$gruposusr[] = $p["id_grupo"];
			}
			$r = array("usuario"=>$dados[0],"papeis"=>$papeis,"operacoes"=>$operacoes,"gruposusr"=>$gruposusr);
			$dbh = null;
			$dbhw = null;
			file_put_contents($nomeArquivo, 1);
			return $r;
		}
		else{
			$dbh = null;
			$dbhw = null;
			return false;
		}
	}
}
//
//faz o logout do usuario destruindo os cookies e session
//
function logoutUsuario(){
	$_COOKIE = array();
	$_SESSION = array();
	session_destroy();
}
?>
