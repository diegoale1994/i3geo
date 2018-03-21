if (typeof (i3GEOF) === 'undefined') {
	var i3GEOF = {};
}
/*
 * Classe: i3GEOF.conectarservicos
 */
i3GEOF.conectarservicos =
{
	/**
	 * Template no formato mustache. E preenchido na carga do javascript com o programa dependencias.php
	 */
	MUSTACHE : "",
	/**
	 * Susbtitutos para o template
	 */
	mustacheHash : function() {
		var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.conectarservicos.dicionario);
		dicionario["locaplic"] = i3GEO.configura.locaplic;
		return dicionario;
	},
	/*
	 * Function: iniciaDicionario (Depreciado na versao 6.0)
	 *
	 */
	iniciaDicionario : function() {
		i3GEOF.conectarservicos.iniciaJanelaFlutuante();
	},
	/*
	 * Function: inicia
	 *
	 * Inicia a ferramenta. &Eacute; chamado por criaJanelaFlutuante
	 *
	 * Parametro:
	 *
	 * iddiv {String} - id do div que receber&aacute; o conteudo HTML da ferramenta
	 */
	inicia : function(iddiv) {
		$i(iddiv).innerHTML = i3GEOF.conectarservicos.html();
		new YAHOO.widget.Button("i3GEOFconectarservicosKml", {
			onclick : {
				fn : function() {
					i3GEO.util.scriptTag(i3GEO.configura.locaplic
						+ "/ferramentas/carregakml/dependencias.php",
						"i3GEOF.carregakml.iniciaJanelaFlutuante()",
					"i3GEOF.carregakml_script");
				}
			}
		});
		new YAHOO.widget.Button("i3GEOFconectarservicosWms", {
			onclick : {
				fn : function() {
					i3GEO.janela
					.cria(
						"400px",
						"300px",
						i3GEO.configura.locaplic
						+ "/ferramentas/conectarwms/index.htm",
						"",
						"",
						$trad("a4")
						+ "&nbsp;<a class=ajuda_usuario target=_blank href='"
						+ i3GEO.configura.locaplic
						+ "/ajuda_usuario.php?idcategoria=4&idajuda=28' ><b> </b></a>",
						"i3GEO.conectarwms",
						false,
						"hd",
						"",
						"",
						"",
						true
					);
				}
			}
		});
		new YAHOO.widget.Button("i3GEOFconectarservicosWmst", {
			onclick : {
				fn : function() {
					i3GEO.janela
					.cria(
						"600px",
						"400px",
						i3GEO.configura.locaplic
						+ "/ferramentas/wmstime/index.htm",
						"",
						"",
						$trad("x46")
						+ "&nbsp;<a class=ajuda_usuario target=_blank href='"
						+ i3GEO.configura.locaplic
						+ "/ajuda_usuario.php?idcategoria=4&idajuda=76' ><b> </b></a>",
						"i3GEO.conectarwmst",
						false,
						"hd",
						"",
						"",
						"",
						true
					);
				}
			}
		});
		new YAHOO.widget.Button("i3GEOFconectarservicosGeorss", {
			onclick : {
				fn : function() {
					i3GEO.janela
					.cria(
						"400px",
						"300px",
						i3GEO.configura.locaplic
						+ "/ferramentas/conectargeorss/index.htm",
						"",
						"",
						$trad("x47")
						+ "&nbsp;<a class=ajuda_usuario target=_blank href='"
						+ i3GEO.configura.locaplic
						+ "/ajuda_usuario.php?idcategoria=4&idajuda=29' ><b> </b></a>",
						"i3GEO.conectargeorss",
						false,
						"hd",
						"",
						"",
						"",
						true
					);
				}
			}
		});
		new YAHOO.widget.Button("i3GEOFconectarservicosGeojson", {
			onclick : {
				fn : function() {
					i3GEO.util.scriptTag(i3GEO.configura.locaplic
						+ "/ferramentas/conectargeojson/dependencias.php",
						"i3GEOF.conectargeojson.iniciaJanelaFlutuante()",
					"i3GEOF.conectargeojson_script");
				}
			}
		});
	},
	/*
	 * Function: html
	 *
	 * Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta
	 *
	 * Retorno:
	 *
	 * String com o c&oacute;digo html
	 */
	html : function() {
		var ins = Mustache.render(i3GEOF.conectarservicos.MUSTACHE, i3GEOF.conectarservicos.mustacheHash());
		return ins;
	},
	/*
	 * Function: criaJanelaFlutuante
	 *
	 * Cria a janela flutuante para controle da ferramenta.
	 */
	iniciaJanelaFlutuante : function() {
		var cabecalho, janela, divid, titulo;
		if($i("i3GEOF.conectarservicos")){
			return;
		}
		cabecalho = function() {
		};
		// cria a janela flutuante
		titulo = "<span class='i3GEOiconeFerramenta i3GEOiconeAdd'></span><div class='i3GeoTituloJanela'>" + $trad("conexao",i3GEOF.conectarservicos.dicionario)+"</div>";
		janela =
			i3GEO.janela.cria(
				"230px",
				"180px",
				"",
				"",
				"",
				titulo,
				"i3GEOF.conectarservicos",
				false,
				"hd",
				cabecalho,
				"",
				"",
				true
			);
		divid = janela[2].id;
		$i("i3GEOF.conectarservicos_corpo").style.backgroundColor = "white";
		i3GEOF.conectarservicos.inicia(divid);
	}
};
