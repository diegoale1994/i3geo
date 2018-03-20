<?php
/*
 * Faz o upload de csv e insere no banco de dados criando uma nova tabela
*/
include_once("login.php");
if(verificaOperacaoSessao("admin/metaestat/editorbanco") == false){
	echo "Vc nao pode realizar essa operacao.";exit;
}
error_reporting(0);
if (ob_get_level() == 0) ob_start();

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="../../css/input.css" />
<link rel="stylesheet" type="text/css" href="../../css/geral.css" />
<title></title>
</head>
<body bgcolor="white" style="background-color: white; text-align: left;">
	<p>
		<?php
		if($_POST["tabelaDestinocsv"] == ""){
			echo "Nome da tabela n&atilde;o definido";
			exit;
		}
		if ($_FILES['i3GEOuploadcsv']['name'] == ""){
			echo "Arquivo n&atilde;o definido";
			exit;
		}
		if (isset($_FILES['i3GEOuploadcsv']['name'])){
			echo "<p class='paragrafo' >Carregando o arquivo...</p>";
			ob_flush();
			flush();
			sleep(1);
			$arqcsv = $_FILES['i3GEOuploadcsv']['tmp_name'];
			$nomePrefixo = str_replace(" ","_",removeAcentos($_FILES['i3GEOuploadcsv']['name']));

			$nomePrefixo = str_replace(".","",$nomePrefixo);
			$nomePrefixo = strip_tags($nomePrefixo);
			$nomePrefixo = htmlspecialchars($nomePrefixo, ENT_QUOTES);
			$nomePrefixo = $nomePrefixo . md5(uniqid(rand(), true));

			$nomePrefixo = $nomePrefixo."_".(nomeRandomico(4)).".csv";

			$Arquivo = $_FILES['i3GEOuploadcsv']['tmp_name'];
			$status =  move_uploaded_file($Arquivo,$dir_tmp."/".$nomePrefixo);
			if($status != 1){
				echo "<p class='paragrafo' >Ocorreu um erro no envio do arquivo";exit;
			}
			if(!file_exists($dir_tmp."/".$nomePrefixo)){
				echo "<p class='paragrafo' >Ocorreu algum problema no envio do arquivo ".$dir_tmp."/".$nomePrefixo;paraAguarde();exit;
			}
			$arqcsv = $dir_tmp."/".$nomePrefixo;

			$checkphp = fileContemString($dirmap."/".$nomePrefixo,"<?");
			if($checkphp == true){
				unlink($dirmap."/".$nomePrefixo);
				exit;
			}

			//pega os parametros de conexao
			include("classe_metaestat.php");
			$m = new Metaestat();
			$conexao = $m->listaConexao($_POST["i3GEOuploadcsvcodigoconexao"],true);
			//pega a lista de colunas e identifica o separador utilizado
			$handle = fopen ($arqcsv, "r");
			$cabecalho = fgets($handle);
			$buffer = str_replace('"','',$cabecalho);
			$buffer = str_replace("'",'',$buffer);
			$buffer = str_replace("\n",'',$buffer);
			$buffer = str_replace("\r",'',$buffer);
			$colunas = explode(";",$buffer);
			$separador = ";";
			if(count($colunas) == 1){
				$colunas = explode(",",$buffer);
				$separador = ",";
			}
			echo "<p class='paragrafo' >Separador de colunas identificado: <b>".$separador."</b></p>";
			echo "<p class='paragrafo' >Total de colunas: <b>".count($colunas)."</b></p>";
			fclose ($handle);
			//le o csv em um array
			$handle = fopen ($arqcsv, "r");
			$linhas = array();

			$ncolunas = count($colunas);
			while (!feof($handle)) {
				$buffer = fgets($handle);
				if($buffer != $cabecalho){
					//$buffer = str_replace('"','',$buffer);
					$buffer = str_replace("'",'',$buffer);
					$buffer = str_replace("\n",'',$buffer);
					$buffer = str_replace("\r",'',$buffer);
					if($buffer != ""){
						$temp = explode($separador,$buffer);
						if(count($temp) == $ncolunas){
							$linhas[] = $temp;
						}
						else{
							echo "<p class='paragrafo' >A linha abaixo apresentou um erro - n&uacute;mero de colunas n&atilde;o bate com o cabe&ccedil;alho</p>";
							var_dump($temp);
							exit;
						}
					}
				}
			}
			fclose ($handle);
			//decobre o tipo de coluna
			$testar = 50;
			if(count($linhas) < $testar){
				$testar = count($linhas);
			}
			$tipoColuna = array();
			for ($j=0; $j<$ncolunas;$j++){
				$tipo = "numeric";
				for ($i=0; $i<$testar;$i++){
					$s = $linhas[$i];
					$v = $s[$j];
					if(!empty($v) && !is_numeric($v)){
						$tipo = "varchar";
					}
				}
				$tipoColuna[$colunas[$j]] = $tipo;
			}
			echo "<br>Tipos das colunas: <pre>";
			var_dump($tipoColuna);
			echo "</pre>";
			ob_flush();
			flush();
			sleep(1);

			try {
				$dbh = new PDO('pgsql:dbname='.$conexao["bancodedados"].';user='.$conexao["usuario"].';password='.$conexao["senha"].';host='.$conexao["host"].';port='.$conexao["porta"]);
			} catch (PDOException $e) {
				echo 'Connection failed: ' . " ";
			}
			//encoding do banco de dados
			$sql = "SELECT pg_encoding_to_char(encoding) FROM pg_database WHERE datname = '".$conexao["bancodedados"]."'";
			$res = $dbh->query($sql,PDO::FETCH_ASSOC);
			$encodingdb = $res->fetchAll();
			$encodingdb = $encodingdb[0];
			$encodingdb = $encodingdb["pg_encoding_to_char"];
			if($encodingdb == "UTF8"){
				$encodingdb = "UTF-8";
			}
			if($encodingdb == "LATIN1"){
				$encodingdb = "ISO-8859-1";
			}
			echo "<p class='paragrafo' >Codifica&ccedil;&atilde;o do banco: <b>".$encodingdb."</b></p>";

			//gera o script para criar a tabela e verifica se ja existe
			$sql = "SELECT table_name FROM information_schema.tables where table_schema = '".$_POST["i3GEOuploadcsvesquema"]."' AND table_name = '".$_POST["tabelaDestinocsv"]."'";
			$res = $dbh->query($sql,PDO::FETCH_ASSOC);
			if(count($res->fetchAll())>0){
				$tabelaExiste = true;
			}
			else{
				$tabelaExiste = false;
			}
			$sqltabela = array();
			if($tabelaExiste == false && $_POST["tipoOperacao"] == "criar"){
				$sql = "CREATE TABLE ".$_POST["i3GEOuploadcsvesquema"].".".$_POST["tabelaDestinocsv"]."(";
				$temp = array();
				foreach($colunas as $coluna){
					$temp[] = strtolower($coluna)." ".$tipoColuna[$coluna];
				}
				if($_POST["colunaxcsv"] != "" && $_POST["colunaycsv"] != ""){
					$temp[] = "the_geom geometry";
					$colunas[] = "the_geom";
				}
				$sql .= implode(",",$temp).") WITH(OIDS=FALSE)";
				$sqltabela[] = $sql;
				$sqltabela[] = "ALTER TABLE ".$_POST["i3GEOuploadcsvesquema"].".".$_POST["tabelaDestinocsv"]." OWNER TO ".$conexao["usuario"];
				if(!empty($_POST["comentarioCsv"])){
					$enc = mb_detect_encoding($texto);
					$_POST["comentarioCsv"] = mb_convert_encoding($_POST["comentarioCsv"],$encodingdb,$enc);
					$sqltabela[] = "COMMENT ON TABLE ".$_POST["i3GEOuploadcsvesquema"].".".$_POST["tabelaDestinocsv"]." IS '".addcslashes($_POST["comentarioCsv"])."'";
				}
				echo "<br>Sql tabela: <pre>";
				var_dump($sqltabela);
				echo "</pre>";
				ob_flush();
				flush();
				sleep(1);
			}
			if($tabelaExiste == true && $_POST["tipoOperacao"] == "criar"){
				echo "<span style=color:red >A tabela existe. N&atilde;o pode ser criada.</span>";
				exit;
			}
			//se a tabela existe e e para remover os registros
			if($tabelaExiste == true && $_POST["tipoOperacao"] == "apagar"){
				$sqltabela[] = "delete from ".$_POST["i3GEOuploadcsvesquema"].".".$_POST["tabelaDestinocsv"];
			}
			if($tabelaExiste == true && $_POST["tipoOperacao"] == "apagar" && $_POST["i3GEOuploadcsvesquema"] != "i3geo_metaestat"){
				echo "<span style=color:red >N&atilde;o &eacute; poss&iacute;vel executar essa opera&ccedil;&atilde;o nesse esquema.</span>";
				exit;
			}
			//gera o script para inserir os dados
			echo "<br>Preparando inclus&atilde;o de dados";
			ob_flush();
			flush();
			sleep(1);
			$linhasql = array();
			$insert = "INSERT INTO ".$_POST["i3GEOuploadcsvesquema"].".".$_POST["tabelaDestinocsv"]."(".strtolower(implode(",",$colunas)).")";
			$nlinhas = count($linhas);
			$valorX = 0;
			$valorY = 0;
			$escapar = "',<,>,%,#,@,(,)";
			for ($i=0; $i<$nlinhas;$i++){
				$s = $linhas[$i];
				$s = str_replace('"','',$s);
				$enc = mb_detect_encoding($s);
				if($enc != ""){
					$s = mb_convert_encoding($s,$encodingdb,$enc);
				}
				$vs = array();
				for ($j=0; $j<$ncolunas;$j++){
					$escape = "";
					if($tipoColuna[$coluna] == "varchar"){
						$texto = $s[$j];
						$enc = mb_detect_encoding($texto);
						$textosl = addcslashes($texto,$escapar);
						if($textosl != $texto){
							$escape = "E";
						}
						if($enc != "" && $enc != $encodingdb){
							$textosl = "$escape'".mb_convert_encoding($textosl,$encodingdb,$enc)."'";
						}
						else{
							$textosl = "$escape'".$textosl."'";
						}
						if($textosl == "''"){
							$textosl = 'null';
						}
						$vs[] = $textosl;
					}
					else{
						$valor = $s[$j];
						if($valor == "" || (empty($valor) && $valor != 0)){
							$valor = 'nulo';
						}
						$vs[] = $valor;
					}
					if(strtolower($colunas[$j]) == strtolower($_POST["colunaxcsv"])){
						$valorX = $s[$j];
					}
					if(strtolower($colunas[$j]) == strtolower($_POST["colunaycsv"])){
						$valorY = $s[$j];
					}
				}
				if($_POST["colunaxcsv"] != "" && $_POST["colunaycsv"] != ""){
					$vs[] = "ST_PointFromText('POINT(". str_replace(",",".",$valorX)." ".str_replace(",",".",$valorY).")',4326)";
				}
				$str = implode(",",$vs);
				$str = str_replace("nulo",'null',$str);
				$linhasql[] = $insert."VALUES(".$str.")";
			}
			echo "<pre>";
			//var_dump($linhasql);exit;

			echo "<br>Incluindo dados";
			echo "<script>window.scrollTo(0,10000);</script>";
			ob_flush();
			flush();
			sleep(1);
			if($_POST["incluiserialcsv"] == "on"){
				$linhasql[] = "alter table ".$_POST["i3GEOuploadcsvesquema"].".".$_POST["tabelaDestinocsv"]." add gid serial CONSTRAINT ".$_POST["tabelaDestinocsv"]."_gid_pkey PRIMARY KEY";
				echo "<br>alter table ".$_POST["i3GEOuploadcsvesquema"].".".$_POST["tabelaDestinocsv"]." add gid serial CONSTRAINT ".$_POST["tabelaDestinocsv"]."_gid_pkey PRIMARY KEY";
			}
			foreach($sqltabela as $linha){
				try {
					$dbh->query($linha);
				} catch (PDOException $e) {
					echo 'Erro: ' . " ";
				}
			}
			$bdcon = pg_connect('dbname='.$conexao["bancodedados"].' user='.$conexao["usuario"].' password='.$conexao["senha"].' host='.$conexao["host"].' port='.$conexao["porta"]."options='-c client_encoding=LATIN1'");

			foreach($linhasql as $linha){
				try {
					$res = $dbh->query($linha);
					if($res == false){
						$res = pg_query($bdcon,$linha);
						if($res == false){
							$linha = remove_accents($linha);
							$res = $dbh->query($linha);
							if($res == false){
								$res = pg_query($bdcon,$linha);
								if($res == false){
									echo "<br><br><span style=color:red >Erro em: </span>".$linha;
								}
							}
							else{
								echo "<br><br><span style=color:red >Linha com acentos removidos: </span>".$linha;
							}
						}
					}
				} catch (PDOException $e) {
					echo 'Erro: ' . " ";
				}
			}
			$sql = "select * from ".$_POST["i3GEOuploadcsvesquema"].".".$_POST["tabelaDestinocsv"];
			$q = $dbh->query($sql,PDO::FETCH_ASSOC);
			$r = $q->fetchAll();
			if($nlinhas != count($r)){
				echo "<span style='color:red'>";
			}
			echo "<br>Registros existentes no CSV: ". $nlinhas;

			echo "<br>Registros na tabela final: ". count($r);
			echo "<b><br>Feito!!!<br>Fa&ccedil;a o reload da p&aacute;gina";
		}
		else{
			echo "<p class='paragrafo' >Erro ao enviar o arquivo. Talvez o tamanho do arquivo seja maior do que o permitido.</p>";
		}

		?>
		<script>window.scrollTo(0,10000);</script>

</body>
</html>
