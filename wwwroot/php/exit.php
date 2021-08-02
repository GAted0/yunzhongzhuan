<?php




//开启 Session

session_start();

// 删除所有 Session 变量

$_SESSION = array();

//判断 cookie 中是否保存 Session ID

if(isset($_COOKIE[session_name()])){

setcookie(session_name(),'',time()-3600, '/');

}

//彻底销毁 Session

session_destroy();




// 退出成功
echo '{"status":true,"message":"ok"}';


exit();









?>