/*
Title: Login

Abre di&aacute;logo de login

Arquivo:

i3geo/ferramentas/loginusuario/index.js.php

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
Voc&ecirc; deve ter recebido uma c&oacute;pia da Licen&ccedil;a P&uacute;blica Geral do
GNU junto com este programa; se n&atilde;o, escreva para a
Free Software Foundation, Inc., no endere&ccedil;o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEOF) === 'undefined'){
	var i3GEOF = {};
}
/*
Classe: i3GEOF.loginusuario
*/
i3GEOF.loginusuario = {
	/*
	Variavel: aguarde

	Estilo do objeto DOM com a imagem de aguarde existente no cabe&ccedil;alho da janela.
	*/
	aguarde: "",
	MUSTACHE : "",
	/**
	 * Susbtitutos para o template
	 */
	mustacheHash : function() {
		var usuario = i3GEO.util.pegaCookie("i3geousuariologin"),
			dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.loginusuario.dicionario),
			u = "";

		dicionario["locaplic"] = i3GEO.configura.locaplic;
		dicionario["ativo"] = $trad('x30');
		dicionario["usuario"] = $trad('x27');
		dicionario["senha"] = $trad('x28');
		dicionario["enviar"] = $trad('x29');
		dicionario["recuperar"] = $trad('x32');
		dicionario["alterar"] = $trad('x52');
		dicionario["user"] = i3GEO.util.pegaCookie("i3geousuariologin");

		if(!usuario || !i3GEO.util.pegaCookie("i3GeoLogin") || i3GEO.util.pegaCookie("i3geousuariologin") == "" || i3GEO.util.pegaCookie("i3GeoLogin") == ""){
			u = "-";
		}
		else{
			u = i3GEO.util.pegaCookie("i3geousuarionome") + " - " + i3GEO.util.pegaCookie("i3geousuariologin");
		}

		dicionario["usuarioLogado"] = u;
		return dicionario;
	},
	/*
		Para efeitos de compatibilidade antes da vers&atilde;o 4.7 que n&atilde;o tinha dicion&aacute;rio
	*/
	criaJanelaFlutuante: function(){
		i3GEOF.loginusuario.iniciaDicionario();
	},
	/*
	Function: iniciaDicionario

	Carrega o dicion&aacute;rio e chama a fun&ccedil;&atilde;o que inicia a ferramenta

	O Javascript &eacute; carregado com o id i3GEOF.nomedaferramenta.dicionario_script
	*/
	iniciaDicionario: function(){
		if(typeof(i3GEOF.loginusuario.dicionario) === 'undefined'){
			i3GEO.util.scriptTag(
				i3GEO.configura.locaplic+"/ferramentas/loginusuario/dicionario.js",
				"i3GEOF.loginusuario.iniciaJanelaFlutuante()",
				"i3GEOF.loginusuario.dicionario_script"
			);
		}
		else{
			i3GEOF.loginusuario.iniciaJanelaFlutuante();
		}
	},
	/*
	Function: inicia

	Inicia a ferramenta. &Eacute; chamado por criaJanelaFlutuante

	Parametro:

	iddiv {String} - id do div que receber&aacute; o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		try{
			$i(iddiv).innerHTML = i3GEOF.loginusuario.html();
			if(typeof(YAHOO) != "undefined"){
				new YAHOO.widget.Button(
					"i3GEOFloginusuario",
					{onclick:{fn: i3GEOF.loginusuario.enviar}}
				);
				new YAHOO.widget.Button(
					"i3GEOFlogoutusuario",
					{onclick:{fn: i3GEO.login.dialogo.abreLogout}}
				);
			}
		}
		catch(erro){alert(erro);}
	},
	/*
	Function: html

	Gera o c&oacute;digo html para apresentacao das op&ccedil;&otilde;es da ferramenta

	Retorno:

	String com o c&oacute;digo html
	*/
	html:function(){
		var ins = Mustache.render(i3GEOF.loginusuario.MUSTACHE, i3GEOF.loginusuario.mustacheHash());
		return ins;
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.
	*/
	iniciaJanelaFlutuante: function(){
		var minimiza,cabecalho,janela,divid,titulo;
		if ($i("i3GEOF_loginusuario")) {
			//para o caso do uso do bootstrap
			if(typeof(YAHOO) == "undefined"){
				i3GEOF.loginusuario.inicia("i3GEOF_loginusuario");
			}
			return;
		}
		//cria a janela flutuante
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF_loginusuario");
		};
		titulo = "<img style='position:relative;left:0px;top:5px;' src='"+i3GEO.configura.locaplic+"/imagens/oxygen/16x16/dialog-password.png' >&nbsp;Login";
		janela = i3GEO.janela.cria(
			"270px",
			"",
			"",
			"",
			"",
			titulo,
			"i3GEOF_loginusuario",
			false,
			"hd",
			cabecalho,
			minimiza,
			"",
			false
		);
		divid = janela[2].id;
		janela[0].cfg.setProperty("constraintoviewport",false);
		i3GEOF.loginusuario.aguarde = $i("i3GEOF_loginusuario_imagemCabecalho").style;
		$i("i3GEOF_loginusuario_corpo").style.backgroundColor = "#F2F2F2";
		i3GEOF.loginusuario.inicia(divid);
	},
	/*
	Function: enviar

	Envia os dados de login
	*/
	enviar: function(){
		var u = $i("i3geousuario").value,
			s = $i("i3geosenha").value,
			temp,p,cp;
		if(i3GEOF.loginusuario.aguarde.visibility === "visible"){
			return;
		}
		i3GEOF.loginusuario.aguarde.visibility = "visible";
		if(u == "" || s == ""){
			i3GEOF.loginusuario.aguarde.visibility = "hidden";
			return;
		}
		temp = function(retorno){
			i3GEOF.loginusuario.aguarde.visibility = "hidden";
			if(!retorno || !retorno.data || retorno.data == "erro" || retorno.data == "logout"){
				if(i3GEO.login.funcaoLoginErro){
					i3GEO.login.funcaoLoginErro.call();
				}
				else{
					alert($trad("x31"));
				}
				if(i3GEO.parametros){
					i3GEO.parametros.editor = "nao";
					i3GEO.arvoreDeTemas.atualiza();
				}
			}
			else{
				i3GEO.util.insereCookie("i3geocodigologin",retorno.data.id,1);
				i3GEO.util.insereCookie("i3geousuariologin",u,1);
				i3GEO.util.insereCookie("i3geousuarionome",retorno.data.nome,1);
				if(!typeof(YAHOO) == "undefined"){
					i3GEO.janela.destroi("i3GEOF_loginusuario");
				}
				if(i3GEO.login.recarrega === true){
					document.location.reload();
					return;
				}
				if($i(i3GEO.login.divnomelogin)){
					$i(i3GEO.login.divnomelogin).innerHTML = retorno.data.nome;
				}
				if(i3GEO.login.funcaoLoginOk){
					i3GEO.login.funcaoLoginOk.call();
				}
				else{
					alert("Login OK -> "+retorno.data.nome);
				}
				if(i3GEO.parametros){
					i3GEO.parametros.editor = retorno.data.editor;
					i3GEO.arvoreDeTemas.atualiza();
				}
			}
		};
		p = i3GEO.configura.locaplic+"/admin/php/login.php?funcao=login";
		cp = new cpaint();
		cp.set_transfer_mode("POST");
		cp.set_response_type("JSON");
		cp.call(p,"login",temp,"&usuario="+u+"&senha="+s);
	},
	recuperarSenha: function(){
		var u = $i("i3geousuario").value,
		temp,cp;
		if(u == ""){
			alert($trad("x27"));
			return;
		}
		temp = function(retorno){
			if(retorno.data == true ){
				alert("ok");
			}
			else{
				alert($trad("x31"));
			}
		};
		p = i3GEO.configura.locaplic+"/admin/php/login.php?funcao=recuperarSenha";
		cp = new cpaint();
		cp.set_transfer_mode("POST");
		cp.set_response_type("JSON");
		cp.call(p,"login",temp,"&usuario="+u);
	},
	alterarSenha: function(){
		var u = $i("i3geousuario").value,
		temp,cp,novaSenha;
		novaSenha = window.prompt("Nova senha");
		if(u == ""){
			alert($trad("x27"));
			return;
		}
		temp = function(retorno){
			if(retorno.data == true ){
				alert("ok");
			}
			else{
				alert($trad("x31"));
			}
		};
		if(novaSenha != ""){
			p = i3GEO.configura.locaplic+"/admin/php/login.php?funcao=alterarSenha";
			cp = new cpaint();
			cp.set_transfer_mode("POST");
			cp.set_response_type("JSON");
			cp.call(p,"login",temp,"&usuario="+u+"&novaSenha="+novaSenha);
		}
	}
};
