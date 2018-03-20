
/* drop tables */

drop table i3geousr_grupotema;
drop table i3geousr_grupousuario;
drop table i3geousr_grupos;
drop table i3geousr_operacoespapeis;
drop table i3geousr_operacoes;
drop table i3geousr_papelusuario;
drop table i3geousr_papeis;
drop table i3geousr_usuarios;




/* create tables */

-- grupos de usu�rios
create table i3geousr_grupos
(
	-- identificador �nico do grupo
	id_grupo integer not null unique primary key autoincrement,
	-- nome do grupo
	nome text,
	-- descricao do grupo
	descricao text
);


-- define os grupos que podem utilizar os temas (mapfiles)
create table i3geousr_grupotema
(
	-- identificador �nico do grupo
	id_grupo integer not null,
	-- c�digo do tema na tabela i3geoadmin_temas
	id_tema integer not null,
	foreign key (id_grupo)
	references i3geousr_grupos (id_grupo)
);


-- cadastro de usu�rios
create table i3geousr_usuarios
(
	id_usuario integer not null unique primary key autoincrement,
	-- 0 ou 1 indicando se o usu�rio est� ativo ou n�o
	ativo numeric not null,
	-- data do cadastro do usu�rio
	data_cadastro text,
	email text,
	-- login do usu�rio
	login text not null,
	-- nome real do usu�rio
	nome_usuario text,
	senha text not null
);


create table i3geousr_grupousuario
(
	id_usuario integer not null,
	-- identificador �nico do grupo
	id_grupo integer not null,
	foreign key (id_grupo)
	references i3geousr_grupos (id_grupo),
	foreign key (id_usuario)
	references i3geousr_usuarios (id_usuario)
);


-- cadastro de opera��es do sistema
create table i3geousr_operacoes
(
	id_operacao integer not null unique primary key autoincrement,
	-- c�digo da opera��o
	codigo text,
	descricao text
);


-- cadastro de pap�is que permitem definir as opera��es
create table i3geousr_papeis
(
	id_papel integer not null unique,
	nome text not null unique,
	descricao text
);


create table i3geousr_operacoespapeis
(
	id_operacao integer not null,
	id_papel integer not null,
	foreign key (id_papel)
	references i3geousr_papeis (id_papel),
	foreign key (id_operacao)
	references i3geousr_operacoes (id_operacao)
);


create table i3geousr_papelusuario
(
	id_usuario integer not null,
	id_papel integer not null,
	foreign key (id_papel)
	references i3geousr_papeis (id_papel),
	foreign key (id_usuario)
	references i3geousr_usuarios (id_usuario)
);



