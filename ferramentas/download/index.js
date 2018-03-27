/*
Title: Download de um tema

Faz o download de um tema existente na &aacute;rvore de camadas.

Veja:

<i3GEO.tema.dialogo.download>

Arquivo:

i3geo/ferramentas/download/index.js.php

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
Classe: i3GEOF.download
*/
i3GEOF.download = {
	/*
		Para efeitos de compatibilidade antes da vers&atilde;o 4.7 que n&atilde;o tinha dicion&aacute;rio
	*/
	criaJanelaFlutuante: function(tema){
		i3GEOF.download.iniciaDicionario(tema);
	},
	/*
	Function: iniciaDicionario

	Carrega o dicion&aacute;rio e chama a fun&ccedil;&atilde;o que inicia a ferramenta

	O Javascript &eacute; carregado com o id i3GEOF.nomedaferramenta.dicionario_script
	*/
	iniciaDicionario: function(tema){
		if(typeof(i3GEOF.download.dicionario) === 'undefined'){
			if(!tema){
				i3GEO.util.scriptTag(
					i3GEO.configura.locaplic+"/ferramentas/download/dicionario.js",
					"i3GEOF.download.iniciaJanelaFlutuante()",
					"i3GEOF.download.dicionario_script"
				);
			}
			else{
				i3GEO.util.scriptTag(
					i3GEO.configura.locaplic+"/ferramentas/download/dicionario.js",
					"i3GEOF.download.iniciaJanelaFlutuante('"+tema+"')",
					"i3GEOF.download.dicionario_script"
				);
			}
		}
		else{
			i3GEOF.download.iniciaJanelaFlutuante(tema);
		}
	},
	/*
	Function: html

	Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta

	Veja:

	<DOWNLOAD2>

	Parametros:

	divid {String} - id do div que receber&aacute; o conteudo HTML da ferramenta

	tema {String} - c&oacute;digo do tema
	*/
	html:function(divid,tema){
		var cp,p,ins,mostraDownload,c;
		ins = '<p class="paragrafo" >'+$trad('download',i3GEOF.download.dicionario)+'</p>';
		ins += '<p class="paragrafo" ><div id=i3GEOdownloadResultado ></div>';
		$i(divid).innerHTML += ins;
		c = i3GEO.arvoreDeCamadas.pegaTema(tema);
		//wms
		if(c.connectiontype === 7){
			i3GEOF.download.aguarde.visibility = "hidden";
			ins = c.wmsurl.replace("wms","wfs")+"&typeName="+c.wmsname+"&SERVICE=wfs&REQUEST=getFeature";
			$i("i3GEOdownloadResultado").innerHTML = "<a target='_blank' href='"+ins+"' >"+ins+"</a>";
		}
		else{
			mostraDownload = function(retorno){
				var ins = "",
					arqs,n,arq, temp;
				if (retorno.data != undefined){
					retorno = retorno.data;
					arqs = retorno.arquivos.split(",");
					n = arqs.length;
					if(retorno == "erro"){
						ins = "<p style=color:red >"+$trad('erroTema',i3GEOF.download.dicionario)+"<br>";
					}
					else{
						for (arq=0;arq<n;arq++){
							ins += "<a href='"+window.location.protocol+"//"+window.location.host+"/"+arqs[arq]+"'>"+arqs[arq]+"</a><br>";
						}
					}
					if(retorno.nreg){
						ins += "<br><br>"+$trad('registros',i3GEOF.download.dicionario)+" ="+retorno.nreg;
					}
					ins += "<br><br>"+$trad('pagdownload',i3GEOF.download.dicionario);
					temp = i3GEO.configura.locaplic+"/datadownload.htm?tema="+tema+"&temaDownload="+tema;
					ins += "<a href='"+temp+"' target=_blank >"+temp+"</a>";

				}
				else{
					ins = "<p style=color:red >"+$trad("x66")+"<br>";
				}
				$i("i3GEOdownloadResultado").innerHTML = ins;
				i3GEOF.download.aguarde.visibility = "hidden";
			};
			p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=download2&tema="+tema;
			cp = new cpaint();
			cp.set_response_type("JSON");
			cp.call(p,"downloadTema",mostraDownload);
		}
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.

	Parametros:

	tema {String} - c&oacute;digo do tema
	*/
	iniciaJanelaFlutuante: function(tema){
		var janela,divid,titulo;
		if($i("i3GEOF.download")){
			return;
		}
		if(arguments.length == 0)
		{tema = i3GEO.temaAtivo;}
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.download");
		};
		titulo = "<div class='i3GeoTituloJanela'>Download<a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=2&idajuda=82' ><b> </b></a></div>";
		janela = i3GEO.janela.cria(
			"300px",
			"200px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.download",
			false,
			"hd",
			cabecalho,
			minimiza,
			"",
			true,
			i3GEO.configura.locaplic+"/imagens/oxygen/16x16/download.png"
		);
		divid = janela[2].id;
		i3GEOF.download.aguarde = $i("i3GEOF.download_imagemCabecalho").style;
		i3GEOF.download.aguarde.visibility = "visible";
		i3GEOF.download.html(divid,tema);
	}
};