<?php




if(
	isset($_POST["SID"]) && $_POST["SID"]!=null && $_POST["SID"]!="" && is_numeric($_POST["SID"]) && $_POST["SID"]>0 // 分享 ID
	&&
	isset($_POST["SKEY"]) && $_POST["SKEY"]!=null && $_POST["SKEY"]!="" // 分享 密码


){




	require_once('mysql.php');


	$sql = "SELECT FileID,`Datetime` FROM Sharefiles WHERE ID=".$_POST["SID"]." AND RandVerifyString='".$_POST["SKEY"]."';";


	$result = mysqli_query($conn,$sql);



	if(
		$row = mysqli_fetch_assoc($result)
	){



		$sql = "SELECT ID,UID,FileName,Username,FileSize,CreateDatetime FROM Files WHERE ID=".$row["FileID"].";";

		$result = mysqli_query($conn,$sql);

		if(
			$row2 = mysqli_fetch_assoc($result)
		){

			// 找到文件



			// 找到分享
			$data = [];

			// file name
			$data["FileName"] = $row2["FileName"];

			// 文件大小
			$data["FileSize"] = $row2["FileSize"];

			// 用户名
			$data["Username"] = $row2["Username"];

			// 上传完成时间
			$data["CreateDatetime"] = $row2["CreateDatetime"];
			

			// 分享时间
			$data["Datetime"] = $row["Datetime"];




			// 查找 HTTP 直下
			$sql = "SELECT ID,RandVerifyString FROM HttpsLinks WHERE FileID=".$row2["ID"].";";


			$result = mysqli_query($conn,$sql);

			if(
				$row3 = mysqli_fetch_assoc($result)
			){



				$data["DownloadLink"] = "/download/".$row3["ID"]."/".$row3["RandVerifyString"]."/". rawurlencode( $data["FileName"] );



				mysqli_close($conn);


				echo '{"status":true,"message":"ok","data":'.json_encode($data).'}';


				exit();




			}


			// 如果没找到直链 生成



			function getRandChar($length){
				$str = null;
				$strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";//大小写字母以及数字
				$max = strlen($strPol)-1;

				for($i=0;$i<$length;$i++){
					$str.=$strPol[rand(0,$max)];
				}
				return $str;
			}

			$RandVerifyString = getRandChar(8);

			$sql = "INSERT INTO HttpsLinks() VALUES(NULL,".$row2["UID"].",'".date('Y-m-d H:i:s')."',".$row2["ID"].",'".$RandVerifyString."');";


			mysqli_query($conn,$sql);


			$InsertedID = mysqli_insert_id($conn);



			mysqli_close($conn);


			$data["DownloadLink"] = "/download/".$InsertedID."/".$RandVerifyString."/". rawurlencode( $data["FileName"] );


			echo '{"status":true,"message":"ok","data":'.json_encode($data).'}';



			exit();





		}


		mysqli_close($conn);


		echo '{"status":false,"message":"no"}';


		exit();


	}



	mysqli_close($conn);


	echo '{"status":false,"message":"no"}';


	exit();


}else{


	echo '{"status":false,"message":"no"}';


	exit();

}






?>