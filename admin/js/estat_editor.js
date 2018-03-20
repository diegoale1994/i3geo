if(typeof(i3GEOadmin) === 'undefined'){
	var i3GEOadmin = {};
}
i3GEOadmin.editor = {
	/*
	 * Inicializa o sistema
	 */
	inicia: function(){
		YAHOO.namespace("editor");
		YAHOO.namespace("admin.container");
		//opcao de escolha da conexao
		i3GEOadmin.editor.conexao.lista();
	},
	/*
	 *  algumas operacoes sao permitidas apenas para o esquema i3geo_metaestat do banco de dados
	 */
	verificaEsquema: function(nomeEsquema){
		if(nomeEsquema != "i3geo_metaestat"){
			alert("Operacao permitida apenas para o esquema i3geo_metaestat");
			return false;
		}
	},
	conexao:{
		onde: "i3GEOadminEditorConexao",
		lista: function(){
			var callback = {
					success:function(o){
						try	{
							var dados = YAHOO.lang.JSON.parse(o.responseText),
							temp = "<fieldset>" +
							"<legend>Conex&atilde;o</legend>" +
							"<p>Escolha a conex&atilde;o com o banco:</p>" +
							"<div class='styled-select'><select id='i3GEOadmincodigo_estat_conexao' onchange='i3GEOadmin.editor.esquema.lista()'>" +
							core_comboObjeto(dados,"codigo_estat_conexao","bancodedados","","codigo_estat_conexao") +
							"</select></div></fieldset>";
							$i(i3GEOadmin.editor.conexao.onde).innerHTML = temp;
							core_carregando("desativa");
						}
						catch(e){core_handleFailure(e,o.responseText);}
					},
					failure:core_handleFailure,
					argument: { foo:"foo", bar:"bar" }
			};
			core_carregando("buscando dados...");
			core_makeRequest("../php/metaestat.php?funcao=listaConexao",callback);
		}
	},
	esquema: {
		onde: "i3GEOadminEditorEsquema",
		lista: function(selecao){
			var callback = {
					success:function(o){
						try	{
							var botao, dados = YAHOO.lang.JSON.parse(o.responseText),
							temp = "<fieldset>" +
							"<legend>Esquema</legend>" +
							"<p>Escolha um esquema existente no banco de dados:</p>" +
							"<div class='styled-select'><select id='i3GEOadminesquema' onchange='i3GEOadmin.editor.tabela.lista()'>" +
							core_comboObjeto(dados,"esquema","esquema") +
							"</select></div>" +
							"<p class=paragrafo >Outras op&ccedil;&otilde;es:</p>"+
							"<p class=paragrafo ><input type=button value='Criar um novo esquema' id='i3GEOadminesquemaCriar' />" +
							"&nbsp;<input type=button value='Alterar nome do esquema' id='i3GEOadminesquemaAlterarNome' />" +
							"&nbsp;<input type=button value='Criar uma nova tabela' id='i3GEOadmintabelaCriar' /></p>";

							$i(i3GEOadmin.editor.esquema.onde).innerHTML = temp+"</fieldset>";
							if(selecao){
								$i("i3GEOadminesquema").value = selecao;
								i3GEOadmin.editor.tabela.lista();
							}
							core_carregando("desativa");
							$i(i3GEOadmin.editor.tabela.onde).innerHTML = "";
							botao = new YAHOO.widget.Button(
								"i3GEOadminesquemaCriar",
								{onclick:{fn: i3GEOadmin.editor.esquema.criar}}
							);
							botao.addClass("rodar");
							botao = new YAHOO.widget.Button(
								"i3GEOadminesquemaAlterarNome",
								{onclick:{fn: i3GEOadmin.editor.esquema.alterarNome}}
							);
							botao.addClass("rodar");

							botao = new YAHOO.widget.Button(
								"i3GEOadmintabelaCriar",
								{onclick:{fn: i3GEOadmin.editor.tabela.criar}}
							);
							botao.addClass("rodar");
						}
						catch(e){core_handleFailure(e,o.responseText);}
					},
					failure:core_handleFailure,
					argument: { foo:"foo", bar:"bar" }
			},
			codigo_estat_conexao = $i("i3GEOadmincodigo_estat_conexao").value;
			if(codigo_estat_conexao == ""){
				alert("Escolha uma conexao");
				$i(i3GEOadmin.editor.esquema.onde).innerHTML = "";
				$i(i3GEOadmin.editor.tabela.onde).innerHTML = "";
				return;
			}
			core_carregando("buscando dados...");
			core_makeRequest("../php/metaestat.php?funcao=esquemasConexao&formato=json&codigo_estat_conexao="+codigo_estat_conexao,callback);
		},
		criar: function(){
			var callback = {
					success:function(o){
						try	{
							core_carregando("desativa");
							i3GEOadmin.editor.esquema.lista(novoEsquema);
						}
						catch(e){core_handleFailure(e,o.responseText);}
					},
					failure:core_handleFailure,
					argument: { foo:"foo", bar:"bar" }
			},
			novoEsquema = window.prompt("Novo nome:","");
			if (novoEsquema != null && novoEsquema != ""){
				if(i3GEOadmin.editor.esquema.verificaExiste(novoEsquema) == false){
					core_carregando("adicionando...");
					core_makeRequest("../php/metaestat.php?funcao=criaEsquemaDB&formato=json&nome_esquema="+novoEsquema+"&codigo_estat_conexao="+$i("i3GEOadmincodigo_estat_conexao").value,callback);
				}
				else{
					alert("Esquema ja existe");
				}
			}
		},
		alterarNome: function(){
			if($i("i3GEOadminesquema").value == ""){
				alert("Escolha o esquema");
				return;
			}
			var callback = {
					success:function(o){
						try	{
							core_carregando("desativa");
							i3GEOadmin.editor.esquema.lista();
						}
						catch(e){core_handleFailure(e,o.responseText);}
					},
					failure:core_handleFailure,
					argument: { foo:"foo", bar:"bar" }
			},
			nomeEsquema = $i("i3GEOadminesquema").value;
			novoEsquema = window.prompt("Novo nome:","");
			if (novoEsquema != null && novoEsquema != ""){
				if(i3GEOadmin.editor.esquema.verificaExiste(novoEsquema) == false){
					core_carregando("adicionando...");
					core_makeRequest("../php/metaestat.php?funcao=alteraNomeEsquemaDB&formato=json&nome_esquema="+nomeEsquema+"&novonome_esquema="+novoEsquema+"&codigo_estat_conexao="+$i("i3GEOadmincodigo_estat_conexao").value,callback);
				}
				else{
					alert("Esquema ja existe");
				}
			}
		},
		verificaExiste: function(valor){
			var combo = $i("i3GEOadminesquema"),
				n = combo.options.length,
				i;
			for(i=0;i<n;i++){
				if(combo.options[i].value == valor){
					return true;
				}
			}
			return false;
		}
	},
	tabela:{
		onde: "i3GEOadminEditorTabela",
		optionsTabela: "",
		lista: function(){
			var callback = {
					success:function(o){
						try	{
							var botao, opt,dados = YAHOO.lang.JSON.parse(o.responseText),
							temp = "<fieldset>" +
							"<legend>SHP</legend>" +
							"<p class=paragrafo >Fa&ccedil;a o upload de um arquivo no formato shapefile e armazene os dados no banco Postgis e no esquema escolhido </p>" +
							"<input type=button value='Upload Shapefile' id='i3GEOadmin_botaoupload' /></p>" +
							"<div id='i3GEOadmin_formupload'></div>" +
							"</fieldset>" +
							"<fieldset>" +
							"<legend>CSV</legend>" +
							"<p class=paragrafo >Crie uma tabela nova a partir de um arquivo CSV. Utilize essa op&ccedil;&atilde;o para armazenar no banco os dados que ser&atilde;o relacionados &agrave;s tabelas contendo limites ou localidades. Se no CSV existirem colunas com as coordenadas, a tabela criada poder&aacute; armazenar a geometria possibilitando seu uso como localidades. </p>" +
							"<input type=button value='Upload CSV' id='i3GEOadmin_botaouploadcsv' /></p>" +
							"<div id='i3GEOadmin_formuploadcsv'></div>" +
							"</fieldset>";

							temp += "<fieldset>" +
							"<legend>Tabela</legend>" +
							"<p>Escolha uma tabela existente: " +
							"<div class='styled-select'><select id='i3GEOadmintabela' onchange='i3GEOadmin.editor.coluna.lista()'>";
							opt = core_comboObjeto(dados,"tabela","tabela");
							i3GEOadmin.editor.tabela.optionsTabela = opt;
							temp += opt;
							temp += "</select></div>" +
								"<p class=paragrafo ><input type=button value='Mostrar dados' id='i3GEOadmintabelaMostrar' />" +
								"<input type=button value='CSV' id='i3GEOadmintabelaCsv'/>" +
								"<input type=button value='Alterar nome atual' id='i3GEOadmintabelaAlterarNome' />" +
								"<input type=button value='Copiar para' id='i3GEOadmintabelaCopiar' />" +
							"</fieldset>";
							$i(i3GEOadmin.editor.tabela.onde).innerHTML = temp;

							botao = new YAHOO.widget.Button(
								"i3GEOadmin_botaoupload",
								{onclick:{fn: i3GEOadmin.editor.uploadshp.inicia}}
							);
							botao.addClass("rodar");
							botao = new YAHOO.widget.Button(
								"i3GEOadmin_botaouploadcsv",
								{onclick:{fn: i3GEOadmin.editor.uploadcsv.inicia}}
							);
							botao.addClass("rodar");
							botao = new YAHOO.widget.Button(
								"i3GEOadmintabelaMostrar",
								{onclick:{fn: i3GEOadmin.editor.tabela.mostrar}}
							);
							botao.addClass("rodar");
							botao = new YAHOO.widget.Button(
								"i3GEOadmintabelaCsv",
								{onclick:{fn: i3GEOadmin.editor.tabela.csv}}
							);
							botao.addClass("rodar");

							botao = new YAHOO.widget.Button(
								"i3GEOadmintabelaAlterarNome",
								{onclick:{fn: i3GEOadmin.editor.tabela.alterarNome }}
							);
							botao.addClass("rodar");
							botao = new YAHOO.widget.Button(
								"i3GEOadmintabelaCopiar",
								{onclick:{fn: i3GEOadmin.editor.tabela.copiar }}
							);
							botao.addClass("rodar");
							core_carregando("desativa");
							$i(i3GEOadmin.editor.coluna.onde).innerHTML = "";
						}
						catch(e){core_handleFailure(e,o.responseText);}
					},
					failure:core_handleFailure,
					argument: { foo:"foo", bar:"bar" }
			},
			codigo_estat_conexao = $i("i3GEOadmincodigo_estat_conexao").value,
			nome_esquema = $i("i3GEOadminesquema").value;
			if(nome_esquema == ""){
				alert("Escolha um esquema");
				$i(i3GEOadmin.editor.tabela.onde).innerHTML = "";
				$i(i3GEOadmin.editor.coluna.onde).innerHTML = "";
				return;
			}
			core_carregando("adicionando...");
			core_makeRequest("../php/metaestat.php?funcao=tabelasEsquema&formato=json&nome_esquema="+nome_esquema+"&codigo_estat_conexao="+codigo_estat_conexao,callback);
		},
		criar: function(){
			var callback = {
					success:function(o){
						try	{
							core_carregando("desativa");
							i3GEOadmin.editor.tabela.lista();
						}
						catch(e){core_handleFailure(e,o.responseText);}
					},
					failure:core_handleFailure,
					argument: { foo:"foo", bar:"bar" }
			},
			novaTabela = "",
			nomeEsquema = $i("i3GEOadminesquema").value;
			if(i3GEOadmin.editor.verificaEsquema(nomeEsquema) == false){
				return;
			}
			novaTabela = window.prompt("Nome da tabela:","");
			comentarioTabela = window.prompt("Comentario (opcional):","");
			if (novaTabela!=null && novaTabela!=""){
				if(i3GEOadmin.editor.tabela.verificaExiste(novaTabela) == false){
					core_carregando("adicionando...");
					core_makeRequest("../php/metaestat.php?funcao=criaTabelaDB&formato=json&comentario="+comentarioTabela+"&nome_tabela="+novaTabela+"&nome_esquema="+nomeEsquema+"&codigo_estat_conexao="+$i("i3GEOadmincodigo_estat_conexao").value,callback);
				}
				else{
					alert("Tabela ja existe");
				}
			}
		},
		alterarNome: function(){
			if($i("i3GEOadmintabela").value == ""){
				alert("Escolha a tabela");
				return;
			}
			var callback = {
					success:function(o){
						try	{
							core_carregando("desativa");
							i3GEOadmin.editor.tabela.lista();
						}
						catch(e){core_handleFailure(e,o.responseText);}
					},
					failure:core_handleFailure,
					argument: { foo:"foo", bar:"bar" }
			},
			novaTabela = "",
			nomeEsquema = $i("i3GEOadminesquema").value;
			if(i3GEOadmin.editor.verificaEsquema(nomeEsquema) == false){
				return;
			}
			novaTabela = window.prompt("Novo nome:","");
			if (novaTabela!=null && novaTabela!=""){
				if(i3GEOadmin.editor.tabela.verificaExiste(novaTabela) == false){
					core_carregando("adicionando...");
					core_makeRequest("../php/metaestat.php?funcao=alteraNomeTabelaDB&formato=json&nome_tabela="+$i("i3GEOadmintabela").value+"&novonome_tabela="+novaTabela+"&nome_esquema="+nomeEsquema+"&codigo_estat_conexao="+$i("i3GEOadmincodigo_estat_conexao").value,callback);
				}
				else{
					alert("Tabela ja existe");
				}
			}
		},
		copiar: function(){
			if($i("i3GEOadmintabela").value == ""){
				alert("Escolha a tabela");
				return;
			}
			var callback = {
					success:function(o){
						try	{
							core_carregando("desativa");
							i3GEOadmin.editor.tabela.lista();
						}
						catch(e){core_handleFailure(e,o.responseText);}
					},
					failure:core_handleFailure,
					argument: { foo:"foo", bar:"bar" }
			},
			novaTabela = "",
			nomeEsquema = $i("i3GEOadminesquema").value;
			if(i3GEOadmin.editor.verificaEsquema(nomeEsquema) == false){
				return;
			}
			novaTabela = window.prompt("Novo nome:","");
			if (novaTabela!=null && novaTabela!=""){
				if(i3GEOadmin.editor.tabela.verificaExiste(novaTabela) == false){
					core_carregando("adicionando...");
					core_makeRequest("../php/metaestat.php?funcao=copiaTabelaDB&formato=json&nome_tabela="+$i("i3GEOadmintabela").value+"&novonome_tabela="+novaTabela+"&nome_esquema="+nomeEsquema+"&codigo_estat_conexao="+$i("i3GEOadmincodigo_estat_conexao").value,callback);
				}
				else{
					alert("Tabela ja existe");
				}
			}
		},
		mostrar: function(nreg, nome_tabela, nomeEsquema, codigo_estat_conexao, w){
			//caso o clique venha como evento
			if(arguments.length === 2){
				nreg = false;
			}
			if(!nome_tabela && $i("i3GEOadmintabela").value == ""){
				alert("Escolha a tabela");
				return;
			}
			if(!nome_tabela){
				nome_tabela = $i("i3GEOadmintabela").value;
			}
			if(!nomeEsquema){
				nomeEsquema = $i("i3GEOadminesquema").value;
			}
			if(!codigo_estat_conexao){
				codigo_estat_conexao = $i("i3GEOadmincodigo_estat_conexao").value;
			}
			if(!nreg){
				nreg = window.prompt("Numero maximo de registros");
			}
			var	callback = {
					success:function(o){
						try	{
							core_carregando("desativa");
							var dados = YAHOO.lang.JSON.parse(o.responseText),
								ncolunas = dados.nomescolunas.length,
								linhas = dados.linhas,
								nlinhas = linhas.length,
								tabela = [],
								i,j,l;
							tabela.push("<head><body><table style='border:1px solid black'><tr>");
							for(i=0;i<ncolunas;i++){
								tabela.push("<td style='border:1px solid gray' >"+dados.nomescolunas[i]+"</td>");
							}
							tabela.push("</tr>");
							for(i=0;i<nlinhas;i++){
								tabela.push("<tr>");
								l = linhas[i];
								for(j=0;j<ncolunas;j++){
									tabela.push("<td style='border:1px solid beige'>"+l[j]+"</td>");
								}
								tabela.push("</tr>");
							}
							tabela.push("</table></body></head>");
							if (!w){
								w = window.open();
							}
							w.document.write(tabela.join(""));
							w.document.close();
						}
						catch(e){core_handleFailure(e,o.responseText);}
					},
					failure:core_handleFailure,
					argument: { foo:"foo", bar:"bar" }
			};
			core_carregando("obtendo dados...");
			core_makeRequest("../php/metaestat.php?funcao=obtemDadosTabelaDB&nreg="+nreg+"&geo=nao&formato=json&nome_tabela="+nome_tabela+"&nome_esquema="+nomeEsquema+"&codigo_estat_conexao="+codigo_estat_conexao,callback);
		},
		csv: function(){
			if($i("i3GEOadmintabela").value == ""){
				alert("Escolha a tabela");
				return;
			}
			nomeEsquema = $i("i3GEOadminesquema").value;
			window.open("../php/metaestat.php?funcao=obtemDadosTabelaDB&geo=nao&formato=csv&nome_tabela="+$i("i3GEOadmintabela").value+"&nome_esquema="+nomeEsquema+"&codigo_estat_conexao="+$i("i3GEOadmincodigo_estat_conexao").value);
		},
		verificaExiste: function(valor){
			var combo = $i("i3GEOadmintabela"),
				n = combo.options.length,
				i;
			for(i=0;i<n;i++){
				if(combo.options[i].value == valor){
					return true;
				}
			}
			return false;
		}
	},
	coluna: {
		onde: "i3GEOadminEditorColuna",
		lista: function(){
			var callback = {
					success:function(o){
						try	{
							var botao, dados = YAHOO.lang.JSON.parse(o.responseText),
							temp = "<fieldset>" ;
							temp += "<p>Coment&aacute;rio registrado na tabela: "+dados["comentario"];
							temp += "<p>Escolha uma coluna: ";
							temp += "<div class='styled-select'><select id='i3GEOadmincoluna' >";
							temp += core_comboObjeto(dados["colunas"],"","");
							temp += "</select></div>";
							temp += "" +
									"<p class=paragrafo ><input type=button value='Adicionar uma nova coluna' id='i3GEOadmincolunaCriar' />" +
									"<input type=button value='Alterar o nome atual' id='i3GEOadmincolunaAlterarNome' />";
							$i(i3GEOadmin.editor.coluna.onde).innerHTML = temp+"</fieldset>";
							botao = new YAHOO.widget.Button(
								"i3GEOadmincolunaCriar",
								{onclick:{fn: i3GEOadmin.editor.coluna.criar}}
							);
							botao.addClass("rodar");
							botao = new YAHOO.widget.Button(
								"i3GEOadmincolunaAlterarNome",
								{onclick:{fn: i3GEOadmin.editor.coluna.alterarNome}}
							);
							botao.addClass("rodar");
							core_carregando("desativa");
						}
						catch(e){core_handleFailure(e,o.responseText);}
					},
					failure:core_handleFailure,
					argument: { foo:"foo", bar:"bar" }
			},
			codigo_estat_conexao = $i("i3GEOadmincodigo_estat_conexao").value,
			nome_esquema = $i("i3GEOadminesquema").value,
			nome_tabela = $i("i3GEOadmintabela").value;
			if(nome_tabela == ""){
				alert("Escolha uma tabela");
				$i(i3GEOadmin.editor.coluna.onde).innerHTML = "";
				return;
			}
			core_carregando("adicionando...");
			core_makeRequest("../php/metaestat.php?funcao=infoTabela&formato=json&nome_tabela="+nome_tabela+"&nome_esquema="+nome_esquema+"&codigo_estat_conexao="+codigo_estat_conexao,callback);
		},
		criar: function(){
			var callback = {
					success:function(o){
						try	{
							core_carregando("desativa");
							i3GEOadmin.editor.coluna.lista();
						}
						catch(e){core_handleFailure(e,o.responseText);}
					},
					failure:core_handleFailure,
					argument: { foo:"foo", bar:"bar" }
			},
			novaColuna = "",
			tipo = "",
			nomeEsquema = $i("i3GEOadminesquema").value,
			nomeTabela = $i("i3GEOadmintabela").value;
			if(i3GEOadmin.editor.verificaEsquema(nomeEsquema) == false){
				return;
			}

			novaColuna = window.prompt("Nome:","");
			if (novaColuna!=null && novaColuna!=""){
				tipo = window.prompt("Tipo (integer, numeric, text, geometry):","");
				if (tipo!=null && tipo!=""){
					if(i3GEOadmin.editor.coluna.verificaExiste(novaColuna) == false){
						core_carregando("adicionando...");
						core_makeRequest("../php/metaestat.php?funcao=criaColunaDB&formato=json&tipo="+tipo+"&nova_coluna="+novaColuna+"&nome_tabela="+nomeTabela+"&nome_esquema="+nomeEsquema+"&codigo_estat_conexao="+$i("i3GEOadmincodigo_estat_conexao").value,callback);
					}
					else{
						alert("Coluna ja existe");
					}
				}
			}
		},
		alterarNome: function(){
			var novaColuna="",callback = {
					success:function(o){
						try	{
							core_carregando("desativa");
							i3GEOadmin.editor.coluna.lista();
						}
						catch(e){core_handleFailure(e,o.responseText);}
					},
					failure:core_handleFailure,
					argument: { foo:"foo", bar:"bar" }
			},
			nomeEsquema = $i("i3GEOadminesquema").value,
			nomeColuna = $i("i3GEOadmincoluna").value;
			novaColuna = window.prompt("Novo nome:","");
			if (novaColuna!=null && novaColuna!=""){
				if(i3GEOadmin.editor.verificaEsquema(nomeEsquema) == false){
					return;
				}
				if(i3GEOadmin.editor.coluna.verificaExiste(novaColuna) == false){
					core_carregando("adicionando...");
					core_makeRequest("../php/metaestat.php?funcao=alteraNomeColunaDB&formato=json&nome_coluna="+nomeColuna+"&nome_tabela="+$i("i3GEOadmintabela").value+"&novonome_coluna="+novaColuna+"&nome_esquema="+nomeEsquema+"&codigo_estat_conexao="+$i("i3GEOadmincodigo_estat_conexao").value,callback);
				}
				else{
					alert("Coluna ja existe");
				}
			}
		},
		verificaExiste: function(valor){
			var combo = $i("i3GEOadmincoluna"),
				n = combo.options.length,
				i;
			for(i=0;i<n;i++){
				if(combo.options[i].value == valor){
					return true;
				}
			}
			return false;
		}
	},
	uploadshp: {
		inicia: function(){
			$i("i3GEOadmin_botaoupload").style.display = "none";
			$i("i3GEOadmin_botaouploadcsv").style.display = "";
			i3GEOadmin.editor.esvaziaFormsUpload();
			var botao, onde = $i("i3GEOadmin_formupload");
			if(onde.innerHTML != ""){
				onde.innerHTML = "";
				return;
			}
			$i("i3GEOadmin_formupload").innerHTML = i3GEOadmin.editor.uploadshp.formulario();
			botao = new YAHOO.widget.Button(
				"i3GEOuploadsubmit",
				{onclick:{fn: i3GEOadmin.editor.uploadshp.submit}}
			);
			botao.addClass("rodar");
			i3GEO.util.comboEpsg("comboInSrid","selInSrid","i3GEOadmin.editor.uploadshp.mudaComboInSrid",4326);
			i3GEO.util.comboEpsg("comboOutSrid","selOutSrid","i3GEOadmin.editor.uploadshp.mudaComboOutSrid",4326);
			window.location.hash="i3GEOuploadshp";
		},
		mudaComboInSrid: function(obj){
			$i("insrid").value = obj.value;
		},
		mudaComboOutSrid: function(obj){
			$i("outsrid").value = obj.value;
		},
		formulario: function(){
			var ins = '' +
			'<form id=i3GEOuploadf target="i3GEOuploadiframe" action="../php/metaestat_uploadshp_submit.php" method="post" ENCTYPE="multipart/form-data">' +
			'<fieldset class=subbloco >' +
			'<legend>Shapefile de origem</legend>' +
			'<p class="paragrafo" >shp: <br><input type="file" size=22 name="i3GEOuploadshp" style="top:0px;left:0px;cursor:pointer;"></p>' +
			'<p class="paragrafo" >shx: <br><input type="file" size=22 name="i3GEOuploadshx" style="top:0px;left:0px;cursor:pointer;"></p>' +
			'<p class="paragrafo" >dbf: <br><input type="file" size=22 name="i3GEOuploaddbf" style="top:0px;left:0px;cursor:pointer;"></p>' +
			'<p class="paragrafo" >prj (opcional): <br><input type="file" size=22 name="i3GEOuploadprj" style="top:0px;left:0px;cursor:pointer;"></p>' +
			'</fieldset>' +
			'<fieldset class=subbloco >' +
			'<legend>Destino</legend>' +
			'<p class="paragrafo" >Nome da tabela (n&atilde;o utilize caracteres incompat&iacute;veis com o banco de dados, como -, acentos ou espa&ccedil;os em branco):<br>' +
			'<input class=digitar type="text" size=40 id="tabelaDestino" name="tabelaDestino" style="top:0px;left:0px;cursor:pointer;"> ' +
			'Ou escolha uma tabela existente no banco de dados: ' +
			'<div class=styled-select ><select onchange="javascript:$i(\'tabelaDestino\').value = this.value;">' +
			i3GEOadmin.editor.tabela.optionsTabela +
			'</select></div>' +
			'<p class="paragrafo" >Tipo de opera&ccedil;&atilde;o:</p>' +
			'<div class=styled-select ><select id=i3GEOtipoOperacao name=tipoOperacao >' +
			'<option value=criar >Criar a tabela nova e incluir registros do SHP</option>' +
			'<option value=incluir >Adicionar novos registros</option>' +
			'<option value=apagar >Apagar dados atuais e incluir do SHP</option>' +
			'</select></div>' +
			'</fieldset>' +
			'<fieldset class=subbloco >' +
			'<legend>Coment&aacute;rio</legend>' +
			'<p class="paragrafo" >Registrar o seguinte coment&aacute;rio na tabela:</p>' +
			'<textarea name="comentarioShp" rows="5" cols="70" ></textarea>' +
			'</fieldset>' +
			'<fieldset class=subbloco >' +
			'<legend>Proje&ccedil;&atilde;o</legend>' +
			'<p class="paragrafo" >Se voc&ecirc; n&atilde;o escolheu o arquivo PRJ escolha o c&oacute;digo da proje&ccedil;&atilde;o (SRID) do arquivo</p>' +
			'<input class=digitar type="text" value="4326" size=20 id="insrid" name="insrid" style="top:0px;left:0px;cursor:pointer;float:left;margin-right:10px;"><div id=selInSrid ></div>' +
			'<p class="paragrafo" >Projetar o arquivo para (deixe em branco se voc&ecirc; n&atilde;o quiser aplicar nenhuma transforma&ccedil;&atilde;o de proje&ccedil;&atilde;o):</p>' +
			'<input class=digitar type="text" value="" size=20 id="outsrid" name="outsrid" style="top:0px;left:0px;cursor:pointer;float:left;margin-right:10px;"><div id=selOutSrid ></div>' +
			'</fieldset>' +
			'<fieldset class=subbloco >' +
			'<legend>Enviar</legend>' +
			'<p class="paragrafo" ><input type=checkbox name=i3GEOuploadCriaMapfile id=i3GEOuploadCriaMapfile style="cursor:pointer;position:relative;top:2px;" />&nbsp;Marque para criar o arquivo de configura&ccedil;&atilde;o (mapfile) e visualizar os dados no mapa interativo (voc&ecirc; poder&aacute; editar esse arquivo posteriormente no editor de mapfiles)' +
			'<p class="paragrafo" ><input type="checkbox" id="incluiserialshp" name="incluiserialshp" style="cursor:pointer;position:relative;top:2px;">&nbsp;Inclui uma coluna gid do tipo serial e chave prim&aacute;ria com c&oacute;digo &uacute;nico</p>' +
			'<p class="paragrafo" ><input id=i3GEOuploadsubmit type="button" value="Enviar shapefile" size=12 />' +
			'<input type="hidden" name="MAX_FILE_SIZE" value="100000000">' +
			'<input type="hidden" id="i3GEOuploadcodigoconexao" name="i3GEOuploadcodigoconexao" value="">' +
			'<input type="hidden" id="i3GEOuploadesquema" name="i3GEOuploadesquema" value="">' +
			"<p class='paragrafo' style=color:red >N&atilde;o utilize '_' no nome do arquivo. Apenas letras e n&uacute;meros s&atilde;o aceitos!!!</p>" +
			'<iframe name=i3GEOuploadiframe id=i3GEOuploadiframeId style="display:none; text-align:left;border:1px solid gray;" width="98%" height="200px"></iframe>' +
			'<p class="paragrafo" >Ap&oacute;s terminar o processo, atualize essa p&aacute;gina para que a nova tabela criada apare&ccedil;a nas listas de sele&ccedil;&atilde;o.</p>' +
			'<p class="paragrafo" >Utilize o <a href="./estat_tipo_regiao.html" >cadastro de regi&otilde;es</a> para registrar a tabela criada como uma nova unidade geogr&aacute;fica que poder&aacute; ser escolhida no processo de cria&ccedil;&atilde;o de vari&aacute;veis.</p>' +
			'</fieldset>' +
			'</form>';
			return ins;
		},
		submit: function(){
			if($i("i3GEOtipoOperacao").value === "apagar"){
				var confirma = window.confirm("Apaga mesmo os registros? (nao pode ser revertido)");
				if(!confirma){
					return;
				}
			}
			if($i("tabelaDestino").value == ""){
				alert("Digite o nome da tabela a ser criada");
				return;
			}
			if($i("insrid").value == ""){
				alert("Digite o valor do SRID");
				return;
			}
			$i("i3GEOuploadcodigoconexao").value = $i("i3GEOadmincodigo_estat_conexao").value;
			$i("i3GEOuploadesquema").value = $i("i3GEOadminesquema").value;
			$i("i3GEOuploadiframeId").style.display = "block";
			$i("i3GEOuploadf").submit();
			$i("tabelaDestino").value = "";
		}
	},
	uploadcsv: {
		inicia: function(){
			$i("i3GEOadmin_botaouploadcsv").style.display = "none";
			$i("i3GEOadmin_botaoupload").style.display = "";
			i3GEOadmin.editor.esvaziaFormsUpload();
			var botao,onde = $i("i3GEOadmin_formuploadcsv");
			if(onde.innerHTML != ""){
				onde.innerHTML = "";
				return;
			}
			$i("i3GEOadmin_formuploadcsv").innerHTML = i3GEOadmin.editor.uploadcsv.formulario();
			botao = new YAHOO.widget.Button(
				"i3GEOuploadcsvsubmit",
				{onclick:{fn: i3GEOadmin.editor.uploadcsv.submit}}
			);
			botao.addClass("rodar");
		},
		formulario: function(){
			var ins = '' +
			'<form id=i3GEOuploadcsvf target="i3GEOuploadcsviframe" action="../php/metaestat_uploadcsv_submit.php" method="post" ENCTYPE="multipart/form-data">' +
			'<fieldset class=subbloco >' +
			'<p class="paragrafo" >CSV (N&atilde;o utilize separador de milhar e utilize ponto como separador de casas decimais ou a importa&ccedil;&atilde;o poder&aacute; n&atilde;o ocorrer): <br><br><input type="file" size=22 name="i3GEOuploadcsv" style="top:0px;left:0px;cursor:pointer;"></p>' +
			'<p class="paragrafo" >Nome da nova tabela (n&atilde;o utilize caracteres incompat&iacute;veis com o banco de dados, como -, acentos ou espa&ccedil;os em branco):<br><input class=digitar type="text" size=20 id="tabelaDestinocsv" name="tabelaDestinocsv" style="top:0px;left:0px;cursor:pointer;">&nbsp;' +
			'Ou escolha da lista: ' +
			'<div class=styled-select ><select onchange="javascript:$i(\'tabelaDestinocsv\').value = this.value;">' +
			i3GEOadmin.editor.tabela.optionsTabela +
			'</select></div>' +
			'</fieldset>' +
			'<fieldset class=subbloco >' +
			'<p class="paragrafo" >Coment&aacute;rio:</p>' +
			'<textarea name="comentarioCsv" rows="5" cols="70" ></textarea>' +
			'<p class="paragrafo" >Tipo de opera&ccedil;&atilde;o:</p>' +
			'<div class=styled-select ><select id=i3GEOtipoOperacaocsv name=tipoOperacao >' +
			'<option value=criar >Criar a tabela nova e incluir registros do CSV</option>' +
			'<option value=incluir >Adicionar novos registros</option>' +
			'<option value=apagar >Apagar dados atuais e incluir do CSV</option>' +
			'</select></div>' +
			'<p class="paragrafo" ><input type="checkbox" id="incluiserialcsv" name="incluiserialcsv" style="cursor:pointer;position:relative;top:2px;">&nbsp;Inclui uma coluna gid do tipo serial e chave prim&aacute;ria com c&oacute;digo &uacute;nico</p>' +
			'<p class="paragrafo" >Opcional (utilize sempre coordenadas em d&eacute;cimos de grau no CSV): <br><br>coluna que cont&eacute;m as latitudes (Y) <input class=digitar type="text" size=8 id="colunaycsv" name="colunaycsv" style="top:0px;left:0px;cursor:pointer;"> coluna que cont&eacute;m as longitudes (X) <input class=digitar type="text" size=8 id="colunaxcsv" name="colunaxcsv" style="top:0px;left:0px;cursor:pointer;"></p>' +
			'</fieldset>' +
			'<fieldset class=subbloco >' +
			'<p class="paragrafo" ><input id=i3GEOuploadcsvsubmit type="button" value="Enviar CSV" size=12 />' +
			'<input type="hidden" name="MAX_FILE_SIZE" value="1000000" />' +
			'<input type="hidden" id="i3GEOuploadcsvcodigoconexao" name="i3GEOuploadcsvcodigoconexao" value="" />' +
			'<input type="hidden" id="i3GEOuploadcsvesquema" name="i3GEOuploadcsvesquema" value="" />' +
			'<iframe name=i3GEOuploadcsviframe style="text-align:left;border:1px solid gray;" width="98%" height="400px"></iframe>' +
			'<p class="paragrafo" >Ap&oacute;s terminar o processo, atualize essa p&aacute;gina para que a nova tabela criada apare&ccedil;a nas listas de sele&ccedil;&atilde;o.</p>' +
			'<p class="paragrafo" >Se voc&ecirc; est&aacute; usando o do m&oacute;dulo de metadados estat&iacute;sticos veja o <a href="./estat_tipo_regiao.html" >cadastro de regi&otilde;es</a> para registrar a tabela criada com latitude e longitude como uma nova unidade geogr&aacute;fica que poder&aacute; ser escolhida no processo de cria&ccedil;&atilde;o de vari&aacute;veis.</p>' +
			'</fieldset>'+
			'</form>';

			return ins;
		},
		submit: function(){
			if($i("tabelaDestinocsv").value == ""){
				alert("Digite o nome da tabela a ser criada");
				return;
			}
			$i("i3GEOuploadcsvcodigoconexao").value = $i("i3GEOadmincodigo_estat_conexao").value;
			$i("i3GEOuploadcsvesquema").value = $i("i3GEOadminesquema").value;
			$i("i3GEOuploadcsvf").submit();
			$i("tabelaDestinocsv").value = "";
		}
	},
	esvaziaFormsUpload: function(){
		var csv = $i("i3GEOadmin_formuploadcsv"),
			shp = $i("i3GEOadmin_formupload");
		if(csv){
			csv.innerHTML = "";
		}
		if(shp){
			shp.innerHTML = "";
		}
	}
};
