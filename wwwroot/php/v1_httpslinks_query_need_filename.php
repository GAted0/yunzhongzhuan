<?php



// 根据 直链表  HTTPS LINKS 的记录 ID 查询文件 ID 
// 再根据文件 ID 查询 文件表 Files 记录
// 条件是 文件表 下载地址要是 upload.yunzhongzhuan.com 主机上的文件



if(		isset($_GET["ID"])  &&  $_GET["ID"]!=null && $_GET["ID"]!="" && is_numeric($_GET["ID"])

		&&

		isset($_GET["RandVerifyString"])  &&  $_GET["RandVerifyString"]!=null && $_GET["RandVerifyString"]!=""

		&&

		isset($_GET["FileName"])  &&  $_GET["FileName"]!=null && $_GET["FileName"]!=""

	){

	$_GET["FileName"] = rawurldecode($_GET["FileName"]);
	$_GET["FileName"] = str_replace("+", "", $_GET["FileName"]);
	$_GET["FileName"] = str_replace(" ", "", $_GET["FileName"]);
	$_GET["FileName"] = str_replace("\'", "", $_GET["FileName"]);







	# 根据直链  AbCdEfGh_3  查找文件ID和密码 匹配找出文件下载地址
	require_once('mysql.php');
	


	# $sql = "DELETE FROM `httpslinks` WHERE SUBDATE(EndDateTime,interval 0 minute)<now()";
	# mysqli_query($conn,$sql);




	// 查询 直链表 ID 和 密码 和 存在于 upload.yunzhongzhuan.com 的文件！    
	// 查询有效时间 大于当前日期的 未过期的
	# $sql = "SELECT FileID FROM HttpsLinks WHERE ID=".$_GET["ID"]." AND RandVerifyString='".$_GET["RandVerifyString"]."' AND SUBDATE(EndDateTime,interval 0 minute)>now()";
	$sql = "SELECT FileID FROM HttpsLinks WHERE ID=".$_GET["ID"]." AND RandVerifyString='".$_GET["RandVerifyString"]."';";



	$result = mysqli_query($conn,$sql);


	// 如果文件存在 可以返回JSON信息
	while($row = mysqli_fetch_assoc($result)){


		// 根据文件ID 查询文件表 
		$sql = "SELECT Hash,FileName FROM Files WHERE ID=".$row["FileID"].";";

	
		$result2 = mysqli_query($conn,$sql);


		while($row2 = mysqli_fetch_assoc($result2)){



			// 关闭数据库退出
			mysqli_close($conn);


			$row2_FileName = $row2["FileName"];
			unset($row2["FileName"]);


			// 把文件名去除空格和+号
			$row2_FileName = str_replace("+", "", $row2_FileName);
			$row2_FileName = str_replace(" ", "", $row2_FileName);
			$row2_FileName = str_replace("\'", "", $row2_FileName);


			if(
				$_GET["FileName"] == $row2_FileName
			){


				echo '{"status":true,"message":"ok","data":'.json_encode($row2).'}';


				exit();

			}else{

				// 文件名不匹配

				// 否则文件不存在
				echo '{"status":false,"message":"no"}';


				exit();


			}




		}




	}




	// 关闭数据库退出
	mysqli_close($conn);

	// 否则文件不存在
	echo '{"status":false,"message":"no"}';

	
	exit();




}else{


	// 否则文件不存在
	echo '{"status":false,"message":"no"}';

	


	exit();

}






?>