
/* drop tables */

drop table i3geoestat_agregaregiao;
drop table i3geoestat_classes;
drop table i3geoestat_classificacao;
drop table i3geoestat_fonteinfo_medida;
drop table i3geoestat_medida_variavel_link;
drop table i3geoestat_parametro_medida;
drop table i3geoestat_medida_variavel;
drop table i3geoestat_tipo_regiao;
drop table i3geoestat_conexao;
drop table i3geoestat_fonteinfo;
drop table i3geoestat_mapa_grupo;
drop table i3geoestat_mapa;
drop table i3geoestat_mapa_tema;
drop table i3geoestat_tipo_periodo;
drop table i3geoestat_unidade_medida;
drop table i3geoestat_variavel;




/* create tables */

-- lista controlada dos par�metros de conex�o com o banco de dados onde residem dados
-- c�digo 0 indica que ser� utilizada a conex�o padr�o
create table i3geoestat_conexao
(
	codigo_estat_conexao integer not null unique primary key autoincrement,
	-- nome do banco de dados
	bancodedados text,
	-- endere�o do servidor
	host text,
	-- porta de comunica��o
	porta text,
	-- nome do usu�rio que pode acessar o banco
	usuario text,
	-- senha do usu�rio que pode acessar o banco
	senha text
);


-- identifica as tabelas que possuem colunas com geometrias de determinado local ou regi�o
create table i3geoestat_tipo_regiao
(
	codigo_tipo_regiao integer not null unique primary key autoincrement,
	nome_tipo_regiao text,
	descricao_tipo_regiao text,
	codigo_estat_conexao integer,
	-- esquema onde encontra-se a tabela com a geometria
	esquemadb text,
	-- tabela que cont�m a coluna com a geometria
	tabela text,
	-- coluna com a geometria da regi�o
	colunageo text,
	-- data do mapeamento da regi�o
	data text,
	-- id da tabela onde est� a coluna com a geometria e que identifica a regi�o de forma �nica
	identificador text,
	-- coluna que cont�m o nome de cada regi�o ou local
	colunanomeregiao text,
	-- c�digo srid correspondente � proje��o cartogr�fica da coluna com a geometria
	srid text default '4326',
	-- coluna que cont�m um ponto que representa cada local.  pode ser o mesmo que colunageo
	colunacentroide text,
	-- lista de noes de colunas que ficar�o vis�veis quando os sql de acesso aos dados forem montados
	colunasvisiveis text,
	-- apelidos das colunas vis�veis. deve estar na mesma ordem das colunas vis�veis e separados por  v�rgulas. opcional.
	apelidos text,
	foreign key (codigo_estat_conexao)
	references i3geoestat_conexao (codigo_estat_conexao)
);


create table i3geoestat_agregaregiao
(
	id_agregaregiao integer not null unique primary key autoincrement,
	codigo_tipo_regiao integer,
	codigo_tipo_regiao_pai integer,
	-- coluna na tabela filho que liga com a coluna de identificadores da coluna pai
	colunaligacao_regiaopai text,
	foreign key (codigo_tipo_regiao)
	references i3geoestat_tipo_regiao (codigo_tipo_regiao)
);


-- tabela com o nome e descri��o de uma vari�vel vari�vel
create table i3geoestat_variavel
(
	codigo_variavel integer not null unique primary key autoincrement,
	nome text,
	descricao text
);


-- lista controlada de tipos de per�odo de tempo
create table i3geoestat_tipo_periodo
(
	codigo_tipo_periodo integer not null unique primary key autoincrement,
	nome text,
	descricao text
);


create table i3geoestat_unidade_medida
(
	codigo_unidade_medida integer not null unique primary key autoincrement,
	nome text,
	sigla text,
	-- o tipo de unidade permite que os valores sejam somados? (0 ou 1)
	permitesoma integer default 0,
	-- o tipo de unidade permite o c�lculo de m�dia aritm�tica? (0 ou 1)
	permitemedia integer default 0
);


-- descreve as colunas que cont�m valores de algum tipo de medida, por exemplo popula��o residente
create table i3geoestat_medida_variavel
(
	id_medida_variavel integer not null unique primary key autoincrement,
	codigo_unidade_medida integer,
	codigo_tipo_periodo integer,
	codigo_variavel integer,
	codigo_tipo_regiao integer,
	codigo_estat_conexao integer,
	-- esquema no banco de dados que contem a tabela
	esquemadb text,
	-- tabela no banco de dados que cont�m a coluna
	tabela text,
	-- nome da colouna que cont�m os valores da vari�vel
	colunavalor text,
	-- nome da coluna, na mesma tabela onde est�o os valores, que identifica unicamente a regi�o geogr�fica
	colunaidgeo text,
	-- filtro opcional que ser� utilizado na cl�usula where
	filtro text,
	-- titulo da medida
	nomemedida text,
	-- nome da coluna da tabela que contem os dados e que � um identificador �nico de cada registro
	colunaidunico text,
	foreign key (codigo_tipo_regiao)
	references i3geoestat_tipo_regiao (codigo_tipo_regiao),
	foreign key (codigo_estat_conexao)
	references i3geoestat_conexao (codigo_estat_conexao),
	foreign key (codigo_variavel)
	references i3geoestat_variavel (codigo_variavel),
	foreign key (codigo_tipo_periodo)
	references i3geoestat_tipo_periodo (codigo_tipo_periodo),
	foreign key (codigo_unidade_medida)
	references i3geoestat_unidade_medida (codigo_unidade_medida)
);


-- lista de classificacoes de uma medida de vari�vel
create table i3geoestat_classificacao
(
	id_classificacao integer not null unique primary key autoincrement,
	nome text,
	id_medida_variavel integer,
	-- observacao sobre a classifica��o
	observacao text,
	foreign key (id_medida_variavel)
	references i3geoestat_medida_variavel (id_medida_variavel)
);


-- classes pertencentes a uma classifica��o
create table i3geoestat_classes
(
	id_classe integer not null unique primary key autoincrement,
	-- expressao no formato v�lido do mapserver que define os componentes da classe
	expressao text,
	-- t�tulo da classe
	titulo text,
	-- componente r da cor utilizada para representar a classe
	vermelho text,
	-- componente g da cor utilizada para representar a classe
	verde text,
	-- componente b da cor utilizada para representar a classe
	azul text,
	id_classificacao integer,
	-- tamanho do s�mbolo (item size do mapfile)
	tamanho text,
	-- symbol name
	simbolo text,
	-- componente vermelho da cor do outline
	overmelho text,
	-- componente verde da cor do outline
	overde text,
	-- componente azul da cor do outline
	oazul text,
	-- largura da linha do outline
	otamanho text,
	foreign key (id_classificacao)
	references i3geoestat_classificacao (id_classificacao)
);


create table i3geoestat_fonteinfo
(
	id_fonteinfo integer not null unique primary key autoincrement,
	-- t�tulo completo da fonte, devendo conter o ano quando for o caso
	titulo text unique,
	link text
);


create table i3geoestat_fonteinfo_medida
(
	id_medida_variavel integer not null,
	id_fonteinfo integer not null,
	foreign key (id_fonteinfo)
	references i3geoestat_fonteinfo (id_fonteinfo),
	foreign key (id_medida_variavel)
	references i3geoestat_medida_variavel (id_medida_variavel)
);


create table i3geoestat_mapa
(
	-- identificador unico do mapa
	id_mapa integer not null unique primary key autoincrement,
	titulo text,
	-- nome do template para compor a interface
	template text,
	-- nome do logo localizado a esquerda do mapa
	logoesquerdo text,
	-- nome ddo logo localizado a direita do mapa
	logodireito text,
	-- indica se o mapa esta publicado ou nao (sim=1, nao=0)
	publicado integer
);


create table i3geoestat_mapa_grupo
(
	id_mapa_grupo integer not null unique primary key autoincrement,
	-- identificador unico do mapa
	id_mapa integer,
	titulo text,
	foreign key (id_mapa)
	references i3geoestat_mapa (id_mapa)
);


create table i3geoestat_mapa_tema
(
	id_mapa_tema integer not null unique primary key autoincrement,
	id_mapa_grupo integer,
	-- titulo do tema, se for vazio, usa o definido no sistema metaestat
	titulo text,
	id_medida_variavel integer,
	foreign key (id_mapa_grupo)
	references i3geoestat_mapa_grupo (id_mapa_grupo),
	foreign key (id_medida_variavel)
	references i3geoestat_medida_variavel (id_medida_variavel)
);


create table i3geoestat_medida_variavel_link
(
	link text,
	id_medida_variavel integer,
	nome text,
	id_link integer not null unique primary key autoincrement,
	foreign key (id_medida_variavel)
	references i3geoestat_medida_variavel (id_medida_variavel)
);


create table i3geoestat_parametro_medida
(
	id_parametro_medida integer not null unique primary key autoincrement,
	coluna text,
	nome text,
	descricao text,
	-- (0 ou 1) indica se a coluna de valores da vari�vel deve ser agregada ou n�o (soma dos valores ou m�dia) conforme o tipo de unidade de medida
	id_pai integer default 0,
	id_medida_variavel integer,
	-- tipo de par�metro, podendo ser:
	-- 0 - n�o definido
	-- 1 - ano
	-- 2 - m�s
	-- 3 - dia
	-- 4 - hora
	-- 5 - lista de op��o
	tipo integer default 0,
	foreign key (id_medida_variavel)
	references i3geoestat_medida_variavel (id_medida_variavel)
);



