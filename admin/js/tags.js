/*
Title: tags.js

Fun&ccedil;&otilde;es que controlam a interface do editor de tags

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

Arquivo:

i3geo/admin/js/tags.js
*/
YAHOO.namespace("admin.container");
/*
Function: initMenu

Inicializa o editor

<ALTERATAGS>
*/
function initMenu()
{
	core_ativaBotaoAdicionaLinha("../php/menutemas.php?funcao=alteraTags","adiciona");
	core_carregando("ativa");
	core_ativaPainelAjuda("ajuda","botaoAjuda");
	pegaTags();
}
/*
Function: pegaTags

Obt&eacute;m a lista de tags

<PEGATAGS>
*/
function pegaTags()
{
	core_pegaDados($trad("msgBuscaTags",i3GEOadmin.tags.dicionario),"../php/menutemas.php?funcao=pegaTags","montaTabela");
}
function montaTabela(dados)
{
	YAHOO.example.InlineCellEditing = new function()
	{
		// Custom formatter for "address" column to preserve line breaks
		var formatTexto = function(elCell, oRecord, oColumn, oData)
		{
			elCell.innerHTML = "<p style=width:250px >" + oData + "</p>";
		};
		var formatTextoId = function(elCell, oRecord, oColumn, oData)
		{
			elCell.innerHTML = "<p style=width:20px >" + oData + "</p>";
		};

		var formatSalva = function(elCell, oRecord, oColumn)
		{
			elCell.innerHTML = "<div class=salvar style='text-align:center' onclick='gravaLinha(\""+oRecord._sId+"\")'></div>";
		};
		var formatExclui = function(elCell, oRecord, oColumn)
		{
			elCell.innerHTML = "<div class=excluir style='text-align:center' ></div>";
		};
		var myColumnDefs = [
			{key:"excluir",label:$trad("excluir",i3GEOadmin.core.dicionario),formatter:formatExclui},
			{label:$trad("salva2",i3GEOadmin.core.dicionario),formatter:formatSalva},
			{label:"id",key:"id_tag", formatter:formatTextoId},
			{label:$trad("nome",i3GEOadmin.core.dicionario),resizeable:true,key:"nome", formatter:formatTexto, editor:new YAHOO.widget.TextboxCellEditor({disableBtns:true})}
		];
		myDataSource = new YAHOO.util.DataSource(dados);
		myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSARRAY;
		myDataSource.responseSchema =
		{
			fields: ["id_tag","nome"]
		};
		myDataTable = new YAHOO.widget.DataTable("tabela", myColumnDefs, myDataSource);
		// Set up editing flow
		myDataTable.highlightEditableCell = function(oArgs)
		{
			var elCell = oArgs.target;
			var column = myDataTable.getColumn(oArgs.target);
			if(!YAHOO.lang.isNull(column.editor))
			{
				YAHOO.util.Dom.addClass(elCell,'yui-dt-highlighted');
			}
		};
		myDataTable.unhighlightEditableCell = function(oArgs)
		{
			var elCell = oArgs.target;
			if(elCell.style.cursor="pointer")
			{
				YAHOO.util.Dom.removeClass(elCell,'yui-dt-highlighted');
			}
		};
		myDataTable.subscribe("cellMouseoverEvent", myDataTable.highlightEditableCell);
		myDataTable.subscribe("cellMouseoutEvent", myDataTable.unhighlightEditableCell);
		myDataTable.subscribe('cellClickEvent',function(ev)
		{
			var target = YAHOO.util.Event.getTarget(ev);
			var column = this.getColumn(target);
			if(YAHOO.admin.container.panelCK)
			{
				YAHOO.admin.container.panelCK.destroy();
				YAHOO.admin.container.panelCK = null;
			}
			if (column.key == 'excluir')
			{
				var record = this.getRecord(target);
				excluiLinha(record.getData('id_tag'),target);
			}
			else
			{this.onEventShowCellEditor(ev);}
		});
		// Hook into custom event to customize save-flow of "radio" editor
		myDataTable.subscribe("editorUpdateEvent", function(oArgs)
		{
			if(oArgs.editor.column.key === "active")
			{
				this.saveCellEditor();

			}
		});
		myDataTable.subscribe("editorBlurEvent", function(oArgs)
		{
			this.cancelCellEditor();
		});
		myDataTable.subscribe("editorSaveEvent", function(oArgs)
		{
			if(oArgs.newData != oArgs.oldData){
				var linha = myDataTable.getTrEl(oArgs.editor.getRecord());
				linha.style.color = "blue";
				linha.style.textDecoration = "blink";
			}
		});

	};
	core_carregando("desativa");
}
/*
Function: gravaLinha

Aplica as altera&ccedil;&otilde;es em um tag

<ALTERATAGS>
*/
function gravaLinha(row)
{
	var r = myDataTable.getRecordSet().getRecord(row);
	var id_tag = r.getData("id_tag");
	var nome = r.getData("nome");
	core_carregando("ativa");
	var mensagem = $trad("gravaId",i3GEOadmin.core.dicionario)+id_tag;
	var sUrl = "../php/menutemas.php?funcao=alteraTags&nome="+nome+"&id="+id_tag;
	core_gravaLinha(mensagem,row,sUrl);
}
function excluiLinha(id,row)
{
	var mensagem = $trad("msgExclui",i3GEOadmin.core.dicionario)+id;
	var sUrl = "../php/menutemas.php?funcao=excluirRegistro&id="+id+"&tabela=tags";
	core_excluiLinha(sUrl,row,mensagem);
}
