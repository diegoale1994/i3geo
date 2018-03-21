/*
Title: Salva mapa

Faz o download do mapfile atualmente em uso. Posteriormente, o mapfile pode ser enviado de volta ao servidor para restaurar o mapa

Veja:

<i3GEO.mapa.dialogo.salvaMapa>

Arquivo: i3geo/ferramentas/salvamapa/index.js.php

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
Classe: i3GEOF.salvaMapa
*/
i3GEOF.salvaMapa = {
	/*
	Variavel: aguarde

	Estilo do objeto DOM com a imagem de aguarde existente no cabe&ccedil;alho da janela.
	*/
	aguarde: "",
	/**
	 * Template no formato mustache. E preenchido na carga do javascript com o programa dependencias.php
	 */
	MUSTACHE : "",
	/**
	 * Susbtitutos para o template
	 */
	mustacheHash : function() {
		var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.salvaMapa.dicionario);
		return dicionario;
	},
	/*
	Function: inicia

	Inicia a ferramenta. &Eacute; chamado por criaJanelaFlutuante

	Parametro:

	iddiv {String} - id do div que receber&aacute; o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		$i(iddiv).innerHTML = i3GEOF.salvaMapa.html();
		var temp = function(dados){
				i3GEOF.salvaMapa.htmlMapaLocal("i3GEOFsalvaMapaLocal");
				i3GEOF.salvaMapa.htmlMapaBanco("i3GEOFsalvaMapaBanco");
			},
			atualiza = true,
			geo = false;
		if(i3GEO.Interface.ATUAL === "googlemaps" || i3GEO.Interface.ATUAL === "googleearth"){
			atualiza = false;
			geo = true;
		}
		i3GEO.php.mudaext(temp,"nenhum",i3GEO.parametros.mapexten,i3GEO.configura.locaplic,i3GEO.configura.sid,atualiza,geo);
	},
	htmlMapaBanco: function(onde){
		onde = $i(onde);
		if(onde){
			try{
				onde.innerHTML = "<a style='line-height:20px;font-size:12px;' href='#' onclick='i3GEOF.salvaMapa.salvaMapaBanco()' >"+$trad('salvaMapa',i3GEOF.salvaMapa.dicionario)+"</a><br>" +
					"<a style='line-height:20px;font-size:12px;' href='#' onclick='i3GEO.mapa.dialogo.listaDeMapasBanco()'>"+$trad('listaMapas',i3GEOF.salvaMapa.dicionario)+"</a><br>" +
					"<a style='line-height:20px;font-size:12px;' href='"+i3GEO.configura.locaplic+"/admin/html/mapas.html' target='_blank' >"+$trad('editaListaMapas',i3GEOF.salvaMapa.dicionario)+"</a>";
			}
			catch(erro){i3GEO.janela.tempoMsg(erro);}
		}
	},
	htmlMapaLocal: function(onde){
		onde = $i(onde);
		if(onde){
			try{
				var down = i3GEO.configura.locaplic+"/ferramentas/salvamapa/forcedownload.php?g_sid=" + i3GEO.configura.sid;
				onde.innerHTML = "" +
					"<a style='line-height:20px;font-size:12px;' href='"+down+"' target='_blank' >"+$trad('baixaArquivo',i3GEOF.salvaMapa.dicionario)+"</a><br>";
			}
			catch(erro){i3GEO.janela.tempoMsg(erro);}
		}
	},
	salvaMapaBanco: function(){
		var texto,funcaoOK,login = i3GEO.login.verificaCookieLogin();
		if(login === false){
			i3GEO.login.dialogo.abreLogin();
		}
		else{
			funcaoOK = function(){
				var temp,
					id_mapa = $i("i3GEOFsalvamapaMapaId").value,
					titulo = $i("i3GEOjanelaprompt").value;
				if(titulo === ""){
					return;
				}
				temp = function(retorno){
					if(retorno.id && retorno.id != ""){
						i3GEO.janela.tempoMsg($trad('msgMapaSalvo',i3GEOF.salvaMapa.dicionario));
					}
					else{
						if(retorno.status){
							i3GEO.janela.tempoMsg(retorno.status);
						}
						else{
							i3GEO.janela.tempoMsg(retorno);
						}
					}
				};
				i3GEO.php.salvaMapaBanco(temp,titulo,id_mapa,$i("i3GEOFsalvaPref").checked,true,true,true);
			};
			texto = $trad('atualizaIdMapa',i3GEOF.salvaMapa.dicionario)+"<br><div id=i3GEOFsalvamapaMapa  ></div><br><br><input style='position:relative;top:2px;' checked type=checkbox id=i3GEOFsalvaPref />"+$trad('salvaPreferencias',i3GEOF.salvaMapa.dicionario);
			i3GEO.janela.prompt(texto + "<br><br>"+$trad('tituloMapa',i3GEOF.salvaMapa.dicionario),funcaoOK);
			i3GEOF.salvaMapa.comboMapas("i3GEOFsalvamapaMapa");
		}
	},
	/*
	Function: html

	Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta

	Retorno:

	String com o c&oacute;digo html
	*/
	html: function() {
		var ins = Mustache.render(i3GEOF.salvaMapa.MUSTACHE, i3GEOF.salvaMapa.mustacheHash());
		return ins;
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.
	*/
	iniciaJanelaFlutuante: function(){
		var janela,divid,titulo;
		if ($i("i3GEOF.salvaMapa")) {
			return;
		}
		titulo = "<div class='i3GeoTituloJanela'>" + $trad("u17")+"<a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=2&idajuda=10' ><b> </b></a></div>";
		janela = i3GEO.janela.cria(
			"300px",
			"180px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.salvaMapa",
			false,
			"hd",
			"",
			"",
			"",
			true,
			i3GEO.configura.locaplic+"/imagens/oxygen/16x16/document-save.png"
		);
		divid = janela[2].id;
		i3GEOF.salvaMapa.aguarde = $i("i3GEOF.salvaMapa_imagemCabecalho").style;
		i3GEOF.salvaMapa.inicia(divid);
	},
	comboMapas: function(onde){
		var	p = i3GEO.configura.locaplic+"/admin/php/mapas.php?funcao=pegaMapas",
			combo = function(retorno){
				var n = retorno.length,
					i,
					ins = "" +
					"<select id='i3GEOFsalvamapaMapaId' onchange='$i(\"i3GEOjanelaprompt\").value = this.options[this.selectedIndex].text'>" +
					"	<option value=''>---</option>";
				for(i=0;i<n;i++){
					ins += 	"<option value='"+retorno[i].id_mapa+"'>"+retorno[i].nome_mapa+"</option>";
				}
				ins += "</select>";
				$i(onde).innerHTML = ins;
			};
		i3GEO.util.ajaxGet(p,combo);
	}
};
