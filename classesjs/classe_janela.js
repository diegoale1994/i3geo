/**
 * Title: Janelas
 *
 * Cria e gerencia janelas flutuantes
 *
 * As janelas s&atilde;o criadas por meio da biblioteca YUI
 *
 * Namespace:
 *
 * i3GEO.janela
 *
 * Veja:
 *
 * <http://localhost/i3geo/classesjs/classe_janela.js>
 */

/**
 * Licen&ccedil;a
 *
 * GPL2
 *
 * i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet
 *
 * Direitos Autorais Reservados (c) 2006 Minist&eacute;rio do Meio Ambiente Brasil Desenvolvedor: Edmar Moretti edmar.moretti@gmail.com
 *
 * Este programa &eacute; software livre; voc&ecirc; pode redistribu&iacute;-lo e/ou modific&aacute;-lo sob os termos da Licen&ccedil;a
 * P&uacute;blica Geral GNU conforme publicada pela Free Software Foundation;
 *
 * Este programa &eacute; distribu&iacute;do na expectativa de que seja &uacute;til, por&eacute;m, SEM NENHUMA GARANTIA; nem mesmo a
 * garantia impl&iacute;cita de COMERCIABILIDADE OU ADEQUAC&Atilde;O A UMA FINALIDADE ESPEC&Iacute;FICA. Consulte a Licen&ccedil;a
 * P&uacute;blica Geral do GNU para mais detalhes. Voc&ecirc; deve ter recebido uma c&oacute;pia da Licen&ccedil;a P&uacute;blica Geral do
 * GNU junto com este programa; se n&atilde;o, escreva para a Free Software Foundation, Inc., no endere&ccedil;o 59 Temple Street, Suite
 * 330, Boston, MA 02111-1307 USA.
 */
if (typeof (i3GEO) === 'undefined') {
	var i3GEO = {};
}
/**
 * YAHOO.namespace
 *
 * Namespace da biblioteca YUI utilizado para armazenar janelas flutuantes
 */
YAHOO.namespace("i3GEO.janela");
/**
 * Variavel: YAHOO.widget.OverlayManager
 *
 * Gerenciador das janelas flutuantes da biblioteca YUI
 *
 * Type:
 *
 * {YAHOO.widget.OverlayManager}
 */
YAHOO.i3GEO.janela.manager = new YAHOO.widget.OverlayManager();
// para efeitos de compatibilidade com a vers&atilde;o 4.6
YAHOO.namespace("janelaDoca.xp");
YAHOO.janelaDoca.xp.manager = new YAHOO.widget.OverlayManager();
/**
 * Variavel: YAHOO.i3GEO.janela.managerAguarde
 *
 * Gerenciador das janelas flutuantes de aguarde
 *
 * Type:
 *
 * {YAHOO.widget.OverlayManager}
 */
YAHOO.i3GEO.janela.managerAguarde = new YAHOO.widget.OverlayManager();

// TODO criar janela que permita inserir um link e salva-la junto com o mapa
i3GEO.janela =
	{
		/**
		 * Propriedade: ESTILOABD
		 *
		 * Estilo que ser&aacute; aplicado ao elemento body da janela (class='bd')
		 *
		 * Tipo:
		 *
		 * {String}
		 *
		 * Default:
		 *
		 * display:block;padding:5px 1px 5px 1px;
		 */
		ESTILOBD : "display:block;padding:5px 1px 5px 1px;",
		/**
		 * Propriedade: ESTILOAGUARDE
		 *
		 * Estilo da janela de aguarde
		 *
		 * Utilize nenhum para nunca mostrar a janela
		 *
		 * Pode ser normal|reduzida|minima|nenhum
		 *
		 * Tipo:
		 *
		 * {String}
		 *
		 * Default:
		 *
		 * normal
		 */
		ESTILOAGUARDE : "normal",
		/**
		 * Propriedade: AGUARDEMODAL
		 *
		 * Indica se a janela de aguarde ser&aacute; do tipo MODAL, ou seja, se ir&aacute; ou n&atilde;o bloquear as op&ccedil;&otilde;es do
		 * mapa.
		 *
		 * Tipo:
		 *
		 * {Boolean}
		 *
		 * Default:
		 *
		 * false
		 */
		AGUARDEMODAL : false,
		/**
		 * Lista com os nomes das fun&ccedil;&otilde;es que ser&atilde;o executadas antes de abrir a janela.
		 *
		 * Este &eacute; um array que pode ser modificado utilizando-se as fun&ccedil;&otilde;es javascript de manipula&ccedil;&atilde;o de
		 * arrays.
		 *
		 * Tipo:
		 *
		 * {Array}
		 *
		 * Default:
		 *
		 * i3GEO.janela.prepara()
		 */
		ANTESCRIA : [
			"i3GEO.janela.prepara()"
		],
		/**
		 * Lista com os nomes das fun&ccedil;&otilde;es que ser&atilde;o executadas antes de fechar a janela.
		 *
		 * Este &eacute; um array que pode ser modificado utilizando-se as fun&ccedil;&otilde;es javascript de manipula&ccedil;&atilde;o de
		 * arrays.
		 *
		 * Tipo:
		 *
		 * {Array}
		 */
		ANTESFECHA : [],
		/**
		 * Propriedade: TRANSICAOSUAVE
		 *
		 * Altera a transpar&ecirc;ncia das janelas quando o mouse sobrep&otilde;e e quando sai (n&atilde;o &eacute; ativado no navegador
		 * IE)
		 *
		 * Tipo:
		 *
		 * {boolean}
		 *
		 * Default:
		 *
		 * true
		 */
		TRANSICAOSUAVE : true,
		/**
		 * Propriedade: OPACIDADE
		 *
		 * Valor da opacidade min&iacute;ma utilizada quando TRANSICAOSUAVE for igual a true.
		 *
		 * Varia de 0 a 100
		 *
		 * Tipo:
		 *
		 * {numeric}
		 *
		 * Default:
		 *
		 * 65
		 */
		OPACIDADE : 65,
		/**
		 * Propriedade: OPACIDADEAGUARDE
		 *
		 * Valor da opacidade da janela de aguarde.
		 *
		 * Varia de 0 a 100
		 *
		 * Tipo:
		 *
		 * {numeric}
		 *
		 * Default:
		 *
		 * 50
		 */
		OPACIDADEAGUARDE : 50,
		/**
		 * Lista os tips inseridos no mapa, possibilitando sua remo&ccedil;&atilde;o em lote
		 */
		TIPS : [],
		/**
		 * Cada vez que uma janela flutuante &eacute; criada, esse valor &eacute; acrescido de 1
		 */
		ULTIMOZINDEX : 5,
		/**
		 * Executa fun&ccedil;&otilde;es default antes de abrir a janela
		 */
		prepara : function() {
			if (typeof (console) !== 'undefined')
				console.info("i3GEO.janela.prepara()");

			//
			// esconde o box de zoom e outros objetos tempor&aacute;rios se
			// estiverem vis&iacute;veis
			//
			var iu = i3GEO.util;
			// iu.escondePin();
			iu.escondeBox();
		},
		/**
		 * Function: cria
		 *
		 * Cria uma janela flutuante.
		 *
		 * Vc pode obter o elemento HTML interno da janela por meio de:
		 *
		 * retorno[2].innerHTML
		 *
		 * Vc pode recuperar uma janela com o comando
		 *
		 * YAHOO.i3GEO.janela.manager.find(id);
		 *
		 * Parametros:
		 *
		 * {integer} - largura da janela em pixels
		 *
		 * {integer} - altura da janela em pixels
		 *
		 * {String} - URL que ser&aacute; inclu&iacute;da no SRC do iframe interno da janela. Se for "", o iframe n&atilde;o ser&aacute;
		 * criado
		 *
		 * {Integer} - posi&ccedil;&atilde;o x da janela em pixels. Se for "" ser&aacute; fixada no centro
		 *
		 * {Integer} - posi&ccedil;&atilde;o y da janela em pixels. Se for "" ser&aacute; fixada no centro
		 *
		 * {String} - texto do cabe&ccedil;alho
		 *
		 * {String} - (opcional) nome que ser&aacute; dado ao id que conter&aacute; a janela. Se n&atilde;o for definido, ser&aacute; usado
		 * o id="wdoca". O id do iframe interno &eacute; sempre igual ao id + a letra i. Por default, ser&aacute; "wdocai". O id do
		 * cab&ccedil;alho ser&aacute; igual a id+"_cabecalho" e o id do corpo ser&aacute; id+"_corpo". O id tamb&eacute;m &eacute;
		 * utilizado na fun&ccedil;&atilde;o de fechamento da janela. Quando for usada a t&eacute;cnica de script tag, ao fechar a janela a
		 * fun&ccedil;&atilde;o de mesmo nome do id ser&aacute; definida como "null".
		 *
		 * {Boolean} - (opcional) indica se a janela bloquear&aacute; as inferiores ou n&atilde;o. Por default &eacute; false
		 *
		 * {String} - (opcional) classe CSS que ser&aacute; aplicada a barra de menu. Por default o valor &eacute; hd2. Na interface Google
		 * Earth, esse valor &eacute; sempre alterado para "hd".
		 *
		 * {function} - (opcional) funcao que ser&aacute; executada quando o usu&aacute;rio clicar no cabecalho
		 *
		 * {function} - (opcional) funcao que ser&aacute; executada para minimizar a janela
		 *
		 * {function} - (opcional) funcao que ser&aacute; executada para alterar o tamanho da janela
		 *
		 * {boolean} - (opcional) a janela pode ser redimensionada ou nao pelo usuario
		 *
		 * {string} - (opcional) icone que ser&aacute; mostrado no canto superior esquerdo da janela
		 *
		 * {funcao} - funcao executada quando o icone + for clicado
		 *
		 * {sim|nao} - (opcional) indica se o efeito de transpar&ecirc;ncia nos eventos mouseover/out ser&aacute; aplicado
		 *
		 * Return:
		 *
		 * {Array} Array contendo objeto YAHOO.panel criado,elemento HTML com o cabecalho, elemento HTML com o corpo
		 */
		cria : function(wlargura, waltura, wsrc, nx, ny, texto, id, modal, classe, funcaoCabecalho, funcaoMinimiza, funcaoAposRedim,
			dimensionavel, icone, funcaoDuplica, transicao) {
			if (typeof (console) !== 'undefined')
				console.info("i3GEO.janela.cria()");

			if (!transicao) {
				transicao = "sim";
			}
			if (!dimensionavel) {
				dimensionavel = true;
			}
			if (!icone) {
				icone = "";
			}
			var i, wlargurA, ins, novoel, wdocaiframe, temp, fix, underlay, ifr, janela;
			if ($i(id)) {
				janela = YAHOO.i3GEO.janela.manager.find(id);
				janela.show();
				janela.bringToTop();
				return;
			}
			if (navm && !chro) {
				this.TRANSICAOSUAVE = false;
			}
			// executa as fun&ccedil;&otilde;es default de antes de qualquer
			// cria&ccedil;&atilde;o de janela
			if (this.ANTESCRIA) {
				for (i = 0; i < this.ANTESCRIA.length; i++) {
					eval(this.ANTESCRIA[i]);
				}
			}
			// define os parametros default
			if (!classe || classe == "") {
				classe = "hd";
			}
			if (!id || id === "") {
				id = "wdoca";
			}
			if (!modal || modal === "") {
				modal = false;
			}
			ifr = false;
			if (i3GEO.Interface && i3GEO.Interface != undefined && i3GEO.Interface.ATUAL === "googleearth") {
				i3GEO.janela.TRANSICAOSUAVE = false;
				ifr = true;
			}
			fix = "contained";
			if (nx === "" || nx === "center") {
				fix = true;
			}
			// no IE, com CSS3, a sombra n&atilde;o funciona
			if (modal === true) {
				underlay = "none";
			} else {
				underlay = "shadow";
			}
			// cria as marca&ccedil;&otilde;es html para a janela
			temp = navm ? 0 : 2;
			wlargurA = parseInt(wlargura, 10) + temp + "px";
			ins = '<div id="' + id + '_cabecalho" class="' + classe + '" >';
			if (i3GEO.configura !== undefined) {
				ins +=
					"<img id='" + id
						+ "_imagemCabecalho' class='i3GeoAguardeJanela' style='visibility:hidden;' src=\'"
						+ i3GEO.configura.locaplic
						+ "/imagens/aguarde2.gif\' />";
			}
			if (icone != "") {
				ins += "<img class='i3GeoIconeJanela' src='" + icone + "' >";
			}
			ins += "<span style='font-size:10px;'>" + texto + "</span>";
			if (funcaoDuplica) {
				ins += "<div id='" + id + "_duplicaJanela' class='container-duplica'></div>";
			}
			if (funcaoMinimiza) {
				ins += "<div id='" + id + "_minimizaCabecalho' class='container-minimiza'></div>";
			}
			ins += '</div><div id="' + id + '_corpo" class="bd" style="' + this.ESTILOBD + '">';
			if (wsrc !== "") {
				ins += '<iframe name="' + id + 'i" id="' + id + 'i" valign="top" style="border:0px white solid;width:100%"></iframe>';
			}
			ins += '</div>';
			ins += '<div class="ft"></div>';
			novoel = document.createElement("div");
			novoel.id = id;
			novoel.style.display = "block";
			novoel.innerHTML = ins;
			if (this.TRANSICAOSUAVE && transicao === "sim") {
				novoel.onmouseover = function() {
					YAHOO.util.Dom.setStyle(novoel, "opacity", 1);
				};
				novoel.onmouseout = function() {
					YAHOO.util.Dom.setStyle(novoel, "opacity", i3GEO.janela.OPACIDADE / 100);
				};
				YAHOO.util.Dom.setStyle(novoel, "opacity", 1);
			}
			document.body.appendChild(novoel);
			wdocaiframe = $i(id + "i");
			if (wdocaiframe) {
				temp = wdocaiframe.style;
				// temp.width = parseInt(wlargura,10)-12 + "px";
				temp.height = waltura;
				temp.display = "block";
				wdocaiframe.src = wsrc;
			} else {
				if (waltura !== "auto") {
					$i(id + '_corpo').style.height = parseInt(waltura, 10) + "px";
				}
				$i(id + '_corpo').style.width = '100%'; // parseInt(wlargura,10)+"px";
				$i(id + '_corpo').style.overflow = "auto";
			}
			// cria a janela
			if (waltura === "auto" || dimensionavel == false) {
				janela = new YAHOO.widget.Panel(id, {
					iframe : ifr,
					modal : modal,
					width : wlargurA,
					underlay : underlay,
					fixedcenter : fix,
					constraintoviewport : true,
					visible : true,
					monitorresize : false,
					dragOnly : true,
					keylisteners : null
				});
			} else {
				janela = new YAHOO.widget.Panel(id, {
					hideMode : 'offsets',
					iframe : ifr,
					underlay : underlay,
					modal : modal,
					width : wlargurA,
					fixedcenter : fix,
					constraintoviewport : true,
					visible : true,
					monitorresize : false,
					dragOnly : true,
					keylisteners : null
				});
				if (YAHOO.util.Resize) {
					var resize = new YAHOO.util.Resize(id, {
						handles : [
							'br'
						],
						autoRatio : false,
						minWidth : 10,
						minHeight : 10,
						status : false,
						proxy : true,
						ghost : false,
						animate : false,
						useShim : true
					});
					resize.on('resize', function(args) {
						this.cfg.setProperty("height", args.height + "px");
						if (wdocaiframe) {
							wdocaiframe.style.height = args.height - 50 + "px";
						}
					}, janela, true);
					if (funcaoAposRedim && funcaoAposRedim != "") {
						resize.on('endResize', function(args) {
							funcaoAposRedim.call();
							i3GEO.janela.minimiza();
						}, janela, true);
					}
					resize.getProxyEl().style.height = "0px";
				}
			}
			if (nx !== "" && nx !== "center") {
				janela.moveTo(nx, ny + 50);
			}
			YAHOO.i3GEO.janela.manager.register(janela);
			if (this.TRANSICAOSUAVE) {
				janela.cfg.setProperty("effect", [
					{
						effect : YAHOO.widget.ContainerEffect.FADE,
						duration : 0.5
					}
				]);
			}
			janela.cfg.setProperty("zIndex", [
				4
			]);
			janela.render();
			janela.bringToTop();

			// ajusta estilos e outras caracter&iacute;sticas da janela criada
			if (navm && id !== "i3geo_janelaMensagens"
				&& i3GEO.Interface
				&& i3GEO.Interface != undefined
				&& i3GEO.Interface.ATUAL === "googleearth") {
				janela.moveTo(0, 0);
			}
			if (ifr === true) {
				janela.iframe.style.zIndex = 4;
			}

			YAHOO.util.Event.addListener($i(id + '_corpo'), "click", YAHOO.util.Event.stopPropagation);
			// finaliza
			if (funcaoDuplica) {
				$i(id + '_duplicaJanela').onclick = funcaoDuplica;
			}
			if (funcaoCabecalho) {
				$i(id + '_cabecalho').onclick = funcaoCabecalho;
			}
			if (funcaoMinimiza) {
				$i(id + "_minimizaCabecalho").onclick = funcaoMinimiza;
			}
			YAHOO.util.Event.addListener(janela.close, "click", i3GEO.janela.fecha, janela, {
				id : id
			}, true);
			temp = $i(id + "_corpo");
			return ([
				janela, $i(id + "_cabecalho"), temp
			]);
		},
		/**
		 * Minimiza uma janela na forma de um icone com opcoes de fechar e abrir novamente
		 *
		 * Parametro:
		 *
		 * {string} - id da janela
		 *
		 * {number} - largura em pixels da janela iconizada
		 *
		 * {string} - (opcional) id do rodape da janela
		 */
		iconiza : function(id,w,rodape){
			var j,r,t = i3GEO.janela.minimiza(id, w+"px",rodape);
			r = YAHOO.util.Resize.getResizeById(id);
			j = $i(id + "I");
			if(!j){
				return;
			}
			if (t === "min") {
				j.style.display = "none";
				if(r){
					r.lock();
				}
				if(rodape){
					$i(rodape).style.display = "none";
				}
			} else {
				j.style.display = "block";
				if(r){
					r.unlock();
				}
				if(rodape){
					$i(rodape).style.display = "block";
				}
			}
		},
		/**
		 * Minimiza ou maximiza a janela
		 *
		 * Parametro:
		 *
		 * {string} - prefixo utilizado na composi&ccedil;&atilde;o do id da janela
		 *
		 * {string} - (opcional) largura minima da janela
		 *
		 * Return:
		 *
		 * {min|max} indicativo se minimizou ou maximizou
		 */
		minimiza : function(id, min) {
			var temp = $i(id + "_corpo"), n, i, m = YAHOO.i3GEO.janela.manager.find(id), c = $i(id), t = "min", r = YAHOO.util.Resize.getResizeById(id),
			rodape = $i(id + "_rodape");

			if (temp) {
				if (temp.style.display === "block") {
					temp.style.display = "none";
					if (m) {
						m.hideIframe();
					}
					m.winicial = c.style.width;
					if (min) {
						c.style.width = min;
					}
				} else {
					temp.style.display = "block";
					if (m) {
						m.showIframe();
					}
					c.style.width = m.winicial;
					t = "max";
				}
			}
			temp = $i(id + "_c");
			if (temp) {
				temp = temp.getElementsByTagName("div");
				n = temp.length;
				for (i = 0; i < n; i++) {
					if (temp[i].className === "underlay" || temp[i].className === "bd") {
						if (temp[i].style.display === "none") {
							temp[i].style.display = "block";
						} else {
							temp[i].style.display = "none";
						}
					}
				}
			}
			temp = $i(id + "_corpo");
			if (temp) {
				if (temp.style.display === "none") {
					temp.style.display = "block";
					if(r){
						r.unlock();
					}
					if(rodape){
						rodape.style.display = "block";
					}
				} else {
					temp.style.display = "none";
					if(r){
						r.lock();
					}
					if(rodape){
						rodape.style.display = "none";
					}
				}

			}
			temp = $i(id);
			if (temp) {
				if (temp.style.display === "none") {
					temp.style.height = "100%";
				} else {
					temp.style.height = "10%";
				}

			}
			return t;
		},
		/**
		 * Aplica a op&ccedil;&atilde;o definida em ANTESFECHA e elimina alguns objetos que s&atilde;o comumente adicionados por algumas
		 * opera&ccedil;&otilde;es do i3geo como box, pin
		 *
		 * Parametros:
		 *
		 * event {objeto} - objeto YUI do evento que gerou o fechamento da janela
		 *
		 * args {objeto} - parametros do evento que fechou a janela
		 */
		fecha : function(event, args) {
			if (typeof (console) !== 'undefined')
				console.info("i3GEO.janela.fecha()");

			var i, id;
			// esconde elementos gr&aacute;ficos q a ferramenta pode ter aberto
			// i3GEO.util.escondePin();
			i3GEO.util.escondeBox();
			// executa fun&ccedil;&otilde;es default
			if (i3GEO.janela.ANTESFECHA) {
				for (i = 0; i < i3GEO.janela.ANTESFECHA.length; i++) {
					eval(i3GEO.janela.ANTESFECHA[i]);
				}
			}
			if (i3GEO.janela.id) {
				id = i3GEO.janela.id;
			} else {
				id = event.id;
			}
			if (id == undefined) {
				id = args.id;
			}
			i3GEO.janela.destroi(id);
		},
		/**
		 * Destroi uma janela sem aplicar as funcoes adicionais
		 *
		 * Parametros:
		 *
		 * id {string} - id da janela
		 */
		destroi : function(id) {
			if(typeof(YAHOO) != "undefined"){
				var janela = YAHOO.i3GEO.janela.manager.find(id);
				i3GEO.util.removeScriptTag(id + "_script");
				i3GEO.util.removeScriptTag(id + ".dicionario_script");
				if (janela) {
					YAHOO.i3GEO.janela.manager.remove(janela);
					// janela.destroy();
					// destroy remove os listeners!!!!
					janela = $i(id + "_c");
					janela.parentNode.removeChild(janela);
				}
			}
		},
		/**
		 * Function: alteraTamanho
		 *
		 * Altera o tamanho de uma janela aberta
		 *
		 * Parametros:
		 *
		 * {Integer} - nova largura
		 *
		 * {Integer} - nova altura
		 *
		 * {String} - (opcional) id que identifica a janela aberta
		 */
		alteraTamanho : function(w, h, id) {
			if (typeof (console) !== 'undefined')
				console.info("i3GEO.janela.alteraTamanho()");

			var i;
			if (arguments.length === 3) {
				i = $i(id);
			} else {
				i = $i("wdoca");
			}
			if (i) {
				i.style.width = w + "px";
				i.style.height = h + "px";
			}
		},
		/**
		 * Function: abreAguarde
		 *
		 * Abre uma janela com a mensagem de aguarde
		 *
		 * Parametros:
		 *
		 * {String} - id da nova janela
		 *
		 * {String} - texto da janela
		 */
		abreAguarde : function(id, texto) {
			var pos, temp, janela;
			if (!id || id == undefined || i3GEO.janela.ESTILOAGUARDE === "nenhum") {
				return;
			}
			janela = YAHOO.i3GEO.janela.managerAguarde.find(id);
			pos = [
				0, 0
			];
			if (i3GEO.Interface && $i(i3GEO.Interface.IDCORPO)) {
				pos = YAHOO.util.Dom.getXY($i(i3GEO.Interface.IDCORPO));
			} else if ($i("contemImg")) {
				pos = YAHOO.util.Dom.getXY($i("contemImg"));
			}
			if (i3GEO.janela.AGUARDEMODAL == true) {
				texto +=
					"<br><span style='color:navy;cursor:pointer;font-size:9px;' onclick='javascript:if(i3GEO.janela.AGUARDEMODAL == true){i3GEO.janela.AGUARDEMODAL = false;}else{i3GEO.janela.AGUARDEMODAL = true;}'>bloquear/desbloquear</span>";
			}
			if (!janela) {
				janela = new YAHOO.widget.Panel(id, {
					width : "240px",
					fixedcenter : false,
					underlay : "none",
					close : true,
					draggable : false,
					modal : i3GEO.janela.AGUARDEMODAL,
					monitorresize : false
				});
				janela.render(document.body);
				YAHOO.i3GEO.janela.managerAguarde.register(janela);
			}
			if (i3GEO.janela.ESTILOAGUARDE === "normal" || i3GEO.janela.ESTILOAGUARDE === "reduzida") {
				janela.setBody(texto);
				janela.body.style.padding = "5px";
			}
			if (i3GEO.janela.ESTILOAGUARDE === "normal" || i3GEO.janela.ESTILOAGUARDE === "minima") {
				janela.setHeader("<span><img id=aguardeGifAberto src='" + i3GEO.configura.locaplic
					+ "/imagens/aguarde.gif' /></span>&nbsp;<span style=font-size:8px >"
					+ YAHOO.i3GEO.janela.managerAguarde.overlays.length
					+ "</span>");
			}
			if (i3GEO.parametros && i3GEO.parametros.w > 0) {
				janela.moveTo(pos[0] + (i3GEO.parametros.w / 2) - 120, pos[1]);
			} else {
				janela.moveTo(pos[0], pos[1]);
			}
			janela.show();
			if (janela.header) {
				janela.header.style.height = "20px";
			}
			temp = $i(id + "_c");
			if (temp) {
				temp.style.backgroundColor = "";
			}
			YAHOO.util.Dom.setStyle(temp, "opacity", i3GEO.janela.OPACIDADEAGUARDE / 100);
		},
		/**
		 * Function: fechaAguarde
		 *
		 * Fecha uma janela do tipo aguarde
		 *
		 * Paremeters:
		 *
		 * {String} - id da janela que ser&aacute; fechada. Se n&atilde;o for definido, tenta fechar as janelas principais.
		 */
		fechaAguarde : function(id) {
			if (id != undefined) {
				var janela = YAHOO.i3GEO.janela.managerAguarde.find(id);
				if (janela) {
					YAHOO.i3GEO.janela.managerAguarde.remove(janela);
					janela.destroy();
				}
			}
		},
		/**
		 * Function: tempoMsg
		 *
		 * Abre uma janela com uma mensagem temporaria
		 *
		 * Parametros:
		 *
		 * {String} - texto da janela
		 *
		 * {segundos}
		 */
		tempoMsg : function(texto, tempo) {
			if (!YAHOO.util.Easing) {
				return;
			}
			var pos, janela, attributes, anim, altura = 40;
			janela = YAHOO.i3GEO.janela.managerAguarde.find("i3geoTempoMsg");
			pos = [
				0, 0
			];
			if (i3GEO.Interface && $i(i3GEO.Interface.IDCORPO)) {
				pos = YAHOO.util.Dom.getXY($i(i3GEO.Interface.IDCORPO));
			} else if ($i("contemImg")) {
				pos = YAHOO.util.Dom.getXY($i("contemImg"));
			}
			if (!janela) {
				janela = new YAHOO.widget.Panel("i3geoTempoMsg", {
					width : "220px",
					fixedcenter : false,
					underlay : "none",
					close : false,
					draggable : false,
					modal : false,
					monitorresize : false,
					iframe : true
				});
				janela.render(document.body);
				YAHOO.i3GEO.janela.managerAguarde.register(janela);
			}
			$i("i3geoTempoMsg_c").style.zIndex = 100000;
			janela.setBody(texto);
			altura = 70;
			janela.body.style.padding = "5px";
			janela.body.style.backgroundColor = "yellow";
			if (i3GEO.Interface && i3GEO.Interface.ATUAL != "googleearth") {
				janela.body.style.height = "0px";
			} else {
				janela.body.style.height = altura + "px";
			}
			janela.body.style.overflow = "hidden";
			janela.body.onclick = function() {
				var janela = YAHOO.i3GEO.janela.managerAguarde.find("i3geoTempoMsg");
				if (janela) {
					janela.destroy();
				}
			};

			if (i3GEO.parametros && i3GEO.parametros.w > 0) {
				janela.moveTo(pos[0] + (i3GEO.parametros.w / 2) - 120, pos[1]);
			} else {
				janela.moveTo(pos[0], pos[1]);
			}
			janela.show();
			if (i3GEO.Interface && i3GEO.Interface.ATUAL != "googleearth") {
				attributes = {
					height : {
						to : altura
					}
				};
				anim = new YAHOO.util.Anim(janela.body, attributes, .5, YAHOO.util.Easing.easeNone);
				anim.onComplete.subscribe(function() {
					janela.body.style.overflow = "auto";
					janela.body.style.display = "block";
					$i("i3geoTempoMsg_c").style.zIndex = 100000;
				});
				anim.animate();
			}
			// YAHOO.util.Dom.setStyle(temp,"opacity",i3GEO.janela.OPACIDADEAGUARDE
			// / 100);
			if (!tempo) {
				tempo = 4000;
			}
			setTimeout(function() {
				var attributes, anim, janela = YAHOO.i3GEO.janela.managerAguarde.find("i3geoTempoMsg");
				if (i3GEO.Interface && i3GEO.Interface.ATUAL != "googleearth") {
					if (janela) {
						janela.body.style.overflow = "hidden";
						attributes = {
							height : {
								to : 0
							}
						};
						anim = new YAHOO.util.Anim(janela.body, attributes, .5, YAHOO.util.Easing.easeNone);
						anim.onComplete.subscribe(function() {
							janela.destroy();
						});
						anim.animate();
					}
				} else {
					janela.destroy();
				}
			}, tempo);

		},
		/**
		 * Function: ativaAlerta
		 *
		 * Substitui a janel&ccedil;a de alerta padr&atilde;o do sistema operacional por uma outra customizada
		 */
		ativaAlerta : function() {
			window.alert = function(texto) {
				var textoI, janela = YAHOO.i3GEO.janela.managerAguarde.find("alerta");
				if (!janela) {
					janela = new YAHOO.widget.SimpleDialog("alerta", {
						width : "300px",
						fixedcenter : true,
						visible : false,
						draggable : false,
						zIndex : 100000,
						textAlign : "left",
						close : true,
						modal : false,
						effect : {
							effect : YAHOO.widget.ContainerEffect.FADE,
							duration : 0.25
						},
						constraintoviewport : true,
						buttons : [
							{
								text : $trad("x74"),
								handler : function() {
									this.destroy();
								},
								isDefault : true
							}
						],
						icon : YAHOO.widget.SimpleDialog.ICON_WARN,
						text : ""
					});
					// YAHOO.i3GEO.janela.dialogInfo.cfg.setProperty("icon",YAHOO.widget.SimpleDialog.ICON_WARN);
					YAHOO.i3GEO.janela.managerAguarde.register(janela);
					janela.setHeader(" ");
					janela.render(document.body);
				}
				textoI = janela.cfg.getProperty("text");
				if (textoI != "") {
					textoI += "<br>";
				}
				texto = textoI + texto;
				janela.cfg.setProperty("text", texto);
				janela.show();
			};
		},
		/**
		 * Function: confirma
		 *
		 * Janela de confirmacao
		 *
		 * Parametros:
		 *
		 * {string} - texto da pegunta
		 *
		 * {numeric} - largura da janela
		 *
		 * {string} - (opcional) texto do botao 1
		 *
		 * {string} - (opcional) texto do botao 2
		 *
		 * {function} - (opcional) funcao do botao 1
		 *
		 * {function} - (opcional) funcao do botao 2
		 */
		confirma : function(pergunta, w, resposta1, resposta2, funcao1, funcao2) {
			var b, f1, f2, f3, janela = YAHOO.i3GEO.janela.managerAguarde.find("confirma");
			if (!w || w == "") {
				w = 300;
			}
			if (!funcao1 || funcao1 == "") {
				f1 = function() {
					YAHOO.i3GEO.janela.managerAguarde.find("confirma").destroy();
					return true;
				};
			} else {
				f1 = function() {
					funcao1.call();
					YAHOO.i3GEO.janela.managerAguarde.find("confirma").destroy();
				};
			}
			if (!funcao2 || funcao2 == "") {
				f2 = function() {
					YAHOO.i3GEO.janela.managerAguarde.find("confirma").destroy();
					return false;
				};
			} else {
				f2 = function() {
					funcao2.call();
					YAHOO.i3GEO.janela.managerAguarde.find("confirma").destroy();
				};
			}
			f3 = function() {
				YAHOO.i3GEO.janela.managerAguarde.find("confirma").destroy();
			};
			if (!resposta1 || resposta1 == "") {
				resposta1 = $trad("x58");
			}
			if (janela) {
				janela.destroy();
			}
			b = [
				{
					text : $trad("x75"),
					handler : f3
				}, {
					text : resposta1,
					handler : f1
				}
			];
			if (resposta2 && resposta2 != "") {
				b.push({
					text : resposta2,
					handler : f2
				});
			}
			janela = new YAHOO.widget.SimpleDialog("confirma", {
				width : w + "px",
				fixedcenter : true,
				visible : false,
				draggable : false,
				zIndex : 100000,
				textAlign : "left",
				close : false,
				modal : false,
				effect : {
					effect : YAHOO.widget.ContainerEffect.FADE,
					duration : 0.25
				},
				constraintoviewport : true,
				buttons : b,
				icon : YAHOO.widget.SimpleDialog.ICON_HELP,
				text : "<p class=paragrafo >" + pergunta
			});
			YAHOO.i3GEO.janela.managerAguarde.register(janela);
			janela.setHeader(" ");
			janela.render(document.body);
			janela.show();
		},
		/**
		 * Function: prompt
		 *
		 * Janela de prompt para entrada de dados
		 *
		 * O campo para digitacao contem o ID 'i3GEOjanelaprompt'
		 *
		 * Parametros:
		 *
		 * {string} - texto da pegunta
		 *
		 * {function} - (opcional) funcao do botao ok
		 *
		 * {string} - (opcional) valor default
		 */
		prompt : function(pergunta, funcaoOk, valorDefault) {
			if ($i("i3GEOjanelaprompt")) {
				return;
			}
			if (!valorDefault) {
				valorDefault = "";
			}
			var i =
				"<br><div class='i3geoForm i3geoFormIconeEdita' ><input id='i3GEOjanelaprompt' type=text value='" + valorDefault + "' />";
			i3GEO.janela.confirma(pergunta + i, "", "", "", funcaoOk);
		},
		/**
		 * Function: mensagemSimples
		 *
		 * Mostra uma janela simples com uma mensagem
		 *
		 * Parametros:
		 *
		 * {String} - texto da mensagem
		 *
		 * {String} - texto do cabecalho
		 *
		 * {numeric} - (opcional) largura em pixel
		 *
		 * {numeric} - (opcional) altura em pixel
		 */
		mensagemSimples : function(texto, cabecalho, largura, altura) {
			var janela;
			if (!largura) {
				largura = 300;
			}
			if (!altura) {
				altura = 300;
			}
			if (!cabecalho) {
				cabecalho = "";
			}
			janela = new YAHOO.widget.SimpleDialog(YAHOO.util.Dom.generateId(), {
				width : parseInt(largura, 10) + "px",
				height : parseInt(altura, 10) + "px",
				fixedcenter : true,
				visible : true,
				draggable : true,
				zIndex : 100000,
				textAlign : "left",
				close : true,
				modal : false,
				effect : {
					effect : YAHOO.widget.ContainerEffect.FADE,
					duration : 0.25
				},
				constraintoviewport : true,
				text : ""
			});
			YAHOO.i3GEO.janela.manager.register(janela);
			// $i(id + '_corpo').style.height = parseInt(waltura, 10) + "px";
			janela.setHeader(cabecalho);
			janela.render(document.body);
			janela.setHeader("<div class='i3GeoTituloJanela'>"+cabecalho+"</div>");
			janela.cfg.setProperty("text", texto);
			janela.bringToTop();
			janela.show();
			return janela;
		},
		/**
		 * Cria um DIV e posiciona sobre o mapa na posi&ccedil;&atilde;o do mouse.
		 *
		 * Return:
		 *
		 * ID do DIV criado
		 */
		tip : function() {
			if (typeof (console) !== 'undefined')
				console.info("i3GEO.janela.tip()");

			var Nid, novoel, res;
			Nid = YAHOO.util.Dom.generateId();
			// insere div para tips
			novoel = document.createElement("div");
			novoel.className = "i3GEObalaoInfo";
			novoel.id = Nid;
			document.body.appendChild(novoel);
			i3GEO.janela.TIPS.push($i(Nid));
			//
			// monta o TIP com o id &uacute;nico criado
			// quando o mapa &eacute; redesenhado, esses elementos s&atilde;o
			// exclu&iacute;dos do mapa
			//
			res = "<div id='" + Nid + "cabecatip' style='text-align:left;background-color:rgb(240,240,240)'></div>";
			novoel.innerHTML = "<table style='text-align:left'><tr><td style='text-align:left'>" + res + "</td></tr></table>";
			ist = novoel.style;
			ist.top = objposicaocursor.telay - 9 + "px";
			ist.left = objposicaocursor.telax - 5 + "px";
			ist.display = "block";
			//
			// registra a fun&ccedil;&atilde;o de elimina&ccedil;&atilde;o dos
			// tips
			//
			i3GEO.eventos.adicionaEventos("NAVEGAMAPA", [
				"i3GEO.janela.excluiTips('todos')"
			]);
			return (Nid);
		},
		/**
		 * Exclui os tips armazenados na vari&aacute;vel i3GEO.janela.TIPS
		 *
		 * Parametro:
		 *
		 * tipo {String} - todos|naofixos tipos de tips que ser&atilde;o exclu&iacute;dos
		 */
		excluiTips : function(tipo) {
			if (typeof (console) !== 'undefined')
				console.info("i3GEO.janela.excluiTips()");

			var ot, i;
			if (arguments.length === 0) {
				tipo = "todos";
			}
			if (i3GEO.janela.TIPS.length > 0) {
				ot = i3GEO.janela.TIPS.length - 1;
				if (ot >= 0) {
					do {
						if (tipo === 'todos') {
							if (i3GEO.janela.TIPS[ot]) {
								i = $i(i3GEO.janela.TIPS[ot].id);
								document.body.removeChild(i);
							}
						}
						if (tipo === 'naofixos') {
							if ($i(i3GEO.janela.TIPS[ot])) {
								if ($i(i3GEO.janela.TIPS[ot].id + "cabecatip").innerHTML !== "") {
									document.body.removeChild($i(i3GEO.janela.TIPS[ot].id));
								}
							}
						}
					} while (ot--);
					if (tipo === "todos") {
						i3GEO.janela.TIPS = [];
					}
				}
			}
		},
		slider : function(funcao, inicial) {
			var scaleFactor, bottomConstraint, topConstraint, janela, novoel, Event, slider = "", bg, thumb;
			janela = i3GEO.janela.cria(230, 200, "", "", "", "<div class='i3GeoTituloJanela'>"+$trad("t20")+"</div>", "opacidadeG");
			novoel = document.createElement("div");
			novoel.id = "slider-bg";
			novoel.tabindex = "-1";
			novoel.innerHTML =
				'<div style="cursor:default;position:absolute;top:4px" id="slider-thumb"><img src="' + i3GEO.configura.locaplic
					+ '/imagens/thumb-n.gif"></div>';
			janela[2].appendChild(novoel);
			Event = YAHOO.util.Event;
			bg = "slider-bg";
			thumb = "slider-thumb";
			novoel.style.position = "relative";
			novoel.style.background = 'url(' + i3GEO.configura.locaplic + '/imagens/bg-fader.gif) 5px 0 no-repeat';
			novoel.style.height = "28px";
			novoel.style.width = "228px";
			// The slider can move 0 pixels up
			topConstraint = 0;
			// The slider can move 200 pixels down
			bottomConstraint = 200;
			// Custom scale factor for converting the pixel offset into a real
			// value
			scaleFactor = 1;
			// The amount the slider moves when the value is changed with the
			// arrow
			// keys
			Event.onDOMReady(function() {
				slider = YAHOO.widget.Slider.getHorizSlider(bg, thumb, topConstraint, bottomConstraint, 20);
				slider.setValue(parseInt(inicial, 10));
				slider.getRealValue = function() {
					return Math.round(this.getValue() * scaleFactor);
				};
				slider.subscribe("slideEnd", function(offsetFromStart) {
					var actualValue = slider.getRealValue();
					eval(funcao + "(" + actualValue + ")");
				});
			});
			// Use setValue to reset the value to white:
			Event.on("putval", "click", function(e) {
				slider.setValue(100, false); // false here means to animate if possible
			});
		},
		/**
		 * Adiciona no cabe&ccedil;alho da janela um combo com a lista de temas para janelas abertas por ferramentas
		 *
		 * Essa fun&ccedil;&atilde;o &eacute; utilizada pelas ferramentas que operam sobre um determinado tema. O combo permite que o
		 * usu&aacute;rio selecione um tema e ative a ferramenta para funcionar com esse tema
		 *
		 * Parametros:
		 *
		 * idDiv {string} - id do elemento HTML que receber&aacute; o combo
		 *
		 * idCombo {string} - id do combo que ser&aacute; criado
		 *
		 * ferramenta {string} - nome da ferramenta (namespace da classe, por exemplo "tabela" para a classe i3GEOF.tabela
		 *
		 * tipo {string} - tipo de combo
		 *
		 * onButtonClick {function} - funcao que sera executada no evento onchange do combo a ser criado
		 */
		comboCabecalhoTemas : function(idDiv, idCombo, ferramenta, tipo, onButtonClick, temaSel) {
			var temp = $i(idDiv);
			// tenta pegar o tema que ja foi escolhido antes
			if (!temaSel) {
				temaSel = "";
			}
			if (temaSel == "" && i3GEOF[ferramenta] && i3GEOF[ferramenta].tema && i3GEOF[ferramenta].tema != "") {
				// o tema escolhido pode estar definido na variavel da ferramenta
				temaSel = i3GEOF[ferramenta].tema;
			}
			if (temp) {
				i3GEO.util.comboTemas(temp.id + "Sel", function(retorno) {
					var tema, container = $i(idDiv), botao;
					container.innerHTML = retorno.dados;
					botao = new YAHOO.widget.Button(idCombo, {
						type : "menu",
						menu : idCombo + "select"
					});
					if (temaSel != "") {
						tema = i3GEO.arvoreDeCamadas.pegaTema(temaSel);
						if (tema && tema != undefined) {
							botao.set("label", "<span class='cabecalhoTemas' >" + tema.tema + "</span>&nbsp;&nbsp;");
						} else {
							botao.set("label", "<span class='cabecalhoTemas' >" + $trad("x92") + "</span>&nbsp;&nbsp;");
						}
					} else {
						botao.set("label", "<span class='cabecalhoTemas' >" + $trad("x92") + "</span>&nbsp;&nbsp;");
					}
					if (!onButtonClick) {
						onButtonClick =
							function(p_sType, p_aArgs) {
								var oMenuItem = p_aArgs[1]; // MenuItem instance
								if (oMenuItem) {
									i3GEO.mapa.ativaTema(oMenuItem.value);
									if (oMenuItem.value === "") {
										i3GEO.temaAtivo = "";
										botao.set("label", "<span class='cabecalhoTemas' >" + $trad("x92") + "</span>&nbsp;&nbsp;");
									} else {
										botao.set("label", "<span class='cabecalhoTemas' >" + oMenuItem.cfg.getProperty("text")
											+ "</span>&nbsp;&nbsp;");
									}

									if (i3GEOF[ferramenta]) {
										i3GEOF[ferramenta].tema = oMenuItem.value;
										if ($i("i3GEOF." + ferramenta + "_corpo")) {
											$i("i3GEOF." + ferramenta + "_corpo").innerHTML = "";
											eval("i3GEOF." + ferramenta + ".inicia('i3GEOF." + ferramenta + "_corpo');");
										}
									}
								}
							};
						//
						// a busca nao funciona com parametros dentro de parenteses
						// por isso e necessario zerar o array
						//
						if (i3GEO.eventos.ATUALIZAARVORECAMADAS.length > 20) {
							i3GEO.eventos.ATUALIZAARVORECAMADAS = [];
						}
						i3GEO.eventos.adicionaEventos("ATUALIZAARVORECAMADAS", [
							"i3GEO.janela.comboCabecalhoTemas('" + idDiv + "','" + idCombo + "','" + ferramenta + "','" + tipo + "')"
						]);
					}
					botao.getMenu().subscribe("click", onButtonClick, botao);
				}, temp.id, "", false, tipo, "", true, true);
			}
		}
	};
