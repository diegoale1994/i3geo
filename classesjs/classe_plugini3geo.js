/**
 * Title: PluginI3Geo
 *
 * Implementa os plugins do i3Geo que adicionam camadas especiais ao mapa,
 * normalmente dados vetoriais processados no navegador Web.
 *
 * Namespace:
 *
 * i3GEO.pluginI3geo
 *
 * Veja:
 *
 * <http://localhost/i3geo/classesjs/classe_plugini3geo.js>
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
i3GEO.pluginI3geo =
	{
		OBJETOS : {},
		/**
		 * Lista de plugins
		 *
		 * Utilizado no editor de mapfiles do sistema de administracao
		 */
		PLUGINS : [
			{
				"classe" : "heatmap", // namespace da classe
				"nome" : "Mapa de calor", // tituo do plugin
				"editor" : true
			// inclui no editor de mapfiles
			}, {
				"classe" : "markercluster",
				"nome" : "Agrupamento de pontos (cluster)",
				"editor" : true
			}, {
				"classe" : "layerkml",
				"nome" : "Camada Kml",
				"editor" : true
			}, {
				"classe" : "parametrossql",
				"nome" : "SQL parametrizado",
				"editor" : true
			}
		],
		/**
		 * Inicia a execucao de um plugin
		 *
		 * Camada e um objeto gerado pelo i3Geo quando uma camada e adicionada ao mapa O objeto i3GEO.arvoreDeCamadas.CAMADAS guarda todas
		 * as camadas adicionadas ao mapa Ao adicionar uma camada pelo catalogo, o i3Geo verifica se a camada possui plugin e direciona para
		 * ca Os plugins sao definidos como metadados em cada mapfile de cada tema
		 *
		 * Veja em i3geo/classesphp/classe_mapa.php funcao parametrostemas
		 */
		inicia : function(camada) {
			if(camada.plugini3geo){
				if (i3GEO.janela) {
					i3GEO.janela.AGUARDEMODAL = true;
					i3GEO.janela.abreAguarde("aguardePlugin", "Plugin...");
					i3GEO.janela.AGUARDEMODAL = false;
				}
				// chama a funcao conforme o tipo de plugin e a interface atual
				// para cada plugin deve haver um objeto com as funcoes especificas
				// para
				// cada interface
				i3GEO.pluginI3geo[camada.plugini3geo.plugin][i3GEO.Interface.ATUAL].inicia(camada);
			}
		},
		/**
		 * Retorna o HTML com o formulario para editar os parametros do plugin
		 */
		formAdmin : function(plugin, configString) {
			return i3GEO.pluginI3geo[plugin].formAdmin(configString);
		},
		/**
		 * Constroi um icone que sera adicionado na barra de icones do tema quando for adicionado na arvore de camadas Esse icone e
		 * utilizado para reabrir o formulario de parametros
		 */
		iconeArvoreDeCamadas : function(camada) {
			if (camada.plugini3geo && camada.plugini3geo != "") {
				return i3GEO.pluginI3geo[camada.plugini3geo.plugin].iconeArvoreDeCamadas(camada.name);
			} else {
				return false;
			}
		},
		linkAjuda : function(plugin) {
			return i3GEO.pluginI3geo[plugin].linkAjuda();
		},
		ligaCamada : function(nomecamada) {
			if (i3GEO.pluginI3geo.OBJETOS[nomecamada] && i3GEO.pluginI3geo.OBJETOS[nomecamada].ligaCamada) {
				i3GEO.pluginI3geo.OBJETOS[nomecamada].ligaCamada();
				return true;
			}
			return false;
		},
		desligaCamada : function(nomecamada) {
			if (i3GEO.pluginI3geo.OBJETOS[nomecamada] && i3GEO.pluginI3geo.OBJETOS[nomecamada].desLigaCamada) {
				i3GEO.pluginI3geo.OBJETOS[nomecamada].desLigaCamada();
				return true;
			}
			return false;
		},
		removeCamada : function(nomecamada) {
			if (i3GEO.pluginI3geo.OBJETOS[nomecamada] && i3GEO.pluginI3geo.OBJETOS[nomecamada].removeCamada) {
				try{
					i3GEO.pluginI3geo.OBJETOS[nomecamada].removeCamada();
					delete (i3GEO.pluginI3geo.OBJETOS[nomecamada]);
				}
				catch(e){}
				return true;
			}
			return false;
		},
		atualizaCamada : function(nomecamada) {
			if (i3GEO.pluginI3geo.OBJETOS[nomecamada] && i3GEO.pluginI3geo.OBJETOS[nomecamada].atualizaCamada) {
				i3GEO.pluginI3geo.OBJETOS[nomecamada].atualizaCamada();
				return true;
			}
			return false;
		},
		existeObjeto : function(nomecamada) {
			if (i3GEO.pluginI3geo.OBJETOS[nomecamada] && i3GEO.pluginI3geo.OBJETOS[nomecamada].atualizaCamada) {
				return true;
			}
			return false;
		},
		/**
		 * Aplica as propriedades em um objeto do tipo tema
		 *
		 * tema e fornecido por i3GEO.arvoreDeCamadas o ajuste das propriedades e necessario para que as propriedades aparecam de forma
		 * correta na arvore de camadas
		 */
		aplicaPropriedades : function(camada) {
			if (camada.plugini3geo && camada.plugini3geo != "") {
				camada = i3GEO.pluginI3geo[camada.plugini3geo.plugin][i3GEO.Interface.ATUAL].aplicaPropriedades(camada);
			}
			return camada;
		},
		/**
		 * Cria um layer conforme a API em uso no aplicativo mashup
		 *
		 * Parametros
		 *
		 * {string} - nome da interface em uso openlayers|googlemaps
		 *
		 * {objeto} - objeto camada, conforme definido em i3GEO.arvoreDeCamadas.CAMADAS
		 *
		 * {string} - codigo epsg que sera usado no WMS
		 *
		 * {parametros} - objeto com parametros adicionais especificos da interface em uso
		 */
		layerMashup : function(Interface, camada, epsg, parametros) {
			if (camada.plugini3geo && camada.plugini3geo != "" && i3GEO.pluginI3geo[camada.plugini3geo.plugin][Interface].layerMashup) {
				var l = i3GEO.pluginI3geo[camada.plugini3geo.plugin][Interface].layerMashup(camada, epsg, parametros);
				return l;
			} else {
				return [
					false
				];
			}
		},
		/**
		 * Section: i3GEO.pluginI3geo.heatmap
		 *
		 * Mapa de calor
		 *
		 * Gera um layer do tipo mapa de calor e adiciona ao mapa
		 *
		 * As depend&ecirc;ncias em javascript sao carregadas via script tag por meio de ferramentas/heatmap
		 *
		 * Esse programa tamb&eacute;m obt&eacute;m os dados necess&aacute;rios ao plugin
		 *
		 * O layer existente no mapfile deve conter um metadata chamado PLUGINI3GEO
		 *
		 * Esse matadado deve conter uma string que ser&aacute; transformada em um objeto javascript para uso no plugin
		 *
		 * Exemplo:
		 *
		 * "PLUGINI3GEO" '{"plugin":"heatmap","parametros":{"tipoGradiente": "default","coluna":"teste","max":"10","radius":"15"}}'
		 *
		 * Coluna &eacute; a que cont&eacute;m os dados num&eacute;ricos que definem a quantidade de uma medida em cada ponto e &eacute;
		 * usada para gerar a representa&ccedil;&atilde;o. Se for vazia, considera-se o valor como 1
		 *
		 * As cores das classes existentes no LAYER ser&atilde;o utilizadas para calcular as cores do mapa de calor. Se tipoGradiente for
		 * igual a "default" ser&aacute; utilizado o gradiente padrão.
		 *
		 */
		heatmap : {
			linkAjuda : function() {
				return i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=3&idajuda=121";
			},
			formAdmin : function(config) {
				// {"plugin":"heatmap","parametros":{"coluna":"","radius":15,"max":10}}
				var parametros, ins = "", configDefault =
					'{"plugin":"heatmap","parametros":{"tipoGradiente": "default","valorPonto":1,"coluna":"","radius":15}}';
				if (config === "") {
					config = configDefault;
				}
				config = YAHOO.lang.JSON.parse(config);
				if (config.plugin != "heatmap") {
					config = YAHOO.lang.JSON.parse(configDefault);
				}
				parametros = config.parametros;
				ins +=
					"" + "<p class='paragrafo'>Coluna que cont&eacute;m os dados:"
						+ "<br><div class='i3geoForm i3geoFormIconeEdita'><input name='coluna' type='text' value='"
						+ parametros.coluna
						+ "' size='30'></div></p>"
						+ "<p class='paragrafo'>Ou valor num&eacute;rico para cada ponto:"
						+ "<br><div class='i3geoForm i3geoFormIconeEdita'><input name='valorPonto' type='text' value='"
						+ parametros.valorPonto
						+ "' size='30'></div></p>"
						+ "<p class='paragrafo'>Raio de cada ponto em pixels:"
						+ "<br><div class='i3geoForm i3geoFormIconeEdita'><input name='radius' type='text' value='"
						+ parametros.radius
						+ "' size='30'></div></p>"
						+ "<p class='paragrafo'>Tipo de gradiente (deixe vazio para utilizar as classes definidas no Layer ou escreva 'default' para usar o normal):"
						+ "<br><div class='i3geoForm i3geoFormIconeEdita'><input name='tipoGradiente' type='text' value='"
						+ parametros.tipoGradiente
						+ "' size='30'></div></p>"
						+ "<p class='paragrafo'>Para definir os cortes no gradiente de cores utilize valores entre 0 e 1."
						+ " As cores s&atilde;o definidas nas classes do LAYER, sendo que o nome define o valor superior do gradiente e COLOR define a cor."
						+ " Veja o exemplo utilizado no tema _lmapadecalor.map</p>";
				return ins;
			},
			/**
			 * Constroi um icone que sera adicionado na barra de icones do tema quando for adicionado na arvore de camadas Esse icone e
			 * utilizado para reabrir o formulario de parametros
			 */
			iconeArvoreDeCamadas : function(nomecamada) {
				return false;
			},
			googlemaps : {
				aplicaPropriedades : function(camada) {
					camada.sel = "nao";
					camada.download = "nao";
					camada.AGUARDALEGENDA = false;
					camada.temporizador = "";
					camada.copia = false;
					camada.procurar = false;
					camada.toponimia = false;
					camada.etiquetas = false;
					camada.tabela = false;
					camada.grafico = false;
					camada.destacar = false;
					camada.wms = false;
					camada.classe = "NAO";
					return camada;
				},
				inicia : function(camada) {
					if(document.getElementById("i3GeoHeatmapGm"+camada.name)){
						i3GEO.janela.fechaAguarde("aguardePlugin");
						return;
					}
					var nomeScript = "heatmap_script", p = i3GEO.configura.locaplic + "/ferramentas/heatmap/googlemaps_js.php", carregaJs =
						"nao", criaLayer;
					criaLayer = function() {
						var heatmap, pontos;

						heatmap = new HeatmapOverlay(i3GeoMap, camada.name, {
							"radius" : camada.plugini3geo.parametros.radius,
							"visible" : true,
							"opacity" : camada.transparency,
							"gradient" : heatmap_config.gradient,
							"legend" : {
								"title" : camada.tema,
								"position" : "bl",
								"offset" : [
									5, 50
								]
							}
						});
						// i3GeoMap.overlayMapTypes.insertAt(0, heatmap);
						pontos = {
							max : camada.plugini3geo.parametros.max,
							data : heatmap_dados
						};
						i3GEO.janela.fechaAguarde("aguardePlugin");
						heatmap.setDataSet(pontos);
						heatmap.ligaCamada = function() {
							this.liga();
						};
						heatmap.desLigaCamada = function() {
							this.desliga();
						};
						heatmap.removeCamada = function() {
							this.destroy();
						};
						heatmap.atualizaCamada = function() {
							this.draw();
						};
						i3GEO.pluginI3geo.OBJETOS[camada.name] = heatmap;
						heatmap_dados = null;
					};
					// se o script nao existir carrega o codigo e os dados
					// caso contrario, carrega apenas os dados no script
					if (!$i(nomeScript)) {
						carregaJs = "sim";
					} else {
						nomeScript = "";
					}
					p +=
						"?carregajs=" + carregaJs
							+ "&layer="
							+ camada.name
							+ "&coluna="
							+ camada.plugini3geo.parametros.coluna
							+ "&tipoGradiente="
							+ camada.plugini3geo.parametros.tipoGradiente
							+ "&g_sid="
							+ i3GEO.configura.sid
							+ "&nomevariavel=heatmap_dados&nomevariavelConfig=heatmap_config";
					i3GEO.util.scriptTag(p, criaLayer, nomeScript);
				}
			},
			//
			// O script que adiciona a camada
			// define os eventos visibilitychanged, moveend e removed
			// A camada e adicionada como um objeto layer, permitindo que as
			// funcoes
			// do i3Geo operem normalmente, sem muitas modificacoes
			//
			openlayers : {
				aplicaPropriedades : function(camada) {
					camada.sel = "nao";
					camada.download = "nao";
					camada.AGUARDALEGENDA = false;
					camada.temporizador = "";
					camada.copia = false;
					camada.procurar = false;
					camada.toponimia = false;
					camada.etiquetas = false;
					camada.tabela = false;
					camada.grafico = false;
					camada.destacar = false;
					camada.wms = false;
					camada.classe = "NAO";
					return camada;
				},
				layerMashup : function(camada, epsg){
					i3GEO.pluginI3geo.heatmap.openlayers.inicia(camada,i3GEO.editorOL.mapa);
					return [];
				},
				inicia : function(camada, objMapa) {
					var nomeScript = "heatmap_script", p = i3GEO.configura.locaplic + "/ferramentas/heatmap/openlayers_js.php", carregaJs =
						"nao", criaLayer;
					criaLayer = function() {
						var v = true, temp, heatmap, transformedTestData = {
							max : 1,
							data : []
						}, data = heatmap_dados, datalen = heatmap_dados.length, nudata = [], max = 0;

						// para uso com o mashup
						if (!objMapa) {
							objMapa = i3geoOL;
						}
						// in order to use the OpenLayers Heatmap Layer we have
						// to
						// transform our data into
						// { max: <max>, data: [{lonlat: <OpenLayers.LonLat>,
						// count:
						// <count>},...]}
						while (datalen--) {
							temp = heatmap_dados[datalen].count;
							nudata.push({
								lonlat : new OpenLayers.LonLat(data[datalen].lng, heatmap_dados[datalen].lat),
								count : temp
							});
							max = Math.max(max, temp);
						}
						transformedTestData.max = max;
						transformedTestData.data = nudata;
						// create our heatmap layer
						if(camada.status === "0"){
							v = false;
						}
						heatmap = new OpenLayers.Layer.Heatmap(camada.name, objMapa, objMapa.baseLayer, {
							"visible" : v,
							"opacity" : camada.transparency,
							"radius" : camada.plugini3geo.parametros.radius,
							"gradient" : heatmap_config.gradient,
							"legend" : {
								"title" : camada.tema,
								"position" : "bl",
								"offset" : [
									5, 50
								]
							}
						}, {
							isBaseLayer : false,
							projection : new OpenLayers.Projection("EPSG:4326"),
							displayInLayerSwitcher : true
						});
						heatmap.ligaCamada = function() {
							this.toggle();
							this.updateLayer();
						};
						heatmap.desLigaCamada = function() {
							this.toggle();
							this.updateLayer();
						};
						heatmap.removeCamada = function() {
							this.destroy();
						};
						heatmap.atualizaCamada = function() {
							this.updateLayer();
						};

						i3GEO.pluginI3geo.OBJETOS[camada.name] = heatmap;

						objMapa.addLayer(heatmap);

						heatmap.setDataSet(transformedTestData);

						heatmap_dados = null;
						if (i3GEO.janela) {
							i3GEO.janela.fechaAguarde("aguardePlugin");
						}
					};
					// se o script nao existir carrega o codigo e os dados
					// caso contrario, carrega apenas os dados no script
					if (!$i(nomeScript)) {
						carregaJs = "sim";
					} else {
						nomeScript = "";
					}
					if (!i3GEO.configura || !i3GEO.configura.sid) {
						i3GEO.configura.sid = "";
					}
					p +=
						"?carregajs=" + carregaJs
							+ "&layer="
							+ camada.name
							+ "&coluna="
							+ camada.plugini3geo.parametros.coluna
							+ "&tipoGradiente="
							+ camada.plugini3geo.parametros.tipoGradiente
							+ "&g_sid="
							+ i3GEO.configura.sid
							+ "&nomevariavel=heatmap_dados&nomevariavelConfig=heatmap_config";
					i3GEO.util.scriptTag(p, criaLayer, nomeScript);
				}
			},
			googleearth : {
				inicia : function() {
					alert("Plugin nao disponivel");
				}
			}
		},
		/**
		 * Section: i3GEO.pluginI3geo.markercluster
		 *
		 * Markercluster
		 *
		 * Gera um layer que agrupa pontos conforme a dist&acirc;ncia entre eles e insere um contador adiciona ao mapa
		 *
		 * As depend&ecirc;ncias em javascript sao carregadas via script tag por meio de ferramentas/markercluster
		 *
		 * Esse programa tamb&eacute;m obt&eacute;m os dados necess&aacute;rios ao plugin
		 *
		 * O layer existente no mapfile deve conter um metadata chamado PLUGINI3GEO
		 *
		 * Esse matadado deve conter uma string que ser&aacute; transformada em um objeto javascript para uso no plugin
		 *
		 * Exemplo:
		 *
		 * "PLUGINI3GEO" '{"plugin":"markercluster","parametros":{"coluna":"teste","gridSize":"50"}}'
		 *
		 * Coluna &eacute; a que cont&eacute;m os dados num&eacute;ricos que definem a quantidade de uma medida em cada ponto e &eacute;
		 * usada para gerar a representa&ccedil;&atilde;o. Se for vazia, considera-se o valor como 1
		 *
		 */
		markercluster : {
			linkAjuda : function() {
				return i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=3&idajuda=122";
			},
			formAdmin : function(config) {
				var parametros, ins = "", configDefault =
					'{"plugin":"markercluster","parametros":{"tipoEstilos": "default","gridSize":50}}';
				if (config === "") {
					config = configDefault;
				}
				config = YAHOO.lang.JSON.parse(config);
				if (config.plugin != "markercluster") {
					config = YAHOO.lang.JSON.parse(configDefault);
				}
				parametros = config.parametros;
				ins +=
					"" + "<p class='paragrafo'>Dist&acirc;ncia m&aacute;xima entre ponto em pixels:"
						+ "<br><div class='i3geoForm i3geoFormIconeEdita'><input name='gridSize' type='text' value='"
						+ parametros.gridSize
						+ "' size='30'></div></p>"
						+ "<p class='paragrafo'>Tipo de estilos (deixe vazio para utilizar as classes definidas no Layer ou escreva 'default' para usar o normal):"
						+ "<br><div class='i3geoForm i3geoFormIconeEdita'><input name='tipoEstilos' type='text' value='"
						+ parametros.tipoEstilos
						+ "' size='30'></div></p>"
						+ "<p class='paragrafo'>Os s&iacute;mbolos utilizados podem ser customizados alterando-se as classes do Mapfile</p>"
						+ "<p class='paragrafo'>Veja o exemplo utilizado no tema _lmapadecluster.map</p>";

				return ins;
			},
			/**
			 * Constroi um icone que sera adicionado na barra de icones do tema quando for adicionado na arvore de camadas Esse icone e
			 * utilizado para reabrir o formulario de parametros
			 */
			iconeArvoreDeCamadas : function(nomecamada) {
				return false;
			},
			googlemaps : {
				aplicaPropriedades : function(camada) {
					camada.sel = "nao";
					camada.download = "nao";
					camada.AGUARDALEGENDA = false;
					camada.temporizador = "";
					camada.copia = false;
					camada.procurar = false;
					camada.toponimia = false;
					camada.etiquetas = false;
					camada.tabela = false;
					camada.grafico = false;
					camada.destacar = false;
					camada.wms = false;
					camada.classe = "NAO";
					return camada;
				},
				inicia : function(camada) {
					if(document.getElementById("i3GeoClustermapGm")){
						i3GEO.janela.fechaAguarde("aguardePlugin");
						return;
					}
					var nomeScript = "markercluster_script", p = i3GEO.configura.locaplic + "/ferramentas/markercluster/googlemaps_js.php", carregaJs =
						"nao", criaLayer;
					criaLayer = function() {
						var markercluster, marcas, latLng, marker, n, i;
						n = markercluster_dados.length;
						marcas = [];
						for (i = 0; i < n; i++) {
							latLng = new google.maps.LatLng(markercluster_dados[i].lat, markercluster_dados[i].lng);
							marker = new google.maps.Marker({
								'position' : latLng,
								icon : {
									url : markercluster_config.ponto.url,
									scaledSize : new google.maps.Size(markercluster_config.ponto.width, markercluster_config.ponto.height)
								}
							});
							marcas.push(marker);
						}
						markercluster = new MarkerClusterer(i3GeoMap, marcas, {
							"gridSize" : parseInt(camada.plugini3geo.parametros.gridSize, 10),
							"visible" : true,
							"opacity" : camada.transparency,
							"name" : camada.name,
							"styles" : markercluster_config.estilos
						});
						i3GEO.janela.fechaAguarde("aguardePlugin");
						i3GEO.eventos.cliquePerm.ativo = false;

						markercluster.ligaCamada = function() {
							i3GEO.pluginI3geo.OBJETOS[camada.name].ready_ = true;
							i3GEO.pluginI3geo.OBJETOS[camada.name].redraw();
							i3GEO.eventos.cliquePerm.ativo = false;
						};
						markercluster.desLigaCamada = function() {
							i3GEO.pluginI3geo.OBJETOS[camada.name].resetViewport(true);
							i3GEO.pluginI3geo.OBJETOS[camada.name].ready_ = false;
							i3GEO.eventos.cliquePerm.ativo = true;
						};
						markercluster.removeCamada = function() {
							i3GEO.pluginI3geo.OBJETOS[camada.name].clearMarkers();
							i3GEO.eventos.cliquePerm.ativo = true;
						};
						markercluster.atualizaCamada = function() {
							i3GEO.pluginI3geo.OBJETOS[camada.name].ready_ = true;
							i3GEO.pluginI3geo.OBJETOS[camada.name].redraw();
							i3GEO.eventos.cliquePerm.ativo = false;
						};
						i3GEO.pluginI3geo.OBJETOS[camada.name] = markercluster;
						markercluster_dados = null;
					};
					// se o script nao existir carrega o codigo e os dados
					// caso contrario, carrega apenas os dados no script
					if (!$i(nomeScript)) {
						carregaJs = "sim";
					} else {
						nomeScript = "";
					}
					p +=
						"?carregajs=" + carregaJs
							+ "&layer="
							+ camada.name
							+ "&g_sid="
							+ i3GEO.configura.sid
							+ "&tipoEstilos="
							+ camada.plugini3geo.parametros.tipoEstilos
							+ "&nomevariavel=markercluster_dados&nomevariavelConfig=markercluster_config";
					i3GEO.util.scriptTag(p, criaLayer, nomeScript);
				}
			},
			openlayers : {
				aplicaPropriedades : function(camada) {
					camada.sel = "nao";
					camada.download = "nao";
					camada.AGUARDALEGENDA = false;
					camada.temporizador = "";
					camada.copia = false;
					camada.procurar = false;
					camada.toponimia = false;
					camada.etiquetas = false;
					camada.tabela = false;
					camada.grafico = false;
					camada.destacar = false;
					camada.wms = false;
					camada.classe = "NAO";
					return camada;
				},
				layerMashup : function(camada, epsg){
					i3GEO.pluginI3geo.markercluster.openlayers.inicia(camada,i3GEO.editorOL.mapa);
					return [];
				},
				inicia : function(camada, objMapa) {
					var nomeScript = "markercluster_script", p = i3GEO.configura.locaplic + "/ferramentas/markercluster/openlayers_js.php", carregaJs =
						"nao", criaLayer;
					criaLayer =
						function() {
							var layerListeners, logMax, logMin, classes, min, max, markercluster, marcas, lonlat, n, i, style, nestilos, intervalo, regra, regras =
								[];

							nestilos = markercluster_config.estilos.length;
							n = markercluster_dados.length;

							classes = Array();
							logMax = Math.log(n) / Math.LN10; // max decimal logarithm (or base
							// 10)
							logMin = Math.log(1) / Math.LN10;
							intervalo = (logMax - logMin) / nestilos;
							// we compute log bounds
							for (i = 0; i < nestilos; i++) {
								if (i == 0) {
									classes[i] = logMin;
								} else {
									classes[i] = classes[i - 1] + intervalo;
								}
							}
							// we compute antilog
							classes = classes.map(function(x) {
								return Math.pow(10, x);
							});
							// and we finally add max value
							classes.push(n);

							// ponto sozinho
							regra = new OpenLayers.Rule({
								filter : new OpenLayers.Filter.Comparison({
									type : OpenLayers.Filter.Comparison.LESS_THAN,
									property : "count",
									value : 2
								}),
								symbolizer : {
									externalGraphic : markercluster_config.ponto.url,
									graphicWidth : markercluster_config.ponto.width,
									graphicHeight : markercluster_config.ponto.height,
									graphicYOffset : (markercluster_config.ponto.height / 2) * -1
								}
							});
							regras.push(regra);
							min = 2;
							for (i = 0; i < nestilos; i++) {
								max = classes[i + 1];
								regra = new OpenLayers.Rule({
									filter : new OpenLayers.Filter.Comparison({
										type : OpenLayers.Filter.Comparison.BETWEEN,
										property : "count",
										lowerBoundary : min,
										upperBoundary : max
									}),
									symbolizer : {
										externalGraphic : markercluster_config.estilos[i].url,
										graphicWidth : markercluster_config.estilos[i].width,
										graphicHeight : markercluster_config.estilos[i].height,
										label : "${count}",
										labelOutlineWidth : 1,
										fontColor : "#000000",
										fontOpacity : 1,
										fontSize : "12px"
									}
								});
								regras.push(regra);
								min = max;
							}

							// Create a Style that uses the three previous rules
							style = new OpenLayers.Style(null, {
								rules : regras
							});
							// para uso com o mashup
							if (!objMapa) {
								objMapa = i3geoOL;
							}

							layerListeners = {
								featureclick : function(e) {
									if (e.feature.cluster.length > 1) {
										objMapa.setCenter([
											e.feature.geometry.x, e.feature.geometry.y
										], objMapa.getZoom() + 1, false, false);
										// objMapa.zoomIn();
									}
									return false;
								}
							};

							markercluster = new OpenLayers.Layer.Vector(camada.name, {
								renderers : [
									'Canvas', 'SVG'
								],
								strategies : [
									new OpenLayers.Strategy.Cluster({
										distance : parseInt(camada.plugini3geo.parametros.gridSize, 10)
									})
								],
								styleMap : new OpenLayers.StyleMap(style),
								eventListeners : layerListeners
							});
							objMapa.addLayer(markercluster);

							marcas = [];
							for (i = 0; i < n; i++) {
								lonlat = new OpenLayers.LonLat(markercluster_dados[i].lng, markercluster_dados[i].lat);
								if (i3GEO.Interface.openlayers.googleLike === true) {
									lonlat.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
								}
								marcas.push(new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat)));
							}
							markercluster.addFeatures(marcas);

							i3GEO.janela.fechaAguarde("aguardePlugin");
							i3GEO.eventos.cliquePerm.ativo = false;

							markercluster.ligaCamada = function() {
								i3GEO.eventos.cliquePerm.ativo = false;
							};
							markercluster.desLigaCamada = function() {
								i3GEO.eventos.cliquePerm.ativo = true;
							};
							markercluster.removeCamada = function() {
								i3GEO.eventos.cliquePerm.ativo = true;
							};
							markercluster.atualizaCamada = function() {
								i3GEO.eventos.cliquePerm.ativo = false;
							};
							i3GEO.pluginI3geo.OBJETOS[camada.name] = markercluster;
							markercluster_dados = null;
						};
					// se o script nao existir carrega o codigo e os dados
					// caso contrario, carrega apenas os dados no script
					if (!$i(nomeScript)) {
						carregaJs = "sim";
					} else {
						nomeScript = "";
					}
					p +=
						"?carregajs=" + carregaJs
							+ "&layer="
							+ camada.name
							+ "&g_sid="
							+ i3GEO.configura.sid
							+ "&tipoEstilos="
							+ camada.plugini3geo.parametros.tipoEstilos;
					i3GEO.util.scriptTag(p, criaLayer, nomeScript);
				}
			}
		},
		/**
		 * Section: i3GEO.pluginI3geo.layerkml
		 *
		 * Adiciona ao mapa uma camada vetorial baseada em um arquivo Kml
		 *
		 * As depend&ecirc;ncias em javascript sao carregadas via script tag por meio de ferramentas/markercluster
		 *
		 * Esse programa tamb&eacute;m obt&eacute;m os dados necess&aacute;rios ao plugin
		 *
		 * O layer existente no mapfile deve conter um metadata chamado PLUGINI3GEO
		 *
		 * Esse matadado deve conter uma string que ser&aacute; transformada em um objeto javascript para uso no plugin
		 *
		 * Exemplo:
		 *
		 * "PLUGINI3GEO" '{"plugin":"layerkml","parametros":{"url":"teste"}}'
		 *
		 */
		layerkml : {
			linkAjuda : function() {
				return i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=3&idajuda=126";
				// http://localhost/i3geo/aplicmap/dados/sundials.kml
				// http://dev.openlayers.org/examples/kml/sundials.kml
			},
			formAdmin : function(config) {
				var parametros, ins = "", configDefault = '{"plugin":"layerkml","parametros":{"url": ""}}';
				if (config === "") {
					config = configDefault;
				}
				config = YAHOO.lang.JSON.parse(config);
				if (config.plugin != "layerkml") {
					config = YAHOO.lang.JSON.parse(configDefault);
				}
				parametros = config.parametros;
				ins +=
					"<p class='paragrafo'>Url do arquivo Kml:<br><div class='i3geoForm i3geoFormIconeEdita'><input name='url' type='text' value='" + parametros.url
						+ "'/></div></p>"
						+ "<p class='paragrafo'>Veja o exemplo utilizado no tema _lmapakml.map</p>";
				return ins;
			},
			/**
			 * Constroi um icone que sera adicionado na barra de icones do tema quando for adicionado na arvore de camadas Esse icone e
			 * utilizado para reabrir o formulario de parametros
			 */
			iconeArvoreDeCamadas : function(nomecamada) {
				return false;
			},
			googlemaps : {
				aplicaPropriedades : function(camada) {
					camada.sel = "nao";
					camada.download = "nao";
					camada.AGUARDALEGENDA = false;
					camada.temporizador = "";
					camada.copia = false;
					camada.procurar = false;
					camada.toponimia = false;
					camada.etiquetas = false;
					camada.tabela = false;
					camada.grafico = false;
					camada.destacar = false;
					camada.wms = false;
					camada.classe = "NAO";
					return camada;
				},
				inicia : function(camada) {
					var layerkml = new google.maps.KmlLayer(camada.plugini3geo.parametros.url, {
						map : i3GeoMap,
						preserveViewport : true,
						name : camada.name
					});
					i3GEO.janela.fechaAguarde("aguardePlugin");
					layerkml.ligaCamada = function() {
						i3GEO.pluginI3geo.OBJETOS[camada.name].setMap(i3GeoMap);
					};
					layerkml.desLigaCamada = function() {
						i3GEO.pluginI3geo.OBJETOS[camada.name].setMap(null);
					};
					layerkml.removeCamada = function() {
						i3GEO.pluginI3geo.OBJETOS[camada.name].setMap(null);
						i3GEO.pluginI3geo.OBJETOS[camada.name].resetViewport(true);
					};
					layerkml.atualizaCamada = function() {
						i3GEO.pluginI3geo.OBJETOS[camada.name].setMap(null);
						i3GEO.pluginI3geo.OBJETOS[camada.name].resetViewport(true);
						i3GEO.pluginI3geo.OBJETOS[camada.name].setMap(i3GeoMap);
					};
					i3GEO.pluginI3geo.OBJETOS[camada.name] = layerkml;
				}
			},
			openlayers : {
				aplicaPropriedades : function(camada) {
					camada.sel = "nao";
					camada.download = "nao";
					camada.AGUARDALEGENDA = false;
					camada.temporizador = "";
					camada.copia = false;
					camada.procurar = false;
					camada.toponimia = false;
					camada.etiquetas = false;
					camada.tabela = false;
					camada.grafico = false;
					camada.destacar = false;
					camada.wms = false;
					camada.classe = "NAO";
					return camada;
				},
				layerMashup : function(camada, epsg){
					i3GEO.pluginI3geo.layerkml.openlayers.inicia(camada,i3GEO.editorOL.mapa);
					return [];
				},
				inicia : function(camada, objMapa) {
					var layerkml;
					//console.info(camada)
					//url = i3GEO.configura.locaplic + "/classesphp/proxy.php?url=" + camada.plugini3geo.parametros.url;
					var url = i3GEO.configura.locaplic + "/ferramentas/layerkml/getkml.php?tema=" + camada.nomeoriginal;
					layerkml = new OpenLayers.Layer.Vector(camada.name, {
						displayOutsideMaxExtent : true,
						displayInLayerSwitcher : false,
						visibility : true,
						strategies : [
							new OpenLayers.Strategy.Fixed()
						],
						protocol : new OpenLayers.Protocol.HTTP({
							url : url,
							format : new OpenLayers.Format.KML({
								extractStyles : true,
								extractAttributes : true,
								maxDepth : 5
							})
						})
					});
					i3geoOL.addLayer(layerkml);

					if (!objMapa) {
						objMapa = i3geoOL;
					}
					layerkml.div.onclick =
						function(e) {
							var targ = "", id, temp, features, n, i, j = "", html = "";
							if (!e) {
								e = window.event;
							}
							if (e.target) {
								targ = e.target;
							} else if (e.srcElement) {
								targ = e.srcElement;
							}
							if (targ.id) {
								temp = targ.id.split("_Point");
								if (temp[0] === "OpenLayers_Geometry") {
									id = targ.id;
									temp = i3geoOL.getLayer(this.id);
									features = temp.features;
									n = features.length;
									for (i = 0; i < n; i++) {
										if (features[i].geometry.id === id) {
											for (j in features[i].attributes) {
												html += j + ": " + features[i].attributes[j];
											}
											g = features[i].geometry;
											i3geoOL.addPopup(new OpenLayers.Popup.FramedCloud(
												"kml",
												new OpenLayers.LonLat(g.x, g.y),
												null,
												html,
												null,
												true));

										}
									}
								}
							}
						};

					i3GEO.janela.fechaAguarde("aguardePlugin");
					i3GEO.eventos.cliquePerm.ativo = false;

					layerkml.ligaCamada = function() {
						i3GEO.eventos.cliquePerm.ativo = false;
					};
					layerkml.desLigaCamada = function() {
						i3GEO.eventos.cliquePerm.ativo = true;
					};
					layerkml.removeCamada = function() {
						i3GEO.eventos.cliquePerm.ativo = true;
					};
					layerkml.atualizaCamada = function() {
						i3GEO.eventos.cliquePerm.ativo = false;
					};
					i3GEO.pluginI3geo.OBJETOS[camada.name] = layerkml;
				}
			}
		},
		/**
		 * Section: i3GEO.pluginI3geo.parametrossql
		 *
		 * Adiciona ao mapa uma camada vetorial baseada em um arquivo mapfile normal por&eacute;m permite substituir par&acirc;metros no
		 * item DATA do LAYER
		 *
		 * Com o plugin, o i3GEO ir&aacute; mostrar um formul&aacute;rio com par&acirc;metros quando o usu&aacute;rio adicionar uma camada
		 * ao mapa
		 *
		 * O formul&aacute;rio colhe os valores que ser&atilde;o utilizados para substituir chaves inseridas no SQL
		 *
		 * O layer existente no mapfile deve conter um metadata chamado PLUGINI3GEO
		 *
		 * Esse matadado deve conter uma string que ser&aacute; transformada em um objeto javascript para uso no plugin
		 *
		 * Ver ferramentas/parametrossql
		 *
		 * Exemplo:
		 *
		 * "PLUGINI3GEO"
		 * '{"plugin":"parametrossql","parametros":{[{"titulo":"","tipo":"input|select","valores":[],"chave":"","prog":"","ativo":sim|nao}]}}'
		 *
		 * A op&ccedil;&atilde;o &quot;ativo&quot; indica se o formul&aacute;rio ser&aacute; aberto ou n&atilde;o quando a camada for
		 * adicionada ao mapa
		 */
		parametrossql : {
			linkAjuda : function() {
				return i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=3&idajuda=127";
			},
			formAdmin : function(config) {
				var n, i, parametros, ins = "", configDefault =
					'{"plugin":"parametrossql","ativo":"sim","parametros":[{"titulo":"","tipo":"input","valores":[],"chave":"","prog":""},{"titulo":"","tipo":"input","valores":[],"chave":"","prog":""},{"titulo":"","tipo":"input","valores":[],"chave":"","prog":""},{"titulo":"","tipo":"input","valores":[],"chave":"","prog":""}]}';
				if (config === "") {
					config = configDefault;
				}
				config = YAHOO.lang.JSON.parse(config);
				if (config.plugin != "parametrossql") {
					config = YAHOO.lang.JSON.parse(configDefault);
				}
				parametros = config.parametros;
				n = 4;
				if (config.ativo == undefined) {
					config.ativo = "sim";
				}
				ins += "<p class='paragrafo'>Abre o formul&aacute;rio quando a camada &eacute; adicionada ao mapa: (true ou false)</p>";
				ins += "<div class='styled-select' style='display:block;width: 200px;' ><select id='parametrosSqlAtivo' ><option value='' ></option>";
				if (config.ativo === "nao") {
					ins += "<option value=sim >sim</option><option value=nao selected >nao</option></select></div>";
				} else {
					ins += "<option value=sim selected >sim</option><option value=nao >nao</option></select></div>";
				}

				ins +=
					"<table class='lista4'><tr><td>T&iacute;tulo</td><td>Chave</td><td>Tipo (input ou select)</td><td>Valores</td><td>PHP que retorna os valores (opcional)</td></tr>";
				for (i = 0; i < n; i++) {
					ins +=
						"<tr><td><input name='titulo' type=text size=20 value='" + parametros[i].titulo
							+ "' /></td>"
							+ "<td><input name='chave' type=text size=20 value='"
							+ parametros[i].chave
							+ "' /></td>"
							+ "<td><input name='tipo' type=text size=20 value='"
							+ parametros[i].tipo
							+ "' /></td> "
							+ "<td><input name='valores' type=text size=20 value='"
							+ parametros[i].valores
							+ "' /></td> "
							+ "<td><input name='prog' type=text size=20 value='"
							+ parametros[i].prog
							+ "' /></td> "
							+ "<td></tr>";
				}
				ins +=
					"</table>" + "<p class='paragrafo'>As chaves s&atilde;o palavras que devem existir no SQL definido em DATA e/ou no filtro (FILTER)."
						+ "<br>O usu&aacute;rio ir&aacute; fornecer os valores que ser&atilde;o ent&atilde;o utilizados para substituir as chaves de forma din&acirc;mica"
						+ "<br>Ser&aacute; mostrado ao usu&aacute;rio um formul&aacute;rio com op&ccedil;&otilde;es. Cada op&ccedil;&atilde;o conter&aacute; um t&iacute;tulo e um campo de formul&aacute;rio"
						+ "<br>Cada campo de formul&aacute;rio pode ser dos tipos input (para digitar um valor) ou select (caixa de op&ccedil;&otilde;es)."
						+ "<br>Em valores deve ser definida a lista ou o valor default que ser&aacute; mostrado. No caso de listas, utilize v&iacute;rgula para separar os valores. Os valores devem sempre ser inteiros."
						+ "<br>Em ativo, &eacute; indicado com sim ou nao se o formul&aacute;rio ser&aacute; aberto quando a camada for adicionada ao mapa."
						+ "<br>Como opcional, pode ser definido o endere&ccedil;o de um programa PHP que retorna a lista de nomes e valores que ser&atilde;o utilizados para preencher "
						+ "o campo de escolha. Para mais informa&ccedil;&otilde;es, veja o mapfile i3geo/temas/_llocaliphp.map. O caminho desse arquivo PHP &eacute; relativo &agrave; pasta i3geo.";
				return ins;
			},
			// pega os valores do formulario quando e aberto no sistema de
			// administracao
			// ver i3geo/admin/editormapfile.js funcao salvarDadosEditorPlugin
			parametrosFormAdmin : function(onde) {
				var campo = 0, nlinhas = 4, ncampos = 5, campos = onde.getElementsByTagName("input"), par = [], temp = [], i, j;
				for (j = 0; j < nlinhas; j++) {
					temp = [];
					for (i = 0; i < ncampos; i++) {
						if (campos[campo] && campos[campo].name != "") {
							temp.push('"' + campos[campo].name + '" : "' + campos[campo].value + '"');
						}
						campo++;
					}
					par.push("{" + temp.join(",") + "}");
				}
				return '{"plugin":"parametrossql","ativo":"' + $i("parametrosSqlAtivo").value + '","parametros":[' + par.join(",") + ']}';
			},
			/**
			 * Constroi um icone que sera adicionado na barra de icones do tema quando for adicionado na arvore de camadas Esse icone e
			 * utilizado para reabrir o formulario de parametros
			 */
			iconeArvoreDeCamadas : function(nomecamada) {
				var icone =
					"<img class='pluginParametrossql' " + "onclick='i3GEO.util.animaClique(this);"
						+ "i3GEO.pluginI3geo.parametrossql.buscaParForm(\""
						+ nomecamada
						+ "\");return false;'"
						+ "title='Variaveis' "
						+ "src='"
						+ i3GEO.configura.locaplic
						+ "/imagens/branco.gif' />";
				return icone;
			},
			buscaParForm : function(nomecamada) {
				var p, cp, temp, s;
				temp = function(retorno) {
					var camada;
					retorno.data.ativo = "sim";
					// pega o objeto camada
					if (i3GEO.arvoreDeCamadas) {
						camada = i3GEO.arvoreDeCamadas.pegaTema(nomecamada);
						camada.plugini3geo = retorno.data;
					} else {
						camada = {
							plugini3geo : retorno.data,
							name : nomecamada
						};
					}
					i3GEO.pluginI3geo.parametrossql.inicia(camada);
				};
				s = i3GEO.configura.sid;
				if (s === undefined) {
					s = "";
				}
				// aqui e necessario buscar os parametros do plugin para poder abrir o formulario
				p =
					i3GEO.configura.locaplic + "/ferramentas/parametrossql/exec.php?g_sid="
						+ s
						+ "&funcao=PARAMETROSPLUGIN&tema="
						+ nomecamada;
				cp = new cpaint();
				cp.set_response_type("JSON");
				cp.call(p, "foo", temp);
			},
			inicia : function(camada) {
				i3GEO.janela.fechaAguarde("aguardePlugin");
				var iniciaform = function() {
					i3GEOF.parametrossql.iniciaJanelaFlutuante(camada);
				};
				i3GEO.util.scriptTag(
					(i3GEO.configura.locaplic + "/ferramentas/parametrossql/dependencias.php"),
					iniciaform,
					"parametrossql_script");
			},
			// @TODO permitir que os parametros sejam modificados mesmo depois de terem sido definidos
			googlemaps : {
				inicia : function(camada) {
					i3GEO.pluginI3geo.parametrossql.inicia(camada);
				},
				aplicaPropriedades : function(camada) {
					return camada;
				}
			},
			openlayers : {
				inicia : function(camada) {
					i3GEO.pluginI3geo.parametrossql.inicia(camada);
				},
				aplicaPropriedades : function(camada) {
					return camada;
				},
				/**
				 * parametros (opcional) - {}
				 */
				layerMashup : function(camada, epsg, funcao) {
					var p = [], tile, url;
					if (!camada.cache) {
						camada["cache"] = "NAO";
					}
					if (!camada.transitioneffect) {
						camada["transitioneffect"] = "SIM";
					}
					if(camada["transitioneffect"] === "SIM"){
						camada["transitioneffect"] = "resize";
					}
					else{
						camada["transitioneffect"] = null;
					}
					if(camada["tiles"] === "NAO"){
						tile = false;
					}
					else{
						tile = true;
					}
					// o gerador de OGC e especifico desse plugin, pois aceita parametros diferentes do original i3geo/ogc.php
					url = i3GEO.configura.locaplic + "ferramentas/parametrossql/ogc.php?tema=" + camada.name;
					if (camada.cache === "NAO") {
						p.push(new OpenLayers.Layer.WMS(camada.tema, url + "&DESLIGACACHE=sim&", {
							layers : camada.name,
							SRS : 'EPSG:' + epsg,
							FORMAT : 'image/png'
						}, {
							singleTile : tile,
							isBaseLayer : false,
							visibility : true,
							transitionEffect : camada["transitioneffect"],
							layername : camada.name,
							plugini3geo : "parametrossql",
							"pluginparametros" : camada.plugini3geo.parametros,
							ferramentas : camada.ferramentas
						}));
					} else {
						p.push(new OpenLayers.Layer.TMS(camada.tema, url + "&", {
							singleTile : false,
							isBaseLayer : false,
							layers : camada.name,
							visibility : true,
							serviceVersion : "&tms=",
							tileOrigin : new OpenLayers.LonLat(-180, -90),
							layername : camada.name,
							type : "png",
							transitionEffect : camada["transitioneffect"],
							plugini3geo : "parametrossql",
							"pluginparametros" : camada.plugini3geo.parametros,
							ferramentas : camada.ferramentas
						}));
						p.push(new OpenLayers.Layer.WMS(camada.tema, url + "&", {
							layers : camada.name,
							SRS : 'EPSG:' + epsg,
							FORMAT : 'image/png'
						}, {
							singleTile : true,
							isBaseLayer : false,
							visibility : false,
							//displayInLayerSwitcher:false,
							transitionEffect : null,
							layername : camada.name,
							plugini3geo : "parametrossql",
							"pluginparametros" : camada.plugini3geo.parametros,
							ferramentas : camada.ferramentas
						}));
					}
					if(funcao){
						funcao.call("", p);
					}
					else{
						return p;
					}
				}
			}
		}
	};
