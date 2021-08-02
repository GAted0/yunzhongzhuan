<?php




// 连接数据库 Demo





$mysql_host = '127.0.0.1';	// 数据库 IP 地址
$mysql_username = 'root';	// 登录用户名
$mysql_password = 'LiWenhua1103';	// 用户密码
$mysql_database = 'inthenas';	// 数据库名称
$mysql_port = '3306';	// 数据库端口





// 连接对象
$conn = mysqli_connect($mysql_host,$mysql_username,$mysql_password,$mysql_database,$mysql_port);

if(!$conn){
	echo "数据库连接失败，请检查数据库配置文件（/php/mysql.php）中数据库名/用户名/密码/端口是否正确，或尝试重启服务器。";
	exit();
}




?>