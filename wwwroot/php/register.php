<?php


// 接收 注册
if(
	isset($_POST["USERNAME"]) && $_POST["USERNAME"]!="" && $_POST["USERNAME"]!=null
	&&
	isset($_POST["PASSWORD"]) && $_POST["PASSWORD"]!="" && $_POST["PASSWORD"]!=null
){






	// 先查询数据库 帐号 和 QQ 是否存在

	require_once('mysql.php');







	$sql = "SELECT Username FROM Users WHERE Username='".$_POST["USERNAME"]."';";

	$result = mysqli_query($conn,$sql);

	if($row = mysqli_fetch_assoc($result)){


		mysqli_close($conn);




		if(
			md5($_POST["USERNAME"]) == md5($row["Username"])
		){

			echo '{"status":false,"message":"帐号（'.$row["Username"].'）已被注册！"}';

			exit();


		}




		echo '{"status":false,"message":"未知错误！"}';

		exit();




	}






	// 写入数据库
	$sql = "INSERT INTO Users(ID,Username,Password) values(NULL,'".$_POST["USERNAME"]."','".$_POST["PASSWORD"]."');";

	mysqli_query($conn,$sql);





	mysqli_close($conn);



	echo '{"status":true,"message":"注册成功！"}';


	exit();






}else{


	echo '{"status":false,"message":"缺少参数!"}';

	exit();



}








?>