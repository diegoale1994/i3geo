/*
Title: Busca de dados nos atributos de um tema

O tema alvo &eacute; o definido na vari&aacute;vel i3GEO.temaAtivo

Veja:

<i3GEO.tema.dialogo.procuraratrib>

Arquivo:

i3geo/ferramentas/busca/index.js.php

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
Class: i3GEOF.busca
*/
i3GEOF.busca = {
	/*
	Variavel: nbuscas

	N&uacute;mero de buscas j&aacute; feitas. Utilizado para posicionar as janelas de resultados.
	*/
	nbuscas: 0,
	/*
	Variavel: aguarde

	Objeto DOM com a imagem de aguarde existente no cabe&ccedil;alho da janela.
	*/
	aguarde: "",
	/*
	Variavel: tema

	C&oacute;digo do tema utilizado na busca
	*/
	tema: i3GEO.temaAtivo,
	/**
	 * Template no formato mustache. E preenchido na carga do javascript com o programa dependencias.php
	 */
	MUSTACHE : "",
	/**
	 * Susbtitutos para o template
	 */
	mustacheHash : function() {
		var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.busca.dicionario);
		return dicionario;
	},
	/*
	Function: inicia

	Inicia a ferramenta. &Eacute; chamado por criaJanelaFlutuante

	Parametro:

	iddiv {String} - id do div que receber&aacute; o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		i3GEO.janela.comboCabecalhoTemas("i3GEOFbuscaComboCabeca","i3GEOFbuscaComboCabecaSel","busca","ligadosComTabela");
		if(i3GEO.temaAtivo === ""){
			$i(iddiv).innerHTML = "";//'<p style="position: relative; top: 0px; font-size: 15px; text-align: left;">'+$trad("x33")+'</p>';
			return;
		}
		try{
			$i(iddiv).innerHTML += i3GEOF.busca.html();
			i3GEO.php.listaItensTema(i3GEOF.busca.montaListaItens,i3GEOF.busca.tema);
			var b = new YAHOO.widget.Button(
				"i3GEObuscabotao1",
				{onclick:{fn: i3GEOF.busca.procurar}}
			);
			b.addClass("rodar");
		i3GEO.janela.comboCabecalhoTemas("i3GEOFbuscaComboCabeca","i3GEOFbuscaComboCabecaSel","busca","ligadosComTabela");
		}
		catch(erro){alert(erro);}
	},
	/*
	Function: html

	Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta

	Retorno:

	String com o c&oacute;digo html
	*/
	html:function() {
		var ins = Mustache.render(i3GEOF.busca.MUSTACHE, i3GEOF.busca.mustacheHash());
		return ins;
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.
	*/
	iniciaJanelaFlutuante: function(){
		var minimiza,cabecalho,janela,divid,temp,titulo;
		if($i("i3GEOF.busca")){
			i3GEOF.busca.tema = i3GEO.temaAtivo;
			i3GEOF.busca.inicia("i3GEOF.busca_corpo");
			return;
		}
		//funcao que sera executada ao ser clicado no cabe&ccedil;alho da janela
		cabecalho = function(){
			i3GEOF.busca.ativaFoco();
		};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.busca");
		};
		//cria a janela flutuante
		titulo = "<span class='i3GEOiconeFerramenta i3GEOiconeBusca'></span><div  id='i3GEOFbuscaComboCabeca' class='comboTemasCabecalho'>   ------</div>&nbsp;<a class=ajuda_usuario style='margin-left:40px;' target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=5&idajuda=35' ><b> </b></a>";
		janela = i3GEO.janela.cria(
			"290px",
			"330px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.busca",
			false,
			"hd",
			cabecalho,
			minimiza,
			"",
			true
		);
		divid = janela[2].id;
		i3GEOF.busca.aguarde = $i("i3GEOF.busca_imagemCabecalho").style;
		//i3GEOF.analisaGeometrias.aguarde.visibility = "visible";
		i3GEOF.busca.inicia(divid);
		temp = function(){
			i3GEO.eventos.removeEventos("ATUALIZAARVORECAMADAS",['i3GEO.janela.comboCabecalhoTemas("i3GEOFbuscaComboCabeca","i3GEOFbuscaComboCabecaSel","busca","ligadosComTabela")']);
		};
		YAHOO.util.Event.addListener(janela[0].close, "click", temp);
	},
	/*
	Function: ativaFoco

	Refaz a interface da ferramenta quando a janela flutuante tem seu foco ativado
	*/
	ativaFoco: function(){
		if(i3GEOF.busca.tema !== "" && i3GEO.arvoreDeCamadas.pegaTema(i3GEOF.busca.tema) === "")
		{alert($trad('erroTema',i3GEOF.busca.dicionario));}
		var i = $i("i3GEOF.busca_c").style;
		i3GEO.janela.ULTIMOZINDEX++;
		i.zIndex = 51000 + i3GEO.janela.ULTIMOZINDEX;
	},
	/*
	Function: montaListaItens

	Monta a lista de itens que poder&atilde;o ser escolhidos.

	A lista &eacute; inserida no elemento html com id "i3GEObuscalistai"
	*/
	montaListaItens: function(retorno){
		var ins = "",
			i,
			n;
		try{
			ins += ("<table class=lista >");
			n = retorno.data.valores.length;
			for (i=0;i<n; i++){
				ins += "<tr><td><input size=2 style='cursor:pointer;border:0px solid white;' name='"+retorno.data.valores[i].item+","+retorno.data.valores[i].tema+"' type=checkbox /></td>";
				ins += "<td>&nbsp;" + retorno.data.valores[i].item + "</td></tr>";
			}
			ins += "</table>";
			$i("i3GEObuscalistai").innerHTML = ins;
		}
		catch(e)
		{$i("i3GEObuscalistai").innerHTML = "<p style=color:red >"+$trad('erro',i3GEOF.busca.dicionario)+"<br>"+e;}
	},
	/*
	Function: procurar

	Executa a opera&ccedil;&atilde;o de busca

	Veja:

	<LISTAVALORESITENS>
	*/
	procurar: function(){
		if(i3GEOF.busca.aguarde.visibility === "visible")
		{return;}
		if(i3GEO.arvoreDeCamadas.pegaTema(i3GEOF.busca.tema) === "")
		{alert($trad('erroTema2',i3GEOF.busca.dicionario));return;}
		var inputs = $i("i3GEObuscalistai").getElementsByTagName("input"),
			n = inputs.length,
			listai = [],
			i,
			tipo = "exata",
			onde = "mapa",
			palavra = $i("i3GEObuscapalavra").value,
			p,
			cp;
		for (i=0;i<n; i++){
			if (inputs[i].checked === true){
				listai.push(inputs[i].name);
			}
		}
		if (listai.length === 0){
			alert($trad('selecionaItem',i3GEOF.busca.dicionario));
		}
		else{
			if ($i("i3GEObuscapalavra").value === ""){
				alert("Digite uma palavra");
			}
			else{
				i3GEOF.busca.aguarde.visibility = "visible";
				if ($i("i3GEObuscaqualquer").checked === true){
					tipo = "qualquer";
				}
				if ($i("i3GEObuscaregiao").checked === true){
					onde = "regiao";
				}
				palavra = i3GEO.util.removeAcentos(palavra);
				p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid;
				cp = new cpaint();
				cp.set_response_type("json");
				cp.set_transfer_mode('POST');
				cp.call(
						p,
						"listavaloresitens",
						i3GEOF.busca.mostraBusca,
						"funcao=listavaloresitens&palavra="+palavra
						+"&lista="+listai.join("|")
						+"&tipo="+tipo
						+"&onde="+onde
						+"&ext="+i3GEO.parametros.mapexten
					);
			}
		}
	},
	/*
	Function: mostraBusca

	Monta uma nova janela com os resultados da busca.
	*/
	mostraBusca: function(retorno){
		i3GEOF.busca.aguarde.visibility = "hidden";
		var palavra = $i("i3GEObuscapalavra").value,
			idJanela = YAHOO.util.Dom.generateId(),
			naoEncontrado = "<p style=color:red >"+$trad('semRegistro',i3GEOF.busca.dicionario)+"<br>",
			ins = [],
			linhas,
			nlinhas,
			linha,
			nlinha,
			valores,
			x,
			y,
			i,
			er,
			tr,
			tema,
			posicaoleft = parseInt($i("i3GEOF.busca_c").style.left,10)+(i3GEOF.busca.nbuscas*10),
			posicaotop  = parseInt($i("i3GEOF.busca_c").style.top,10)+(i3GEOF.busca.nbuscas*10);

		i3GEOF.busca.nbuscas++;
		i3GEO.janela.cria("200px","200px","",posicaoleft+290,posicaotop,"<div class='i3GeoTituloJanela'>" + palavra + "</div>",idJanela);
		if (retorno.data !== undefined)
		{
			nlinhas = retorno.data.length;
			for (tema=0;tema<nlinhas; tema++){
				linhas = retorno.data[tema].resultado;
				nlinha = linhas.length;
				for (linha=0;linha<nlinha; linha++){
					valores = (linhas[linha].box).split(" ");
					x = (valores[0] * 1) + ((((valores[0] * -1) - (valores[2] * -1)) / 2) * 1);
					y = (valores[1] * 1) + ((((valores[1] * -1) - (valores[3] * -1)) / 2) * 1);
					ins.push("<table><tr><td onclick='i3GEO.navega.zoomExt(\"\",\"\",\"\",\""+linhas[linha].box+"\")' style='cursor:pointer;color:navy'>zoom&nbsp;</td><td onclick='i3GEO.navega.zoomponto(\"\",\"\","+x+","+y+")' style='color:navy;cursor:pointer;'>&nbsp;"+$trad('localiza',i3GEOF.busca.dicionario)+"</td></tr></table>");
					for (i=0;i<linhas[linha].valores.length; i++){
						er = new RegExp(palavra, "gi");
						tr = (linhas[linha].valores[i].valor).replace(er,"<span style=color:red;text-align:left >"+palavra+"</span>");
						ins.push("<div style=width:150px;text-align:left;left:5px; >"+ linhas[linha].valores[i].item + ": " + tr + "</div><br>");
						naoEncontrado = "";
					}
				}
			}
			$i(idJanela+"_corpo").innerHTML = "<div style='position:relative;top:0px;left:0px;width:160;overflow:auto;'>"+naoEncontrado+ins.join("")+"</div>";
		}
		else
		{$i(idJanela+"_corpo").innerHTML = "<p style=color:red >"+$trad('erro',i3GEOF.busca.dicionario)+"<br>";}
	}
};
