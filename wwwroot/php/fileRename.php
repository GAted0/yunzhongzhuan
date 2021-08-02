<?php


// 判断是否已经登陆
session_start();

if(
	isset($_SESSION["ID"]) && $_SESSION["ID"]!=null && $_SESSION["ID"]!="" && is_numeric($_SESSION["ID"]) && $_SESSION["ID"]>0
	&&
	isset($_SESSION["Username"]) && $_SESSION["Username"]!=null && $_SESSION["Username"]!=""
	&&
	isset($_POST["FILEID"]) && $_POST["FILEID"]!=null && $_POST["FILEID"]!="" && is_numeric($_POST["FILEID"]) && $_POST["FILEID"]>0 // 文件 ID
	&&
	isset($_POST["FILESIZE"]) && $_POST["FILESIZE"]!=null && $_POST["FILESIZE"]!="" && is_numeric($_POST["FILESIZE"]) && $_POST["FILESIZE"]>0 // 文件大小
	&&
	isset($_POST["CREATEDATETIME"]) && $_POST["CREATEDATETIME"]!=null && $_POST["CREATEDATETIME"]!="" // 创建时间
	&&
	isset($_POST["FOLDER"]) && $_POST["FOLDER"]!=null && $_POST["FOLDER"]!="" && is_numeric($_POST["FOLDER"]) && $_POST["FOLDER"]>=0 // 文件夹ID
	&&
	isset($_POST["HASH"]) && $_POST["HASH"]!=null && $_POST["HASH"]!=""  // 文件 HASH
	&&
	isset($_POST["NEWFILENAME"]) && $_POST["NEWFILENAME"]!=null && $_POST["NEWFILENAME"]!=""  // 新文件名

){


	$_POST["NEWFILENAME"] = str_replace('\'', '', $_POST["NEWFILENAME"]);

	require_once('mysql.php');


	$sql = "UPDATE files SET FileName='".$_POST["NEWFILENAME"]."' WHERE ID=".$_POST["FILEID"]." AND UID=".$_SESSION["ID"]." AND FileSize=".$_POST["FILESIZE"]." AND FolderOf=".$_POST["FOLDER"]." AND CreateDatetime='".$_POST["CREATEDATETIME"]."';";


	mysqli_query($conn,$sql);



	mysqli_close($conn);


	echo '{"status":true,"message":"ok"}';


	exit();




}else{


	echo '{"status":false,"message":"no"}';


	exit();

}








?>