<?php


// 判断是否已经登陆
session_start();

if(
	isset($_SESSION["ID"]) && $_SESSION["ID"]!=null && $_SESSION["ID"]!="" && is_numeric($_SESSION["ID"]) && $_SESSION["ID"]>0
	&&
	isset($_SESSION["Username"]) && $_SESSION["Username"]!=null && $_SESSION["Username"]!=""
	&&
	isset($_POST["FOLDERID"]) && $_POST["FOLDERID"]!=null && $_POST["FOLDERID"]!="" && is_numeric($_POST["FOLDERID"]) && $_POST["FOLDERID"]>0 // 文件 ID
	&&
	isset($_POST["CREATEDATETIME"]) && $_POST["CREATEDATETIME"]!=null && $_POST["CREATEDATETIME"]!="" // 创建时间
	&&
	isset($_POST["FOLDER"]) && $_POST["FOLDER"]!=null && $_POST["FOLDER"]!="" && is_numeric($_POST["FOLDER"]) && $_POST["FOLDER"]>=0 // 文件夹ID
	&&
	isset($_POST["NEWFOLDERNAME"]) && $_POST["NEWFOLDERNAME"]!=null && $_POST["NEWFOLDERNAME"]!=""  // 新文件名

){


	$_POST["NEWFOLDERNAME"] = str_replace('\'', '', $_POST["NEWFOLDERNAME"]);




	require_once('mysql.php');


	$sql = "UPDATE Folders SET FolderName='".$_POST["NEWFOLDERNAME"]."' WHERE ID=".$_POST["FOLDERID"]." AND UID=".$_SESSION["ID"]." AND Of=".$_POST["FOLDER"]." AND CreateDatetime='".$_POST["CREATEDATETIME"]."';";


	mysqli_query($conn,$sql);



	mysqli_close($conn);


	echo '{"status":true,"message":"ok"}';


	exit();




}else{


	echo '{"status":false,"message":"no"}';


	exit();

}








?>