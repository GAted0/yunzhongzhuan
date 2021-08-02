<?php




// 判断是否已经登陆
session_start();

if(
	isset($_SESSION["ID"]) && $_SESSION["ID"]!=null && $_SESSION["ID"]!="" && is_numeric($_SESSION["ID"]) && $_SESSION["ID"]>0
	&&
	isset($_SESSION["Username"]) && $_SESSION["Username"]!=null && $_SESSION["Username"]!=""
	&&
	isset($_POST["FOLDER"]) && $_POST["FOLDER"]!=null && $_POST["FOLDER"]!="" && is_numeric($_POST["FOLDER"]) && $_POST["FOLDER"]>=0 // 文件夹
	&&
	isset($_POST["KEYWORD"]) // 搜索关键词
	&&
	isset($_POST["LENGTH"]) && $_POST["LENGTH"]!=null && $_POST["LENGTH"]!="" && is_numeric($_POST["LENGTH"]) && $_POST["LENGTH"]>=0 // 加载个数
	&&
	isset($_POST["PAGE"]) && $_POST["PAGE"]!=null && $_POST["PAGE"]!="" && is_numeric($_POST["PAGE"])
){

	$_POST["KEYWORD"] = str_replace('\'', '', $_POST["KEYWORD"]);



	if($_POST["LENGTH"]<1){



		echo '{"status":true,"message":"ok","data":[]}';

		exit();

	}



	$Limit = "Limit ".($_POST["PAGE"]*$_POST["LENGTH"]).",".$_POST["LENGTH"];

	$Order = "Order By CreateDatetime Desc";


	// 是否搜索
	if(
		strlen($_POST["KEYWORD"])>0
	){




		// 默认文件夹
		$sql = "SELECT ID,FolderName,CreateDatetime,Of FROM folders WHERE UID=".$_SESSION["ID"]." AND FolderName Like '%".$_POST["KEYWORD"]."%' ".$Order." ".$Limit.";";;
	


	}else{


		// 如果是特定文件夹
		if($_POST["FOLDER"]>0){
			// 特定文件夹
			$sql = "SELECT ID,FolderName,CreateDatetime,Of FROM folders WHERE Of=".$_POST["FOLDER"]." AND UID=".$_SESSION["ID"]." ".$Order." ".$Limit.";";
		}else{
			// 默认文件夹
			$sql = "SELECT ID,FolderName,CreateDatetime,Of FROM folders WHERE UID=".$_SESSION["ID"]." AND Of=".$_POST["FOLDER"]." ".$Order." ".$Limit.";";
		}
		

	}



	require_once('mysql.php');





	$result = mysqli_query($conn,$sql);

	$data = [];

	while(

		$row = mysqli_fetch_assoc($result)

	){

		$data[] = $row;

	}





	mysqli_close($conn);

	echo '{"status":true,"message":"ok","data":'.json_encode($data).'}';

	exit();



}else{


	echo '{"status":false,"message":"no"}';

	exit();



}












?>