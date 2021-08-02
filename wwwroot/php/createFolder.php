<?php

// 判断是否已经登陆
session_start();

if(
	isset($_SESSION["ID"]) && $_SESSION["ID"]!=null && $_SESSION["ID"]!="" && is_numeric($_SESSION["ID"]) && $_SESSION["ID"]>0
	&&
	isset($_SESSION["Username"]) && $_SESSION["Username"]!=null && $_SESSION["Username"]!=""
	&&
	isset($_POST["FOLDER"]) && $_POST["FOLDER"]!=null && $_POST["FOLDER"]!="" && is_numeric($_POST["FOLDER"]) && $_POST["FOLDER"]>=0 // 文件夹ID
	&&
	isset($_POST["CREATEFOLDERNAME"]) && $_POST["CREATEFOLDERNAME"]!=null && $_POST["CREATEFOLDERNAME"]!=""  // 新文件名

){

	$_POST["CREATEFOLDERNAME"] = str_replace('\'', '', $_POST["CREATEFOLDERNAME"]);


	require_once('mysql.php');


	// 先查询文件夹 ID 是不是属于该用户的
	$isTrue = false;

	// 如果 ID 是 0 不判断
	if($_POST["FOLDER"]>0){

		$sql = "SELECT ID FROM Folders WHERE ID=".$_POST["FOLDER"]." AND UID=".$_SESSION["ID"].";";

		$result = mysqli_query($conn,$sql);

		if(
			$row = mysqli_fetch_assoc($result)
		){
			$isTrue = true;
		}

	}else{
		$isTrue = true;
	}
	



	if(
		$isTrue
	){

		// 文件夹是该用户所拥有的

		$nowdatetime = date('Y-m-d H:i:s');


		$sql = "INSERT INTO Folders(ID,FolderName,CreateDatetime,Of,UID) VALUES(NULL,'".$_POST["CREATEFOLDERNAME"]."','".$nowdatetime."',".$_POST["FOLDER"].",".$_SESSION["ID"].");";



		mysqli_query($conn,$sql);


		# 插入后得到ID
		$InsertIntoOKID = mysqli_insert_id($conn);



		mysqli_close($conn);


		echo '{"status":true,"message":"ok","id":"' . $InsertIntoOKID . '","createdatetime":"' . $nowdatetime . '"}';


		exit();


	}else{



		mysqli_close($conn);


		echo '{"status":false,"message":"no"}';


		exit();
	

	}







}else{



	echo '{"status":false,"message":"no"}';


	exit();



}





?>