/*
Title: Navegador de tabelas do banco de dados postgis

Para testar i3GEO.util.navegadorPostgis()

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
Classe: i3GEOF.navegapostgis

*/
i3GEOF.navegapostgis = {
	//ao concluir, o nome do arquivo sera retornado para esse objeto atribuindo o resultado ao atributo value
	retornarPara: "",
	//guarda o tipo de navegador
	tipo: "sql",
	/*
	Variavel: aguarde

	Estilo do objeto DOM com a imagem de aguarde existente no cabe&ccedil;alho da janela.
	*/
	aguarde: "",
	conexao: "",
	esquema: "",
	tabela: "",
	ARVORE: "",
	/*
		Para efeitos de compatibilidade antes da vers&atilde;o 4.7 que n&atilde;o tinha dicion&aacute;rio
	*/
	criaJanelaFlutuante: function(obj,conexao){
		i3GEOF.navegapostgis.iniciaDicionario(obj,conexao);
	},
	/*
	Function: iniciaDicionario

	Carrega o dicion&aacute;rio e chama a fun&ccedil;&atilde;o que inicia a ferramenta

	O Javascript &eacute; carregado com o id i3GEOF.nomedaferramenta.dicionario_script

	Parametro:

	obj - objeto input que recebera de volta o valor do arquivo escolhido

	conexao {numerico} - codigo da conexao com o banco de dados cadastrado no sistema de metadados estatisticos

	tipo {string} - opcional. Tipo de retorno esquema|tabela|coluna|sql
	*/
	iniciaDicionario: function(obj,conexao,tipo){
		if(!obj || !conexao){
			conexao = "";
		}
		if(!tipo){
			tipo = "sql";
		}
		i3GEOF.navegapostgis.conexao = conexao;
		i3GEOF.navegapostgis.retornarPara = obj;
		i3GEOF.navegapostgis.tipo = tipo;
		if(typeof(i3GEOF.navegapostgis.dicionario) === 'undefined'){
			i3GEO.util.scriptTag(
				i3GEO.configura.locaplic+"/ferramentas/navegapostgis/dicionario.js",
				"i3GEOF.navegapostgis.iniciaJanelaFlutuante()",
				"i3GEOF.navegapostgis.dicionario_script"
			);
		}
		else{
			i3GEOF.navegapostgis.iniciaJanelaFlutuante();
		}
	},
	/*
	Function: inicia

	Inicia a ferramenta. &Eacute; chamado por criaJanelaFlutuante

	Parametro:

	iddiv {String} - id do div que receber&aacute; o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		$i(iddiv).innerHTML = i3GEOF.navegapostgis.html();
		if($i("i3GEOFnavegapostgisAplicar")){
			new YAHOO.widget.Button(
				"i3GEOFnavegapostgisAplicar",
				{onclick:{fn: function(){
					if($i(i3GEOF.navegapostgis.retornarPara)){
						$i(i3GEOF.navegapostgis.retornarPara).value = $i("i3GEOFnavegapostgisSql").value;
					}
					i3GEOF.navegapostgis.ARVORE.destroy();
					i3GEO.janela.destroi("i3GEOF.navegapostgis");
					return null;
				}}}
			);
		}
		if($i("i3GEOFnavegapostgisLista")){
			new YAHOO.widget.Button(
				"i3GEOFnavegapostgisLista",
				{onclick:{fn: function(){
					window.open(
						i3GEO.configura.locaplic+"/admin/php/listadadostabela.php?nreg=50&nome_tabela=" + i3GEOF.navegapostgis.tabela
						+"&nomeEsquema=" + i3GEOF.navegapostgis.esquema
						+"&codigo_estat_conexao=" + i3GEOF.navegapostgis.conexao
					);
				}}}
			);
		}

		var conexao = function(retorno){
				var ins = "<select style='width:200px;' onchange='i3GEOF.navegapostgis.montaArvore(this.value)'><option value='' >---</option>",
					n = retorno.length,
					i = 0;
				for (i=0;i<n; i++){
					ins += "<option value='"+retorno[i].codigo_estat_conexao+"' >Id: "+retorno[i].codigo_estat_conexao+" (d: "+retorno[i].bancodedados+" h: "+retorno[i].host+" u: "+retorno[i].usuario+")</option>";
				}
				ins += "</select>";
				$i("i3GEOFnavegapostgisConexao").innerHTML = ins;
				if(i3GEOF.navegapostgis.conexao != ""){
					$i("i3GEOFnavegapostgisConexao").value = i3GEOF.navegapostgis.conexao;
					i3GEOF.navegapostgis.montaArvore(i3GEOF.navegapostgis.conexao);
				}
			},
		p = i3GEO.configura.locaplic+"/admin/php/metaestat.php?funcao=listaConexao&formato=json",
		botao = $i("i3GEOFnavegapostgisAplicar");
		if(botao){
			botao.style.position = "absolute";
			botao.style.top = "230px";
			botao.style.left = "5px";
		}
		botao = $i("i3GEOFnavegapostgisLista");
		if(botao){
			botao.style.position = "absolute";
			botao.style.top = "230px";
			botao.style.left = "80px";
		}
		cpJSON.call(p,"foo",conexao);
		/*
		i3GEOF.navegapostgis.ARVORE = new YAHOO.widget.TreeView($i("i3GEOF.navegapostgis_corpo"));
		var root = i3GEOF.navegapostgis.ARVORE.getRoot();
		new YAHOO.widget.HTMLNode(
			{html:$trad('selecionaConexao',i3GEOF.navegapostgis.dicionario),enableHighlight:false,expanded:false,hasIcon:false},
			root
		);
		i3GEOF.navegapostgis.ARVORE.draw();
		i3GEOF.navegapostgis.adicionaNoNavegacaoDir(i3GEOF.navegapostgis.listaShp,i3GEOF.navegapostgis.listaImg,i3GEOF.navegapostgis.listaFig);
		*/
	},
	/*
	Function: html

	Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta

	Retorno:

	String com o c&oacute;digo html
	*/
	html:function(){
		var ins = "" +
			"<span class=paragrafo style=width:50px; >"+$trad('selecionaConexao',i3GEOF.navegapostgis.dicionario) + "</span>" +
			"<div class=paragrafo id=i3GEOFnavegapostgisConexao style='display:block;margin:5px;position:relative;left:125px;top:-22px;width:100px;' >" +
			"</div>" +
			"<div id='i3GEOFnavegapostgispar' style='padding:2px;position:relative;top:-15px;display:none;' ><div id=i3GEOFnavegapostgisArvore style='width: 215px;overflow: auto;height: 210px;border: 1px solid lightgray;position: absolute;top: 0px;'> "+
			"</div>" +
			"<div id=i3GEOFnavegapostgisColunas style='padding:2px;width: 310px;overflow: auto;height: 184px;border: 1px solid lightgray;position: absolute;left:223px;top: 0px;'> "+
			"</div>" +
			"<textarea id=i3GEOFnavegapostgisSql style='width: 313px;overflow: auto;height: 104px;border: 1px solid lightgray;position: absolute;left:223px;top: 190px;'> "+
			"</textarea>";
		if(i3GEOF.navegapostgis.tipo == "sql"){
			ins += "<input id=i3GEOFnavegapostgisAplicar type='button' value='"+$trad('aplica',i3GEOF.navegapostgis.dicionario)+"' />";
			ins += "<input id=i3GEOFnavegapostgisLista type='button' value='"+$trad('lista',i3GEOF.navegapostgis.dicionario)+"' />";

		}
		ins += "</div>";
		return ins;
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.
	*/
	iniciaJanelaFlutuante: function(){
		var janela,divid,titulo,cabecalho,minimiza;
		if ($i("i3GEOF.navegapostgis")) {
			return;
		}
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.navegapostgis");
		};
		//cria a janela flutuante
		titulo = "<div class='i3GeoTituloJanela'>" + $trad('conectaPostgis',i3GEOF.navegapostgis.dicionario) + "</div>";
		janela = i3GEO.janela.cria(
			"550px",
			"335px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.navegapostgis",
			false,
			"hd",
			cabecalho,
			minimiza,
			"",
			"",
			"",
			"",
			"nao"
		);
		divid = janela[2].id;
		$i("i3GEOF.navegapostgis_corpo").style.backgroundColor = "white";
		$i("i3GEOF.navegapostgis_corpo").style.textAlign = "left";
		i3GEOF.navegapostgis.aguarde = $i("i3GEOF.navegapostgis_imagemCabecalho").style;
		i3GEOF.navegapostgis.inicia(divid);
	},
	retornaValorClicado: function(obj){
		i3GEOF.navegapostgis.retornarPara.value = obj.value;
		i3GEOF.navegapostgis.ARVORE.destroy();
		i3GEO.janela.destroi("i3GEOF.navegapostgis");
		return null;
	},
	montaArvore: function(conexao){
		if(conexao == ""){
			return;
		}
		i3GEOF.navegapostgis.aguarde.display = "block";
		i3GEOF.navegapostgis.ARVORE = null;
		i3GEOF.navegapostgis.ARVORE = new YAHOO.widget.TreeView($i("i3GEOFnavegapostgisArvore"));
		var root = i3GEOF.navegapostgis.ARVORE.getRoot();
		new YAHOO.widget.HTMLNode(
			{
				html:$trad('selecionaTabela',i3GEOF.navegapostgis.dicionario),
				enableHighlight:false,
				expanded:false,
				hasIcon:false
			},
			root
		);
		i3GEOF.navegapostgis.ARVORE.draw();
		i3GEOF.navegapostgis.listaEsquemas(conexao);
	},
	listaEsquemas: function(conexao){
		$i("i3GEOFnavegapostgispar").style.display = "block";
		i3GEOF.navegapostgis.conexao = conexao;
		var funcao = function(retorno){
			i3GEOF.navegapostgis.aguarde.display = "none";
			var n,i,no,tempNode,esquema;
			n = retorno.length;
			tempNode = i3GEOF.navegapostgis.ARVORE.getRoot();
			//quando o navegador e chamado apenas para escolha do esquema
			//e mostrado um input radio
			for(i=0;i<n;i++){
				esquema = retorno[i].esquema;
				if(i3GEOF.navegapostgis.tipo == "esquema"){
					esquema = "<input onclick='i3GEOF.navegapostgis.retornaValorClicado(this)' type=radio style='cursor:pointer;' name='navegapostgisSelEsquema' value='"+esquema+"'/>"+
					"<span style='position:relative;top:-3px;'>"+esquema+"</span>";
				}
				no = new YAHOO.widget.HTMLNode(
					{
						html: esquema,
						enableHighlight:true,
						expanded:false,
						esquema: retorno[i].esquema
					},
					tempNode
				);
				if(i3GEOF.navegapostgis.tipo == "sql" || i3GEOF.navegapostgis.tipo == "tabela" || i3GEOF.navegapostgis.tipo == "coluna"){
					no.setDynamicLoad(i3GEOF.navegapostgis.listaTabelas, 1);
				}
			}
			i3GEOF.navegapostgis.ARVORE.draw();

		},
		p = i3GEO.configura.locaplic+"/admin/php/metaestat.php?funcao=esquemasConexao&formato=json&codigo_estat_conexao="+conexao;
		cpJSON.call(p,"foo",funcao);
	},
	listaTabelas: function(node){
		var esquema = node.data.esquema,
			conexao = i3GEOF.navegapostgis.conexao,
			funcao = function(retorno){
				i3GEOF.navegapostgis.aguarde.display = "none";
				var n,i,conteudo;
				n = retorno.length;
				for(i=0;i<n;i++){
					conteudo = "<a href='#' onclick='i3GEOF.navegapostgis.listaColunas(\""+retorno[i].tabela+"\")' >"+retorno[i].tabela+"</a>";
					if(i3GEOF.navegapostgis.tipo == "tabela"){
						conteudo = "<input onclick='i3GEOF.navegapostgis.retornaValorClicado(this)' type=radio style='cursor:pointer;' name='navegapostgisSelTabela' value='"+retorno[i].tabela+"'/>"+
						"<span style='position:relative;top:-3px;'>"+retorno[i].tabela+"</span>";
					}
					new YAHOO.widget.HTMLNode({
							html:conteudo,
							enableHighlight:false,
							expanded:false,
							isLeaf:true
						},
						node
					);
				}
				node.loadComplete();
			},
			p = i3GEO.configura.locaplic+"/admin/php/metaestat.php?funcao=tabelasEsquema&formato=json&nome_esquema="+esquema+"&codigo_estat_conexao="+conexao;
		i3GEOF.navegapostgis.esquema = esquema;
		cpJSON.call(p,"foo",funcao);
	},
	listaColunas: function(tabela){
		i3GEOF.navegapostgis.tabela = tabela;
		var funcao = function(retorno){
				var ins,n,i,
					ck = "",
					gidok = false,
					gid = "ID",
					the_geom = "GEOM",
					nome = $trad('nome',i3GEOF.navegapostgis.dicionario),
					mostra = $trad('mostra',i3GEOF.navegapostgis.dicionario);
				n = retorno.length;

				if(i3GEOF.navegapostgis.tipo == "coluna"){
					ins = "<p class=paragrafo>"+$trad('selecionaColuna',i3GEOF.navegapostgis.dicionario)+"</p><table class=lista4 ><tr><td></td><td></td></tr>";
					for(i=0;i<n;i++){
						gid = "<input onclick='i3GEOF.navegapostgis.retornaValorClicado(this)' type=radio style='cursor:pointer;' name='navegapostgisSelColuna' value='"+retorno[i].field+"'/>";
						ins += "<tr><td>"+gid+"</td><td title='"+retorno[i].type+"' >"+retorno[i].field+"</td></tr>";
					}
					ins += "</table>";
				}
				else{
					ins = "<table class=lista4 ><tr><td title='"+$trad('selecionaID',i3GEOF.navegapostgis.dicionario)+"'>"+gid+"</td><td title='"+$trad('selecionaGeom',i3GEOF.navegapostgis.dicionario)+"'>"+the_geom+"</td><td title='"+$trad('mostraColuna',i3GEOF.navegapostgis.dicionario)+"'>"+mostra+"</td><td>"+nome+"</td></tr>";
					mostra = "<input onclick='i3GEOF.navegapostgis.geraSql()' style=cursor:pointer type=checkbox checked name='i3GEOFnavegapostgisMostra' value='*' />";
					ins += "<tr><td></td><td></td><td>"+mostra+"</td><td title='' >Todas</td></tr>";

					for(i=0;i<n;i++){
						ck = "";
						if(retorno[i].serial === true || retorno[i].field === "gid"){
							ck = "checked";
							gidok = true;
						}else if(retorno[i].notnull === true && gidok === false){
							ck = "checked";
						}
						gid = "<input "+ ck +" onclick='i3GEOF.navegapostgis.geraSql()' style=cursor:pointer type=radio name='i3GEOFnavegapostgisGid' value='"+retorno[i].field+"' />";
						if(retorno[i].type == "line" || retorno[i].type == "polygon" || retorno[i].type == "point" || retorno[i].type == "geometry"){
							the_geom = "<input checked onclick='i3GEOF.navegapostgis.geraSql()' style=cursor:pointer type=radio name='i3GEOFnavegapostgisTheGeom' value='"+retorno[i].field+"' />";
						}
						else{
							the_geom = "";
						}
						mostra = "<input onclick='i3GEOF.navegapostgis.geraSql()' style=cursor:pointer type=checkbox name='i3GEOFnavegapostgisMostra' value='"+retorno[i].field+"' />";
						ins += "<tr><td>"+gid+"</td><td>"+the_geom+"</td><td>"+mostra+"</td><td title='"+retorno[i].type+"' >"+retorno[i].field+"</td></tr>";
					}
					ins += "</table>";
				}
				$i("i3GEOFnavegapostgisColunas").innerHTML = ins;
				i3GEOF.navegapostgis.geraSql();
			},
			p = i3GEO.configura.locaplic+"/admin/php/metaestat.php?funcao=descreveColunasTabela&formato=json&nome_tabela="+tabela+"&nome_esquema="+i3GEOF.navegapostgis.esquema+"&codigo_estat_conexao="+i3GEOF.navegapostgis.conexao;
		cpJSON.call(p,"foo",funcao);
	},
	geraSql: function(){
		//pega a lista de inputs
		var inputs = $i("i3GEOFnavegapostgisColunas").getElementsByTagName("input"),
			n = inputs.length,
			i,
			sql,
			the_geom = "",
			gid = "",
			colunas;

		colunas = [];
		for(i=0;i<n;i++){
			if(inputs[i].name == "i3GEOFnavegapostgisGid" && inputs[i].checked == true){
				gid = inputs[i].value;
			}
			if(inputs[i].name == "i3GEOFnavegapostgisTheGeom" && inputs[i].checked == true){
				the_geom = inputs[i].value;
			}
		}
		for(i=0;i<n;i++){
			if(inputs[i].name == "i3GEOFnavegapostgisMostra" && inputs[i].checked == true && inputs[i].name != gid && inputs[i].name != the_geom){
				colunas.push(inputs[i].value);
			}
		}
		if(gid != ""){
			colunas.push(gid);
		}
		if(the_geom != ""){
			colunas.push(the_geom);
		}
		if(colunas[0] === "*"){
			colunas = ["*"];
		}
		if(colunas.length === 1){
			i = colunas[0];
		}else{
			i = colunas.join(",");
		}
		sql = the_geom+" from (\n\n select "+i+" from "+i3GEOF.navegapostgis.esquema+"."+i3GEOF.navegapostgis.tabela+"\n\n) as foo using unique "+gid+" using srid=4326";
		sql = sql.replace(",,",",");
		if(gid === "" && i3GEOF.navegapostgis.tipo === "sql"){
			alert($trad("gid",i3GEOF.navegapostgis.dicionario));
		}
		if(i3GEOF.navegapostgis.tipo === "sql"){
			$i("i3GEOFnavegapostgisSql").value = sql;
		}
	}
};
