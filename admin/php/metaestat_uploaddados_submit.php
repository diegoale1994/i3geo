<?php
$colunasarquivo = "";
$nomearquivoserv = "";
error_reporting(0);
include_once(dirname(__FILE__)."/login.php");
if (isset($_FILES['i3GEOuploadArquivo']['name']))
{
	$Arquivoup = $_FILES['i3GEOuploadArquivo']['tmp_name'];

	$nomePrefixo = str_replace(" ","_",str_replace(".csv","",$_FILES['i3GEOuploadArquivo']['name']));
	$nomePrefixo = str_replace(".","",$nomePrefixo);
	$nomePrefixo = strip_tags($nomePrefixo);
	$nomePrefixo = htmlspecialchars($nomePrefixo, ENT_QUOTES);
	$nomePrefixo = $nomePrefixo . md5(uniqid(rand(), true));

	$nomearquivoserv = $dir_tmp."/uploaddados".$nomePrefixo.".csv";

	$checkphp = fileContemString($nomearquivoserv,"<?");
	if($checkphp == true){
		unlink($nomearquivoserv);
		exit;
	}

	//echo $nomearquivoserv;
	if(file_exists($nomearquivoserv)){
		unlink($nomearquivoserv);
	}
	$status =  move_uploaded_file($Arquivoup,$nomearquivoserv);
	if($status == 1){
		$handle = fopen ($nomearquivoserv, "r");
		$buffer = fgets($handle);
		$buffer = str_replace('"','',$buffer);
		$buffer = str_replace("'",'',$buffer);
		$buffer = str_replace("\n",'',$buffer);
		$buffer = str_replace("\r",'',$buffer);
		$colunas = explode(";",$buffer);
		if(count($colunas) == 1){
			$colunas = explode(",",$buffer);
		}
		$colunasarquivo = implode(",",$colunas);
	}
}
//echo $colunasarquivo;
//$colunasarquivo = "ano,codigoregiao,dia,gid,hora,id_medida_variavel,mes,valor_int,valor_num,valor_txt ";
?>
<html>
<script>

<?php echo "c = '$colunasarquivo';";?>
<?php
//echo "d = '$nomearquivoserv';";
echo "d = '';";
?>
window.parent.i3GEOadmin.uploaddados.COLUNASARQUIVO = c;
window.parent.i3GEOadmin.uploaddados.NOMEARQUIVOSERV = d;
window.parent.i3GEOadmin.uploaddados.upload.fimsubmit();
</script>
</html>