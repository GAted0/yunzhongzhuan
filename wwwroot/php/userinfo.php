<?php




// 要求以 post 方式请求 获取用户信息
// 否则拒绝
if(
	!(isset($_POST["POST"]) && $_POST["POST"]!=null && $_POST["POST"]!="" && is_numeric($_POST["POST"]) && $_POST["POST"]>0)
){
	echo '{"status":false,"message":"no"}';
	exit();
}

// 开启 SESSION 判断用户是否已经登陆
session_start();


// 设置 Cookie 保存
header("Set-Cookie:PHPSESSID=".session_id().";expires=" . gmstrftime("%A, %d-%b-%Y %H:%M:%S GMT", time() + (60*60*24*30)) .  ";path=/;domain=".$_SERVER['SERVER_NAME']); // $_SERVER['SERVER_NAME'] // $_SERVER['HTTP_HOST']



if(
	isset($_SESSION["ID"]) && $_SESSION["ID"]!=null && $_SESSION["ID"]!="" && is_numeric($_SESSION["ID"]) && $_SESSION["ID"]>0
	&&
	isset($_SESSION["Username"]) && $_SESSION["Username"]!=null && $_SESSION["Username"]!=""
	&&
	isset($_SESSION["FileCount"]) && $_SESSION["FileCount"]!=null && $_SESSION["FileCount"]!="" && is_numeric($_SESSION["FileCount"]) && $_SESSION["FileCount"]>=0
){













	function formatBytes($size) { 
		$units = array('B', 'KB', 'MB', 'GB', 'TB'); 
		for ($i = 0; $size >= 1024 && $i < 4; $i++) $size /= 1024; 
		return round($size, 2).$units[$i]; 
	}


	// 容量是否超出
	/*
	if($FileSize > 20*1024*1024*1024 ){
	// 超出
	$_SESSION["rongliangchaochu"] = true;
	}else{
	// 未超出
	$_SESSION["rongliangchaochu"] = false;
	}*/


	$UsedSize = formatBytes($_SESSION["UsedSize"]); // 10.01 KB









	echo '{"status":true,"message":"ok","Username":"'.$_SESSION["Username"].'","UsedSize":"'.$UsedSize.'","phpsessid":"'.session_id().'"}';



	exit();



}else{


	echo '{"status":false,"message":"no"}';


	exit();



}





















?>