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
	isset($_POST["FOLDERSARRAY"])  // 文件夹数组
	&&
	isset($_POST["FILESARRAY"])  // 文件数组
	&&
	isset($_POST["FOLDERSLENGTH"]) && $_POST["FOLDERSLENGTH"]!=null && $_POST["FOLDERSLENGTH"]!="" && is_numeric($_POST["FOLDERSLENGTH"]) // 文件夹数
	&&
	isset($_POST["FILESLENGTH"]) && $_POST["FILESLENGTH"]!=null && $_POST["FILESLENGTH"]!="" && is_numeric($_POST["FILESLENGTH"]) // 文件数

){

	// 匹配文件夹或文件数量是否匹配
	if($_POST["FOLDERSARRAY"]!=null && $_POST["FOLDERSARRAY"]!=""){
		$FoldersArray = explode(",",$_POST["FOLDERSARRAY"]);
	}else{
		$FoldersArray = [];
	}
	if($_POST["FILESARRAY"]!=null && $_POST["FILESARRAY"]!=""){
		$FilesArray = explode(",",$_POST["FILESARRAY"]);
	}else{
		$FilesArray = [];
	}


	// 判断是否都是数字  如果不是
	if(
		!(sizeof($FilesArray)+sizeof($FoldersArray)>0)
		||
		!(
			sizeof($FoldersArray) == $_POST["FOLDERSLENGTH"]
			&&
			sizeof($FilesArray) == $_POST["FILESLENGTH"]
		)
	){


		echo '{"status":false,"message":"no"}';


		exit();



	}


	require_once('mysql.php');


	// 先查询文件夹 ID 是不是属于该用户的
	$isTrue = false;

	// 如果是根目录无须判断
	if(
		!($_POST["FOLDER"]>0)
	){

		$isTrue = true;

	}else{



		$sql = "SELECT ID FROM folders WHERE ID=".$_POST["FOLDER"]." AND UID=".$_SESSION["ID"].";";


		$result = mysqli_query($conn,$sql);


		if(
			$row = mysqli_fetch_assoc($result)
		){
			$isTrue = true;
		}

	}


	if($isTrue){
		// 文件夹是该用户所拥有的

		if(sizeof($FoldersArray) > 0){

			$sql = "UPDATE folders SET Of=".$_POST["FOLDER"].",CreateDatetime='".date('Y-m-d H:i:s')."' WHERE ID in(".$_POST["FOLDERSARRAY"].") AND ID!=".$_POST["FOLDER"]." AND UID=".$_SESSION["ID"].";";

			mysqli_query($conn,$sql);

		}




		if(sizeof($FilesArray)>0){

			$sql = "UPDATE files SET FolderOf=".$_POST["FOLDER"].",CreateDatetime='".date('Y-m-d H:i:s')."' WHERE ID in(".$_POST["FILESARRAY"].") AND UID=".$_SESSION["ID"].";";

			mysqli_query($conn,$sql);


		}





	}




	mysqli_close($conn);


	echo '{"status":true,"message":"ok"}';


	exit();



}else{


	echo '{"status":false,"message":"no"}';


	exit();



}








?>