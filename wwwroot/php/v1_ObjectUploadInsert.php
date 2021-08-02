<?php

// 来自 /php/upload/send.php
// 上传完最后一次  更新 添加一个文件到数据库




if(isset($_POST["SSEESSIIOONN"])){
	session_id($_POST["SSEESSIIOONN"]);
	session_start();

}else{
	echo '{"status":false,"message":"请您重新登陆账号。","error_code":1}';
	exit();
}










$_POST["FileSize"] = $_POST["FileSize"] ;

if(
	isset($_SESSION["ID"])&&$_SESSION["ID"]!=null&&$_SESSION["ID"]!=""&&is_numeric($_SESSION["ID"])
	&&
	isset($_SESSION["Username"])&&$_SESSION["Username"]!=null&&$_SESSION["Username"]!=""
	&&
	isset($_POST["HASH"])&&$_POST["HASH"]!=null&&$_POST["HASH"]!=""
	&&
	isset($_POST["FileSize"])&&$_POST["FileSize"]!=null&&$_POST["FileSize"]!=""&&is_numeric($_POST["FileSize"]) // &&$_POST["FileSize"] <= 8 * 1024 * 1024 * 1024
	&&
	isset($_POST["FileName"])&&$_POST["FileName"]!=null&&$_POST["FileName"]!=""
	&&
	isset($_POST["folderOf"])&&$_POST["folderOf"]!=null&&$_POST["folderOf"]!=""&&is_numeric($_POST["folderOf"])

){



	require_once('mysql.php');




	$_POST["FileName"] = str_replace(' ','',$_POST["FileName"]);
	$_POST["FileName"] = str_replace('+','',$_POST["FileName"]);
	$_POST["FileName"] = str_replace('\'','',$_POST["FileName"]);









	// 创建的时间
	$nowdatetime = date('Y-m-d H:i:s');





	// 插入一条文件记录
	$sql = "INSERT INTO `files` (`ID`, `UID`, `Username`, `CreateDatetime`, `FileSize`, `FileName`, `Hash`, `FolderOf`) VALUES (NULL, '".$_SESSION["ID"]."', '".$_SESSION["Username"]."', '".$nowdatetime."','".$_POST["FileSize"]."', '".$_POST["FileName"]."', '".$_POST["HASH"]."', '".$_POST["folderOf"]."');";

	mysqli_query($conn,$sql);



    // 获取插入后的文件ID
    $InsertedID = mysqli_insert_id($conn);








	// 保存临时上传的文件
	/**
	 * 随机生成要求位数个字符
	 * @param length 规定几位字符
	 */
	function getRandChar($length){
	    $str = null;
	    $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";//大小写字母以及数字
	    $max = strlen($strPol)-1;

	    for($i=0;$i<$length;$i++){
	        $str.=$strPol[rand(0,$max)];
	    }
	    return $str;
	}


	$RandomVerifyString = getRandChar(8);





	// 生成直链



	// 可以复制直链的格式
	// 过期时间 2999 年
	$sql = "INSERT INTO `httpslinks`(`ID`, `UID`, `Datetime`, `FileID`, `RandVerifyString`) VALUES (NULL,'".$_SESSION["ID"]."','".$nowdatetime."','".$InsertedID."','".$RandomVerifyString."')";


	mysqli_query($conn,$sql);




	mysqli_close($conn);


	echo '{"status":true,"message":"ok"}';

	exit();





}else{

	echo '{"status":false,"message":"请您重新登陆账号。"}';
	exit();

}



?>