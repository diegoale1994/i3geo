/*
Title: Agrupa elementos

Faz o agrupamento dos elementos selecionados de um tema gerando um novo shapefile que &eacute; adicionado ao mapa.
Essa n&atilde;o &eacute; uma opera&ccedil;&atilde;o do tipo "dissolve", sendo utilizadas as fun&ccedil;&otilde;es "union" e "convexhull". Os elementos podem ser descont&iacute;nuos.

Veja:

<i3GEO.analise.dialogo.agrupaElementos>

Arquivo:

i3geo/ferramentas/agrupaelementos/index.js.php

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
Classe: i3GEOF.agrupaElementos
*/
i3GEOF.agrupaElementos = {
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
		var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.agrupaElementos.dicionario);
		dicionario["locaplic"] = i3GEO.configura.locaplic;
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
			$i(iddiv).innerHTML += i3GEOF.agrupaElementos.html();
			i3GEOF.agrupaElementos.t0();
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
		var ins = Mustache.render(i3GEOF.agrupaElementos.MUSTACHE, i3GEOF.agrupaElementos.mustacheHash());
		return ins;
	},
	/*
	Function: criaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.
	*/
	iniciaJanelaFlutuante: function(){
		var minimiza,cabecalho,janela,divid,temp,titulo;
		if($i("i3GEOF.agrupaElementos")){
			return;
		}
		//cria a janela flutuante
		titulo = "<div class='i3GeoTituloJanela'>" + $trad("u26")+"<a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=3&idajuda=25' ><b> </b></a></div>";
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.agrupaElementos");
		};
		janela = i3GEO.janela.cria(
			"400px",
			"250px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.agrupaElementos",
			false,
			"hd",
			cabecalho,
			minimiza,
			"",
			false,
			i3GEO.configura.locaplic+"/imagens/oxygen/16x16/accessories-calculator.png"
		);
		divid = janela[2].id;
		janela[0].setFooter("<div id=i3GEOF.agrupaElementos_rodape class='i3GeoRodapeJanela' ></div>");
		i3GEOF.agrupaElementos.aguarde = $i("i3GEOF.agrupaElementos_imagemCabecalho").style;
		i3GEOF.agrupaElementos.inicia(divid);
		temp = function(){
			i3GEO.eventos.removeEventos("ATUALIZAARVORECAMADAS",["i3GEOF.agrupaElementos.t0()"]);
		};
		YAHOO.util.Event.addListener(janela[0].close, "click", temp);
		i3GEO.eventos.adicionaEventos("ATUALIZAARVORECAMADAS",["i3GEOF.agrupaElementos.t0()"]);
	},
	t0: function()
	{
		i3GEO.util.proximoAnterior("","i3GEOF.agrupaElementos.t1()","","i3GEOFgradeDePontost0","i3GEOagrupaelementosresultado",true,"i3GEOF.agrupaElementos_rodape");
	},
	t1: function(){
		i3GEO.util.proximoAnterior("i3GEOF.agrupaElementos.t0()","i3GEOF.agrupaElementos.t2()","","i3GEOF.agrupaElementos.t1","i3GEOagrupaelementosresultado",true,"i3GEOF.agrupaElementos_rodape");
		i3GEOF.agrupaElementos.comboTemasSel();
	},
	t2: function(){
		i3GEO.util.proximoAnterior("i3GEOF.agrupaElementos.t1()","i3GEOF.agrupaElementos.t3()","","i3GEOF.agrupaElementos.t2","i3GEOagrupaelementosresultado",true,"i3GEOF.agrupaElementos_rodape");
		$i("i3GEOagrupaelementosSelItens").style.display = "block";
		i3GEOF.agrupaElementos.comboItensSel();
	},
	t3: function(){
		i3GEO.util.proximoAnterior("i3GEOF.agrupaElementos.t2()","","","i3GEOF.agrupaElementos.t3","i3GEOagrupaelementosresultado",true,"i3GEOF.agrupaElementos_rodape");
		var b = new YAHOO.widget.Button(
			"i3GEOagrupaelementosbotao1",
			{onclick:{fn: i3GEOF.agrupaElementos.criaAgrupamento}}
		);
		b.addClass("rodar");
	},
	/*
	Function: criaAgrupamento

	Executa a opera&ccedil;&atilde;o de agrupamento

	Veja:

	<AGRUPAELEMENTOS>
	*/
	criaAgrupamento: function(){
		try{
			if(i3GEOF.agrupaElementos.aguarde.visibility === "visible")
			{return;}
			var item = $i("i3GEOagrupaelementosselItem").value,
				tema = $i("i3GEOagrupaelementostemasComSel").value,
				p,
				fim,
				cp;
			if (tema !== "")
			{
				i3GEOF.agrupaElementos.aguarde.visibility = "visible";
				fim = function(retorno){
					i3GEOF.agrupaElementos.aguarde.visibility = "hidden";
					if (retorno.data === undefined )
					{$i("i3GEOagrupaelementosfim").innerHTML = $trad('erroTempo',i3GEOF.agrupaElementos.dicionario);}
					else
					{i3GEO.atualiza();}
				};
				p = i3GEO.configura.locaplic+"/ferramentas/agrupaelementos/exec.php?g_sid="+i3GEO.configura.sid+"&funcao=agrupaElementos&tema="+tema+"&item="+item;
				cp = new cpaint();
				cp.set_response_type("JSON");
				cp.call(p,"agrupaElementos",fim);
			}
			else
			{i3GEO.janela.tempoMsg($trad('erroTema',i3GEOF.agrupaElementos.dicionario));}
		}
		catch(e){$i("i3GEOagrupaelementosfim").innerHTML = "<p class='paragrafo' >Erro. "+e;i3GEO.janela.fechaAguarde();i3GEOF.agrupaElementos.aguarde.visibility = "hidden";}
	},
	/*
	Function: comboTemasSel

	Cria um combo com a lista de temas com elementos selecionados

	Veja:

	<i3GEO.util.comboTemas>
	*/
	comboTemasSel: function(){
		i3GEO.util.comboTemas(
			"i3GEOagrupaelementostemasComSel",
			function(retorno){
				$i("i3GEOagrupaelementosSelTemas").innerHTML = retorno.dados;
				$i("i3GEOagrupaelementosSelTemas").style.display = "block";
				if ($i("i3GEOagrupaelementostemasComSel")){
					$i("i3GEOagrupaelementostemasComSel").onchange = function(){
						i3GEO.mapa.ativaTema($i("i3GEOagrupaelementostemasComSel").value);
					};
				}
				if(i3GEO.temaAtivo !== ""){
					$i("i3GEOagrupaelementostemasComSel").value = i3GEO.temaAtivo;
					$i("i3GEOagrupaelementostemasComSel").onchange.call();
				}
			},
			"i3GEOagrupaelementosSelTemas",
			"",
			false,
			"selecionados",
			" "
		);
	},
	/*
	Function: comboItensSel

	Cria um combo para selecionar os itens do tema escolhido

	Veja:

	<i3GEO.util.comboItens>
	*/
	comboItensSel: function(){
		var tema = $i("i3GEOagrupaelementostemasComSel").value;
		i3GEO.util.comboItens(
			"i3GEOagrupaelementosselItem",
			tema,
			function(retorno){
				if(retorno.tipo === "erro"){
					$i("i3GEOagrupaelementosSelItens").innerHTML = "<br><br><span style='color:red'>"+$trad('erroItem',i3GEOF.agrupaElementos.dicionario)+"</span><br><br>";
				}
				else{
					$i("i3GEOagrupaelementosSelItens").innerHTML = retorno.dados;
				}
			},
			"i3GEOagrupaelementosSelItens",
			""
		);
	}
};
