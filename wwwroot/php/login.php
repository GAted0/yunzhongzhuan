<?php




// 登陆 接收 用户名 和 密码
if(
	isset($_POST["USERNAME"]) && $_POST["USERNAME"]!=null && $_POST["USERNAME"]!=""
	&&
	isset($_POST["PASSWORD"]) && $_POST["PASSWORD"]!=null && $_POST["PASSWORD"]!=""
){


	// 连接数据库 查询密码是否匹配

	require_once('mysql.php');



	$sql = "SELECT ID,Username,Password FROM Users WHERE Username='".$_POST["USERNAME"]."';";

	$result = mysqli_query($conn,$sql);


	if($row = mysqli_fetch_assoc($result)){








		// 如果找到记录了
		// 匹配 密码 MD5

		if(
			// md5($_POST["USERNAME"]) == md5($row["Username"])
			$_POST["USERNAME"] == $row["Username"]
			&&
			// md5($_POST["PASSWORD"]) == md5($row["Password"])
			$_POST["PASSWORD"] == $row["Password"]
		){

			// 登陆成功 记住身份
			session_start();

			$_SESSION["ID"] = $row["ID"];
			$_SESSION["Username"] = $row["Username"];

			// 查询上传了多少个文件
			// 查询文件是否满了300个
			$sql = "SELECT COUNT(ID) FROM Files WHERE UID=".$_SESSION["ID"].";";
			$result = mysqli_query($conn,$sql);
			$row = mysqli_fetch_assoc($result);
			// 如果超过100个
			$_SESSION["FileCount"] = $row["COUNT(ID)"];



			$sql = "SELECT SUM(FileSize) FROM `files` WHERE UID=".$_SESSION["ID"].";";

			$result = mysqli_query($conn,$sql);

			$row = mysqli_fetch_assoc($result);

			// 用户用了多少容量
			$_SESSION["UsedSize"] = $row["SUM(FileSize)"];






			mysqli_close($conn);


			// 登陆成功
			echo '{"status":true,"message":"ok"}';


			exit();


		}else{


			mysqli_close($conn);


			// 登陆失败
			echo '{"status":false,"message":"密码不正确！"}';


			exit();


		}






	}


	mysqli_close($conn);

	// 如果登陆未成功

	echo '{"status":false,"message":"帐号不存在！\r\n如果忘记帐号，可以联系网站管理员。\r\n本程序与云中转数据/帐号不互通，仅作临时演示。\r\n官网：https://www.yunzhongzhuan.com"}';


	exit();




}else{


	echo '{"status":false,"message":"no"}';


	exit();




}



















?>