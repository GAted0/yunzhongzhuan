<?php


session_start();

if(
	isset($_SESSION["ID"])
	&&
	$_SESSION["ID"]!=null
	&&
	$_SESSION["ID"]!=""
	&&
	is_numeric($_SESSION["ID"])
	&&
	isset($_SESSION["Username"])
	&&
	$_SESSION["Username"]!=null
	&&
	$_SESSION["Username"]!=""
	&&
	isset($_POST["fileIDArrayString"])
	&&
	isset($_POST["folderIDArrayString"])
	&&
	isset($_POST["length"])
	&&
	$_POST["length"]!=null
	&&
	$_POST["length"]!=""
	&&
	is_numeric($_POST["length"])
	&&
	isset($_POST["length_folder"])
	&&
	$_POST["length_folder"]!=null
	&&
	$_POST["length_folder"]!=""
	&&
	is_numeric($_POST["length_folder"])
	&&
	isset($_POST["folderOf"])
	&&
	$_POST["folderOf"]!=null
	&&
	$_POST["folderOf"]!=""
	&&
	is_numeric($_POST["folderOf"])
){


	// 判断数组全是数字
	$fIDAS = explode(",",$_POST["fileIDArrayString"]);
	$folderIDAS = explode(",",$_POST["folderIDArrayString"]);
	if($_POST["fileIDArrayString"]==""){
		$fIDAS = [];
	}
	if($_POST["folderIDArrayString"]==""){
		$folderIDAS = [];
	}	
	if(count($fIDAS) == $_POST["length"] && count($folderIDAS) == $_POST["length_folder"]){


		$isNum = 0;

		for($i=0;$i<count($fIDAS);$i++){

			if ( is_numeric($fIDAS[$i]) ){

				$isNum = $isNum + 1;

			}

		}



		$isNum_folder = 0;

		for($i=0;$i<count($folderIDAS);$i++){

			if ( is_numeric($folderIDAS[$i]) ){

				$isNum_folder = $isNum_folder + 1;

			}

		}

		if( $isNum ==  $_POST["length"] && $isNum_folder ==  $_POST["length_folder"] ){



			if($isNum>0 || $isNum_folder>0){

				require_once('mysql.php');

			}


			if($isNum>0){


				$sql = "DELETE FROM files WHERE ID in(".$_POST["fileIDArrayString"].") AND UID=" . $_SESSION["ID"] . " AND Username='" . $_SESSION["Username"] . "';";

				mysqli_query($conn,$sql);

			}



			if($isNum_folder>0){




				// 层层删除文件和文件夹
				function DeleteFoldersAndFiles($folderID){

					global $conn;

					// 先删除文件夹内文件
					$sql = "DELETE FROM files WHERE UID=".$_SESSION["ID"]." AND FolderOf=".$folderID." AND Username='".$_SESSION["Username"]."'";

					mysqli_query($conn,$sql);






					// 如果文件夹内还有文件夹
					$sql = "SELECT * FROM folders WHERE UID=".$_SESSION["ID"]." AND Of='".$folderID."'";

					$result = mysqli_query($conn,$sql);

					while($row = mysqli_fetch_assoc($result)){

						// 还有文件夹 继续删除
						DeleteFoldersAndFiles($row["ID"]);


					}




					// 删除文件夹
					$sql = "DELETE FROM folders WHERE ID=".$folderID." AND UID=".$_SESSION["ID"].";";

					mysqli_query($conn,$sql);




				}


				for($index = 0;$index<count($folderIDAS);$index++){
					DeleteFoldersAndFiles($folderIDAS[$index]);
				}

				


				$sql = "DELETE FROM folders WHERE ID in(".$_POST["folderIDArrayString"].") AND UID=".$_SESSION["ID"].";";

				mysqli_query($conn,$sql);

			}



			if($isNum>0 || $isNum_folder>0){
				mysqli_close($conn);
			}



			echo '{"status":true,"message":"请求成功！"}';



		}else{

			echo '{"status":false,"message":"失败3！"}';


		}



	}else{

		echo '{"status":false,"message":"失败2！"}';

	}




}else{

	echo '{"status":false,"message":"失败1！"}';


}





?>