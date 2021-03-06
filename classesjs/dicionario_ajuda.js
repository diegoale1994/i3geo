g_traducao_ajuda = {
	ferramentas: {
		"1": {
			titulo: {
				pt: "Filtro de cores ",
				es: "Filtro de colores",
				en: "Color filter"
			},
			diretorio:"i3geo/ferramentas/tipoimagem",
			categoria:"1",
			pt:"O filtro possibilita gerar efeitos de colora&ccedil;&atilde;o no mapa. &Eacute; aplicado sobre a imagem gerada toda vez que o mapa &eacute; alterado. No caso de temas baseados em dados RASTER, os n&iacute;veis de cores obtidos com a ferramenta de identifica&ccedil;&atilde;o n&atilde;o s&atilde;o alterados.<br>Os filtros podem provocar um tempo maior de desenho do mapa, devendo ser utilizados com cuidado. As op&ccedil;&otilde;es s&eacute;pia e tons de cinza utilizam algor&iacute;tmos pr&oacute;prios do i3Geo, j&aacute; as demais, utilizam a op&ccedil;&atilde;o de filtro dispon&iacute;vel com o PHP 5. Mais detalhes <a href='http://www.php.net/manual/pt_BR/function.imagefilter.php' >aqui</a>.",
			es: "El filtro hace possible generar efectos de color en el mapa. Es aplicado sobre la imagen generada cada vez que el mapa es modificado. En el caso de los temas basados en datos RASTER, los niveles de los colores obtenidos con la herramienta de identificaci&oacute;n no son modificados. Los filtros pueden hacer que el mapa tarde m&aacute;s tiempo para mostrarse en pantalla, por lo que hay que tener precauci&oacute;n en su uso. Las opciones sepia y tonos de ceniza usan algoritmos propios del i3Geo, mientras que el resto usa la alternativa de filtro disponible con PHP5. M&aacute;s detalles <a href='http://www.php.net/manual/pt_BR/function.imagefilter.php' >aqu&iacute;</a>.",
			en: "Filters allow you to create color effects on the map. Those filters are applied upon the resulting image when the map is updated. For themes based on RASTER data, colors levels derived from the identification tool will not be modified. Filters can slow down the map rendering, thus you have to be careful when using it. Sepia and grey options use i3Geo&rsquo;s algorithms, while other options use filter alternatives available at PHP5. <a href='http://www.php.net/manual/pt_BR/function.imagefilter.php'>More details. </a>",
			apijs:"i3GEO.mapa.dialogo.tipoimagem()"
		},
		"2": {
			titulo: {
				pt: "Legenda",
				es: "Leyenda",
				en: "Legend"
			},
			diretorio:"i3geo/ferramentas/opcoes_legenda",
			categoria:"1",
			pt:"A legenda do mapa &eacute; utilizada em v&aacute;rias op&ccedil;&otilde;es do i3Geo e pode tamb&eacute;m ficar inserida na pr&oacute;pria imagem do mapa. A legenda mostra os s&iacute;mbolos utilizados no desenho de cada tema, podendo-se alterar caracter&iacute;sticas como fonte, tamanho dos textos, tamanho dos ret&acirc;ngulos com os s&iacute;mbolos, etc.<br>Antes de aplicar uma altera&ccedil;&atilde;o, voc&ecirc; pode testar os par&acirc;metros escolhidos para avaliar o resultado. No caso dos par&acirc;metros que definem cores, utilize -1,-1,-1 para anular seu efeito.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.opcoesLegenda()"
		},
		"3": {
			titulo: {
				pt: "Barra de escala",
				es: "Escala gr&aacute;fica",
				en: "Bar scale"
			},
			diretorio:"i3geo/ferramentas/opcoes_escala",
			categoria:"1",
			pt:"A barra de escala &eacute; uma imagem inserida no mapa que mostra a rela&ccedil;&atilde;o entre uma medida feita no mapa e no mundo real. A barra pode ser modificada especificando-se seu tamanho, n&uacute;mero de divis&otilde;es e cores.<br>Existem dois modelos b&aacute;sicos para a escala: linear e bloco. Para n&atilde;o mostrar a escala no mapa, escolha a 'sem escala' na op&ccedil;&atilde;o estilo.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.opcoesEscala()"
		},
		"4": {
			titulo: {
				pt: "Tamanho do mapa",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/opcoes_tamanho",
			categoria:"1",
			pt:"O tamanho do mapa &eacute; definido automaticamente quando o i3Geo &eacute; aberto, buscando-se otimizar o uso do espa&ccedil;o dispon&iacute;vel no monitor. A op&ccedil;&atilde;o de modifica&ccedil;&atilde;o do tamanho altera apenas o corpo do mapa, for&ccedil;ando o ajuste dos outros elementos, o que nem sempre provoca bons resultados.<br>O ajuste do tamanho do mapa pode ser utilizado para gerar imagens em tamanhos espec&iacute;ficos, principalmente para efeitos de impress&atilde;o. A medida do tamanho utilizado &eacute; pixel, que corresponde ao tamanho m&iacute;nimo de uma c&eacute;lula da imagem do mapa. Para calcular o tamanho do mapa em outra unidade de medida, necess&aacute;rio nos casos em que se deseja imprimir o mapa, deve ser feito considerando-se a resolu&ccedil;&atilde;o de impress&atilde;o desejada.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.tamanho()"
		},
		"5": {
			titulo: {
				pt: "Cor da sele&ccedil;&atilde;o",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/opcoes_querymap",
			categoria:"1",
			pt:"A cor da sele&ccedil;&atilde;o &eacute; utilizada para mostrar no mapa os elementos de um determinado tema que est&atilde;o selecionados. A sele&ccedil;&atilde;o consiste em destacar elementos para uso em determinadas opera&ccedil;&otilde;es, como por exemplo o c&aacute;lculo de entorno (buffer). A defini&ccedil;&atilde;o da cor &eacute; baseada no modelo R,G,B, sendo que cada componente varia de 0 a 255.<br>Ao definir os valores de RGB, separe-os com ','. Quando um tema possuir elementos selecionados, &eacute; inclu&iacute;da uma marca antes do nome do tema na lista de camadas dispon&iacute;veis no mapa.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.queryMap()"
		},
		"6": {
			titulo: {
				pt: "Cor do fundo",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/opcoes_fundo",
			categoria:"1",
			pt:"O corpo do mapa &eacute; constitu&iacute;do por uma imagem gerada com tamanho fixo. Essa imagem possu&iacute; uma cor padr&atilde;o, sobre a qual s&atilde;o sobrepostas as camadas. Por padr&atilde;o, a cor do fundo &eacute; definida como azul. A defini&ccedil;&atilde;o da cor &eacute; baseada no modelo R,G,B, sendo que cada componente varia de 0 a 255.<br>Ao definir os valores de RGB, separe-os com ','. Ao utilizar as op&ccedil;&otilde;es de convers&atilde;o do mapa atual para kml ou WMS, a altera&ccedil;&atilde;o da cor do fundo para 255,255,255 oferece melhores resultados na visualiza&ccedil;&atilde;o dos dados.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.corFundo()"
		},
		"7": {
			titulo: {
				pt: "Grade de coordenadas",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/gradecoord",
			categoria:"1",
			pt:"A grade de coordenadas &eacute; formada por linhas verticais e horizontais representando determinadas latitudes e longitudes. A grade &eacute; um dos elementos principais na defini&ccedil;&atilde;o de um mapa, sendo utilizada na impress&atilde;o ou gera&ccedil;&atilde;o de figuras.<br>Ao adicionar uma grade, &eacute; criado uma nova camada no mapa, possibilitando que mais de uma grade seja criada. Uma grade pode ou n&atilde;o conter os textos indicando os valores de lat long, permitindo que se crie uma grade com espa&ccedil;amento de linhas diferente do espa&ccedil;amento dos textos.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.gradeCoord()"
		},
		"8": {
			titulo: {
				pt: "Templates",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/template",
			categoria:"1",
			pt:"Um template define como os componentes de um mapa s&atilde;o organizados no navegador. O administrador do i3Geo pode criar templates diferentes conforme as necessidades do usu&aacute;rio, sendo que alguns templates s&atilde;o fornecidos com o pr&oacute;prio i3Geo.<br>A cria&ccedil;&atilde;o de templates &eacute; uma tarefa do administrador do i3Geo. Para abrir um template espec&iacute;fico diretamente, utilize a URL que &eacute; mostrada no navegador quando um template &eacute; escolhido.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.template()"
		},
		"9": {
			titulo: {
				pt: "Temporizador",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/opcoes_autoredesenha",
			categoria:"1",
			pt:"O temporizador permite definir um intervalo de tempo em segundos que ir&aacute; disparar o redesenho do mapa.<br>Quando o mapa &eacute; redesenhado, as camadas existentes s&atilde;o lidas novamente para compor o novo mapa. Essa op&ccedil;&atilde;o &eacute; &uacute;til quando existirem camadas no mapa que sofrem atualiza&ccedil;&otilde;es frequentes, como por exemplo o deslocamento de aeronaves, carros ou navios.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.autoredesenha()"
		},
		"10": {
			titulo: {
				pt: "Salvar mapa",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/salvamapa",
			categoria:"2",
			pt:"O mapa que o usu&aacute;rio est&aacute; utilizando pode ser salvo localmente (na m&aacute;quina do usu&aacute;rio) ou no banco de dados no servidor onde o i3Geo est&aacute; instalado. para ser aberto posteriormente. Isso permite que um trabalho seja continuado em outro momento, uma vez que o mapa em uso &eacute; sempre perdido quando o usu&aacute;rio fecha o navegador.<br>Os dados locais que foram criados n&atilde;o s&atilde;o salvos, sendo necess&aacute;rio o seu download quando desejado. Isso afeta as op&ccedil;&otilde;es de inclus&atilde;o de pontos ou convers&atilde;o de elementos selecionados em camadas.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.salvaMapa()"
		},
		"11": {
			titulo: {
				pt: "Carregar mapa",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/carregamapa",
			categoria:"2",
			pt:"O mapa que o usu&aacute;rio est&aacute; utilizando pode ser salvo localmente (na m&aacute;quina do usu&aacute;rio) para ser aberto posteriormente. Isso permite que um trabalho seja continuado em outro momento, uma vez que o mapa em uso &eacute; sempre perdido quando o usu&aacute;rio fecha o navegador.<br>A op&ccedil;&atilde;o de carregar um mapa permite enviar para o servidor, onde o i3Geo est&aacute; instalado, o mapa que foi salvo anteriormente.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.carregaMapa()"
		},
		"12": {
			titulo: {
				pt: "Converter em WMS",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/convertews",
			categoria:"2",
			pt:"Convertendo o mapa atual em um WMS &eacute; poss&iacute;vel utilizar outros softwares para visualizar o mesmo mapa visto no i3Geo. O resultado da convers&atilde;o &eacute; um endere&ccedil;o (url) tempor&aacute;rio, esse endere&ccedil;o deve ser inserido no software que se quer usar e que suporte WMS.<br>WMS &eacute; um padr&atilde;o internacional e n&atilde;o espec&iacute;fico do i3Geo. Utilizando um WMS, pode-se adicionar ao mapa outras camadas de dados, inclusive dados locais, se estiver sendo utilizado um software instalado em um computador local. Conforme as caracter&iacute;sticas de cada servidor onde o i3Geo estiver instalado, o WMS poder&aacute; permanecer dispon&iacute;vel por per&iacute;odos de tempo vari&aacute;veis. Para acessar a lista de WMS dispon&iacute;veis utilize o link <a href='ogc.htm' >ogc.htm</a>.Mais informa&ccedil;&otilde;es em <a href='www.opengeospatial.org' >OGC.</a>",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.convertews()"
		},
		"13": {
			titulo: {
				pt: "Converter em KML",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/convertekml",
			categoria:"2",
			pt:"Convertendo o mapa atual em KML &eacute; poss&iacute;vel utilizar outros softwares para visualizar o mesmo mapa visto no i3Geo. O resultado da convers&atilde;o &eacute; um endere&ccedil;o (url) tempor&aacute;rio, esse endere&ccedil;o deve ser inserido no software que se quer usar e que suporte KML. Para usar o KML no Google Earth, utilize a op&ccedil;&atilde;o desse softawre chamada 'adicionar link de rede'.<br>KML &eacute; um padr&atilde;o internacional e n&atilde;o espec&iacute;fico do i3Geo. Conforme as caracter&iacute;sticas de cada servidor onde o i3Geo estiver instalado, o KML poder&aacute; permanecer dispon&iacute;vel por per&iacute;odos de tempo vari&aacute;veis. O KML gerado pelo i3Geo n&atilde;o cont&eacute;m as coordenadas dos elementos de uma camada, mas sim um WMS embutido no KML. Essa estrutura limita o uso do KML mas permite uma maior performance no acesso aos dados. Mais informa&ccedil;&otilde;es em <a href='www.opengeospatial.org' target=blanck >OGC</a>.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.convertekml()"
		},
		"14": {
			titulo: {
				pt: "Grade de pol&iacute;gonos",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/gradepol",
			categoria:"3",
			pt:"Cria uma nova camada no mapa contendo ret&acirc;ngulos com espa&ccedil;amento determinado em x e y. A grade gerada pode ser obtida via download. O espa&ccedil;amento &eacute; definido em d&eacute;cimos de grau e as coordenadas do ponto inicial podem ser definida clicando-se no mapa ou digitando-se o valor.<br>A grade &eacute; &uacute;til para a realiza&ccedil;&atilde;o de an&aacute;lises onde deseja-se calcular ocorr&ecirc;ncias de fen&ocirc;menos pontuais e represent&aacute;-los posteriormente com base em totais. Observe que a &aacute;rea e as dist&acirc;ncias reais de cada pol&iacute;gono n&atilde;o s&atilde;o constantes, uma vez que &eacute; utilizada a proje&ccedil;&atilde;o geogr&aacute;fica na sua gera&ccedil;&atilde;o.",
			es: "",
			en: "",
			apijs:"i3GEO.analise.dialogo.gradePol()"
		},
		"15": {
			titulo: {
				pt: "Grade de pontos",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/gradepontos",
			categoria:"3",
			pt:"Cria uma nova camada no mapa contendo pontos com espa&ccedil;amento determinado em x e y. A grade gerada pode ser obtida via download. O espa&ccedil;amento &eacute; definido em d&eacute;cimos de grau e as coordenadas do ponto inicial podem ser definida clicando-se no mapa ou digitando-se o valor.<br>Observe que as dist&acirc;ncias reais entre cada ponto n&atilde;o s&atilde;o constantes, uma vez que &eacute; utilizada a proje&ccedil;&atilde;o geogr&aacute;fica na sua gera&ccedil;&atilde;o.",
			es: "",
			en: "",
			apijs:"i3GEO.analise.dialogo.gradePontos()"
		},
		"16": {
			titulo: {
				pt: "Grade de hex&aacute;gonos",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/gradehex",
			categoria:"3",
			pt:"Cria uma nova camada no mapa contendo hex&aacute;gonos com espa&ccedil;amento determinado em x e y. A grade gerada pode ser obtida via download. O espa&ccedil;amento &eacute; definido em d&eacute;cimos de grau e as coordenadas do ponto inicial podem ser definida clicando-se no mapa ou digitando-se o valor.<br>A grade &eacute; &uacute;til para a realiza&ccedil;&atilde;o de an&aacute;lises onde deseja-se calcular ocorr&ecirc;ncias de fen&ocirc;menos pontuais e represent&aacute;-los posteriormente com base em totais. Observe que a &aacute;rea e as dist&acirc;ncias reais de cada pol&iacute;gono n&atilde;o s&atilde;o constantes, uma vez que &eacute; utilizada a proje&ccedil;&atilde;o geogr&aacute;fica na sua gera&ccedil;&atilde;o.",
			es: "",
			en: "",
			apijs:"i3GEO.analise.dialogo.gradeHex()"
		},
		"17": {
			titulo: {
				pt: "Dist&acirc;ncia entre pontos",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/distanciaptpt",
			categoria:"3",
			pt:"O c&aacute;lculo de dist&acirc;ncias &eacute; feito de um ponto em rela&ccedil;&atilde;o aos mais pr&oacute;ximos. O ponto origem, deve estar selecionado em um dos temas existentes no mapa. Para restringir a dist&acirc;ncia de busca, &eacute; necess&aacute;rio definir um raio m&aacute;ximo, os pontos considerados ser&atilde;o aqueles dentro desse raio. Em cada linha ligando dois pontos s&atilde;o inseridos atributos que indicam a dist&acirc;ncia e o identificador dos pontos. Esses identificadores s&atilde;o escolhidos com base nas colunas de atributos do tema pontual escolhido.<br>O resultado dos c&aacute;lculos s&atilde;o novas camadas inclu&iacute;das no mapa, sendo uma de linhas e uma com o entorno de busca considerado.",
			es: "",
			en: "",
			apijs:"i3GEO.analise.dialogo.distanciaptpt()"
		},
		"18": {
			titulo: {
				pt: "Ponto em pol&iacute;gono",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/pontoempoligono",
			categoria:"3",
			pt:"Ponto em pol&iacute;gono &eacute; uma opera&ccedil;&atilde;o que resulta em um novo tema contendo o cruzamento entre um tema com pontos e outros com pol&iacute;gonos (ou imagem raster). As informa&ccedil;&otilde;es do tema poligonal (ou raster) ser&atilde;o agregadas &agrave; tabela do novo tema pontual gerado. As colunas da tabela de atributos do novo tema gerado ser&atilde;o nomeadas em uma sequ&ecirc;ncia num&eacute;rica, uma vez que o tema original pode ter colunas com nomes incompat&iacute;veis com o formato shapefile, utilizado na gera&ccedil;&atilde;o do novo tema.<br>Pode-se escolher mais de um tema de origem dos dados, possibilitando agregar informa&ccedil;&otilde;es de temas diferentes. Essa op&ccedil;&atilde;o de cruzamento &eacute; &uacute;til nos casos onde a informa&ccedil;&atilde;o necess&aacute;ria para a an&aacute;lise de um tema encontra-se em outro tema. Por exemplo, &eacute; poss&iacute;vel cruzar um tema com a localiza&ccedil;&atilde;o das cidades com um tema com a delimita&ccedil;&atilde;o de biomas. O resultado permite elaborar estat&iacute;sticas por biomas com base nos dados dos pontos.",
			es: "",
			en: "",
			apijs:"i3GEO.analise.dialogo.pontoempoligono()"
		},
		"19": {
			titulo: {
				pt: "N&uacute;mero de pontos por pol&iacute;gono",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/nptpol",
			categoria:"3",
			pt:"Ponto em pol&iacute;gono &eacute; uma opera&ccedil;&atilde;o que resulta em um novo tema contendo o cruzamento entre um tema com pontos e outro com pol&iacute;gono. O resultado &eacute; um novo tema poligonal, cuja tabela de atributos conter&aacute; um item com o total de pontos em cada pol&iacute;gono.<br>O uso dessa ferramenta &eacute; indicado nas situa&ccedil;&otilde;es em que se deseja agregar dados de ocorr&ecirc;ncias pontuais em pol&iacute;gonos, possibilitando a visualiza&ccedil;&atilde;o dos dados por meio de t&eacute;cnicas de classifica&ccedil;&atilde;o e representa&ccedil;&atilde;o coropl&eacute;tica.",
			es: "",
			en: "",
			apijs:"i3GEO.analise.dialogo.nptPol()"
		},
		"20": {
			titulo: {
				pt: "Distribui&ccedil;&atilde;o de pontos",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/pontosdistri",
			categoria:"3",
			pt:"Essa op&ccedil;&atilde;o disponibiliza v&aacute;rias ferramentas de an&aacute;lise de distribui&ccedil;&atilde;o de pontos, a maior parte baseia-se no software estat&iacute;stico <a href='www.r-project.org' target=blanck >R</a>. Algumas das an&aacute;lises geram como resultado imagens RASTER e outras temas lineares e poligonais. A op&ccedil;&atilde;o de relat&oacute;rio gera uma nova p&aacute;gina com v&aacute;rios &iacute;ndices calculados com o software R.<br>A imagem RASTER resultante utiliza a resolu&ccedil;&atilde;o (tamanho do pixel) compat&iacute;vel com a escala utilizada no mapa que est&aacute; sendo visto. A representa&ccedil;&atilde;o utiliza, por padr&atilde;o, tons de cinza. A altera&ccedil;&atilde;o nas cores utilizadas na representa&ccedil;&atilde;o podem melhorar de forma significativa a visualiza&ccedil;&atilde;o dos resultados. Utilize a op&ccedil;&atilde;o de edi&ccedil;&atilde;o da legenda do tema para fazer isso. As an&aacute;lises de distribui&ccedil;&atilde;o de pontos s&atilde;o realizadas com o software R. As an&aacute;lises de densidade de pontos, dist&acirc;ncia entre pontos e kernel, foram implantadas utilizando-se a biblioteca <a href='http://cran.r-project.org/web/packages/spatstat' target=blanck >SPATSTAT</a> do R. As an&aacute;lises de Delaunay e Voronoi utilizam a biblioteca <a href='http://cran.r-project.org/web/packages/deldir' target=blanck >DELDIR</a> e a an&aacute;lise de cluster espacial utiliza o <a href='http://cran.r-project.org/web/packages/spatclus' target=blanck >SPATCLUS</a>. As an&aacute;lises podem consumir muito tempo de processamento, portanto, tenha cuidado com o n&uacute;mero de pontos.",
			es: "",
			en: "",
			apijs:""
		},
		"21": {
			titulo: {
				pt: "Centr&oacute;ide",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/centroide",
			categoria:"3",
			pt:"Os centr&oacute;ides s&atilde;o pontos localizados no centro de massa de uma geometria. Para gerar os centr&oacute;ides, voc&ecirc; precisa selecionar alguns elementos de um tema. Utilize para isso a op&ccedil;&atilde;o de sele&ccedil;&atilde;o ou a tabela de atributos do tema desejado.<br>Dependendo da forma de uma geometria, o ponto calculado pode ser posicionado fora do pol&iacute;gono <a href='http://postgis.refractions.net/documentation/manual-svn/ST_Centroid.html' >exemplo</a>.",
			es: "",
			en: "",
			apijs:"i3GEO.analise.dialogo.centroide()"
		},
		"22": {
			titulo: {
				pt: "Dissolver",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/dissolve",
			categoria:"3",
			pt:"Essa ferramenta transforma v&aacute;rios pol&iacute;gonos em um s&oacute; eliminando as divisas entre eles. Para definir quais os pol&iacute;gonos devem ser unidos uns com os outros &eacute; preciso escolher um item da tabela de atributos do tema. Os pol&iacute;gonos que possu&iacute;rem o mesmo valor ser&atilde;o considerados no mesmo grupo e suas divisas eliminadas. Caso n&atilde;o tenha sido escolhido nenhum item, todas os pol&iacute;gonos ser&atilde;o agrupados em um s&oacute;.<br>O resultado final ser&aacute; um novo tema com pol&iacute;gonos diferentes dos originais e cuja tabela de atributos conter&aacute; apenas o item escolhido. Caso as geometrias originais possuam fronteiras n&atilde;o ajustadas exatamente, o resultado pode apresentar pequenos pol&iacute;gonos internos.",
			es: "",
			en: "",
			apijs:"i3GEO.analise.dialogo.dissolve()"
		},
		"23": {
			titulo: {
				pt: "An&aacute;lise de geometrias",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/analisageometrias",
			categoria:"3",
			pt:"Essa ferramenta permite processar elementos constituintes de um ou mais temas por meio de fun&ccedil;&otilde;es que atuam sobre a geometria que define o elemento. Essas fun&ccedil;&otilde;es possibilitam a realiza&ccedil;&atilde;o de c&aacute;lculos, como &aacute;rea e per&iacute;metro, e cruzamentos entre geometrias, como uni&atilde;o e intersec&ccedil;&atilde;o. Para utilizar a ferramenta, deve-se selecionar cada elemento desejado e convert&ecirc;-los em uma geometria ou conjunto de geometrias. Feito isso, as geometrias convertidas podem ser utilizadas nas opera&ccedil;&otilde;es.<br>Para selecionar elementos, utilize as op&ccedil;&otilde;es de sele&ccedil;&atilde;o dispon&iacute;veis no i3Geo ou ent&atilde;o clique no mapa no elemento desejado ap&oacute;s ativar a ferramenta. A sele&ccedil;&atilde;o &eacute; feita sobre o tema escolhido. Para ver as geometrias capturadas, clique na guia 'listar'. Para usar as op&ccedil;&otilde;es de an&aacute;lise, mostradas na guia 'an&aacute;lise', voc&ecirc; deve marcar as geometrias desejadas na guia 'listar'.",
			es: "",
			en: "",
			apijs:"i3GEO.analise.dialogo.analisaGeometrias()"
		},
		"24": {
			titulo: {
				pt: "Entorno (buffer)",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/buffer",
			categoria:"3",
			pt:"O entorno, ou buffer, &eacute; um pol&iacute;gono que circunda um elemento geogr&aacute;fico em uma dist&acirc;ncia fixa. Para o c&aacute;lculo de dist&acirc;ncia o i3Geo utiliza a proje&ccedil;&atilde;o polic&ocirc;nica. Os atributos do tema alvo s&atilde;o copiados para os pol&iacute;gonos resultantes e uma nova camada &eacute; adicionada ao mapa. Opcionalmente, os pol&iacute;gonos resultantes podem ser unidos como um &uacute;nico.<br>Para gerar o entorno, voc&ecirc; precisa selecionar alguns elementos de um tema. Utilize para isso a op&ccedil;&atilde;o de sele&ccedil;&atilde;o ou a tabela de atributos do tema desejado. O buffer pode ser gerado tamb&eacute;m por meio da ferramenta de identifica&ccedil;&atilde;o.",
			es: "",
			en: "",
			apijs:"i3GEO.analise.dialogo.buffer()"
		},
		"25": {
			titulo: {
				pt: "Agrupa elementos",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/agrupaelementos",
			categoria:"3",
			pt:"Essa ferramenta transforma v&aacute;rios elementos selecionados de um tema em um s&oacute; criando pol&iacute;gonos agrupados. Para definir quais elementos devem ser unidos uns com os outros &eacute; preciso escolher um item da tabela de atributos do tema. Os elementos que possu&iacute;rem o mesmo valor nesse item ser&atilde;o considerados no mesmo grupo e suas divisas eliminadas. Caso n&atilde;o tenha sido escolhido nenhum item, todas os elementos ser&atilde;o agrupados em um s&oacute;.<br>O resultado final ser&aacute; um novo tema com pol&iacute;gonos diferentes dos originais e cuja tabela de atributos conter&aacute; apenas o item escolhido.",
			es: "",
			en: "",
			apijs:"i3GEO.analise.dialogo.agrupaElementos()"
		},
		"26": {
			titulo: {
				pt: "Upload de arquivo DBF ou CSV",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/uploaddbf",
			categoria:"4",
			pt:"Utilize essa op&ccedil;&atilde;o para acrescentar um tema baseado nas coordenadas x e y presentes em uma tabela DBF ou arquivo CSV. Os valores de x e y devem utilizar '.' como separador de decimal. Se as coordenadas estiverem na proje&ccedil;&atilde;o geogr&aacute;fica, os valores dever&atilde;o estar em d&eacute;cimos de grau, com sinal negativo para pontos ao sul do equador e oeste do meridiano 0.<br>O arquivo DBF ou CSV ser&aacute; armazenado no servidor onde o i3geo est&aacute; instalado e permanecer&aacute; l&aacute; at&eacute; que os arquivos tempor&aacute;rios sejam apagados. N&atilde;o utilize essa op&ccedil;&atilde;o se existir alguma restri&ccedil;&atilde;o ao uso do arquivo e se a pol&iacute;tica de acesso aos dados, definidas pela entidade que hospeda o i3geo, n&atilde;o for compat&iacute;vel com essas restri&ccedil;&otilde;es.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas.dialogo.uploaddbf()"
		},
		"27": {
			titulo: {
				pt: "Upload se shapefile",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/upload",
			categoria:"4",
			pt:"Permite que um arquivo do tipo shapefile seja enviado ao servidor e inclu&iacute;do no mapa como uma nova camada. O arquivo shapefile ser&aacute; armazenado no servidor onde o i3geo est&aacute; instalado e permanecer&aacute; l&aacute; at&eacute; que os arquivos tempor&aacute;rios sejam apagados. Um shapefile &eacute; composto basicamente por tr&ecirc;s tipos de arquivos (dbf, shp e shx), todos devem ser submetidos.<br>N&atilde;o utilize essa op&ccedil;&atilde;o se existir alguma restri&ccedil;&atilde;o ao uso do arquivo e se a pol&iacute;tica de acesso aos dados, definidas pela entidade que hospeda o i3geo, n&atilde;o for compat&iacute;velcom essas restri&ccedil;&otilde;es.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas.dialogo.upload()"
		},
		"28": {
			titulo: {
				pt: "Conex&atilde;o WMS",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/conectarwms",
			categoria:"4",
			pt:"Uma conex&atilde;o WMS permite que dados dispon&iacute;veis em outros servidores sejam inclu&iacute;dos como camadas no i3Geo. Na ferramenta de conex&atilde;o &eacute; mostrada uma lista de endere&ccedil;os previamente cadastrados, mas pode-se digitar um outro endere&ccedil;o qualquer, desde que seja um servi&ccedil;o no padr&atilde;o WMS. Ap&oacute;s um servi&ccedil;o ser escolhido, a lista de camadas dispon&iacute;veis &eacute; mostrada na guia 'Temas'.<br>Camadas obtidas por meio de conex&atilde;o WMS n&atilde;o permitem que algumas opera&ccedil;&otilde;es dispon&iacute;veis no i3Geo sejam executadas, como por exemplo a altera&ccedil;&atilde;o na legenda, sele&ccedil;&atilde;o, entre outras. Quando um servidor apresentar problemas, a camada n&atilde;o poder&aacute; ser adicionada.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas.dialogo.conectaservico()"
		},
		"29": {
			titulo: {
				pt: "Conex&atilde;o GeoRSS",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/conectargeorss",
			categoria:"4",
			pt:"Uma conex&atilde;o GeoRSS permite obter a localiza&ccedil;&atilde;o de conte&uacute;dos dispon&iacute;veis no formato RSS com coordenadas geogr&aacute;ficas inclu&iacute;das. Na ferramenta de conex&atilde;o &eacute; mostrada uma lista de endere&ccedil;os previamente cadastrados, mas pode-se digitar um outro endere&ccedil;o qualquer, desde que seja um servi&ccedil;o no padr&atilde;o GeoRSS.<br>A camada adicionada ao mapa baseia-se em um arquivo shapefile criado temporariamente pelo i3Geo. Caso o servi&ccedil;o GeoRSS sofrer altera&ccedil;&otilde;es, como a inclus&atilde;o de um novo item, &eacute; necess&aacute;rio fazer novamente a conex&atilde;o para que a camada reflita a altera&ccedil;&atilde;o.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas.dialogo.conectaservico()"
		},
		"30": {
			titulo: {
				pt: "Nuvem de tags",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/nuvemtags",
			categoria:"4",
			pt:"A nuvem de tags &eacute; uma forma de localizar camadas dispon&iacute;veis para ser vistas no mapa. A busca &eacute; feita por meio de tags ou palavras-chave. As tags s&atilde;o registradas pelo administrador do i3Geo para cada tema dispon&iacute;vel na &aacute;rvore de temas.<br>Ao escolher uma tag, &eacute; realizada uma busca dos temas correspondentes e o resultado &eacute; adicionado &agrave; arvore de temas. Opcionalmente, o usu&aacute;rio pode escolher navegar na nuvem 'animada' que mostra as tags como um globo 3d.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas.dialogo.nuvemTags()"
		},
		"31": {
			titulo: {
				pt: "Procurar tema",
				es: "",
				en: ""
			},
			diretorio:"classe_arvoredetemas.js",
			categoria:"4",
			pt:"Localiza temas dispon&iacute;veis nos menus da &aacute;rvore de adi&ccedil;&atilde;o de temas. Os temas localizados s&atilde;o inclu&iacute;dos em um novo n&oacute; da &aacute;rvore, possibilitando sua adi&ccedil;&atilde;o ao mapa.<br>Para procurar um tema, digite a palavra ou frase no campo de texto e clique no &iacute;cone existente no lado direito. O resultado da busca aparecer&aacute; como um n&oacute; na &aacute;rvore de temas do cat&aacute;logo.",
			es: "",
			en: "",
			apijs: "i3GEO.arvoreDeTemas.buscaTema(palavra)"
		},
		"32": {
			titulo: {
				pt: "Acesso aos arquivos do servidor",
				es: "",
				en: ""
			},
			diretorio:"classe_arvoredetemas.js",
			categoria:"4",
			pt:"Os usu&aacute;rios cadastrados no i3Geo como editores podem acessar arquivos existentes no servidor onde o i3Geo est&aacute; instalado. A navega&ccedil;&atilde;o permite localizar arquivos shapefile para inclus&atilde;o como uma nova camada no mapa.<br>Por motivos de seguran&ccedil;a, apenas os editores podem utilizar essa op&ccedil;&atilde;o. O cadastramento &eacute; feito pelo administrador do i3Geo, por meio da edi&ccedil;&atilde;o do arquivo ms_configura.php.",
			es: "",
			en: "",
			apijs: "i3GEO.arvoreDeTemas.montaDir(node)"
		},
		"33": {
			titulo: {
				pt: "&Aacute;rvore de endere&ccedil;os WMS",
				es: "",
				en: ""
			},
			diretorio:"classe_arvoredetemas.js",
			categoria:"4",
			pt:"A conex&atilde;o com servi&ccedil;os WMS (OGC) pode ser feita escolhendo-se o servidor e as camadas dispon&iacute;veis diretamente na &aacute;rvore de temas. A lista de endere&ccedil;os utilizada nesse n&oacute; da &aacute;rvore &eacute; a mesma utilizada na op&ccedil;&atilde;o de conex&atilde;o que &eacute; aberta por meio do &iacute;cone 'Conex&atilde;o MWS'. Quando uma camada for encontrada no WMS, &eacute; mostrado um 'box' ao lado do nome da camada, permitindo sua adi&ccedil;&atilde;o ao mapa.<br>A vantagem do uso da &aacute;rvore &eacute; a velocidade de acesso &agrave; lista de camadas, uma vez que o i3Geo faz um 'cache' do arquivo XML gerado com a lista de camadas dispon&iacute;veis. A &aacute;rvore permite ainda a vis&atilde;o correta da hierarquia de camadas configuradas no WMS, que pode ter v&aacute;rios n&iacute;veis. Cada vez que um usu&aacute;rio tenta acessar um WMS o sucesso ou n&atilde;o da conex&atilde;o &eacute; registrado, assim, &eacute; poss&iacute;vel mostrar ao lado de cada endere&ccedil;o o percentual de tentativas de conex&atilde;o v&aacute;lidas.",
			es: "",
			en: "",
			apijs: "i3GEO.arvoreDeTemas.listaWMS(node)"
		},
		"34": {
			titulo: {
				pt: "Sistemas",
				es: "",
				en: ""
			},
			diretorio:"classe_arvoredetemas.js",
			categoria:"4",
			pt:"O n&oacute; 'Sistemas' da &aacute;rvore de adi&ccedil;&atilde;o de temas, lista aplicativos especiais que precisam de intera&ccedil;&atilde;o com o usu&aacute;rio para a cria&ccedil;&atilde;o de uma camada.<br>Alguns sistemas s&atilde;o fornecidos com a instala&ccedil;&atilde;o padr&atilde;o do i3Geo, mas cada administrador pode criar seus pr&oacute;prios.",
			es: "",
			en: "",
			apijs: "i3GEO.arvoreDeTemas.listaSistemas(g_sid,g_locaplic,funcao)"
		},
		"35": {
			titulo: {
				pt: "Procurar ocorr&ecirc;ncias",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/busca",
			categoria:"5",
			pt:"Cada tema possui um conjunto de dados descritivos associados aos elementos geogr&aacute;ficos (tabela de atributos). A op&ccedil;&atilde;o 'procurar' realiza uma pesquisa nesses atributos e localiza as correspond&ecirc;ncias. O resultado &eacute; mostrado em uma lista de elementos que permite destacar cada um deles.<br>Para fazer a busca deve-se selecionar em quais itens da tabela de atributos a mesma ser&aacute; feita, podendo-se escolher mais de um. A busca pode ser feita no mapa todo ou apenas na regi&atilde;o vis&iacute;vel do mapa.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.procuraratrib()"
		},
		"36": {
			titulo: {
				pt: "Topon&iacute;mia",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/toponimia",
			categoria:"5",
			pt:"A topon&iacute;mia s&atilde;o os textos mostrados no mapa que identificam lugares ou elementos que constituem um tema. Os textos s&atilde;o baseados na tabela de atributos de cada tema, que cont&ecirc;m os dados descritivos de cada elemento.<br>Ao inserir uma topon&iacute;mia, um novo tema &eacute; adicionado ao mapa, podendo ser exclu&iacute;do ou movimentado. Dessa forma &eacute; poss&iacute;vel incluir mais de um tema com a topon&iacute;mia. Ao inserir a topon&iacute;mia deve-se escolher o item da tabela de atributos e, caso necess&aacute;rio, pode-se modificar as op&ccedil;&otilde;es padr&atilde;o de simbologia utilizadas nos textos, como fonte, cor, m&aacute;scara, etc. &Eacute; poss&iacute;vel ainda testar as op&ccedil;&otilde;es antes de concluir a inclus&atilde;o da topon&iacute;mia.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.toponimia()"
		},
		"37": {
			titulo: {
				pt: "Etiquetas",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/etiqueta",
			categoria:"5",
			pt:"As etiquetas s&atilde;o textos descritivos mostrados no mapa quando o mouse &eacute; estacionado por alguns instantes sobre um elemento ou utilizando a ferramenta etiqueta presente na barra de bot&otilde;es. Cada tema pode ter uma etiqueta ativa, sendo esta baseada em um item da tabela de atributos do tema.<br>Para ver as etiquetas, ative a opera&ccedil;&atilde;o de identifica&ccedil;&atilde;o.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.etiquetas()"
		},
		"38": {
			titulo: {
				pt: "Filtro",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/filtro",
			categoria:"5",
			pt:"Filtrar um tema significa definir um crit&eacute;rio para que um determinado elemento seja mostrado. Esse crit&eacute;rio &eacute; baseado nos dados descritivos (tabela de atributos). Um filtro &eacute; uma express&atilde;o que relaciona os itens da tabela de atributos e seus valores, por exemplo, 'UF' = 'SP', onde 'UF' &eacute; o nome da coluna (item) e 'SP' &eacute; o valor. As express&otilde;es podem ser definidas por meio de um 'construtor' (guia default da ferramenta) ou digitando-se diretamente a express&atilde;o. Veja <a href='http://mapserver.org/mapfile/expressions.html#mapserver-expressions' >como</a>.<br>Cada tema pode ter apenas um filtro. O filtro apenas deixa de mostrar os dados no mapa, ou seja, os dados continuam na tabela de atributos. Antes de aplicar um filtro, pode-se test&aacute;-lo para verificar seu efeito. O construtor de express&otilde;es permite a utiliza&ccedil;&atilde;o de mais de uma coluna, para isso, deve-se adicionar novas linhas e escolher um conector, como 'e' ou 'ou'. Por exemplo, em um tema com os munic&iacute;pios pode-se mostrar apenas aqueles de determinados estados escolhendo-se 'colun' = 'valor' 'e' 'coluna' = 'valor'.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.filtro()"
		},
		"39": {
			titulo: {
				pt: "Tabela",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/tabela",
			categoria:"5",
			pt:"Cada tema possui informa&ccedil;&otilde;es descritivas associadas a cada elemento, esses dados s&atilde;o conhecidos como 'tabela de atributos'. Essa op&ccedil;&atilde;o mostra os dados existentes na tabela e permite a realiza&ccedil;&atilde;o de uma s&eacute;rie de opera&ccedil;&otilde;es diretamente sobre os registros existentes, como por exemplo, sele&ccedil;&atilde;o, zoom, relat&oacute;rios e gr&aacute;ficos.<br>Como o n&uacute;mero de registros de um tema pode ser grande, os dados s&atilde;o mostrados em p&aacute;ginas. Ao lado de cada registro existe uma caixa que permite marcar os registros. Os registros marcados s&atilde;o mostrados na guia 'Marcados'. As opera&ccedil;&otilde;es dispon&iacute;veis nessa ferramenta atuam sobre todos os elementos da tabela ou sobre os selecinados. Para selecionar os elementos marcados, utilize a op&ccedil;&atilde;o 'Ativa sele&ccedil;&atilde;o' na guia 'Marcados'.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.tabela()"
		},
		"40": {
			titulo: {
				pt: "Gr&aacute;ficos",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/graficotema",
			categoria:"5",
			pt:"Permite inserir gr&aacute;ficos em cada elemento que comp&otilde;e uma camada para representar valores associados. Para a montagem de cada gr&aacute;fico &eacute; necess&aacute;rio selecionar um tema que contenha os dados que ser&atilde;o representados. Os dados s&atilde;o aqueles que encontram-se na tabela de atributos do tema.<br>Ap&oacute;s selecionado o tema, &eacute; mostrada uma lista com os itens existentes na tabela de atributos. Escolha os itens que ser&atilde;o utilizados no gr&aacute;fico clicando no box que aparece na lista de itens. Cada item ir&aacute; compor uma fatia do gr&aacute;fico. Ao lado do item, &eacute; mostrada a cor que ser&aacute; utilizada na representa&ccedil;&atilde;o. Cada cor &eacute; definida em RGB. Na guia 'propriedades' &eacute; poss&iacute;vel definir propriedades de representa&ccedil;&atilde;o de cada gr&aacute;fico. As defini&ccedil;&otilde;es afetar&atilde;o a forma de cada gr&aacute;fico. Cada gr&aacute;fico adicionado &eacute; inclu&iacute;do no mapa como um novo tema.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.graficotema()"
		},
		"41": {
			titulo: {
				pt: "Editor de legenda",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/legenda",
			categoria:"5",
			pt:"A legenda de um tema consiste nas defini&ccedil;&otilde;es dos s&iacute;mbolos utilizados na representa&ccedil;&atilde;o de cada elemento. Al&eacute;m dos s&iacute;mbolos, uma das propriedades da legenda &eacute; o tipo de classifica&ccedil;&atilde;o utilizado na representa&ccedil;&atilde;o dos dados, por exemplo, pode-se mostrar todos os elementos com um &uacute;nico s&iacute;mbolo ou agrupar elementos e utilizar s&iacute;mbolos diferentes para cada grupo. No editor, a guia 'Classes' permite definir a classifica&ccedil;&atilde;o e na guia principal s&atilde;o mostrados os s&iacute;mbolos. Quando um s&iacute;mbolo &eacute; clicado, &eacute; ativada a guia que permite definir as caracter&iacute;sticas do s&iacute;mbolo.<br>As classes s&atilde;o definidas por meio de express&otilde;es que definem um tipo de filtro que ser&aacute; usado para definir que elementos fazem parte de cada classe. O editor possui alguns m&eacute;todos para defini&ccedil;&atilde;o autom&aacute;tica das classes, mas pode-se incluir classes livremente digitando-se o filtro. Veja <a href='http://mapserver.org/mapfile/class.html' >como</a>.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.editaLegenda()"
		},
		"42": {
			titulo: {
				pt: "Opacidade",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_tema.js",
			categoria:"5",
			pt:"Essa op&ccedil;&atilde;o modifica a opacidade de um tema permitindo ajustar a visibilidade dos elementos em rela&ccedil;&atilde;o aos outros temas. A opacidade varia de 0 a 100, sendo 100 o mais opaco.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.mudatransp(idtema)"
		},
		"43": {
			titulo: {
				pt: "Altera nome",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_tema.js",
			categoria:"5",
			pt:"Essa op&ccedil;&atilde;o permite alterar o nome do tema. O novo nome ser&aacute; mostrado no mapa e tamb&eacute;m na legenda.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.mudanome(idtema)"
		},
		"44": {
			titulo: {
				pt: "Mostrar em janela",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_navega.js",
			categoria:"5",
			pt:"Inclui um ret&acirc;ngulo na tela que segue a movimenta&ccedil;&atilde;o do mouse e mostra o tema escolhido. Possibilita destacar a visualiza&ccedil;&atilde;o de uma camada sobre as outras.",
			es: "",
			en: "",
			apijs:"i3GEO.navega.destacaTema.inicia()"
		},
		"45": {
			titulo: {
				pt: "Zoom para o tema",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_navega.js",
			categoria:"5",
			pt:"Ajusta a visualiza&ccedil;&atilde;o do mapa alterando a extens&atilde;o geogr&aacute;fica para mostrar todos os componentes de um determinado tema.<br>Essa op&ccedil;&atilde;o &eacute; mostrada como um pequeno &iacute;cone localizado logo abaixo de um tema na &aacute;rvore de temas.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.zoom(idtema)"
		},
		"46": {
			titulo: {
				pt: "Farol indicativo de escala",
				es: "",
				en: ""
			},
			diretorio:"",
			categoria:"5",
			pt:"Identifica se o tema possu&iacute; uma escala compat&iacute;vel ou n&atilde;o com a escala do mapa. O farol &eacute; um &iacute;cone com cores que variam entre verde, amarelo e vermelho, conforme a escala do mapa atual. A compatibilidade da escala &eacute; definida em fun&ccedil;&atilde;o da escala da fonte dos dados cartogr&aacute;ficos utilizada pelo tema.<br>Essa op&ccedil;&atilde;o &eacute; mostrada como um pequeno &iacute;cone localizado logo abaixo de um tema na &aacute;rvore de camadas.",
			es: "",
			en: "",
			apijs:""
		},
		"47": {
			titulo: {
				pt: "Alterar ordem de desenho",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_tema.js",
			categoria:"5",
			pt:"Os temas dispon&iacute;veis no mapa s&atilde;o desenhados como camadas que se sobrep&otilde;em para compor o mapa. Como uma pilha, as camadas seguem uma ordem de desenho, sendo que na lista de temas o primeiro que &eacute; mostrado &eacute; o &uacute;ltimo desenhado. A ordem da pilha pode ser alterada clicando-se e arrastando um tema (clicando no nome do tema) ou por meio de &iacute;cones que movem para cima ou para baixo apenas uma posi&ccedil;&atilde;o.<br>Quando um novo tema &eacute; adicionado ao mapa, o i3Geo ir&aacute; posicion&aacute;-lo procurando evitar alguns tipos de sobreposi&ccedil;&atilde;o. Temas RASTER ou poligonais s&atilde;o sempre inseridos abaixo dos temas lineares e pontuais.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.sobe(idtema) ou i3GEO.tema.desce(idtema)"
		},
		"48": {
			titulo: {
				pt: "Excluir tema",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_tema.js",
			categoria:"5",
			pt:"Exclui um tema da lista de temas dispon&iacute;veis no mapa atual. A exclus&atilde;o pode ser feita arrastando-se o tema para o &iacute;cone da 'lixeira' ou ent&atilde;o por meio de um &iacute;cone mostrado abaixo de cada tema.<br>Temas locais criados pelo usu&aacute;rio n&atilde;o podem ser recuperados ap&oacute;s uma exclus&atilde;o. J&aacute; os temas que constam na lista '+Temas' poder&atilde;o ser adicionados ao mapa novamente.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.exclui(idtema)"
		},
		"48a": {
			titulo: {
				pt: "Selecionar elementos",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/selecao.js",
			categoria:"5",
			pt:"Selecionar elementos consiste em destacar um sub-conjunto do conjunto total de componentes de um tema. Algumas opera&ccedil;&otilde;es do i3Geo atuam sobre o conjunto selecionado, como buffer, exporta&ccedil;&atilde;o, etc. Os elementos selecionados s&atilde;o mostrados em uma cor especial, diferente daquela definida na legenda do tema. Os temas que possuem elementos selecionados s&atilde;o marcados com um &iacute;cone circular mostrado junto ao nome na lista de camadas. A janela de op&ccedil;&otilde;es para sele&ccedil;&atilde;o, al&eacute;m das op&ccedil;&otilde;es de tipo de opera&ccedil;&atilde;o, permite gerar gr&aacute;ficos din&acirc;micos e criar um novo tema com base nos elementos selecionados.<br>Existem v&aacute;rias maneiras de fazer a sele&ccedil;&atilde;o: clicando-se sobre cada elemento, desenhando-se um ret&acirc;ngulo ou pol&iacute;gono no mapa, definindo-se uma express&atilde;o que ir&aacute; buscar os elementos aderentes (com base na tabela de atributos) ou cruzando-se um tema com outro. Tendo-se um conjunto j&aacute; definido, novos elementos podem ser acrescentados ou retirados da sele&ccedil;&atilde;o.",
			es: "",
			en: "",
			apijs:"i3GEO.selecao.janelaOpcoes()"
		},
		"49": {
			titulo: {
				pt: "Impress&atilde;o",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/imprimir",
			categoria:"6",
			pt:"Utilize essa op&ccedil;&atilde;o para gerar uma p&aacute;gina espec&iacute;fica para impress&atilde;o do mapa. Na janela de op&ccedil;&otilde;es deve-se escolher o tipo de p&aacute;gina desejada, que pode variar desde p&aacute;ginas padronizadas em PDF at&eacute; aplicativos onde o mapa &eacute; montado de forma interativa.",
			es: "",
			en: "",
			apijs:"i3GEO.configura.funcoesBotoes"
		},
		"50": {
			titulo: {
				pt: "C&aacute;lculo de dist&acirc;ncias",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_analise.js",
			categoria:"6",
			pt:"Ativa o modo de c&aacute;lculo de dist&acirc;ncias, permitindo que a cada clique do mouse sobre o mapa seja feito o c&aacute;lculo da dist&acirc;ncia em rela&ccedil;&atilde;o ao ponto anterior e em rela&ccedil;&atilde;o a todos os pontos clicados. O resultado &eacute; mostrado em uma janela aberta sobre o mapa. Em cada ponto &eacute; tamb&eacute;m desenhado um c&iacute;rculo representando a dist&acirc;ncia at&eacute; o &uacute;ltimo ponto.<br>O c&aacute;lculo de dist&acirc;ncia &eacute; aproximado e depende da escala do mapa (quanto mais detalhado o mapa melhor). A f&oacute;rmula de c&aacute;lculo &eacute; baseada em <a href='http://www.movable-type.co.uk/scripts/latlong.html' >http://www.movable-type.co.uk/scripts/latlong.html</a>. Para parar o c&aacute;lculo basta clicar sobre um dos pontos j&aacute; inseridos.",
			es: "",
			en: "",
			apijs:"i3GEO.configura.funcoesBotoes"
		},
		"51": {
			titulo: {
				pt: "C&aacute;lculo de &aacute;rea",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_analise.js",
			categoria:"6",
			pt:"Ativa o modo de c&aacute;lculo de &aacute;rea, permitindo que seja desenhado um pol&iacute;gono sobre o mapa para c&aacute;lculo da &aacute;rea. O pol&iacute;gono &eacute; criado clicando-se no mapa no local onde se quer criar um v&eacute;rtice.<br>O c&aacute;lculo de dist&acirc;ncia &eacute; aproximado e depende da escala do mapa (quanto mais detalhado o mapa melhor). O c&aacute;lculo &eacute; baseado no tamanho do pixel do mapa, calculado ao iniciar a ferramenta. Esse c&aacute;lculo baseia-se na proje&ccedil;&atilde;o polic&ocirc;nica com par&acirc;metros definidos em fun&ccedil;&atilde;o da extens&atilde;o geogr&aacute;fica do mapa atual.",
			es: "",
			en: "",
			apijs:"i3GEO.configura.funcoesBotoes"
		},
		"52": {
			titulo: {
				pt: "Alterar interface",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_interface.js",
			categoria:"6",
			pt:"O i3Geo pode usar diferentes interfaces para manipular a navega&ccedil;&atilde;o sobre o mapa. Por padr&atilde;o, &eacute; utilizada uma interface pr&oacute;pria, desenvolvida para o i3Geo, mas pode-se optar pelo uso do OpenLayers, Google Maps ou Google Earth.<br>As funcionalidade do i3Geo s&atilde;o afetadas pela interface escolhida, sendo que algumas opera&ccedil;&otilde;es diferem de uma para outra. A maior parte das funcionalidades s&atilde;o implementadas apenas na interface padr&atilde;o. No caso do Google Earth , que permite a visualiza&ccedil;&atilde;o do mapa em 3d, &eacute; necess&aacute;rio a instala&ccedil;&atilde;o de um plugin espec&iacute;fico.",
			es: "",
			en: "",
			apijs:"i3GEO.configura.oMenuData"
		},
		"55": {
			titulo: {
				pt: "Extens&atilde;o geogr&aacute;fica",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/mostraexten",
			categoria:"7",
			pt:"A extens&atilde;o geogr&aacute;fica &eacute; a abrang&ecirc;ncia espacial do mapa definido por meio de uma lista de coordenadas em d&eacute;cimos de grau e na ordem menor longitude, menor latitude, maior longitude, maior latitude. A extens&atilde;o geogr&aacute;fica do mapa pode ser alterada digitando-se novas coordenadas por meio dessa ferramenta.<br>O resultado final do mapa quando se altera a extens&atilde;o pode n&atilde;o corresponder as espectativas, uma vez que o mapa &eacute; um ret&acirc;ngulo cujas propor&ccedil;&otilde;es podem n&atilde;o ser compat&iacute;veis com as coordenadas digitadas.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.mostraExten"
		},
		"56": {
			titulo: {
				pt: "Deslocamento do mapa - PAN",
				es: "",
				en: ""
			},
			diretorio:"",
			categoria:"7",
			pt:"O deslocamento do mapa do tipo PAN &eacute; realizado de forma interativa, deve-se clicar em um ponto do mapa e arrastar o mouse para a nova posi&ccedil;&atilde;o. O resultado &eacute; o deslocamento da extens&atilde;o geogr&aacute;fica do mapa movendo-se o ponto inicial at&eacute; o segundo ponto.<br>Caso o primeiro ponto seja muito pr&oacute;ximo do segundo, ou se o usu&aacute;rio clicar e soltar o mouse, o ponto clicado &eacute; movido para o centro do mapa.",
			es: "",
			en: "",
			apijs:""
		},
		"57": {
			titulo: {
				pt: "Deslocamento direcional",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_navega.js",
			categoria:"7",
			pt:"O deslocamento direcional movimenta o mapa para o norte, sul, leste ou oeste uma dist&acirc;ncia fixa.<br>Essa forma de deslocamento exige que o usu&aacute;rio clique apenas uma vez em um bot&atilde;o para realizar o deslocamento.",
			es: "",
			en: "",
			apijs:"i3GEO.navega.panFixo(locaplic,sid,direcao,w,h,escala)"
		},
		"58": {
			titulo: {
				pt: "Rosa dos ventos",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_navega.js",
			categoria:"7",
			pt:"A rosa dos ventos &eacute; uma imagem mostrada na posi&ccedil;&atilde;o atual do mouse e que possibilita deslocar, aproximar ou afastar o mapa. A rosa aparece quando o mouse &eacute; estacionado por alguns instantes sobre o mapa e permite movimentar o mapa sem a necessidade de abandonar a ferramenta escolhida no momento.<br>A rosa dos ventos &eacute; opcional e por padr&atilde;o n&atilde;o fica habilitada.",
			es: "",
			en: "",
			apijs:"i3GEO.navega.mostraRosaDosVentos() e i3GEO.eventos.MOUSEPARADO"
		},
		"59": {
			titulo: {
				pt: "Aproximar",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_navega.js",
			categoria:"7",
			pt:"Aproxima o mapa tendo como refer&ecirc;ncia o ponto central. A aproxima&ccedil;&atilde;o ocorre por um fator fixo, modificando a escala atual.",
			es: "",
			en: "",
			apijs:"i3GEO.navega.zoomin()"
		},
		"60": {
			titulo: {
				pt: "Afastar",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_navega.js",
			categoria:"7",
			pt:"Afasta o mapa tendo como refer&ecirc;ncia o ponto central. O afastamento ocorre por um fator fixo, modificando a escala atual.",
			es: "",
			en: "",
			apijs:"i3GEO.navega.zoomout()"
		},
		"61": {
			titulo: {
				pt: "Aproximar regi&atilde;o",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_navega.js",
			categoria:"7",
			pt:"Ao ativar essa op&ccedil;&atilde;o deve-se desenhar um ret&acirc;ngulo sobre o mapa abrangendo a regi&atilde;o que se quer enquadrar a &aacute;rea de visualiza&ccedil;&atilde;o. O resultado &eacute; a aproxima&ccedil;&atilde;o do mapa em uma determinada regi&atilde;o.<br>Para desenhar o ret&acirc;ngulo deve-se clicar em um ponto do mapa e arrastar o mouse. A medida que isso ocorre, &eacute; desenhado um ret&acirc;ngulo sobre o mapa.",
			es: "",
			en: "",
			apijs:"i3GEO.navega.zoomBox"
		},
		"62": {
			titulo: {
				pt: "Definir escala",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_navega.js",
			categoria:"7",
			pt:"A altera&ccedil;&atilde;o da escala do mapa &eacute; uma das formas de aproximar ou afastar a visualiza&ccedil;&atilde;o. Nessa op&ccedil;&atilde;o, para alterar a escala deve-se digitar o novo valor do denominador da escala que ser&aacute; aplicado.",
			es: "",
			en: "",
			apijs:"i3GEO.navega.aplicaEscala(locaplic,sid,escala)"
		},
		"63": {
			titulo: {
				pt: "Centralizar em um ponto",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_navega.js",
			categoria:"7",
			pt:"Essa op&ccedil;&atilde;o desloca o centro do mapa atual para um determinado ponto com coordenadas conhecidas. A escala do mapa n&atilde;o &eacute; alterada.<br>Para usar essa opera&ccedil;&atilde;o, digite as coordenadas desejadas nos campos de formul&aacute;rio utilizados para mostrar a coordenada geogr&aacute;fica atual do mouse.",
			es: "",
			en: "",
			apijs:"i3GEO.navega.zoomponto(locaplic,sid,x,y)"
		},
		"64": {
			titulo: {
				pt: "Aproximar ou afastar din&acirc;mico",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_barradebotoes.js",
			categoria:"7",
			pt:"A opera&ccedil;&atilde;o de zoom din&acirc;mico permite afastar ou aproximar o mapa por meio de um controle deslizante. O usu&aacute;rio move um controle para cima ou para baixo e ao soltar o mouse o mapa &eacute; modificado.",
			es: "",
			en: "",
			apijs:"i3GEO.barraDeBotoes.ativaBarraDeZoom()"
		},
		"65": {
			titulo: {
				pt: "Zoom pr&oacute;ximo ou anterior",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_gadgets.js",
			categoria:"7",
			pt:"Ao navegar pelo mapa as posi&ccedil;&otilde;es obtidas s&atilde;o armazenadas em mem&oacute;ria. Essa op&ccedil;&atilde;o permite reestabelecer a abrang&ecirc;ncia espacial anterior ou posterior, se houver, de forma sequencial.<br>Essa opera&ccedil;&atilde;o n&atilde;o restaura a situa&ccedil;&atilde;o do mapa apenas modifica a abrang&ecirc;ncia espacial com base nos temas vis&iacute;veis no mapa atual.",
			es: "",
			en: "",
			apijs:"i3GEO.gadgets.mostraHistoricoZoom(id)"
		},
		"66": {
			titulo: {
				pt: "Mapa de refer&ecirc;ncia",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_maparef.js",
			categoria:"7",
			pt:"O mapa de refer&ecirc;ncia consiste em uma imagem com escala diferente do corpo do mapa atual, permitindo que a abrang&ecirc;ncia geogr&aacute;fica atual seja mostrada em um contexto mais amplo. A navega&ccedil;&atilde;o pode ser feito sobre o mapa de refer&ecirc;ncia, deslocando-se o ret&acirc;ngulo que mostra a abrang&ecirc;ncia atual para um outro local.<br>O mapa de refer&ecirc;ncia pode ser fixo ou n&atilde;o. O mapa de refer&ecirc;ncia din&acirc;mico pode ser montado tendo como base as camadas vistas no mapa atual. Nesse caso, a topon&iacute;mia especificada e a simbologia podem gerar mapas com pouca visibilidade.",
			es: "",
			en: "",
			apijs:"i3GEO.maparef"
		},
		"67": {
			titulo: {
				pt: "Extens&atilde;o total",
				es: "",
				en: ""
			},
			diretorio:"",
			categoria:"7",
			pt:"Ao iniciar o mapa, a primeira extens&atilde;o geogr&aacute;fica utilizada para mostrar o mapa &eacute; armazenada em mem&oacute;ria. Essa op&ccedil;&atilde;o permite aplicar essa extens&atilde;o ao mapa atual, restaurando a abrang&ecirc;ncia geogr&aacute;fica inicial.<br>A aplica&ccedil;&atilde;o da extens&atilde;o total n&atilde;o restaura a situa&ccedil;&atilde;o inicial de camadas ligadas e desligadas, mantendo a situa&ccedil;&atilde;o do mapa atual.",
			es: "",
			en: "",
			apijs:""
		},
		"68": {
			titulo: {
				pt: "Google Maps",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/googlemaps",
			categoria:"7",
			pt:"Essa op&ccedil;&atilde;o mostra em uma janela interna o mapa produzido pelo Google Maps. A janela &eacute; sincronizada com o mapa mostrado no i3Geo, permitindo que a navega&ccedil;&atilde;o em um ou noutro modifique os dois mapas.<br>Al&eacute;m das op&ccedil;&otilde;es de tipo de mapa &eacute; poss&iacute;vel tra&ccedil;ar rotas no Google Maps e mostrar nessa janela o mapa visto no i3Geo. Ao tra&ccedil;ar uma rota, o resultado &eacute; inclu&iacute;do no i3Geo como uma nova camada, que pode inclusive ser obtida via download. Quando o mapa do i3Geo &eacute; inclu&iacute;do no mapa do Google, os pol&iacute;gonos com s&iacute;mbolos n&atilde;o transparentes podem encubrir o mapa, nesse caso, altere a legenda das camadas para permitir a visualiza&ccedil;&atilde;o correta.",
			es: "",
			en: "",
			apijs:"i3GEO.configura.funcoesBotoes a chave de acesso da API do Google Maps &eacute; definida em ms_configura.php"
		},
		"69": {
			titulo: {
				pt: "Visualiza&ccedil;&atilde;o 3d",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/3d",
			categoria:"7",
			pt:"A visualiza&ccedil;&atilde;o em 3d gera um arquivo no formato 'wrl' considerando a abrang&ecirc;ncia espacial do mapa atual. Para a gera&ccedil;&atilde;o do modelo &eacute; utilizado um mapa de fundo com a representa&ccedil;&atilde;o da altimetria, esse mapa &eacute; obtido por meio de um servi&ccedil;o WMS baseado nos dados SRTM.<br>Para ver o modelo 3d &eacute; necess&aacute;rio a instala&ccedil;&atilde;o de um plugin no navegador, ou ent&atilde;o, deve-se salvar o arquivo para visualiza&ccedil;&atilde;o em algum outro software. O modelo 3d &eacute; simplificado, permitindo apenas a navega&ccedil;&atilde;o b&aacute;sica.",
			es: "",
			en: "",
			apijs:"i3GEO.configura.funcoesBotoes"
		},
		"70": {
			titulo: {
				pt: "Identificar",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/identifica",
			categoria:"8",
			pt:"Com essa ferramenta ativa pode-se clicar em um elemento do mapa e visualizar os atributos associados. Quando a janela &eacute; aberta, deve-se escolher o tema que ser&aacute; identificado em uma lista. Al&eacute;m dos temas, s&atilde;o mostrados alguns sistemas especiais que permitem a busca de dados em fun&ccedil;&atilde;o da coordenada clicada, por exemplo, &eacute; poss&iacute;vel abrir uma p&aacute;gina do IBGE com informa&ccedil;&otilde;es sobre munic&iacute;pios.<br>Alguns temas permitem a identifica&ccedil;&atilde;o sem o clique no mapa, os dados s&atilde;o mostrados quando o mouse &eacute; estacionado sobre um ponto no mapa. Em 'Buscadores web' &eacute; mostrada uma lista de sistemas que permitem a busca de dados por meio de coordenadas. A guia propriedades permite definir a toler&acirc;ncia de busca, ou seja, quantos pixels ser&atilde;o considerados entorno do ponto clicado.",
			es: "",
			en: "",
			apijs:"i3GEO.configura.funcoesBotoes"
		},
		"71": {
			titulo: {
				pt: "Busca r&aacute;pida",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/buscarapida",
			categoria:"8",
			pt:"Essa op&ccedil;&atilde;o permite localizar dados com base em palavras ou frases, por exemplo 'S&atilde;o Paulo'. A busca &eacute; feita nos temas do mapa ou em um Web Service cujo banco de dados pode variar em cada instala&ccedil;&atilde;o do i3Geo. Quando um lugar &eacute; encontrado, uma nova janela &eacute; mostrada na tela com o resultado. Clicando-se nos links dispon&iacute;veis, o mapa &eacute; deslocado para o lugar definido e uma nova camada &eacute; adicionada ao mapa.<br>A busca &eacute; feita tamb&eacute;m no Web Service do Google, permitindo a localiza&ccedil;&atilde;o de endere&ccedil;os. Utilize as propriedades para definir se a busca ser&aacute; feita ou n&atilde;o nos temas existentes no mapa. Apenas os temas que tiverem sido preparados pelo administrador do i3Geo pode ser pesquisado.",
			es: "",
			en: "",
			apijs:"i3GEO.gadgets.mostraBuscaRapida(id)"
		},
		"72": {
			titulo: {
				pt: "Localizar IP",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_navega.js",
			categoria:"8",
			pt:"Ao clicar nesse &iacute;cone &eacute; mostrado um ponto no mapa identificando a coordenada geogr&aacute;fica da localiza&ccedil;&atilde;o do usu&aacute;rio.<br>Essa fun&ccedil;&atilde;o &eacute; baseada em uma tabela de correspond&ecirc;ncia entre o n&uacute;mero IP e localidades. A localiza&ccedil;&atilde;o ser&aacute; mais precisa quanto for essa tabela de correspond&ecirc;ncia.",
			es: "",
			en: "",
			apijs:"i3GEO.navega.zoomIP()"
		},
		"73": {
			titulo: {
				pt: "Wikipedia",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/wiki",
			categoria:"8",
			pt:"A <a href='http://pt.wikipedia.org/wiki/P%C3%A1gina_principal' target='_blank' >Wikipedia</a> &eacute; uma base de conhecimento livre. Alguns dos artigos existentes s&atilde;o georreferenciados, permitindo sua busca por regi&atilde;o geogr&aacute;fica. Essa ferramenta abre uma janela sobre o mapa procurando resultados na Wikipedia para a regi&atilde;o de abrang&ecirc;ncia do mapa.<br>Para maior performance, o mapa deve estar na escala 1:500.000 ou maior. Ao navegar no mapa, a lista de lugares &eacute; atualizada.",
			es: "",
			en: "",
			apijs:"i3GEO.configura"
		},
		"74": {
			titulo: {
				pt: "Localizar fotos",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/buscafotos",
			categoria:"8",
			pt:"Existem v&aacute;rios servi&ccedil;os na Internet que permitem cadastrar e visualizar fotos georreferenciadas. Essa ferramenta procura fotos para a regi&atilde;o de abrang&ecirc;ncia do mapa nos servi&ccedil;os Panor&acirc;mio, Flicker e Locr.<br>Para maior performance, o mapa deve estar na escala 1:150.000 ou maior.Ao passar o mouse sobre a foto, a sua localiza&ccedil;&atilde;o &eacute; mostrada no mapa.",
			es: "",
			en: "",
			apijs:"i3GEO.configura"
		},
		"75": {
			titulo: {
				pt: "Conflu&ecirc;ncias",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/confluence",
			categoria:"8",
			pt:"O projeto 'Confluences' registra expedi&ccedil;&otilde;es aos lugares na terra cuja coordenada geogr&aacute;fica corresponde ao cruzamento de 1 grau por 1 grau. Essa ferramenta permite localizar as conflu&ecirc;ncias no mapa que est&aacute; sendo visto e abrir a p&aacute;gina correspondente.<br>O mapa deve estar pelo menos na escala 1:2.000.000 para que as conflu&ecirc;ncias sejam mostradas.",
			es: "",
			en: "",
			apijs:"i3GEO.navega.dialogo.confluence"
		},
		"76": {
			titulo: {
				pt: "Conex&atilde;o WMS-T",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/wmstime",
			categoria:"4",
			pt:"Uma conex&atilde;o WMS-T permite que dados dispon&iacute;veis em outros servidores sejam inclu&iacute;dos como camadas no i3Geo. Na ferramenta de conex&atilde;o &eacute; mostrada uma lista de endere&ccedil;os previamente cadastrados, mas pode-se digitar um outro endere&ccedil;o qualquer, desde que seja um servi&ccedil;o no padr&atilde;o WMS-T. Ap&oacute;s ser escolhido o servi&ccedil;o, deve-se definir o per&iacute;odo das imagens e o intervalo desejado (di&aacute;rio, mensal ou anual).<br>Ap&oacute;s definido o per&iacute;odo, a ferramenta far&aacute; a busca das imagens para sua apresenta&ccedil;&atilde;o em sequ&ecirc;ncia. Ao parar a anima&ccedil;&atilde;o, a imagem mostrada poder&aacute; ser acrescentada ao mapa como uma nova camada. A visualiza&ccedil;&atilde;o das imagens s&oacute; &eacute; poss&iacute;vel ap&oacute;s a carga de todas as datas selecionadas. Caso seja necess&aacute;rio cancelar a carga de uma ou mais datas, deve-se clicar em 'parar' na lista de imagens que est&atilde;o sendo carregadas.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas"
		},
		"78": {
			titulo: {
				pt: "Zoom para a sele&ccedil;&atilde;o",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_tema.js",
			categoria:"5",
			pt:"Ajusta a extens&atilde;o geogr&aacute;fica do mapa tendo como base os elementos selecionados de um tema.<br>Essa op&ccedil;&atilde;o &eacute; mostrada como um pequeno &iacute;cone, localizado ao lado do nome do tema, quando este possuir sele&ccedil;&atilde;o.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.zoomsel(idtema)"
		},
		"79": {
			titulo: {
				pt: "Exporta SLD",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_tema.js",
			categoria:"5",
			pt:"Exporta a legenda atual do tema para o formato SLD. O XML &eacute; mostrado na tela.<br>O formato SLD &eacute; utilizado em clientes WMS. Essa fun&ccedil;&atilde;o objetiva auxiliar a constru&ccedil;&atilde;o de web Services OGC.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.sld(idtema) Esta op&ccedil;&atilde;o n&atilde;o possu&iacute; um diret&oacute;rio em i3geo/ferramentas. O XML &eacute; gerado diretamente na tela pelo programa classesphp/mapa_controle.php"
		},
		"80": {
			titulo: {
				pt: "Inserir gr&aacute;fico interativamente",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/inseregrafico",
			categoria:"5",
			pt:"Insere gr&aacute;ficos em um elemento de um tema de forma interativa.<br>Para inserir gr&aacute;ficos no mapa, &eacute; necess&aacute;rio escolher os atributos do tema que ser&atilde;o considerados para a gera&ccedil;&atilde;o do gr&aacute;fico. Feito isso, clique sobre um elemento do tema utilizado e o gr&aacute;fico ser&aacute; inserido no mapa na forma de um novo tema.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.cliqueGrafico()"
		},
		"81": {
			titulo: {
				pt: "Converter tema em KML",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/convertekml",
			categoria:"5",
			pt:"Convertendo um tema em KML &eacute; poss&iacute;vel utilizar outros softwares para visualizar os dados. O i3Geo permite isso de duas maneiras, a primeira utiliza um WMS embutido dentro de um KML, ou seja, os dados s&atilde;o vistos como uma imagem raster georreferenciada, sendo que as coordenadas e atributos n&atilde;o s&atilde;o acess&iacute;veis diretamente.Dessa forma, grandes volumes de dados podem ser utilizados, pois n&atilde;o ocorre o download dos arquivos.<p>A segunda maneira converte os dados de um tema em arquivos KML compactados contendo as coordenadas e atributos dos elementos que comp&otilde;em o tema.<br>KML &eacute; um padr&atilde;o internacional e n&atilde;o &eacute; espec&iacute;fico do i3Geo. Conforme as caracter&iacute;sticas de cada servidor onde o i3Geo estiver instalado, o KML poder&aacute; permanecer dispon&iacute;vel por per&iacute;odos de tempo vari&aacute;veis. Para usar o KML no Google Earth, utilize a op&ccedil;&atilde;o desse software chamada 'adicionar link de rede'",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.convertekml()"
		},
		"82": {
			titulo: {
				pt: "Download",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/download",
			categoria:"2",
			pt:"Permite o download de um tema escolhido. No caso de dados vetoriais derivados de outros temas ou camadas com elementos selecionados, os dados s&atilde;o sempre fornecidos no formato 'shapefile'. Nos outros casos, o arquivo fornecido depender&aacute; da configura&ccedil;&atilde;o de cada camada, mas, por padr&atilde;o, os dados s&atilde;o fornecidos em 'shapefile'",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.download()"
		},
		"83": {
			titulo: {
				pt: "Inserir texto interativamente",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/inseretxt",
			categoria:"5",
			pt:"Insere textos em local do mapa de forma interativa.<br>Voc&ecirc; pode inserir um texto espec&iacute;fico no mapa simplesmente digitando o texto na janela da ferramenta e clicando no local desejado no mapa, ou ainda utilizar os atributos de uma camada para capturar o texto da regi&atilde;o clicada.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.cliqueTexto()"
		},
		"84": {
			titulo: {
				pt: "Gr&aacute;fico interativo",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/graficointerativo1",
			categoria:"3",
			pt:"Gerador de representa&ccedil;&atilde;o gr&aacute;fica de dados tabulares. Abre uma janela flutuante onde o usu&aacute;rio pode escolher os dados e o tipo de gr&aacute;fico desejado. Os dados s&atilde;o baseados em um dos temas existentes no mapa.<br>Existem v&aacute;rias op&ccedil;&otilde;es de tratamento dos dados que permitem, por exemplo, mostrar os percentuais ou os dados brutos. Pode-se ainda ativar a navega&ccedil;&atilde;o din&acirc;mica, o que permite atualizar o gr&aacute;fico conforme &eacute; feita a navega&ccedil;&atilde;o sobre o mapa.",
			es: "",
			en: "",
			apijs:"i3GEO.analise.dialogo.graficoInterativo1()"
		},
		"85": {
			titulo: {
				pt: "Miniaturas",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/carouseltemas",
			categoria:"6",
			pt:"Abre uma janela flutuante que mostra imagens miniatura de cada tema existente na &aacute;rvore de temas. O usu&aacute;rio pode clicar em uma das imagens para adicionar o tema ao mapa atual.<br>As miniaturas devem existir previamente para aparecerem nessa ferramenta. Para gerar as miniaturas, o administrador do i3Geo pode usar o sistema de administra&ccedil;&atilde;o.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas.dialogo.carouselTemas()"
		},
		"86": {
			titulo: {
				pt: "Editor SQL",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/editorsql",
			categoria:"5",
			pt:"Permite modificar o SQL utilizado para compor os dados referentes ao tema. Apenas temas baseados em bancos de dados podem utilizar essa fun&ccedil;&atilde;o, sendo que o administrador do i3Geo pode bloque&aacute;-la utilizando do sistema de administra&ccedil;&atilde;o. As fun&ccedil;&otilde;es SQL de modifica&ccedil;&atilde;o de dados n&atilde;o s&atilde;o suportadas (UPDATE, INSERT, DELETE, etc.)<br>O Mapserver utiliza uma express&atilde;o na linguagem SQL para definir os dados que ir&atilde;o compor um tema. A edi&ccedil;&atilde;o do SQL possibilita o uso de express&otilde;es customizadas, baseadas na sintaxe SQL que o banco de dados utilizado suportar. A janela de di&aacute;logo permite ainda listar as colunas dispon&iacute;veis bem como os dados de cada coluna, facilitando a defini&ccedil;&atilde;o do novo SQL.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.editorsql()"
		},
		"87": {
			titulo: {
				pt: "Rede Metar",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/metar",
			categoria:"8",
			pt:"A rede <a href='http://weather.noaa.gov/' target='_blank' >metar</a> reune dados de esta&ccedil;&otilde;es meteorol&oacute;gicas espalhadas por toto o mundo. Essa ferramenta mostra as esta&ccedil;&otilde;es existentes na extens&atilde;o geogr&aacute;fica do mapa.<br>Os dados da rede Metar s&atilde;o acessados indiretamente por meio dos Web Services do site Geonames.",
			es: "",
			en: "",
			apijs:"i3GEO.navega.dialogo.metar"
		},
		"88": {
			titulo: {
				pt: "Linha do tempo",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/linhadotempo",
			categoria:"3",
			pt:"Constr&oacute;i um gr&aacute;fico do tipo 'linha do tempo' tendo como fonte dos dados a tabela de atributos de um tema. Veja: <a href='http://www.simile-widgets.org/timeline/' target=_blank >Simline</a><br>Ao navegar pelo mapa, o gr&aacute;fico &eacute; atualizado sendo utilizado apenas os dados existentes na extens&atilde;o do mapa. Ao passar o mouse sobre um dos nomes mostrados no gr&aacute;fico, &eacute; indicado a posi&ccedil;&atilde;o no mapa. Ao ser clicado um &iacute;cone no gr&aacute;fico, abre-se um bal&atilde;o com informa&ccedil;&otilde;es adicionais, podendo incluir links e imagens. O gr&aacute;fico s&oacute; &eacute; mostrado para os temas que estiverem configurados pelo administrador do i3Geo.",
			es: "",
			en: "",
			apijs:"i3GEO.configura"
		},
		"89": {
			titulo: {
				pt: "Tipo de imagem",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/outputformat",
			categoria:"1",
			pt:"Modifica o tipo de imagem utilizada na gera&ccedil;&atilde;o do mapa.<br>Modifica o par&acirc;metro OUTPUTFORMAT do mapa em uso permitindo-se escolher entre PNG e JPEG com tecnologia de gera&ccedil;&atilde;o AGG ou GD.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.outputformat()"
		},
		"90": {
			titulo: {
				pt: "Cortina",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/cortina",
			categoria:"5",
			pt:"Permite mostrar e esconder uma camada existente no mapa em um movimento cont&iacute;nuo. O efeito 'cortina' permite comparar um tema com outro.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.cortina()"
		},
		"91": {
			titulo: {
				pt: "Aplicar SLD",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_tema.js",
			categoria:"5",
			pt:"Aplica um arquivo XML, no formato SLD, ao tema ativo.<br>SLD &eacute; um formato padr&atilde;o que permite definir filtros e simbologia. V&aacute;rios softwraes permitem criar arquivos nesse padr&atilde;o.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.aplicarsld()"
		},
		"92": {
			titulo: {
				pt: "Salvar o mapfile",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/salvamapfile",
			categoria:"5",
			pt:"Salva as defini&ccedil;&otilde;es da camada no arquivo mapfile de origem.<br>Essa op&ccedil;&atilde;o s&oacute; &eacute; ativada para usu&aacute;rios que s&atilde;o administradores. Permite que a camada seja alterada, por exemplo, modificando-se a legenda, e que o resultado seja salvo nas defini&ccedil;&otilde;es originais da camada.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.salvaMapfile()"
		},
		"93": {
			titulo: {
				pt: "Coment&aacute;rios",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/comentarios",
			categoria:"5",
			pt:"Mostra os coment&aacute;rios existentes sobre o tema e permite ao usu&aacute;rio inserir novos.<br>Para entar com um coment&aacute;rio, o usu&aacute;rio precisa ser autenticado em alguma das redes sociais compat&iacute;veis com a rotina de login dispon&iacute;vel no i3Geo",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.comentario()"
		},
		"94": {
			titulo: {
				pt: "Centro m&eacute;dio",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/centromassa",
			categoria:"3",
			pt:"O centro m&eacute;dio &eacute; uma medida da distribui&ccedil;&atilde;o de um conjunto de pontos. Sendo definido por Gerardi & Silva (1980) como: o ponto que minimiza a soma das dist&acirc;ncias quadr&aacute;ticas a todos os outros pontos do plano.<br>Mais detalhes em http://www.criminologia-rsm.org/LinkClick.aspx?fileticket=XT%2BDy%2BNyrZM%3D&tabid=484&mid=1614",
			es: "",
			en: "",
			apijs:"i3GEO.analise.dialogo.centromassa()"
		},
		"95": {
			titulo: {
				pt: "Temas mais populares",
				es: "",
				en: ""
			},
			diretorio:"",
			categoria:"4",
			pt:"Cada vez que um usu&aacute;rio adiciona uma camada ao mapa, por meio do cat&aacute;logo de temas, &eacute; feito um registro no banco de dados de administra&ccedil;&atilde;o. Esse registro &eacute; cumulativo e permite classificar os temas conforme sua popularidade.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas"
		},
		"96": {
			titulo: {
				pt: "Gr&aacute;fico de perfil",
				es: "",
				en: ""
			},
			diretorio:"",
			categoria:"3",
			pt:"Cria um gr&aacute;fico de perfil com base em um conjunto de dados contendo os valores de Z.<br>Os valores de Z podem ser obtidos de um tema ou de um servi&ccedil;o do tipo Google API",
			es: "",
			en: "",
			apijs:"i3GEO.analise"
		},
		"97": {
			titulo: {
				pt: "Filtro de camadas",
				es: "",
				en: ""
			},
			diretorio:"",
			categoria:"7",
			pt:"Filtra as camadas que s&atilde;o mostradas na &aacute;rvore de camadas conforme as caracter&iacute;sticas de cada uma.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeCamadas.dialogo.filtro"
		},
		"98": {
			titulo: {
				pt: "Importar WMC",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/importarwmc",
			categoria:"4",
			pt:"Adiciona ao mapa camadas definidas em um arquivo XML no padr&atilde;o WMC 'Web Map Context'. O WMC permite que mapas sejam transferidos entre aplica&ccedil;&otilde;es.<br>O arquivo XML pode estar em um servidor ou pode ser feito o upload para o servidor do i3Geo",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas.dialogo.importarwmc()"
		},
		"99": {
			titulo: {
				pt: "Tela remota",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/telaremota",
			categoria:"7",
			pt:"Cria um link que permite abrir o mapa atual em outro computador ou navegador. O mapa clonado &eacute; atualizado conforme o original for sendo modificado.<br>Essa funcionalidade permite que um mapa seja mostrado em uma tela remota com uma interface diferente da original. &Uacute;til para proje&ccedil;&atilde;o em tel&otilde;es e salas de situa&ccedil;&atilde;o.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.telaRemota()"
		},
		"100": {
			titulo: {
				pt: "Upload KML",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/uploadkml",
			categoria:"4",
			pt:"Permite que o usu&aacute;rio fa&ccedil;a o upload de um arquivo KML ou KMZ para o servidor para que seja acrescentado como uma camada ao mapa.<br>O arquivo &eacute; armazenado no servidor temporariamente. &Eacute; necess&aacute;rio que o usu&aacute;rio saiba qual o tipo de elementos existentes no arquivo KML e qual o nome do folder que ser&aacute; utilizado.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas.dialogo.uploadkml()"
		},
		"101": {
			titulo: {
				pt: "Temporizador",
				es: "",
				en: ""
			},
			diretorio:"",
			categoria:"5",
			pt:"Aplica um temporizador que atualiza uma determinada camada ap&oacute;s um intervalo de tempo e de forma cont&iacute;nua. Para finalizar o temporizador, digite o ou vazio e aplique novamente.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.temporizador()"
		},
		"102": {
			titulo: {
				pt: "Opacidade interativa",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/opacidademapa",
			categoria:"7",
			pt:"Altera a opacidade do mapa de forma interativa. Aplica-se aos temas que n&atilde;o est&atilde;o definidos como 'fundo'. A altera&ccedil;&atilde;o &eacute; feita diretamente no objeto HTML, sendo que o efeito &eacute; imediato.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.opacidade()"
		},
		"103": {
			titulo: {
				pt: "Upload de GPX",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/uploadgpx",
			categoria:"4",
			pt:"Permite que um arquivo do tipo GPX, normalmente gerado por programas que utilizam GPS, seja enviado ao servidor e inclu&iacute;do no mapa como uma nova camada. O arquivo GPX ser&aacute; armazenado no servidor onde o i3geo est&aacute; instalado e permanecer&aacute; l&aacute; at&eacute; que os arquivos tempor&aacute;rios sejam apagados.<br>N&atilde;o utilize essa op&ccedil;&atilde;o se existir alguma restri&ccedil;&atilde;o ao uso do arquivo e se a pol&iacute;tica de acesso aos dados, definidas pela entidade que hospeda o i3geo, n&atilde;o for compat&iacute;velcom essas restri&ccedil;&otilde;es.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas.dialogo.uploadgpx()"
		},
		"104": {
			titulo: {
				pt: "Upload de KML",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/uploadkml",
			categoria:"4",
			pt:"Permite que um arquivo do tipo KML, seja enviado ao servidor e inclu&iacute;do no mapa como uma nova camada. O arquivo GPX ser&aacute; armazenado no servidor onde o i3geo est&aacute; instalado e permanecer&aacute; l&aacute; at&eacute; que os arquivos tempor&aacute;rios sejam apagados.<br>N&atilde;o utilize essa op&ccedil;&atilde;o se existir alguma restri&ccedil;&atilde;o ao uso do arquivo e se a pol&iacute;tica de acesso aos dados, definidas pela entidade que hospeda o i3geo, n&atilde;o for compat&iacute;velcom essas restri&ccedil;&otilde;es.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas.dialogo.uploadkml()"
		},
		"105": {
			titulo: {
				pt: "Conex&atilde;o KML",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/carregakml",
			categoria:"4",
			pt:"Cria um novo layer com base no endere&ccedil;o (url) de um arquivo KML. O layer &eacute; baseado em uma conex&atilde;o OGR.<br>S&atilde;o criadas 3 novas camadas no mapa, uma para pontos, uma para linhas e outra para os pol&iacute;gonos. N&atilde;o necessariamente existir&atilde;o elementos nas tr&ecirc;s camadas.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas.carregakml()"
		},
		"106": {
			titulo: {
				pt: "Conex&atilde;o GeoJson",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/conectargeojson",
			categoria:"4",
			pt:"Cria um novo layer com base no endere&ccedil;o (url) de um arquivo no formato GeoJson. O layer &eacute; baseado em uma conex&atilde;o OGR.<br>S&atilde;o criadas 3 novas camadas no mapa, uma para pontos, uma para linhas e outra para os pol&iacute;gonos. N&atilde;o necessariamente existir&atilde;o elementos nas tr&ecirc;s camadas.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas.conectargeojson()"
		},
		"107": {
			titulo: {
				pt: "Anima&ccedil;&atilde;o",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/animacao",
			categoria:"1",
			pt:"Mostra camadas em uma sequ&ecirc;ncia definida pelo usu&aacute;rio e em um determinado intervalo de tempo. As camadas s&atilde;o automaticamente desligadas e ligadas, formando uma sequ&ecirc;ncia que proporciona um efeito de anima&ccedil;&atilde;o",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.animacao()"
		},
		"108": {
			titulo: {
				pt: "Mapa tem&aacute;tico 3d",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/tme",
			categoria:"5",
			pt:"Cria um arquivo no formato KML, representando os dados de uma coluna da tabela de atributos como elementos em 3d. Mais detalhes em http://thematicmapping.org/<br>Os par&acirc;metros utilizaados nessa ferramenta podem ser armazenados (por usu&aacute;rios cadastrados) no mapfile correspondente ao tema. Quando isso &eacute; feito, a ferramenta &eacute; aberta com esses par&acirc;metros pr&eacute;-definidos. As op&ccedil;&otilde;es que possibilitam isso s&atilde;o mostradas apenas quando o usu&aacute;rio estiver logado.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.tme()"
		},
		"109": {
			titulo: {
				pt: "Busca de metadados na INDE",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/buscainde",
			categoria:"8",
			pt:"Busca metadados no banco de dados da Infraestrutura Nacional de Dados Espaciais (INDE) do Brasil.<br>A busca ainda &eacute; experimental, permitindo apenas a localiza&ccedil;&atilde;o dos registros, sem que o tema possa ser adicionado diretamente ao mapa.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeTemas.dialogo.buscainde()"
		},
		"110": {
			titulo: {
				pt: "Remove camadas em lote",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/excluirarvore",
			categoria:"6",
			pt:"Lista as camadas que est&atilde;o no mapa para que o usu&aacute;rio escolha quais deseja remover. As camadas utilizadas no in&iacute;cio do mapa aparecem desmarcadas na lista.",
			es: "",
			en: "",
			apijs:"i3GEO.arvoreDeCamadas.dialogo.excluir()"
		},
		"111": {
			titulo: {
				pt: "Localiza regi&otilde;es cadastradas",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/metaestat",
			categoria:"6",
			pt:"Lista as regi&otilde;es cadastradas no sistema de metadados estat&iacute;sticos conforme a hierarquia definida. Conforme uma regi&atilde;o &eacute; escolhida, o mapa tem a extens&atilde;o geogr&aacute;fica alterada, destacando a escolha. Essa mesma ferramenta &eacute; usada para aplicar filtros. Os filtros funcionam apenas nas camadas que forem oriundas da aplica&ccedil;&atilde;o de gera&ccedil;&atilde;o de cartogramas estat&iacute;sticos.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.locregiao()"
		},
		"112": {
			titulo: {
				pt: "&Aacute;rvore de endere&ccedil;os WMS Metaestat",
				es: "",
				en: ""
			},
			diretorio:"classe_arvoredetemas.js",
			categoria:"4",
			pt:"Mostra os WMS cuja origem &eacute; o sistema de metadados estat&iacute;sticos. Esse sistema apresenta cartogramas gerados de forma din&acirc;mica no padr&atilde;o WMS-Time.",
			es: "",
			en: "",
			apijs: "i3GEO.arvoreDeTemas.listaWMSmetaestat(node)"
		},
		"113": {
			titulo: {
				pt: "Marcador",
				es: "",
				en: ""
			},
			diretorio:"classe_marcador.js",
			categoria:"7",
			pt:"Os marcadores permitem armazenar a regi&atilde;o de abrang&ecirc;ncia do mapa que est&aacute; sendo visto para que seja poss&iacute;vel voltar a essa regi&atilde;o. Para cinar as op&ccedil;&otilde;es de marca&ccedil;&atilde;o utilize a op&ccedil;&atilde;o Marcadores existente no menu suspenso. O menu permite remover marcadores, exportar, importar e converter em shapefile. Os marcadores s&atilde;o mantidos como cookies no navegador, por isso, ao limpar o seu hist&oacute;rico os registros podem ser perdidos. Para evitar isso, exporte seus marcadores como texto e depois importe-os novamente.",
			es: "",
			en: "",
			apijs: "i3GEO.marcador.prompt()"
		},
		"114": {
			titulo: {
				pt: "Visualizador INDE",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/vinde",
			categoria:"7",
			pt:"Essa ferramenta apresenta os servi&ccedil;os WMS cadastrados no servidor da Infraestrutura Nacional de Dados Espaciais do Brasil. O usu&aacute;rio pode escolher diferentes camadas para visualiza&ccedil;&atilde;o e consulta.",
			es: "",
			en: "",
			apijs: "i3GEO.arvoreDeTemas.dialogo.vinde()"
		},
		"115": {
			titulo: {
				pt: "Prefer&ecirc;ncias",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/preferencias",
			categoria:"1",
			pt:"Guarda as prefer&ecirc;ncias do usu&aacute;rio em rela&ccedil;&atilde;o aos par&acirc;metros que controlam a interface do mapa.<br>O usu&aacute;rio pode definir as prefer&ecirc;ncias para a interface do mapa, por exemplo, as configura&ccedil;&otilde;es iniciais de menu e ferramentas, temas que iniciam abertos, extens&atilde;o inicial do mapa etc. As informa&ccedil;&otilde;es de prefer&ecirc;ncias ficam armazenadas como cookies do navegador e podem ser restauradas para as configura&ccedil;&otilde;es iniciais por meio da bot&atilde;o ''Limpar'' ou pela limpeza dos cookies diretamente pelo navegador. Para que as escolhas afetem de forma permanente o mapa, &eacute; necess&aacute;rio incluir o c&oacute;digo javascript diretamente no HTML da interface do mapa. A op&ccedil;&atilde;o 'c&oacute;digo' ir&aacute; mostrar esse c&oacute;digo",
			es: "",
			en: "",
			apijs: "i3GEO.mapa.dialogo.preferencias()"
		},
		"116": {
			titulo: {
				pt: "Upload de s&iacute;mbolo",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/uploadsimbolo",
			categoria:"4",
			pt:"Envia para o servidor um arquivo de imagem que poder&aacute; ser utilizado como s&iacute;mbolo nas legendas das camadas",
			es: "",
			en: "",
			apijs:""
		},
		"117": {
			titulo: {
				pt: "SAIKU",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/saiku",
			categoria:"5",
			pt:"Abre o sistema Saiku que permite o cruzamento de vari&aacute;veis estat&iacute;sticas. O Saiku utiliza o sistema de metadados estat&iacute;sticos para gerar cubos tridimensionais que permitem ao cruzamento de dados tabulares, gera&ccedil;&atilde;o de gr&aacute;ficos e relat&oacute;rios. O usu&aacute;rio deve adicionar ao mapa pelo menos uma camada com localidades originadas do sistema de metadados. Os elementos dessa camada que estiverem selecionados ser&atilde;o utilizados como filtro no Saiku.<br>As vari&aacute;veis cruzadas no Saiku podem gerar artefatos como tabelas, gr&aacute;ficos, relat&oacute;rios e mapas que podem ser visualizados no i3Geo utilizando o bot&atilde;o 'Atualiza o mapa' presente na ferramenta de integra&ccedil;&atilde;o entre os sistemas.",
			es: "",
			en: "",
			apijs:""
		},
		"118": {
			titulo: {
				pt: "Geolocation",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/geolocal",
			categoria:"6",
			pt:"Captura as coordenadas da posi&ccedil;&atilde;o atual do usu&aacute;rio. As coordenadas s&atilde;o capturadas individualmente ou por um intervalo de tempo. Os dados s&atilde;o mostrados em uma lista e no mapa.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.geolocal()"
		},
		"119": {
			titulo: {
				pt: "Cria uma c&oacute;pia",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_camadas.js",
			categoria:"5",
			pt:"Cria uma c&oacute;pia de uma camada existente no mapa e adiciona com novo nome.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.copia(idtema)"
		},
		"120": {
			titulo: {
				pt: "V&iacute;ncula dados entre tabelas",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/tabela/index.js",
			categoria:"5",
			pt:"Op&ccedil;&atilde;o utilizada na ferramenta tabela que pemrite vincular a listagem de registros entre tabelas que estejam em diferentes janelas flutuantes. Ao abrir duas tabelas de atributos, a janela de v&iacute;nculos permite definir quais as tabelas ser&atilde;o vinculadas e quais as colunas de liga&ccedil;&atilde;o. Ao marcar um registro em uma tabela, os registros semelhantes s&atilde;o marcados nas tabelas vinculadas.",
			es: "",
			en: "",
			apijs:""
		},
		"121": {
			titulo: {
				pt: "Mapa de calor",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/heatmap/index.js",
			categoria:"3",
			pt:"Obt&eacute;m os dados de um tema pontual, linear ou poligonal e calcula para toda a &aacute;rea vis&iacute;vel os prov&aacute;veis valores. O resultado &eacute; uma representa&ccedil;&atilde;o cont&iacute;nua dos valores em classes de cores. O c&aacute;lculo da camada &eacute; feito diretamente no navegador utilizando-se um programa em javascript.<br>A ferramenta adiciona um novo tema ao mapa contendo o mapa de calor e utiliza como refer&ecirc;ncia para a cria&ccedil;&atilde;o da legenda as classes da camada original. No caso de camadas lineares ou poligonais, ser&aacute; considerado o centroide de cada elemento.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.heatmap()"
		},
		"122": {
			titulo: {
				pt: "MarkerCluster",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/markercluster/index.js",
			categoria:"3",
			pt:"Cria uma camada vetorial com pontos que s&atilde;o agrupados conforme a proximidade. Os pontos agrupados s&atilde;o representados com um s&iacute;mbolo especial e &eacute; mostrado um texto indicando o total de pontos.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.markercluster()"
		},
		"123": {
			titulo: {
				pt: "Congela a vis&atilde;o atual",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/congelamapa/openlayers.php",
			categoria:"6",
			pt:"Abre uma nova janela com a visualiza&ccedil;&atilde;o atual do mapa, mantendo o n&iacute;vel de zoom e as camadas ativas.<br>O mapa &eacute; mostrado na forma de uma imagem, ou seja, mant&eacute;m os elementos do mapa est&aacute;ticos mesmo que se desative as camadas ou altere a regi&atilde;o de visualiza&ccedil;&atilde;o do mapa original. Esta ferramenta &eacute; &uacute;til quando se deseja manter uma determinada regi&atilde;o do mapa sempre vis&iacute;vel enquanto se navega pelas demais regi&otilde;es do mesmo.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.congelaMapa();"
		},
		"124": {
			titulo: {
				pt: "Cartogramas estat&iacute;sticos",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/metaestat/index.js",
			categoria:"9",
			pt:"A ferramenta Cartogramas Estat&iacute;sticos &eacute; utilizada como uma integra&ccedil;&atilde;o entre o mapa interativo e o sistema de metadados estat&iacute;sticos. Al&eacute;m de funcionar como um cat&aacute;logo de camadas oriundas do sistema de metadados estat&iacute;sticos, ela permite a cria&ccedil;&atilde;o, edi&ccedil;&atilde;o e an&aacute;lise de vari&aacute;veis sem a necessidade de acesso ao sistema de administra&ccedil;&atilde;o.<br>Voc&ecirc; pode construir um cartograma a partir da adi&ccedil;&atilde;o das vari&aacute;veis, medidas de vari&aacute;veis e par&acirc;metros constantes no sistema de metadados estat&iacute;sticos. Basta selecionar os componentes da camada e clicar em ''Adicionar camada ao mapa'.<p>O bot&atilde;o ''Edi&ccedil;&atilde;o'' abre o m&oacute;dulo ''Ajudante do editor'', que pode redirecionar o usu&aacute;rio para o ''Editor avan&ccedil;ado'' de vari&aacute;veis, diretamente no sistema de administra&ccedil;&atilde;o, para o ''Editor de limites'', onde o usu&aacute;rio pode editar os limites das camadas pertencentes ao cadastro de regi&otilde;es geogr&aacute;ficas, ou ainda acessar o gerenciador de banco de dados para a inclus&atilde;o de novos dados. Ainda por meio do ''Ajudante do editor'', o usu&aacute;rio pode editar vari&aacute;veis, medidas de vari&aacute;veis ou classifica&ccedil;&otilde;es, ou ainda criar novos elementos para a composi&ccedil;&atilde;o de uma camada no sistema de metadados estat&iacute;sticos.<p>O bot&atilde;o ''An&aacute;lise'' abre uma s&eacute;rie de ferramentas que podem ser utilizadas para uma configura&ccedil;&atilde;o e um exame mais aprofundado dos dados constantes nas vari&aacute;veis.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.metaestat();"
		},
		"125": {
			titulo: {
				pt: "Aplicativos estat&iacute;sticos cadastrados",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/metaestat/listamapas.js",
			categoria:"9",
			pt:"Lista os mapas cadastrados pelo publicador de mapas do sistema de metadados estat&iacute;sticos, apresentando as diferentes op&ccedil;&otilde;es de interface para abri-los.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.metaestatListaMapas();"
		},
		"126": {
			titulo: {
				pt: "Layer KML (plugin)",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_plugin.js",
			categoria:"4",
			pt:"Plugin que permite configurar um mapfile contendo um layer cujos dados ser&atilde;o inseridos no mapa como uma camada em KML. O KML deve ser fornecido como uma url, podendo estar em qualquer servidor, local ou externo.",
			es: "",
			en: "",
			apijs:""
		},
		"127": {
			titulo: {
				pt: "Layer parametrizado (plugin)",
				es: "",
				en: ""
			},
			diretorio:"i3geo/classesjs/classe_plugin.js",
			categoria:"4",
			pt:"Esse plugin permite que o item DATA, que define a fonte dos dados, seja parametrizado, utilizando-se palavras chave de substitui&ccedil;&atilde;o. Ao adicionar a camada ao mapa, um formul&aacute;rio &eacute; criado de forma autom&aacute;tica para que o usu&aacute;rio escolha os par&acirc;metros que ir&atilde;o definir a origem dos dados.",
			es: "",
			en: "",
			apijs:""
		},
		"128": {
			titulo: {
				pt: "Depend&ecirc;ncia da escala",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/mmscale.js",
			categoria:"7",
			pt:"Define par&acirc;metros que modificam o comportamento de uma camada em fun&ccedil;&atilde;o da escala do mapa ou da abrang&ecirc;ncia espacial.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.mmscale();"
		},
		"129": {
			titulo: {
				pt: "M&aacute;scara",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/mascara.js",
			categoria:"1",
			pt:"A m&aacute;scara &eacute; uma camada que ser&aacute; sobreposta as demais permitindo o desenho apenas dos elementos que intersectem.",
			es: "",
			en: "",
			apijs:"i3GEO.mapa.dialogo.mascara();"
		},
		"130": {
			titulo: {
				pt: "Anima&ccedil;&atilde;o Gif",
				es: "",
				en: ""
			},
			diretorio:"i3geo/ferramentas/animagif",
			categoria:"5",
			pt:"Gera uma anima&ccedil;&atilde;o no formato Gif por meio da cria&ccedil;&atilde;o de quadros baseados em uma coluna na tabela de atributos. Para cada valor &uacute;nico existente na coluna &eacute; aplicado um filtro. Ao sobrepor v&aacute;rias imagens, cria-se um arquivo Gif.",
			es: "",
			en: "",
			apijs:"i3GEO.tema.dialogo.animagif()"
		}
	}
};
g_traducao_ajuda_categorias = {
	"1":{
		titulo:{
			pt: "Propriedades do mapa",
			es: "",
			en: ""
		},
		observacao:{
			pt: "Funcionalidades que permitem alterar caracter&iacute;sticas gerais do mapa, como tamanho e filtro de cores.",
			es: "",
			en: ""
		}
	},
	"2":{
		titulo:{
			pt: "Arquivos",
			es: "",
			en: ""
		},
		observacao:{
			pt: "",
			es: "",
			en: ""
		}
	},
	"3":{
		titulo:{
			pt: "An&aacute;lise geogr&aacute;fica",
			es: "",
			en: ""
		},
		observacao:{
			pt: "",
			es: "",
			en: ""
		}
	},
	"4":{
		titulo:{
			pt: "Inclus&atilde;o de camadas",
			es: "",
			en: ""
		},
		observacao:{
			pt: "O i3Geo utiliza um conceito de camadas dispon&iacute;veis no mapa e camadas adicionais. Camadas dispon&iacute;veis s&atilde;o as que podem ser consultadas, visualizadas e modificadas, compondo uma lista separada das camadas adicionais. Normalmente as camadas dispon&iacute;veis s&atilde;o um conjunto menor em rela&ccedil;&atilde;o ao total de temas que podem ser utilizados. Novos temas podem ser adicionados ao mapa por meio das op&ccedil;&otilde;es existentes na lista de temas, normalmente posicionada na guia '+Temas'.",
			es: "",
			en: ""
		}
	},
	"5":{
		titulo:{
			pt: "Opera&ccedil;&otilde;es sobre um tema",
			es: "",
			en: ""
		},
		observacao:{
			pt: "Uma das caracter&iacute;sticas do i3Geo &eacute; a possibilidade de modifica&ccedil;&atilde;o das camadas vistas no mapa. As op&ccedil;&otilde;es que permitem isso s&atilde;o mostradas normalmente na lista de camadas dispon&iacute;veis no mapa atual. Essa lista &eacute; mostrada como uma &aacute;rvore hier&aacute;rquica sendo que cada camada &eacute; um dos n&oacute;s. Expandindo-se esse n&oacute;, tem-se acesso &agrave;s opera&ccedil;&otilde;es.",
			es: "",
			en: ""
		}
	},
	"6":{
		titulo:{
			pt: "Opera&ccedil;&otilde;es sobre o mapa",
			es: "",
			en: ""
		},
		observacao:{
			pt: "",
			es: "",
			en: ""
		}
	},
	"7":{
		titulo:{
			pt: "Navega&ccedil;&atilde;o",
			es: "",
			en: ""
		},
		observacao:{
			pt: "As fun&ccedil;&otilde;es de navega&ccedil;&atilde;o permitem alterar a escala do mapa e modificar a abrang&ecirc;ncia espacial. Esse tipo de mudan&ccedil;a, principalmente de escala, afeta o contexto do mapa, modificando seu comportamento. Algumas camadas podem ser sens&iacute;veis &agrave; escala, mostrando ou n&atilde;o determinados elementos. Quando uma camada possuir muitos elementos, &eacute; aconselh&aacute;vel seu desligamento at&eacute; que a regi&atilde;o desejada seja encontrada. Algumas interfaces possuem mecanismos distintos de navega&ccedil;&atilde;o, como Google e openLayers. A lista abaixo contempla apenas a interface padr&atilde;o.",
			es: "",
			en: ""
		}
	},
	"8":{
		titulo:{
			pt: "Pesquisa",
			es: "",
			en: ""
		},
		observacao:{
			pt: "",
			es: "",
			en: ""
		}
	},
	"9":{
		titulo:{
			pt: "Metadados estat&iacute;sticos",
			es: "",
			en: ""
		},
		observacao:{
			pt: "",
			es: "",
			en: ""
		}
	}
};