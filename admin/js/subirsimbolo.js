/*
Title: uploadsimbolo de arquivo de simbolo

Envia para o servidor um arquivo shapefile local e insere como uma camada no mapa.

Veja:

<i3GEO.arvoreDeTemas.dialogo.uploadsimbolo>

Arquivo: i3geo/ferramentas/uploadsimbolo/index.js.php

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
//TODO incluir icone de upload no botao de enviar
/*
Classe: i3GEOF.uploadsimbolo
*/
i3GEOF.uploadsimbolo = {
	/*
	Variavel: aguarde

	Estilo do objeto DOM com a imagem de aguarde existente no cabe&ccedil;alho da janela.
	*/
	aguarde: "",
	/*
		Para efeitos de compatibilidade antes da vers&atilde;o 4.7 que n&atilde;o tinha dicion&aacute;rio
	*/
	criaJanelaFlutuante: function(){
		i3GEOF.uploadsimbolo.iniciaDicionario();
	},
	/*
	Function: iniciaDicionario

	Carrega o dicion&aacute;rio e chama a fun&ccedil;&atilde;o que inicia a ferramenta

	O Javascript &eacute; carregado com o id i3GEOF.nomedaferramenta.dicionario_script
	*/
	iniciaDicionario: function(){
		if(typeof(i3GEOF.uploadsimbolo.dicionario) === 'undefined'){
			i3GEO.util.scriptTag(
				i3GEO.configura.locaplic+"/ferramentas/uploadsimbolo/dicionario.js",
				"i3GEOF.uploadsimbolo.iniciaJanelaFlutuante()",
				"i3GEOF.uploadsimbolo.dicionario_script"
			);
		}
		else{
			i3GEOF.uploadsimbolo.iniciaJanelaFlutuante();
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
			$i(iddiv).innerHTML += i3GEOF.uploadsimbolo.html();
			var b = new YAHOO.widget.Button(
				"i3GEOuploadsimbolobotao1",
				{onclick:{fn: i3GEOF.uploadsimbolo.submete}}
			);
			b.addClass("rodar");
			//pega a pasta default
		}
		catch(erro){i3GEO.janela.tempoMsg(erro);}
	},
	/*
	Function: html

	Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta

	Retorno:

	String com o c&oacute;digo html
	*/
	html:function(){
		var ins = '<form id=i3GEOuploadsimbolof target="i3GEOuploadsimboloiframe" action="../php/subirsimbolo.php" method="post" ENCTYPE="multipart/form-data">' +
		'<p class="paragrafo" >'+$trad('escolha',i3GEOF.uploadsimbolo.dicionario)+': <br><br><input type="file" size=42 name="i3GEOuploadsimboloarq" style="top:0px;left:0px;cursor:pointer;"></p>';
		if(i3GEO.parametros.editor === "sim"){
			ins += '<p class="paragrafo" >'+$trad('pastaArmazenamento',i3GEOF.uploadsimbolo.dicionario)+':</p><div class="i3geoForm i3geoFormIconeEdita" style="width:300px;" ><input class=digitar type="text" name="dirDestino" id="dirDestino" ></div>';
			//ins += "<img onclick='i3GEOF.uploadsimbolo.selNavegador(\"dirDestino\")' src='"+limg+"' style='cursor:pointer;position :relative;top:2px'/></p>";
		}
		ins += '<br><p class="paragrafo" ><input id=i3GEOuploadsimbolobotao1 type="button" value="'+$trad('envia',i3GEOF.uploadsimbolo.dicionario)+'" size=12 name="submit">' +
		'<input type=hidden name=g_sid value="'+i3GEO.configura.sid+'" >' +
		'<input type="hidden" name="MAX_FILE_SIZE" value="1000000">' +
		'</form>' +
		"<p class='paragrafo' style=color:red >"+$trad('ajudaCaracter',i3GEOF.uploadsimbolo.dicionario)+"</p>" +
		'<iframe name=i3GEOuploadsimboloiframe style="text-align:left;border:1px solid gray;" width="98%" height="60px"></iframe>';
		return ins;
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.
	*/
	iniciaJanelaFlutuante: function(){
		var janela,divid,titulo,cabecalho,minimiza;
		if ($i("i3GEOF.uploadsimbolo")) {
			return;
		}
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.uploadsimbolo");
		};
		titulo = "<div class='i3GeoTituloJanela'>PNG<a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=4&idajuda=116' ><b> </b></a></div>";
		janela = i3GEO.janela.cria(
			"355px",
			"470px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.uploadsimbolo",
			false,
			"hd",
			cabecalho,
			minimiza,
			"",
			true,
			i3GEO.configura.locaplic+"/imagens/oxygen/16x16/svn-commit.png"
		);
		divid = janela[2].id;
		$i("i3GEOF.uploadsimbolo_corpo").style.backgroundColor = "white";
		i3GEOF.uploadsimbolo.aguarde = $i("i3GEOF.uploadsimbolo_imagemCabecalho").style;
		i3GEOF.uploadsimbolo.inicia(divid);
	},
	/*
	Function: submete

	Submete o arquivo ao servidor
	*/
	submete: function(){
		if(i3GEOF.uploadsimbolo.aguarde.visibility==="visible")
		{return;}
		i3GEOF.uploadsimbolo.aguarde.visibility="visible";
		$i("i3GEOuploadsimbolof").submit();
	},
	selNavegador: function(onde){
		i3GEO.util.navegadorDir(onde,false,false,false);
	}
};