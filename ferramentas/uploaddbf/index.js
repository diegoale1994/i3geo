/*
Title: Upload de arquivo dbf

Envia para o servidor um arquivo local (dbf ou csv) e insere como uma camada no mapa.

Veja:

<i3GEO.arvoreDeTemas.dialogo.uploaddbf>

Arquivo: i3geo/ferramentas/uploaddbf/index.js.php

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
if(typeof(i3GEOF) === 'undefined'){
	var i3GEOF = {};
}
/*
Classe: i3GEOF.uploaddbf
*/
i3GEOF.uploaddbf = {
	/*
	Variavel: aguarde

	Estilo do objeto DOM com a imagem de aguarde existente no cabe&ccedil;alho da janela.
	*/
	aguarde: "",
	/**
	 * Susbtitutos para o template
	 */
	mustacheHash : function() {
		var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.uploaddbf.dicionario);
		dicionario["locaplic"] = i3GEO.configura.locaplic;
		dicionario["sid"] = i3GEO.configura.sid;
		return dicionario;
	},
	/*
	Function: inicia

	Inicia a ferramenta. &Eacute; chamado por criaJanelaFlutuante

	Parametro:

	iddiv {String} - id do div que receber&aacute; o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		try{
			$i(iddiv).innerHTML += i3GEOF.uploaddbf.html();
			var b = new YAHOO.widget.Button(
				"i3GEOuploaddbfbotao1",
				{onclick:{fn: i3GEOF.uploaddbf.submete}}
			);
			b.addClass("rodar");
			i3GEO.util.radioEpsg(
				function(retorno)
				{$i("i3GEOuploaddbfListaepsg").innerHTML = retorno.dados;},
				"i3GEOuploaddbfListaepsg",
				"uploaddbf"
			);
		}
		catch(erro){i3GEO.janela.tempoMsg(erro);}
	},
	/*
	Function: html

	Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta

	Retorno:

	String com o c&oacute;digo html
	*/
	html:function() {
		var ins = Mustache.render(i3GEOF.uploaddbf.MUSTACHE, i3GEOF.uploaddbf.mustacheHash());
		return ins;
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.
	*/
	iniciaJanelaFlutuante: function(){
		var janela,divid,titulo,cabecalho,minimiza;
		if ($i("i3GEOF.uploaddbf")) {
			return;
		}
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.uploaddbf");
		};
		titulo = "<span class='i3GEOiconeFerramenta i3GEOiconeUpload'></span>"
			+ "<div class='i3GeoTituloJanela'>" + $trad("a2b")+"<a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=4&idajuda=26' ><b> </b></a></div>";
		janela = i3GEO.janela.cria(
			"320px",
			"480px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.uploaddbf",
			false,
			"hd",
			cabecalho,
			minimiza,
			"",
			true
		);
		divid = janela[2].id;
		$i("i3GEOF.uploaddbf_corpo").style.backgroundColor = "white";
		i3GEOF.uploaddbf.aguarde = $i("i3GEOF.uploaddbf_imagemCabecalho").style;
		i3GEOF.uploaddbf.inicia(divid);
	},
	/*
	Function: submete

	Envia o arquivo ao servidor
	*/
	submete: function(){
		if(i3GEOF.uploaddbf.aguarde.visibility==="visible")
		{return;}
		i3GEOF.uploaddbf.aguarde.visibility="visible";
		$i("i3GEOuploaddbff").submit();
	}
};
