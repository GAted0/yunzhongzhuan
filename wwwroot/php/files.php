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
	isset($_POST["PAGE"]) && $_POST["PAGE"]!=null && $_POST["PAGE"]!="" && is_numeric($_POST["PAGE"]) && $_POST["PAGE"]>=0 // 页数
	&&
	isset($_POST["NUMBER"]) && $_POST["NUMBER"]!=null && $_POST["NUMBER"]!="" && is_numeric($_POST["NUMBER"]) && $_POST["NUMBER"]>=0 // 数量
	&&
	isset($_POST["KEYWORD"]) // 搜索关键词
){

	$_POST["KEYWORD"] = str_replace('\'', '', $_POST["KEYWORD"]);

	// 限制单次获取文件数量
	if(
		$_POST["NUMBER"] > 50
	){
		$_POST["NUMBER"] = 50;
	}


	$keyword_sql = "";
	// 是搜索全部呢
	// 还是只加载当前文件夹呢
	if(
		strlen($_POST["KEYWORD"])>0
	){



		// 默认文件夹
		$sql = "SELECT ID,FileName,FileSize,FolderOf,CreateDatetime,Hash FROM Files WHERE UID=".$_SESSION["ID"]." AND FileName LIKE '%".$_POST["KEYWORD"]."%' ORDER BY CreateDatetime DESC LIMIT ".($_POST["PAGE"]*$_POST["NUMBER"]).",".$_POST["NUMBER"].";";



	}else{


		// 如果是特定文件夹
		if($_POST["FOLDER"]>0){
			// 特定文件夹
			$sql = "SELECT ID,FileName,FileSize,FolderOf,CreateDatetime,Hash FROM Files WHERE FolderOf=".$_POST["FOLDER"]." AND UID=".$_SESSION["ID"]." AND FileName LIKE '%".$_POST["KEYWORD"]."%' ORDER BY CreateDatetime DESC LIMIT ".($_POST["PAGE"]*$_POST["NUMBER"]).",".$_POST["NUMBER"].";";
		}else{
			// 默认文件夹
			$sql = "SELECT ID,FileName,FileSize,FolderOf,CreateDatetime,Hash FROM Files WHERE UID=".$_SESSION["ID"]." AND FolderOf=".$_POST["FOLDER"]." AND FileName LIKE '%".$_POST["KEYWORD"]."%' ORDER BY CreateDatetime DESC LIMIT ".($_POST["PAGE"]*$_POST["NUMBER"]).",".$_POST["NUMBER"].";";
		}


	}




	require_once('mysql.php');






	$result = mysqli_query($conn,$sql);


	$data = []; // 存放全部文件

	$data_id = [];

	while(
		$row = mysqli_fetch_assoc($result)
	){




		$data[$row["ID"]] = $row;


		$data_id[] = $row["ID"];


	}



	// 如果没有文件直接结束
	if(
		sizeof($data) < 1
	){

		mysqli_close($conn);

		echo '{"status":true,"message":"ok","data":[]}';

		exit();


	}


	$files_id = implode(",",$data_id);








	// 查询直链
	$sql = "SELECT ID,FileID,RandVerifyString FROM HttpsLinks WHERE FileID in(".$files_id.") AND UID=".$_SESSION["ID"].";";



	$result = mysqli_query($conn,$sql);


	while(
		$row = mysqli_fetch_assoc($result)
	){

		$FileID =$row["FileID"];
		$data[$FileID]["DownloadLink"] = "/download/".$row["ID"]."/".$row["RandVerifyString"]."/".rawurlencode($data[$FileID]["FileName"]);
	}



	
	// 查询分享
	$sql = "SELECT ID,FileID,RandVerifyString FROM ShareFiles WHERE FileID in(".$files_id.") AND UID=".$_SESSION["ID"].";";


	$result = mysqli_query($conn,$sql);
	while(
		$row = mysqli_fetch_assoc($result)
	){

		$FileID =$row["FileID"];
		$data[$FileID]["ShareLink"] = "/#sharefile=".$row["RandVerifyString"]."_".$row["ID"];
	}





	// 更正数组下标
	$data = array_values($data);




	function getRandChar($length){
		$str = null;
		$strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";//大小写字母以及数字
		$max = strlen($strPol)-1;

		for($i=0;$i<$length;$i++){
			$str.=$strPol[rand(0,$max)];
		}
		return $str;
	}



	// 增加新直链的数组
	$data_dl_sql = [];
	$data_dl_rvs = [];
	// 存储没有下载地址的纪录
	$data_ndl = [];


	// 增加新直链的数组
	$data_sl_sql = [];
	$data_sl_rvs = [];
	// 存储没有下载地址的纪录
	$data_nsl = [];


	// 如果还没有下载地址
	for(
		$i = 0;
		$i < sizeof($data);
		$i ++
	){


		if(
			(!isset($data[$i]["DownloadLink"]))
		){


			$data_ndl[] = $data[$i]["ID"];

			// 插入数据库
			$RandVerifyString = getRandChar(8);

			$data_dl_rvs[$data[$i]["ID"]]["RandVerifyString"] = $RandVerifyString;


			$sql = "(NULL,".$_SESSION["ID"].",'".date('Y-m-d H:i:s')."',".$data[$i]["ID"].",'".$RandVerifyString."')";

			$data_dl_sql[] = $sql;


		}






		if(
			(!isset($data[$i]["ShareLink"]))
		){


			$data_nsl[] = $data[$i]["ID"];

			// 插入数据库
			$RandVerifyString = getRandChar(8);

			$data_sl_rvs[$data[$i]["ID"]]["RandVerifyString"] = $RandVerifyString;


			$sql = "(NULL,".$data[$i]["ID"].",".$_SESSION["ID"].",'".date('Y-m-d H:i:s')."','".$RandVerifyString."')";

			$data_sl_sql[] = $sql;


		}





	}


	// 如果存在文件未直链化
	if(
		sizeof($data_dl_sql) > 0
	){


		// 批量增加直链
		$data_dl_sql = implode(",",$data_dl_sql);

		$sql = "INSERT INTO HttpsLinks() VALUES".$data_dl_sql.";";


		mysqli_query($conn,$sql);



		// 倒置数组
		$data_base = [];

		for(
			$i = 0;
			$i < sizeof($data);
			$i ++
		){

			$data_base[$data[$i]["ID"]] = $data[$i];

		}

		$data_ndl = implode(",",$data_ndl);

		// 查询直链化得到的 ID
		$sql = "SELECT ID,FileID FROM HttpsLinks WHERE FileID in(".$data_ndl.") AND UID=".$_SESSION["ID"].";";




		$result = mysqli_query($conn,$sql);

		while(
			$row = mysqli_fetch_assoc($result)
		){

			$data_base[$row["FileID"]]["DownloadLink"] = "/download/".$row["ID"]."/".$data_dl_rvs[$row["FileID"]]["RandVerifyString"]."/".rawurlencode($data_base[$row["FileID"]]["FileName"]);

		}


		$data = array_values($data_base);


	}








	// 如果存在文件未直链化
	if(
		sizeof($data_sl_sql) > 0
	){


		// 批量增加直链
		$data_sl_sql = implode(",",$data_sl_sql);

		$sql = "INSERT INTO ShareFiles() VALUES".$data_sl_sql.";";


		mysqli_query($conn,$sql);



		// 倒置数组
		$data_base = [];

		for(
			$i = 0;
			$i < sizeof($data);
			$i ++
		){

			$data_base[$data[$i]["ID"]] = $data[$i];

		}

		$data_nsl = implode(",",$data_nsl);

		// 查询直链化得到的 ID
		$sql = "SELECT ID,FileID FROM ShareFiles WHERE FileID in(".$data_nsl.") AND UID=".$_SESSION["ID"].";";



		$result = mysqli_query($conn,$sql);

		while(
			$row = mysqli_fetch_assoc($result)
		){

			$data_base[$row["FileID"]]["ShareLink"] = "/#sharefile=".$data_sl_rvs[$row["FileID"]]["RandVerifyString"]."_".$row["ID"];

		}


		$data = array_values($data_base);


	}













	mysqli_close($conn);


	echo '{"status":true,"message":"ok","data":'.json_encode($data).'}';







	exit();






}else{


	echo '{"status":false,"message":"no"}';


	exit();




}









?>