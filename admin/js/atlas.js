/*
Title: atlas.js

Fun&ccedil;&otilde;es que controlam a interface do editor de atlas

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

i3geo/admin/js/atlas.js
*/
YAHOO.namespace("admin.container");
/*
Function: initMenu

Inicializa o editor
*/
function initMenu()
{
	ativaBotaoAdicionaAtlas("../php/atlas.php?funcao=alterarAtlas","adiciona");
	core_carregando("ativa");
	core_ativaPainelAjuda("ajuda","botaoAjuda");
	core_pegaPerfis("pegaAtlas()");
}
function ativaBotaoAdicionaAtlas(sUrl,idBotao)
{
	var botao, adiciona = function()
	{
		core_carregando("ativa");
		core_carregando($trad("msgNovoRegistro",i3GEOadmin.atlas.dicionario));
		var callback =
		{
				success:function(o)
				{
					try
					{
						var j = YAHOO.lang.JSON.parse(o.responseText);
					adicionaNosAtlas(j,true);
					editar("atlas",j[j.length-1].id_atlas);
						core_carregando("desativa");
					}
					catch(e){core_handleFailure(e,o.responseText);}
				},
				failure:core_handleFailure,
				argument: { foo:"foo", bar:"bar" }
		};
		core_makeRequest(sUrl,callback);
	};
	//cria o bot&atilde;o de adi&ccedil;&atilde;o de um novo menu
	botao = new YAHOO.widget.Button(idBotao,{ onclick: { fn: adiciona } });
	botao.addClass("rodar");
}
/*
Function: pegaAtlas

Obt&eacute;m a lista de atlas

<PEGAATLAS>
*/
function pegaAtlas()
{
	core_pegaDados($trad("msgBuscaAtlas",i3GEOadmin.atlas.dicionario),"../php/atlas.php?funcao=pegaAtlas","montaArvore");
}
/*
Function: montaArvore

Monta a &aacute;rvore de edi&ccedil;&atilde;o

<PEGAPRANCHAS>
*/
function montaArvore(dados)
{
	YAHOO.example.treeExample = new function()
	{
		tree = "";
		function changeIconMode()
		{
			buildTree();
		}
		function loadNodeData(node, fnLoadComplete)
		{
			var sUrl = "../php/atlas.php?funcao=pegaPranchas&id_atlas="+node.data.id_atlas;
			var callback =
			{
				success: function(oResponse)
				{
					var dados = YAHOO.lang.JSON.parse(oResponse.responseText);
					adicionaNosPranchas(node,dados,false);
					oResponse.argument.fnLoadComplete();
				},
				failure: function(oResponse)
				{
					oResponse.argument.fnLoadComplete();
				},
				argument:
				{
					"node": node,
					"fnLoadComplete": fnLoadComplete
				},
				timeout: 25000
			};
			YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
		}
		function buildTree()
		{
			tree = new YAHOO.widget.TreeView("tabela");
			tree.setDynamicLoad(loadNodeData, 1);
			var root = tree.getRoot();
			var tempNode = new YAHOO.widget.TextNode('', root, false);
			tempNode.enableHighlight = false;
			tempNode.isLeaf = true;
			core_carregando("desativa");
		}
		buildTree();
	}();
		adicionaNosAtlas(dados);
		tree.draw();
}
function testarMapfile(codigoMap)
{
	window.open("../../testamapfile.php?map="+codigoMap+".map");
}
function adicionaNosTemas(no,dados,redesenha)
{
	if(!redesenha)
	{
		var conteudo = "<span onclick=\"adicionarTema('"+no.data.id_prancha+"')\" style=\"cursor:pointer;\" ><img style=\"position:relative;top:0px\" width='10px' heigth='10px' src=\"../imagens/05.png\" /><i>"+ $trad("adicionaTema",i3GEOadmin.atlas.dicionario) +"</i></span>";
		var d = {html:conteudo};
		var tempNode = new YAHOO.widget.HTMLNode(d, no, false,true);
		tempNode.enableHighlight = false;
		tempNode.isLeaf = true;
	}
	for (var i=0, j=dados.length; i<j; i++)
	{
		if(dados[i].nome_tema == "null" || !dados[i].nome_tema || dados[i].codigo_tema == "")
		{dados[i].nome_tema = "";}
		var conteudo = "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"sobeDesce('sobe','tema','"+dados[i].id_tema+"')\" title="+ $trad("sobe",i3GEOadmin.core.dicionario) +" src=\"../imagens/34.png\" />";
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"sobeDesce('desce','tema','"+dados[i].id_tema+"')\" title="+ $trad("desce",i3GEOadmin.core.dicionario) +" src=\"../imagens/33.png\" />";
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"excluir('tema','"+dados[i].id_tema+"')\" title="+ $trad("excluir",i3GEOadmin.core.dicionario) +" width='10px' heigth='10px' src=\"../imagens/01.png\" />";
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"testarMapfile('"+dados[i].codigo_tema+"')\" title="+ $trad("testar",i3GEOadmin.core.dicionario) +" width='10px' heigth='10px' src=\"../imagens/41.png\" />";
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"editar('tema','"+dados[i].id_tema+"')\" title="+ $trad("editar",i3GEOadmin.core.dicionario) +" width='10px' heigth='10px' src=\"../imagens/06.png\" />";
		if(dados[i].codigo_tema != "")
		{conteudo += "&nbsp;<span>"+dados[i].codigo_tema+" - </span><span style=color:gray >"+dados[i].nome_tema+"</span>";}
		else
		{conteudo += "&nbsp;<span style=color:red >" + $trad("editeTema",i3GEOadmin.atlas.dicionario) +"";}
		var d = {html:conteudo,id_tema:dados[i].id_tema,tipo:"tema"};
		var tempNode = new YAHOO.widget.HTMLNode(d, no, false,true);
		tempNode.enableHighlight = false;
		tempNode.isLeaf = true;
	}
	if(redesenha){tree.draw();}
}
/*
Function: adicionaNosPranchas

Mostra os nos de uma prancha

<PEGATEMAS>
*/
function adicionaNosPranchas(no,dados,redesenha)
{
	function temaIconMode()
	{
		var newVal = parseInt(this.value);
		if (newVal != currentIconMode)
		{currentIconMode = newVal;}
	}
	function loadTemasData(node, fnLoadComplete)
	{
		var sUrl = "../php/atlas.php?funcao=pegaTemas&id_prancha="+node.data.id_prancha;
		var callback =
		{
			success: function(oResponse)
			{
				var dados = YAHOO.lang.JSON.parse(oResponse.responseText);
				adicionaNosTemas(node,dados,false);
				oResponse.argument.fnLoadComplete();
			},
			failure: function(oResponse)
			{
				oResponse.argument.fnLoadComplete();
			},
			argument:
			{
				"node": node,
				"fnLoadComplete": fnLoadComplete
			},
			timeout: 7000
		};
		YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
	}
	if(!redesenha)
	{
		var conteudo = "<span style=\"cursor:pointer;\" onclick=\"adicionarPrancha('"+no.data.id_atlas+"')\" ><img style=\"position:relative;top:2px\" src=\"../imagens/05.png\" /><i>"+ $trad("adicionaPrancha",i3GEOadmin.atlas.dicionario) +"</i></span>";
		var d = {html:conteudo};
		var tempNode = new YAHOO.widget.HTMLNode(d, no, false,true);
		tempNode.enableHighlight = false;
		tempNode.isLeaf = true;
	}
	for (var i=0, j=dados.length; i<j; i++)
	{
		var conteudo = "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"sobeDesce('sobe','prancha','"+dados[i].id_prancha+"')\" title="+ $trad("sobe",i3GEOadmin.core.dicionario) +" src=\"../imagens/34.png\" />";
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"sobeDesce('desce','prancha','"+dados[i].id_prancha+"')\" title="+ $trad("desce",i3GEOadmin.core.dicionario) +" src=\"../imagens/33.png\" />";
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"excluir('prancha','"+dados[i].id_prancha+"')\" title="+ $trad("excluir",i3GEOadmin.core.dicionario) +" width='10px' heigth='10px' src=\"../imagens/01.png\" />";
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"editar('prancha','"+dados[i].id_prancha+"')\" title="+ $trad("editar",i3GEOadmin.core.dicionario) +" width='10px' heigth='10px' src=\"../imagens/06.png\" />";
		if(dados[i].titulo_prancha != "")
		{conteudo += "&nbsp;<span>"+dados[i].titulo_prancha+"</span>";}
		else
		{conteudo += "&nbsp;<span style=color:red >"+ $trad("editePrancha",i3GEOadmin.atlas.dicionario) +"</span>";}
		var d = {html:conteudo,id_prancha:dados[i].id_prancha,tipo:"prancha"};
		var tempNode = new YAHOO.widget.HTMLNode(d, no, false,true);
		tempNode.enableHighlight = false;
		//tempNode.isLeaf = true;
		tempNode.setDynamicLoad(loadTemasData, temaIconMode);
	}
	if(redesenha){tree.draw();}
}
function adicionaNosAtlas(dados,redesenha)
{
	var root = tree.getRoot();
	for (var i=0, j=dados.length; i<j; i++)
	{
		var conteudo = "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"sobeDesce('sobe','atlas','"+dados[i].id_atlas+"')\" title="+ $trad("sobe",i3GEOadmin.core.dicionario) +" src=\"../imagens/34.png\" />";
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"sobeDesce('desce','atlas','"+dados[i].id_atlas+"')\" title="+ $trad("desce",i3GEOadmin.core.dicionario) +" src=\"../imagens/33.png\" />";
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:2px\" onclick=\"excluir('atlas','"+dados[i].id_atlas+"')\" title="+ $trad("excluir",i3GEOadmin.core.dicionario) +" src=\"../imagens/01.png\" />";
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:2px\" onclick=\"editar('atlas','"+dados[i].id_atlas+"')\" title="+ $trad("editar",i3GEOadmin.core.dicionario) +" src=\"../imagens/06.png\" /><b>";
		conteudo += "&nbsp;<img style=\"width:25px;position:relative;cursor:pointer;top:2px\" onclick=\"abreAtlas('"+dados[i].id_atlas+"')\" title="+ $trad("abrirI3geo",i3GEOadmin.core.dicionario) +" src=\"../../imagens/i3geo2.jpg\" /><b>";
		if(dados[i].titulo_atlas != "")
		{conteudo += "&nbsp;<span>"+dados[i].titulo_atlas+"</span>";}
		else
		{conteudo += "&nbsp;<span style=color:red >"+ $trad("editeAtlas",i3GEOadmin.atlas.dicionario) +"</span>";}
		var d = {html:conteudo,id_atlas:dados[i].id_atlas,tipo:"atlas"};
		var tempNode = new YAHOO.widget.HTMLNode(d, root, false,true);
		tempNode.enableHighlight = false;
	}
	if(redesenha){tree.draw();}
}
/*
Function: editar

Abre o editor de um no

<PEGADADOSATLAS>

<PEGADADOSPRANCHA>

<PEGADADOSTEMA>
*/
function editar(tipo,id)
{
	core_carregando("ativa");
	core_carregando($trad("msgBuscaDados",i3GEOadmin.core.dicionario));
	var sUrl = null;
	var callback =
	{
		success:function(o)
		{
			try
			{
				if(tipo == "atlas")
				{
					var dados = YAHOO.lang.JSON.parse(o.responseText)[0];
					core_montaEditor("gravaDados('atlas','"+id+"')","","","","Atlas",true,true,false);
					$i("editor_bd").innerHTML = montaDivAtlas(dados);
					core_carregando("desativa");
					core_comboPranchas("comboPranchaIni","Epranchadefault_atlas",dados.pranchadefault_atlas,"",id);
				}
				if(tipo == "prancha")
				{
					var dados = YAHOO.lang.JSON.parse(o.responseText)[0];
					core_montaEditor("gravaDados('prancha','"+id+"')","","","","Prancha",true,true,false);
					$i("editor_bd").innerHTML = montaDivPrancha(dados);
					core_carregando("desativa");
				}
				if(tipo == "tema")
				{
					var dados = YAHOO.lang.JSON.parse(o.responseText)[0];
					core_montaEditor("gravaDados('tema','"+id+"')","","","","Tema",true,true,false);
					$i("editor_bd").innerHTML = montaDivTema(dados);
					core_carregando("desativa");
					core_comboMapfiles("comboTemaIni","Ecodigo_tema",dados.codigo_tema,"",true);
				}
				core_carregando("desativa");
			}
			catch(e){core_handleFailure(e,o.responseText);}
		},
		failure:core_handleFailure,
		argument: { foo:"foo", bar:"bar" }
	};
	if(tipo == "atlas")
	{sUrl = "../php/atlas.php?funcao=pegaDadosAtlas&id_atlas="+id;}
	if(tipo == "prancha")
	{sUrl = "../php/atlas.php?funcao=pegaDadosPrancha&id_prancha="+id;}
	if(tipo == "tema")
	{sUrl = "../php/atlas.php?funcao=pegaDadosTema&id_tema="+id;}
	if(sUrl)
	{core_makeRequest(sUrl,callback);}
}
function montaDivTema(i)
{
	var ins = "";
	ins += "<br><p>"+ $trad("codigoTema",i3GEOadmin.atlas.dicionario) + "</p>";
	ins += "<div id=comboTemaIni ></div>";

	ins += "<br><p>"+ $trad("temaVisivel",i3GEOadmin.atlas.dicionario) +"</p>";
	ins += "<div class='styled-select150'><select id='Eligado_tema' >";
	ins += core_combosimnao(i.ligado_tema);
	ins += "</select></div>";
	ins += "<input type=hidden value='"+i.ordem_tema+"' id='Eordem_tema' />";
	return(ins);
}
function montaDivPrancha(i)
{
	var param =
	{
		"linhas":[
		{titulo:$trad("titulo",i3GEOadmin.atlas.dicionario),id:"Etitulo_prancha",size:"50",value:i.titulo_prancha,tipo:"text",div:""},
		{titulo:$trad("descricao",i3GEOadmin.atlas.dicionario),id:"Edesc_prancha",size:"50",value:i.desc_prancha,tipo:"text",div:""},
		{titulo:$trad("linkTxt",i3GEOadmin.atlas.dicionario),id:"Elink_prancha",size:"50",value:i.link_prancha,tipo:"text",div:""},
		{titulo:$trad("largura",i3GEOadmin.atlas.dicionario),id:"Ew_prancha",size:"5",value:i.w_prancha,tipo:"text",div:""},
		{titulo:$trad("altura",i3GEOadmin.atlas.dicionario),id:"Eh_prancha",size:"5",value:i.h_prancha,tipo:"text",div:""},
		{titulo:$trad("icone",i3GEOadmin.atlas.dicionario),id:"Eicone_prancha",size:"50",value:i.icone_prancha,tipo:"text",div:""},
		{titulo:$trad("extGeo",i3GEOadmin.atlas.dicionario),id:"Emapext_prancha",size:"30",value:i.mapext_prancha,tipo:"text",div:""}
		]
	};
	var ins = "";
	ins += core_geraLinhas(param) + "<br><br>";
	ins += "<input type=hidden value='"+i.ordem_prancha+"' id='Eordem_prancha' />";
	return(ins);
}
function montaDivAtlas(i)
{
	var param =
	{
		"linhas":[
		{titulo:$trad("titulo",i3GEOadmin.atlas.dicionario),id:"Etitulo_atlas",size:"50",value:i.titulo_atlas,tipo:"text",div:""},
		{titulo:$trad("descricao",i3GEOadmin.atlas.dicionario),id:"Edesc_atlas",size:"50",value:i.desc_atlas,tipo:"text",div:""},
		{titulo:$trad("linkAtlas",i3GEOadmin.atlas.dicionario),id:"Elink_atlas",size:"50",value:i.link_atlas,tipo:"text",div:""},
		{titulo:$trad("largura",i3GEOadmin.atlas.dicionario),id:"Ew_atlas",size:"5",value:i.w_atlas,tipo:"text",div:""},
		{titulo:$trad("altura",i3GEOadmin.atlas.dicionario),id:"Eh_atlas",size:"5",value:i.h_atlas,tipo:"text",div:""},
		{titulo:$trad("mapfileInicia",i3GEOadmin.atlas.dicionario),id:"Ebasemapfile_atlas",size:"50",value:i.basemapfile_atlas,tipo:"text",div:""},
		{titulo:$trad("iconeAtlas",i3GEOadmin.atlas.dicionario),id:"Eicone_atlas",size:"50",value:i.icone_atlas,tipo:"text",div:""},
		{titulo:$trad("template",i3GEOadmin.atlas.dicionario),id:"Etemplate_atlas",size:"50",value:i.template_atlas,tipo:"text",div:""}
		]
	};
	var ins = "";
	ins += core_geraLinhas(param);
	ins += "<br>" + $trad("pranchaInicia",i3GEOadmin.atlas.dicionario);
	ins += "<div id=comboPranchaIni ></div>";
	ins += "<br>" + $trad("tipoGuia",i3GEOadmin.atlas.dicionario);
	ins += "<div class='styled-select150'><select  id='Etipoguias_atlas' />";
	ins += "<option value='' >---</option>";
	ins += "<option value='automatica' ";
	if (i.tipoguias_atlas == "automatica"){ins += "selected";}
	ins += " >"+ $trad("automatica",i3GEOadmin.atlas.dicionario) +"</option>";
	ins += "<option value='combo' ";
	if (i.tipoguias_atlas == "combo"){ins += "selected";}
	ins += " >"+ $trad("combo",i3GEOadmin.atlas.dicionario) +"</option>";
	ins += "<option value='expandida' ";
	if (i.tipoguias_atlas == "expandida"){ins += "selected";}
	ins += " >"+ $trad("expandida",i3GEOadmin.atlas.dicionario) +"</option></select></div>";
	ins += "<br>" + $trad("publicado",i3GEOadmin.atlas.dicionario);
	ins += "<div class='styled-select150'><select id='Epublicado_atlas' >";
	ins += core_combosimnao(i.publicado_atlas);
	ins += "</select></div>";
	ins += "<br><br>";
	ins += "<input type=hidden value='"+i.ordem_atlas+"' id='Eordem_atlas' />";

	return(ins);
}
function sobeDesce(movimento,tipo,id)
{
	var movimenta = null;
	if(tipo == "atlas")
	{
		var no = tree.getNodeByProperty("id_atlas",id);
		movimenta = core_movimentaNo(movimento,no);
	}
	if(tipo == "prancha")
	{
		var no = tree.getNodeByProperty("id_prancha",id);
		movimenta = core_movimentaNo(movimento,no);
	}
	if(tipo == "tema")
	{
		var no = tree.getNodeByProperty("id_tema",id);
		movimenta = core_movimentaNo(movimento,no);
	}
	var callback =
	{
		success: function(oResponse)
		{core_carregando("desativa");},
			failure:core_handleFailure,
			argument: { foo:"foo", bar:"bar" }
	};
	if(movimenta)
	{
		var sUrl = "../php/atlas.php?funcao=movimentaNo&tipo="+tipo+"&movimento="+movimento+"&id="+id;
		core_carregando("ativa");
		core_carregando($trad("msgModificaOrdem",i3GEOadmin.core.dicionario));
		core_makeRequest(sUrl,callback);
	}
}
/*
Function: excluir

Exclui um elemento do atlas

<EXCLUIRATLAS>

<EXCLUIRPRANCHA>

<EXCLUIRTEMA>
*/
function excluir(tipo,id)
{
	var mensagem = $trad("msgExclui",i3GEOadmin.core.dicionario)+id;
	var no = null;
	var sUrl = null;
	if(tipo == "atlas")
	{
		no = tree.getNodeByProperty("id_atlas",id);
		sUrl = "../php/atlas.php?funcao=excluirAtlas&id="+id;
	}
	if(tipo == "prancha")
	{
		no = tree.getNodeByProperty("id_prancha",id);
		sUrl = "../php/atlas.php?funcao=excluirPrancha&id="+id;
	}
	if(tipo == "tema")
	{
		no = tree.getNodeByProperty("id_tema",id);
		sUrl = "../php/atlas.php?funcao=excluirTema&id="+id;
	}
	if(sUrl)
	{core_excluiNoTree(sUrl,no,mensagem);}
}
/*
Function: adicionarTema

Adiciona um novo tema

<ALTERARTEMA>
*/
function adicionarTema(id)
{
	var no = tree.getNodeByProperty("id_prancha",id);
	var sUrl = "../php/atlas.php?funcao=alterarTema&id_prancha="+id;
	var callback =
	{
		success: function(oResponse)
		{
			var dados = YAHOO.lang.JSON.parse(oResponse.responseText);
			adicionaNosTemas(no,dados,true);
			editar('tema',dados[dados.length-1].id_tema);
		},
			failure:core_handleFailure,
			argument: { foo:"foo", bar:"bar" }
	};
	core_makeRequest(sUrl,callback);
}
/*
Function: adicionarPrancha

Adiciona uma nova prancha

<ALTERARPRANCHA>
*/
function adicionarPrancha(id)
{
	var no = tree.getNodeByProperty("id_atlas",id);
	var sUrl = "../php/atlas.php?funcao=alterarPrancha&id_atlas="+id;
	var callback =
	{
		success: function(oResponse)
		{
			var dados = YAHOO.lang.JSON.parse(oResponse.responseText);
			adicionaNosPranchas(no,dados,true);
			editar('prancha',dados[dados.length-1].id_prancha);
		},
			failure:core_handleFailure,
			argument: { foo:"foo", bar:"bar" }
	};
	core_makeRequest(sUrl,callback);
}
/*
Function: gravaDados

Altera dados de um elemento do Atlas

<ALTERARATLAS>

<ALTERARPRANCHA>

<ALTERARTEMA>
*/
function gravaDados(tipo,id)
{
	var campos = null;
	var par = null;
	var prog = null;
	if(tipo == "atlas")
	{
		campos = new Array("publicado_atlas","ordem_atlas","basemapfile_atlas","desc_atlas","h_atlas","w_atlas","icone_atlas","link_atlas","pranchadefault_atlas","template_atlas","tipoguias_atlas","titulo_atlas");
		par = "&id_atlas="+id;
		prog = "../php/atlas.php?funcao=alterarAtlas";
	}
	if(tipo == "prancha")
	{
		campos = new Array("ordem_prancha","desc_prancha","h_prancha","icone_prancha","link_prancha","mapext_prancha","titulo_prancha","w_prancha");
		par = "&id_prancha="+id;
		prog = "../php/atlas.php?funcao=alterarPrancha";
	}
	if(tipo == "tema")
	{
		campos = new Array("codigo_tema","ordem_tema","ligado_tema");
		par = "&id_tema="+id;
		prog = "../php/atlas.php?funcao=alterarTema";
	}
	for (var i=0;i<campos.length;i++)
	{par += "&"+campos[i]+"="+($i("E"+campos[i]).value);}

	var callback =
	{
			success:function(o)
			{
				try
				{
					if(YAHOO.lang.JSON.parse(o.responseText) == "erro")
					{
						core_carregando("<span style=color:red >"+ $trad("msgNaoExclui",i3GEOadmin.atlas.dicionario) +"</span>");
						setTimeout("core_carregando('desativa')",3000);
					}
					else
					{
						if(tipo == "atlas")
						{
							var no = tree.getNodeByProperty("id_atlas",id);
							no.getContentEl().getElementsByTagName("span")[0].innerHTML = document.getElementById("Etitulo_atlas").value;
						no.getContentEl().getElementsByTagName("span")[0].style.color = "";
							no.html = no.getContentEl().innerHTML;
						}
						if(tipo == "prancha")
						{
							var no = tree.getNodeByProperty("id_prancha",id);
							no.getContentEl().getElementsByTagName("span")[0].innerHTML = document.getElementById("Etitulo_prancha").value;
						no.getContentEl().getElementsByTagName("span")[0].style.color = "";
							no.html = no.getContentEl().innerHTML;
						}
						if(tipo == "tema")
						{
							var no = tree.getNodeByProperty("id_tema",id);
							no.getContentEl().getElementsByTagName("span")[0].innerHTML = document.getElementById("Ecodigo_tema").value;
						no.getContentEl().getElementsByTagName("span")[0].style.color = "";
							no.html = no.getContentEl().innerHTML;
						}
						core_carregando("desativa");
					}
				YAHOO.admin.container.panelEditor.destroy();
				YAHOO.admin.container.panelEditor = null;
				}
				catch(e){core_handleFailure(e,o.responseText);}
			},
			failure:core_handleFailure,
			argument: { foo:"foo", bar:"bar" }
	};
	if(prog && par){
		core_carregando("ativa");
		core_carregando(" gravando o registro do id= "+id);
		var sUrl = prog+par;
		core_makeRequest(sUrl,callback,'POST');
	}
}
/*
Function: abreAtlas

Abre o Atlas para teste
*/
function abreAtlas(id){
	window.open("../../classesphp/atlas_controle.php?atlasId_="+id+"&funcao=criaAtlas","blank");
}
