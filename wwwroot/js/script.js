
function CopyText(Text){
	var oInput = document.createElement('input');
	oInput.value = Text;
	document.body.appendChild(oInput);
	oInput.select(); // 选择对象
	document.execCommand("Copy"); // 执行浏览器复制命令
	oInput.className = 'oInput';
	oInput.style.display='none';
	oInput.remove();
	// ////////console.log("Copy OK!");
}



// 是否按下 CTRL 键
var isCTRL = false;


// 按键、热键
// 键盘按下
document.onkeydown = function (e) {
	e = e || window.event;
	if (e.ctrlKey && e.keyCode == 17) {// CTRL 按下
		isCTRL = true;
		return false;
	}
}

// 放开键盘
document.onkeyup = function (e){
	e = e || window.event;
	var keycode = e.keyCode;
	if (keycode == 17)
	{
		isCTRL = false;
		return false;
	}
}



var WebHomeURL = window.location.protocol+"//"+window.location.hostname;



// 打开/关闭		上传文件、创建目录		菜单
document.getElementsByClassName('upload-menu-buttons')[0].onclick=function(){
	if(document.getElementsByClassName('upload-menu-close')[0] != undefined){
		document.getElementsByClassName('upload-menu-close')[0].className = "upload-menu";
	}else if(document.getElementsByClassName('upload-menu')[0] != undefined){
		document.getElementsByClassName('upload-menu')[0].className = "upload-menu-close";
	}
}






// 上传文件		按钮		按下
for(
	var i=0;
	i<document.getElementsByClassName('upload-file-button').length;
	i++
	){
	document.getElementsByClassName('upload-file-button')[i].onclick=function(){
		document.getElementsByClassName('upload-file-input')[0].click();
	}
}






// 创建目录		按钮		按下
function createFolder(){

	swal({
		title: "新建目录",
		text: "请输入即将创建的目录名称",
		buttons: true,
		closeOnClickOutside: false,
		content: {
			element: "input",
			attributes: {
				placeholder: "新建文件夹",
				type: "text",
			},
		}
	}).then((value) => {

		if(value){

			var CreateFolderName = encodeURIComponent( value );

			var Folder = nowFolderPositionArray[nowFolderPositionArrayIndex];

			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					var ResultJSON = JSON.parse(xmlhttp.responseText);
					if(ResultJSON["status"]){



						FoldersOver = false;
						PageFolder = 0;
						getFolders(1,0,true);


					}
				}
			}
			xmlhttp.open("POST","php/createFolder.php",true);
			xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlhttp.send("CREATEFOLDERNAME=" + CreateFolderName + "&FOLDER=" + Folder);






		}
	});

}

// 给所有的		创建目录		按钮		设置点击事件
for(
	var i=0;
	i<document.getElementsByClassName('create-folder-button').length;
	i++
	){
	document.getElementsByClassName('create-folder-button')[i].onclick = createFolder;
}








// 先关闭所有		文件夹、文件		已经展开的菜单
function closeAllFolderOrFileMenu(){


	// 有多少个		文件夹、文件		就循环多少次
	for(
		var i=0;
		i<document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li').length;
		i++
		){

		// 如果菜单展开了，则收回去
		if(
			document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].getElementsByClassName('folders-or-file-li-menu')[0]!=undefined
			&&
			document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].getElementsByClassName('folders-or-file-li-menu-close')[0]==undefined
			){
			document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].getElementsByClassName('folders-or-file-li-menu')[0].className = "folders-or-file-li-menu-close";
		}

	}

}



// 延迟执行		显示		文件夹、文件		菜单
function openFolderOrFileMenu(This){
	
	// 延迟执行
	setTimeout(function(){
		This.getElementsByClassName('folders-or-file-li-menu-close')[0].className = "folders-or-file-li-menu";
	},10);

}


// 取消所有		文件夹、文件		的选中状态
function unsetAllFolderOrFileSelected(){

	// 有多少个		文件夹、文件		就循环多少次
	for(
		var i=0;
		i<document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li').length;
		i++
		){
		// 如果当前		文件夹、文件		被选中了
		if(
			document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].selected!=undefined
			&&
			document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].selected==true
			){
			// 取消选中
			unsetFolderOrFileSelected(document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i]);
		}
	}
}



// 解除		文件夹		双击、单击		冷却时间
function unsetFolderCooling(This){

	// 延迟执行
	setTimeout(function(){
		This.cooling = false;
	},220);

}








// 设置		文件夹、文件		选中
function setFolderOrFileSelected(This){

	// 设置		已被选中		边框
	This.style.border = "1px solid #a5a5a5";

	// 设置		已被选中		阴影
	This.style.boxShadow = "#b7b7b773 0px 0px 5px";

	// 设置选中状态为		假
	This.selected = true;

	// 冷却时间		防止		双击、单击		混合
	if(!isCTRL){
		This.cooling = true;
		unsetFolderCooling(This);
	}
}








// 设置		文件夹、文件		取消选中
function unsetFolderOrFileSelected(This){

	// 设置		已被选中		边框
	// This.style.border = "1px solid #d4d4d4";
	This.style.border = "";

	// 设置		已被选中		阴影
	// This.style.boxShadow = "#ffffff00 0px 0px 0px";
	This.style.boxShadow = "";

	// 设置选中状态为		假
	This.selected = false;

	// 冷却时间		防止		双击、单击		混合
	if(!isCTRL){
		This.cooling = true;
		unsetFolderCooling(This);
	}
}




// 剪切		选中的		文件夹、文件		存放 ID 的数组
// 剪切的文件、剪切的文件夹
var cutFolderArray = [];
var cutFileArray = [];

// 字符串化
var FoldersArrayString;
var FilesArrayString;
var FolderLength;
var FileLength;


// 清空剪切
function setCutArrayToNull(){

	cutFolderArray = [];
	cutFileArray = [];

	FoldersArrayString = "";
	FilesArrayString = "";
	FolderLength = 0;
	FileLength = 0;

}



// 返回上层菜单
function backParentFolder(ParentFolderID){


	// 文件夹位置推出一步
	nowFolderPositionArrayIndex--;

	// 让文件夹不要再往前前进
	nowFolderPositionArray[nowFolderPositionArrayIndex+2] = -1;

	// 判断是否第一层
	FilesBackFolderButton();

	// 父级菜单
	nowFolderPosition = ParentFolderID;
	// 文件夹加载完了吗？不


	// 文件加载完了吗？不
	FoldersOver = false;
	PageFolder = 0;
	getFolders();




}






// 隐藏显示返回上级目录按钮
function FilesBackFolderButton(){

if(
	nowFolderPositionArrayIndex>0
){



	if(document.getElementsByClassName('folder-back')[0].getElementsByClassName('folders-or-file-li-close')[0]!=undefined){
		document.getElementsByClassName('folder-back')[0].getElementsByClassName('folders-or-file-li-close')[0].className = "folders-or-file-li";

	}
	


	if(document.getElementsByClassName('folder-back')[0].getElementsByClassName('folders-or-file-li')[0]!=undefined){

		document.getElementsByClassName('folder-back')[0].getElementsByClassName('folders-or-file-li')[0].ondblclick = backParentFolder;

		document.getElementsByClassName('folder-back')[0].getElementsByClassName('folders-or-file-li')[0].getElementsByClassName('folder-back-button')[0].getElementsByTagName('span')[0].onclick = function(){


			backParentFolder();


		}

	}



}else{

	if(document.getElementsByClassName('folder-back')[0].getElementsByClassName('folders-or-file-li')[0]!=undefined){
		document.getElementsByClassName('folder-back')[0].getElementsByClassName('folders-or-file-li')[0].className = "folders-or-file-li-close";
	}

	if(document.getElementsByClassName('folder-back')[0].getElementsByClassName('folders-or-file-li')[0]!=undefined){

		document.getElementsByClassName('folder-back')[0].getElementsByClassName('folders-or-file-li')[0].ondblclick = function(){
			return false
		};

		document.getElementsByClassName('folder-back')[0].getElementsByClassName('folders-or-file-li')[0].getElementsByClassName('folder-back-button')[0].getElementsByTagName('span')[0].onclick = function(){


			return false;


		}

	}



}


}





// 重命名
function FileRename(Element){



	if(
		Element.type = "file"
	){


		var FileID = Element.fileID;

		var Hash = Element.hash;

		var Folder = Element.parentFolderID;

		var FileSize = Element.fileSize;

		var CreateDatetime = encodeURIComponent(Element.createDatetime);

		swal("新的文件名称", {
			content: {
			element: "input",
			attributes: {
			// placeholder: "新的文件名",
			value:Element.fileName,
			type: "text",
			},
			},
			closeOnClickOutside: false,
			buttons:true,
		}).then((value) => {
		  if(value) {

			var NewFileName = encodeURIComponent(value);

			////////console.log(NewFileName);



			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					var ResultJSON = JSON.parse(xmlhttp.responseText);
					if(ResultJSON["status"]){

						Element.fileName = value;

						Element.getElementsByClassName('folders-or-file-li-title')[0].getElementsByTagName('span')[0].innerText = value;


					}
				}
			}
			xmlhttp.open("POST","php/fileRename.php",true);
			xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlhttp.send("FILEID=" + FileID + "&HASH=" + Hash + "&FOLDER=" + Folder + "&FILESIZE=" + FileSize + "&CREATEDATETIME=" + CreateDatetime + "&NEWFILENAME=" + NewFileName);





		  }
		});

	}







}









// 文件夹重命名
function FolderRename(Element){

	////////console.log(Element);






	if(
		Element.type = "folder"
	){


		var FileID = Element.folderID;

		var Folder = Element.parentFolderID;

		var CreateDatetime = encodeURIComponent(Element.createDatetime);

		swal("新的文件名称", {
			content: {
			element: "input",
			attributes: {
			// placeholder: "新的文件名",
			value:Element.folderName,
			type: "text",
			},
			},
			closeOnClickOutside: false,
			buttons:true,
		}).then((value) => {
		  if(value) {

			var NewFolderName = encodeURIComponent(value);

			////////console.log(NewFolderName);


			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					var ResultJSON = JSON.parse(xmlhttp.responseText);
					if(ResultJSON["status"]){

						Element.folderName = value;

						Element.getElementsByClassName('folders-or-file-li-title')[0].getElementsByTagName('span')[0].innerText = value;


					}
				}
			}
			xmlhttp.open("POST","php/folderRename.php",true);
			xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlhttp.send("FOLDERID=" + FileID + "&FOLDER=" + Folder + "&CREATEDATETIME=" + CreateDatetime + "&NEWFOLDERNAME=" + NewFolderName);





		  }
		});

	}
























}





// 在		文件夹、文件		区域		右键
document.getElementsByClassName('folders-or-file')[0].oncontextmenu=function(){




	// 先打开菜单全部选项
	for(
		var i=0;
		i<document.getElementsByClassName('menu')[0].getElementsByClassName('upload-menu-button').length;
		i++
		){

		document.getElementsByClassName('menu')[0].getElementsByClassName('upload-menu-button')[i].style.display = "block";

	}


	// 获取选中了多少个		文件夹、文件
	var selectedFolderNum = 0;
	var selectedFileNum = 0;

	// 最后选中的文件
	var lastSelectedFileElement;
	var lastSelectedFolderElement;
	for(
		var i=0;
		i<document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li').length;
		i++
	){
		// 如果选中了		并且		文件夹、文件
		if(
			document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].selected!=undefined
			&&
			document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].selected==true
		){

			if(
				document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].type == "folder"
				){
					selectedFolderNum++;

					// 最后选中的文件夹元素
					lastSelectedFolderElement = document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i];

					// 重命名 菜单
					document.getElementsByClassName('menu')[0].getElementsByClassName('rename-button')[0].renameFolderRename = lastSelectedFolderElement;
					document.getElementsByClassName('menu')[0].getElementsByClassName('rename-button')[0].onclick = function(){
						FolderRename(this.renameFolderRename)
					}


			}else if(
				document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].type == "file"
				){
				selectedFileNum++;
				lastSelectedFileElement = document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i];

				// 分享文件
				document.getElementsByClassName('menu')[0].getElementsByClassName('share-file-button')[0].sharefileElement = lastSelectedFileElement;
				document.getElementsByClassName('menu')[0].getElementsByClassName('share-file-button')[0].onclick = function(){
					ShareFile(this.sharefileElement)
				}

				// 重命名 菜单
				document.getElementsByClassName('menu')[0].getElementsByClassName('rename-button')[0].renameFileRename = lastSelectedFileElement;
				document.getElementsByClassName('menu')[0].getElementsByClassName('rename-button')[0].onclick = function(){
					FileRename(this.renameFileRename)
				}


			}


		}

	}


	// 菜单 下载按钮
	if(lastSelectedFileElement!=undefined && lastSelectedFileElement.downloadlink!=undefined){
		document.getElementsByClassName('menu')[0].getElementsByClassName('file-download-link')[0].href = lastSelectedFileElement.downloadlink;
		document.getElementsByClassName('menu')[0].getElementsByClassName('link-file-button')[0].downloadlink = lastSelectedFileElement.downloadlink;
		document.getElementsByClassName('menu')[0].getElementsByClassName('link-file-button')[0].onclick = function(){
			showFileDownloadLink(this.downloadlink);
		}

	}



	


	// ////////console.log("folder " + selectedFolderNum);
	// ////////console.log("file " + selectedFileNum);


	// 如果没有剪切文件
	//隐藏 粘贴 按钮
	if(
		( cutFolderArray.length + cutFileArray.length ) == 0
	){
		// 隐藏 粘贴 按钮
		document.getElementsByClassName('menu')[0].getElementsByClassName('paste-button')[0].style.display = "none";
		// 隐藏 粘贴 按钮
		document.getElementsByClassName('menu')[0].getElementsByClassName('no-paste-button')[0].style.display = "none";



	}



	// 如果处于 0 文件夹 不显示返回
	if(
		nowFolderPosition > 0
	){

		document.getElementsByClassName('menu')[0].getElementsByClassName('back-folder-button')[0].style.display = "block";



		document.getElementsByClassName('menu')[0].getElementsByClassName('back-folder-button')[0].onclick = function(){


			backParentFolder();


		}



	}else{


		document.getElementsByClassName('menu')[0].getElementsByClassName('back-folder-button')[0].style.display = "none";



		document.getElementsByClassName('menu')[0].getElementsByClassName('back-folder-button')[0].onclick = function(){

			return false;

		}



	}




	// 是否有前一级目录
	if(
		nowFolderPositionArray[nowFolderPositionArrayIndex+1]!=undefined && nowFolderPositionArray[nowFolderPositionArrayIndex+1]>0
	){



		for(
			var i = 0;
			i < document.getElementsByClassName('folders-main')[0].getElementsByClassName('folders-or-file-li').length;
			i ++
		){

			////////console.log(i);

			if(
				document.getElementsByClassName('folders-main')[0].getElementsByClassName('folders-or-file-li')[i].folderID == nowFolderPositionArray[nowFolderPositionArrayIndex+1]
			){

				document.getElementsByClassName('menu')[0].getElementsByClassName('go-to-folder-button')[0].style.display = "block";

				document.getElementsByClassName('menu')[0].getElementsByClassName('go-to-folder-button')[0].goToFolderElement = document.getElementsByClassName('folders-main')[0].getElementsByClassName('folders-or-file-li')[i].getElementsByClassName('folders-or-file-li-title')[0].getElementsByTagName('span')[0];

				document.getElementsByClassName('menu')[0].getElementsByClassName('go-to-folder-button')[0].onclick = function(){
					this.goToFolderElement.click();
				}

				////////console.log("文件夹可以前进");

				break;

			}

		}

	}else{

		document.getElementsByClassName('menu')[0].getElementsByClassName('go-to-folder-button')[0].style.display = "none";

		document.getElementsByClassName('menu')[0].getElementsByClassName('go-to-folder-button')[0].onclick = function(){
			return false;
		}



	}





	// 如果一个文件都没有选中
	// 或
	// 选中了		文件夹、文件		数量大于 1
	if(
		(selectedFolderNum + selectedFileNum) == 0
		||
		(selectedFolderNum + selectedFileNum) > 0
	){






		// 如果		选择了		包括			文件夹
		if(
			selectedFolderNum > 0
			||
			(selectedFolderNum + selectedFileNum) == 0
			||
			selectedFileNum > 1
			){




			document.getElementsByClassName('menu')[0].getElementsByClassName('file-download-link')[0].href = "javascript:;";

			// 隐藏 下载 按钮
			document.getElementsByClassName('menu')[0].getElementsByClassName('download-file-button')[0].style.display = "none";

			// 隐藏 分享 按钮
			document.getElementsByClassName('menu')[0].getElementsByClassName('share-file-button')[0].style.display = "none";

			// 隐藏 外链 按钮
			document.getElementsByClassName('menu')[0].getElementsByClassName('link-file-button')[0].style.display = "none";

			// 如果多选了		文件夹、文件
			// 则
			// 隐藏 命名 按钮
			if(
				(selectedFolderNum + selectedFileNum) > 1
				||
				(selectedFolderNum + selectedFileNum) == 0
				){
				
				// 隐藏 命名 按钮
				document.getElementsByClassName('menu')[0].getElementsByClassName('rename-button')[0].style.display = "none";


			}


		}



		// 如果没选中
		if(
			(selectedFolderNum + selectedFileNum) == 0
		){

			// 隐藏 剪切 按钮
			document.getElementsByClassName('menu')[0].getElementsByClassName('cut-button')[0].style.display = "none";

			// 隐藏 不选 按钮
			document.getElementsByClassName('menu')[0].getElementsByClassName('unselect-all-button')[0].style.display = "none";


			// 隐藏 删除 按钮
			document.getElementsByClassName('menu')[0].getElementsByClassName('delete-file-button')[0].style.display = "none";



		}else if(
			(selectedFolderNum + selectedFileNum) == document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li').length
		){

			// 如果全选了
			// 隐藏 全选 按钮
			document.getElementsByClassName('menu')[0].getElementsByClassName('select-all-button')[0].style.display = "none";
		}

		

	}









	// 获取坐标
	var e = e || window.event;
	//鼠标点的坐标
	var oX = e.clientX;
	var oY = e.clientY;
	//菜单出现后的位置
	document.getElementsByClassName('menu')[0].style.left = oX + "px";
	document.getElementsByClassName('menu')[0].style.top = oY + "px";
	document.getElementsByClassName('menu')[0].style.display = "block";


	// 拦截默认右键的浏览器菜单
	return false;

}



// 文件夹、文件		区域左键点击		关闭菜单
document.getElementsByClassName('folders-or-file')[0].onclick = function(e) {
	var e = e || window.event;
	document.getElementsByClassName('menu')[0].style.display = "none"
}



// 整个网页		区域左键点击		关闭菜单
document.onclick = function(e) {
	var e = e || window.event;
	document.getElementsByClassName('menu')[0].style.display = "none"
}



// 返回顶部
function goTop(){



	// 如果手机端、移动端菜单已经打开则关闭
	if(document.getElementsByClassName('mobile-menu')[0].style.display == "block"){

		// 点击关闭手机端、移动端菜单
		document.getElementsByClassName('mobile-menu-content-background-color')[0].click();

	}



	// 返回顶部
	window.scrollTo({
		top:0,
		behavior:'smooth',
	});


}


// 手机端全部文件
document.getElementById('mobile-menu-files').onclick = function(){

	ForSetMobileMenuIndex(this);

	if(
		Userinfo["Username"] != undefined
	){

		window.location.href = "#files";

	}else{

		window.location.href = "#login";

	}

}



// 到达网站底部
function goBottom(){

	//document.documentElement.scrollTop=88888888;
	// 返回底部
	window.scrollTo({
		top:88888888,
		behavior:'smooth',
	});



}





// 删除文件
function DeleteFile(Element){


	var fileIDArrayString = Element.fileID;

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){


				function test(div){
					div.className = "folders-or-file-li-close";
					setTimeout(function(){
						div.remove();
					},250);
				}
				test(Element);

			}
		}
	}
	xmlhttp.open("POST","php/v1_delete_files.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send("fileIDArrayString="+fileIDArrayString+"&folderIDArrayString=&length=1&length_folder=0&folderOf="+nowFolderPositionArray[nowFolderPositionArrayIndex]);





}




// 删除文件
function DeleteFolder(Element){


	var folderIDArrayString = Element.folderID;

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){


				function test(div){
					div.className = "folders-or-file-li-close";
					setTimeout(function(){
						div.remove();
					},250);
				}
				test(Element);

			}
		}
	}
	xmlhttp.open("POST","php/v1_delete_files.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send("fileIDArrayString=&folderIDArrayString="+folderIDArrayString+"&length=0&length_folder=1&folderOf="+nowFolderPositionArray[nowFolderPositionArrayIndex]);





}







// 删除文件 包括选中的文件夹
function DeleteFiles(){

	// 选中 文件 数量
	var SelectedFilesArray = [];
	var SelectedFilesArrayForElement = [];

	// 选中 文件夹 数量
	var SelectedFoldersArray = [];
	var SelectedFoldersArrayForElement = [];


	// 获取选中了多少个文件
	for(
		var i = 0;
		i < document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li').length;
		i ++
	){

		if(
			document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].selected != undefined
			&&
			document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].selected == true
		){

			var Element = document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i];

			if(
				Element.type == "file"
			){
				SelectedFilesArray.push(Element.fileID);
				SelectedFilesArrayForElement.push(Element);
			}else if(
				Element.type == "folder"
			){
				SelectedFoldersArray.push(Element.folderID);
				SelectedFoldersArrayForElement.push(Element);
			}



		}

	}



	var fileIDArrayString = SelectedFilesArray.toString();

	var folderIDArrayString = SelectedFoldersArray.toString();

	var length = SelectedFilesArray.length;

	var length_folder = SelectedFoldersArray.length;


	var folderOf = nowFolderPositionArray[nowFolderPositionArrayIndex];



	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){


				unsetAllFolderOrFileSelected();


				for(
					var i = 0;
					i < SelectedFilesArrayForElement.length;
					i ++
				){

					var div = SelectedFilesArrayForElement[i];
					function test(div,i){
						setTimeout(function(){
							div.className = "folders-or-file-li-close";
							setTimeout(function(){
								div.remove();
							},250);
						},(i*20)+20);
					}
					test(div,i);

				}


				for(
					var i = 0;
					i < SelectedFoldersArrayForElement.length;
					i ++
				){

					var div = SelectedFoldersArrayForElement[i];
					function test(div,i){
						setTimeout(function(){
							div.className = "folders-or-file-li-close";
						},(i*20)+20);
					}
					test(div,i);

				}



			}
		}
	}
	xmlhttp.open("POST","php/v1_delete_files.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send("fileIDArrayString="+fileIDArrayString+"&folderIDArrayString="+folderIDArrayString+"&length="+length+"&length_folder="+length_folder+"&folderOf="+folderOf);




}


// 菜单多选删除文件
document.getElementsByClassName('delete-file-button')[0].onclick = DeleteFiles;




// 返回顶部 按钮
document.getElementById('go-top-button').onclick = goTop;
document.getElementById('mobile-go-top-button').onclick = goTop;
document.getElementsByClassName('header-go-top-element')[0].onclick = goTop;
document.getElementsByClassName('menu')[0].getElementsByClassName('menu-go-top-button')[0].onclick = goTop;
document.getElementsByClassName('menu')[0].getElementsByClassName('menu-go-bottom-button')[0].onclick = goBottom;

// 返回顶部 按钮
for(
	var i=0;
	i<document.getElementsByClassName('go-top-2').length;
	i++
	){
	document.getElementsByClassName('go-top-2')[i].onclick = goTop;
}




// 点击		上传列表		关闭按钮		关闭列表
function uploadListClose(){

	document.getElementsByClassName('upload-file-list')[0].style.height = "50px";

	document.getElementsByClassName('upload-list-display-none')[0].style.display = "none";
	document.getElementsByClassName('upload-list-display-block')[0].style.display = "block";
	document.getElementsByClassName('go-top-2')[0].style.marginBottom = "-300px";

}

// 点击		上传列表		关闭按钮		关闭列表
document.getElementsByClassName('upload-list-display-none')[0].onclick = uploadListClose;



// 点击上传列表头部直接打开列表
document.getElementsByClassName('upload-file-list-main-header-title-div')[0].onclick = function(){
	if(document.getElementsByClassName('upload-list-display-block')[0].style.display == "block"){
		document.getElementsByClassName('upload-list-display-block')[0].click();
		return false;
	}
	if(document.getElementsByClassName('upload-list-display-none')[0].style.display == "block"){
		document.getElementsByClassName('upload-list-display-none')[0].click();
		return false;
	}
};



// 点击		上传列表		关闭按钮		关闭列表
// document.getElementsByClassName('upload-list-close')[0].onclick = uploadListDisplayNone;
document.getElementsByClassName('upload-list-close')[0].onclick = uploadListClose;





// 消除		左侧导航	
function unsetNavLiClassName(){

	for(
		var i = 0;
		i<document.getElementsByClassName('nav')[0].getElementsByClassName('nav-li').length;
		i++
	){

		document.getElementsByClassName('nav')[0].getElementsByClassName('nav-li')[i].className = "nav-li";

	}

}





// 上传列表		隐藏起来
function uploadListDisplayNone(){

	document.getElementsByClassName('upload-file-list')[0].style.height = "0px";

	document.getElementsByClassName('upload-list-display-none')[0].style.display = "block";
	document.getElementsByClassName('upload-list-display-block')[0].style.display = "none";
	document.getElementsByClassName('go-top-2')[0].style.marginBottom = "-350px";

}




// 点击		上传列表		打开按钮		打开列表
function uploadListOpen(){

	document.getElementsByClassName('upload-file-list')[0].style.height = "450px";

	document.getElementsByClassName('upload-list-display-none')[0].style.display = "block";
	document.getElementsByClassName('upload-list-display-block')[0].style.display = "none";
	document.getElementsByClassName('go-top-2')[0].style.marginBottom = "100px";

}

// 点击		上传列表		打开按钮		打开列表
document.getElementsByClassName('upload-list-display-block')[0].onclick = uploadListOpen;







// 给上传列表的元素添加删除功能
for(
	var i = 0;
	i<document.getElementsByClassName('upload-file-list-li').length;
	i++
	){



	// 他的父级元素
	document.getElementsByClassName('upload-file-list-li')[i].getElementsByClassName('upload-file-list-li-controls-remove')[0].theParentElement = document.getElementsByClassName('upload-file-list-li')[i];

	document.getElementsByClassName('upload-file-list-li')[i].getElementsByClassName('upload-file-list-li-controls-remove')[0].onclick = function(){

		this.theParentElement.remove();

	}



}








// 全选		文件夹、文件
function setAllFolderOrFileSelected(){

	// 根据		文件夹、文件		数量		循环
	for(
		var i=0;
		i<document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li').length;
		i++
		){

		// 如果 还没选中
		if(
			i<document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].selected!=undefined
			&&
			i<document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].selected==false
			){

			document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].index = i;
			setFolderOrFileSelected(document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i]);

		}

	}


}


// 全选按钮
for(
	var i=0;
	i<document.getElementsByClassName('select-all-button').length;
	i++
	){

	document.getElementsByClassName('select-all-button')[i].onclick = setAllFolderOrFileSelected;

}

// 不选按钮（全选的相反按钮）
for(
	var i=0;
	i<document.getElementsByClassName('unselect-all-button').length;
	i++
	){

	document.getElementsByClassName('unselect-all-button')[i].onclick = unsetAllFolderOrFileSelected;

}

// 清空剪切
for(
	var i=0;
	i<document.getElementsByClassName('no-paste-button').length;
	i++
	){

	document.getElementsByClassName('no-paste-button')[i].onclick = setCutArrayToNull;

}







// 粘贴
function pasteFolderOrFile(){

	var Folder = nowFolderPositionArray[nowFolderPositionArrayIndex];

	var Function_FoldersArrayString = FoldersArrayString;

	var Function_FolderLength = FolderLength;

	var Function_FilesArrayString = FilesArrayString;

	var Function_FileLength = FileLength;

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){



				// 粘贴完成 清空
				setCutArrayToNull();
				

				FoldersOver = false;
				PageFolder = 0;
				// getFolders(Function_FolderLength,Function_FileLength,true,0);
				getFolders(undefined,Function_FileLength,true,0);

				



			}
		}
	}
	xmlhttp.open("POST","php/pasteFolderOrFile.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send("FOLDER=" + Folder + "&FOLDERSARRAY=" + Function_FoldersArrayString + "&FOLDERSLENGTH=" + Function_FolderLength + "&FILESARRAY=" + Function_FilesArrayString + "&FILESLENGTH=" + Function_FileLength);


}



// 粘贴按钮
document.getElementsByClassName('paste-button')[0].onclick = function(){


	pasteFolderOrFile();




}










// 剪切
function cutFolderOrFile(){


	cutFileArray = [];

	cutFolderArray = [];

	for(
		var i=0;
		i<document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li').length;
		i++
		){

		if(
			document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].type!=undefined
			&&
			document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].selected!=undefined
			&&
			document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].selected==true
		){


			// 剪切 加入 数组


			// 如果是		文件夹
			if(
				document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].type == "folder"
				){

				cutFolderArray.push(document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].folderID);

			}



			// 如果是		文件
			if(
				document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].type == "file"
				){

				cutFileArray.push(document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i].fileID);

			}



		}

	}


	// 文件夹字符串
	FoldersArrayString = cutFolderArray.toString();
	////////console.log(FoldersArrayString);

	// 文件字符串
	FilesArrayString = cutFileArray.toString();
	////////console.log(FilesArrayString);

	// 文件夹长度
	FolderLength = cutFolderArray.length;
	////////console.log(FolderLength);

	// 文件长度
	FileLength = cutFileArray.length;
	////////console.log(FileLength);





}



for(
	var i=0;
	i<document.getElementsByClassName('cut-button').length;
	i++
	){

	document.getElementsByClassName('cut-button')[i].onclick = cutFolderOrFile;

}






// 文件夹、文件		点击显示菜单列表
// 根据		文件夹、文件		数量
function setFoldersAndFilesSelected(Element){






	// 给所以		文件夹、文件		设置		点击选中		效果
	Element.getElementsByClassName('folders-or-file-li-title')[0].onclick=function(){

		// 如果已经选中了		取消选中
		if(
		Element.selected!=undefined
		&&
		Element.selected==true
		){

			// 被选中		那就取消选中吧！
			// 如果		文件夹		还在冷却时间内		不执行
			if(
				Element.cooling!=undefined
				&&
				Element.cooling==true
				){
				return false;
			}

			// 提交给函数		设置		文件夹、文件 	取消选中
			unsetFolderOrFileSelected(Element);


			// 如果		没有按下 CTRL 键		则		取消所有选中的		文件夹、文件
			if(!isCTRL){
				unsetAllFolderOrFileSelected();
			}



		}else{

			// 未被选中		那就选中吧！

			// 先取消选其他被中的		文件夹、文件
			// 如果按下了 CTRL 则不执行
			if(!isCTRL){
				unsetAllFolderOrFileSelected();
			}

			// 设置		选中
			setFolderOrFileSelected(Element);

			// 冷却时间		防止		双击、单击		混合
			if(!isCTRL){
				Element.cooling = true;
				unsetFolderCooling(Element);
			}


		}



	}
	// 创建时间、大小		也设置点击事件
	Element.getElementsByClassName('folders-or-file-li-datetime')[0].index=i;
	Element.getElementsByClassName('folders-or-file-li-datetime')[0].onclick=function(){
		Element.getElementsByClassName('folders-or-file-li-title')[0].click();
	}
	Element.getElementsByClassName('folders-or-file-li-filesize')[0].index=i;
	Element.getElementsByClassName('folders-or-file-li-filesize')[0].onclick=function(){
		Element.getElementsByClassName('folders-or-file-li-title')[0].click();
	}




	function openFolder(){

		// 如果		按下了 CTRL 键		双击无效
		if(isCTRL){
			return false;
		}

		// 如果是文件
		if(
			Element.type == "file"
		){


		////////console.log("双击文件 " + this.theParentElement.index);

		}else if(Element.type == "folder"){

		////////console.log("双击文件夹 " + this.theParentElement.index);


			// 更改文件夹位置目录位置 加载文件夹和文件

			nowFolderPosition = this.theParentElement.index;

			////////console.log("当前文件夹位置 " + nowFolderPosition);


			// 更新它的父文件夹 ID
			// this.theParentElement.parentFolderID;


			// 先删除完文件列表中的文件和文件夹

			for(
				var i = 0;
				i < document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li').length;
				i ++
			){
				var div = document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i];
				function test(div,i){
					setTimeout(function(){
						div.className = "folders-or-file-li-close";
						setTimeout(function(){
							div.remove();
						},250);
					},(i*20)+20);
					
				}
				test(div,i);
			}



			// 进入文件夹之前关闭搜索输入的内容
			document.getElementsByClassName('search-input')[0].value = "";
			nowFolderPositionArrayIndex++;
			nowFolderPositionArray[nowFolderPositionArrayIndex] = nowFolderPosition;
			nowFolderPositionArray[nowFolderPositionArrayIndex+1] = -1;
			// 来自文件夹点击事件
			// 设置文件夹和文件没加载完


			FoldersOver = false;
			PageFolder = 0;

			getFolders();


		}


		////////console.log("父级文件夹ID " + this.theParentElement.parentFolderID);


	}


	// 双击		文件夹
	Element.getElementsByClassName('folders-or-file-li-title')[0].ondblclick = openFolder;
	Element.getElementsByClassName('folders-or-file-li-title')[0].getElementsByTagName('span')[0].onclick = openFolder;
	

	// 给所有		文件夹、文件		菜单图标		设置		点击事件
	Element.getElementsByClassName('folders-or-file-li-menu-icon')[0].onclick=function(){



		if(
			this.getElementsByClassName('folders-or-file-li-menu-close')[0]!=undefined
			){

			// 确定要打开当前		文件夹、文件		的菜单
			// 关闭所有		文件夹、文件		已经展开的菜单
			closeAllFolderOrFileMenu();

			// 显示菜单		延迟执行
			openFolderOrFileMenu(this);



		}else if(
			this.getElementsByClassName('folders-or-file-li-menu')[0]!=undefined
			){

			this.getElementsByClassName('folders-or-file-li-menu')[0].className = "folders-or-file-li-menu-close";

		}






	}




}





// 点击		显示、隐藏		密码
document.getElementsByClassName('login-left-content-input-icon-show-password')[0].onclick = function(){

	if(
		document.getElementsByClassName('login-left-content-input-password')[0].getElementsByTagName('input')[0].type == "password"
		){


		document.getElementsByClassName('login-left-content-input-password')[0].getElementsByTagName('input')[0].type = "text";
		this.getElementsByTagName('i')[0].className = "fa fa-eye";


	}else{


		document.getElementsByClassName('login-left-content-input-password')[0].getElementsByTagName('input')[0].type = "password";
		this.getElementsByTagName('i')[0].className = "fa fa-eye-slash";


	}


}








function ResetPassword(){

	swal("请联系网站的管理员找回密码。网站管理员请让开发者二次开发找回密码功能。在数据库中 Users 表中查找相应用户名的密码。");

}



// 从登录页面打开找回密码
document.getElementsByClassName('login-left-content-div-forgot-password')[0].onclick = ResetPassword;















// 是否滚动到底部
function getScrollTop(){
　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
}
//文档的总高度
function getScrollHeight(){
　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　if(document.body){
　　　　bodyScrollHeight = document.body.scrollHeight;
　　}
　　if(document.documentElement){
　　　　documentScrollHeight = document.documentElement.scrollHeight;
　　}
　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
　　return scrollHeight;
}
 
//浏览器视口的高度
function getWindowHeight(){
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
}






// 冻结期
var PageScrollCooling = false;

// 时刻判断是否滚动到底部
// 文件 页数
var Page = 0;
// 文件夹页数
var PageFolder = 0;



function PageScroll(){


	// 如果滚动冻结中 或 文件加载中 或 文件夹加载中
	if(PageScrollCooling ||  FilesLoading || FoldersLoading  ){

		////////console.log("滚动冻结中");

		setTimeout(PageScroll,500);

		return false;

	}


	// 如果没有文件
	/*
	if(document.getElementsByClassName('files-main')[0].getElementsByClassName('folders-or-file-li').length < 1){

		setTimeout(PageScroll,500);

		return false;

	}*/



	if(
		document.getElementsByClassName('files-div')[0]!=undefined
		&&
		Userinfo["Username"]!=undefined
	){

		if(getScrollTop() + getWindowHeight() > (getScrollHeight()-(getWindowHeight()/2))  ){


			// 延迟执行 滚动解冻
			/*
			setTimeout(function(){
				////////console.log("滚动解冻");
					PageScrollCooling = false;
			},2000);
			*/

			// 如果 文件 或 文件夹 没有在加载中
			if(  FoldersLoading == false && FilesLoading == false ){


				// 冻结先 防止 重复 触发
				PageScrollCooling = true;

				/*
				Page++;
				getFiles();
				////////console.log(Page);
				*/

				// 加载文件夹 实际上也是加载文件
				getFolders();

			}

		}

	}

	setTimeout(PageScroll,500);

}
setTimeout(PageScroll,500);




























// 防止搜索重复
var SearchTimesForFolders = 0;
var SearchTimesForFiles = 0;


// 正在加载中
var FoldersLoading = false;
var FilesLoading = false;

// 文件加载完了
var FilesOver = false;
// 文件夹加载完 了
var FoldersOver = false;

// 获取文件夹
// 文件夹 长度
// 文件 长度
// 指定 文件 页数
function getFolders(FolderLength,FileLength,Prepend,FilePage){


	//  如果文件夹正在加载中
	if(FoldersLoading){
		return false;
	}






	// 如果文件夹已经加载完了
	if(
		FoldersOver
	){
		////////console.log("文件夹已经加载完了");
		// 如果文件没加载完
		if(!FilesOver && FilesLoading==false){
			// 加载文件
			getFiles(FileLength,Prepend,FilePage);
			return false;

		}

		// 文件也加载完了 所以不执行了
		return false;
	}




	// 加载中
	FoldersLoading = true;



	// 判断是否第一层
	FilesBackFolderButton();

	// 如果没指定长度
	var Function_FolderLength = FolderLength;
	if(Function_FolderLength==undefined){
		Function_FolderLength = 20;
	}




	var Keyword = encodeURIComponent(document.getElementsByClassName('search-input')[0].value);

	var xmlhttp = new XMLHttpRequest();

	// 防止搜索碰撞
	SearchTimesForFolders++;
	xmlhttp.SearchTimesForFolders = SearchTimesForFolders;


	// 循环跑判断如果搜索次数不对了 取消本次搜索
	function SearchTimes(){
		if(xmlhttp.SearchTimesForFolders != SearchTimesForFolders){
			xmlhttp.abort();
			//////////console.log("取消搜索");
		}else{
			setTimeout(SearchTimes,100);
			//////////console.log("搜索中");
		}
	}

	SearchTimes();




	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){



				// 文件夹数量+1
				PageFolder++;

				
				// 如果没有指定加载数量
				if(FolderLength==undefined || FolderLength < 1 || ResultJSON["data"].length == 0 ){
					// 并且 文件夹 加载数量小于
					if(
						ResultJSON["data"].length < Function_FolderLength && FilesLoading == false
					){
						////////console.log("文件夹加载完了");


						// 文件夹加载完了
						FoldersOver = true;
						FilesOver = false;
						// 加载文件页数 重置
						Page = 0;
						// 加载文件
						getFiles(FileLength,Prepend,FilePage);
						
					}
				}





				for(
					var i = 0;
					i < ResultJSON["data"].length;
					i ++
				){


					// 创建元素
					var div = document.createElement('div');

					// 文件夹的ID
					div.folderID = ResultJSON["data"][i]["ID"];

					// 查询列表中是否已经存在该目录
					var isTrue = false;
					for(
						var i2 = 0;
						i2 < document.getElementsByClassName('folders-main')[0].getElementsByClassName('folders-or-file-li').length;
						i2 ++
					){

						if(
							document.getElementsByClassName('folders-main')[0].getElementsByClassName('folders-or-file-li')[i2].folderID == div.folderID
						){
							isTrue = true;
							break;

						}

					}

					if(!isTrue){


						div.index = div.folderID;


						div.className = "folders-or-file-li-close";

						// 文件夹的名称
						div.folderName = ResultJSON["data"][i]["FolderName"];

						// 文件夹创建时间
						div.createDatetime = ResultJSON["data"][i]["CreateDatetime"];

						div.innerHTML = '<div class="folders-or-file-folder-li-icon"><i class="fa fa-folder"></i></div><div class="folders-or-file-li-title"><span>'+div.folderName+'</span></div><div class="folders-or-file-li-menu-icon"><i class="fa fa-bars"></i><!--div class="folders-li-menu"--><div class="folders-or-file-li-menu-close"><div class="folders-or-file-li-menu-li folder-rename-button"><i class="fa fa-pencil"></i>命名</div><div class="folders-or-file-li-menu-li Folder-Delete-Button"><i class="fa fa-trash"></i>删除</div></div></div><div class="folders-or-file-li-filesize">文件夹</div><div class="folders-or-file-li-datetime">'+div.createDatetime+'</div>';

						// 文件夹的父级文件夹ID
						div.parentFolderID = ResultJSON["data"][i]["Of"];

						// 删除文件夹
						div.getElementsByClassName('Folder-Delete-Button')[0].theParentElement = div;
						div.getElementsByClassName('Folder-Delete-Button')[0].onclick = function(){
							DeleteFolder(this.theParentElement);
						}

						div.getElementsByClassName('folders-or-file-li-title')[0].getElementsByTagName('span')[0].theParentElement = div;


						// 重命名
						div.getElementsByClassName('folder-rename-button')[0].theParentElement = div;
						div.getElementsByClassName('folder-rename-button')[0].onclick = function(){
							FolderRename(this.theParentElement);
						}


						// 如果是搜索出来的
						div.Keyword = Keyword;


						// 更新文件夹位置
						nowFolderPosition = div.parentFolderID;

						// 标题的父元素
						div.getElementsByClassName('folders-or-file-li-title')[0].theParentElement = div;

						// 文件夹类型
						div.type = "folder";

						// 标题
						div.getElementsByClassName('folders-or-file-li-title')[0].index = div.folderID;

						// 设置默认不选中
						div.selected = false;


						// 删除设置


						// 添加到文件夹列表
						if(Prepend!=undefined && Prepend){
							document.getElementsByClassName('folders-main')[0].prepend(div);
						}else{
							document.getElementsByClassName('folders-main')[0].append(div);
						}
						


						// 点击事件
						setFoldersAndFilesSelected(div);


						function test(div,i){

							setTimeout(function(){

								div.className = "folders-or-file-li";

							},(i*20)+20);

						}


						test(div,i);



					}



				}



				// 取消文件夹选中


				unsetAllFolderOrFileSelected();




				function test(length){



					setTimeout(function(){


						// 删除多余的文件夹
						for(
							var i = 0;
							i < document.getElementsByClassName('folders-main')[0].getElementsByClassName('folders-or-file-li').length;
							i ++
						){

							var div = document.getElementsByClassName('folders-main')[0].getElementsByClassName('folders-or-file-li')[i];

							// 如果这个文件夹不属于这里
							if(
								// 来自搜索的
								((div.Keyword != Keyword)  && (Keyword.length > 0) )
								||
								// 是来自搜索的 并且不是当前文件夹
								(div.Keyword.length>0 && Keyword.length<1 && (div.parentFolderID != nowFolderPositionArray[nowFolderPositionArrayIndex]))
								||
								// 或者是不是搜索却带着搜索的
								(div.Keyword.length > 0 && Keyword.length <1 )
								||
								// 不是搜索的 并且不属于当前文件夹
								(div.Keyword.length < 1 && div.parentFolderID != nowFolderPositionArray[nowFolderPositionArrayIndex] )
							){




								// 如果这个文件夹不属于这里


								function test2(div,i){
									setTimeout(function(){
										// ////////console.log(div);
										div.className = "folders-or-file-li-close";

										// 删除元素
										setTimeout(function(){
											div.remove();
										},(i*20)+300);

									},(i*20)+20);
								}

								test2(div,i);



							}

						}


					},(length*20)+20);



				}


				test(ResultJSON["data"].length);





			}
		}



		if(
			xmlhttp.readyState==4
		){

			// 文件加载中解冻
			setTimeout(function(){
				FoldersLoading = false;
			},500);

		}

	}
	xmlhttp.open("POST","php/folders.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send("FOLDER=" + nowFolderPositionArray[nowFolderPositionArrayIndex] + "&LENGTH=" + Function_FolderLength + "&PAGE=" + PageFolder + "&KEYWORD=" + Keyword);







	PageScrollCooling = false;


}









// 文件大小转换
function sizeTostr(fileSize) {


	var result = ''
	if (fileSize >= 1073741824) {
	  // B => GB
	  result = fileSize % 1073741824 === 0 ? fileSize / 1073741824 + 'GB' : Math.trunc(fileSize / 1073741824) + 'GB'
	} else if (fileSize >= 1048576) {
	  // B => MB
	  result = fileSize % 1048576 === 0 ? fileSize / 1048576 + 'MB' :  Math.trunc(fileSize / 1048576) + 'MB'
	} else if (fileSize >= 1024) {
	  // B => KB
	  result = fileSize % 1024 === 0 ? fileSize / 1024 + 'KB' :  Math.trunc(fileSize / 1024) + 'KB'
	} else {
	  result = fileSize + 'B'
	}
	return result;

}  







// 当前文件夹位置
var nowFolderPosition = 0;







// 文件夹位置
var nowFolderPositionArray = [];
var nowFolderPositionArrayIndex = 0;
nowFolderPositionArray[nowFolderPositionArrayIndex] = "0";





// 显示下载链接
function showFileDownloadLink(text){


	swal({
	title: "下载地址",
	text: text,
	icon: "success",
	closeOnClickOutside: false,
	});




}







// 显示分享成功
function ShowShareFileSuccess(ShareFileLink){


	
	swal({
		title: "分享成功！",
		text: ShareFileLink,
		icon: "success",
		buttons: ["取消","复制"],
		closeOnClickOutside: false,
	}).then((willDelete) => {
		if (willDelete) {
			CopyText(ShareFileLink);
		}
	});


}



// 分享文件
function ShareFile(Element){


	if(
		Element.type == "file"
	){

		if(Element.sharelink!=undefined){


			ShowShareFileSuccess(Element.sharelink);

			return false;

		}


		var FileID = Element.fileID;

		var FileSize = Element.fileSize;

		var CreateDatetime = encodeURIComponent(Element.createDatetime);

		var Folder = Element.parentFolderID;

		var Hash = Element.hash;



		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				var ResultJSON = JSON.parse(xmlhttp.responseText);
				if(ResultJSON["status"]){

					var ShareFileLink = WebHomeURL + ResultJSON["link"];

					ShowShareFileSuccess(ShareFileLink);



				}
			}
		}
		xmlhttp.open("POST","php/sharefile.php",true);
		xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.send("FILEID="+FileID+"&FILESIZE="+FileSize+"&CREATEDATETIME="+CreateDatetime+"&FOLDER="+Folder+"&HASH="+Hash);



	}




}



















// 获取文件
// 加载文件长度
// 加载前面吗
function getFiles(FileLength,Prepend,FilePage){




	// 如果文件加载中
	if(FilesLoading){
		return false;
	}

	// 如果文件已经加载完了
	if(FilesOver){
		return false;
	}

	// 文件加载中 冻结 锁定
	FilesLoading = true;


	// 默认加载多少个文件
	var Number_ = 20;
	// 如果自定义
	if(FileLength!=undefined){
		Number_ = FileLength;
	}

	// 搜索关键词
	var Keyword = encodeURIComponent(document.getElementsByClassName('search-input')[0].value);


	// 如果指定了页数
	var Page_Number_ = Page;
	if(FilePage!=undefined){
		Page_Number_ = FilePage;
	}


	var xmlhttp = new XMLHttpRequest();


	// 防止搜索碰撞
	SearchTimesForFiles++;
	xmlhttp.SearchTimesForFiles = SearchTimesForFiles;


	// 循环跑判断如果搜索次数不对了 取消本次搜索
	function SearchTimes(){
		if(xmlhttp.SearchTimesForFiles != SearchTimesForFiles){
			xmlhttp.abort();
			//////////console.log("取消搜索");
		}else{
			setTimeout(SearchTimes,100);
			//////////console.log("搜索中");
		}
	}
	SearchTimes();







	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){


				// 文件页面数 ++
				Page ++;


				// 如果是指定加载数量
				if(
					FileLength == undefined && ( ResultJSON["data"].length < Number_ || ResultJSON["data"].length == 0)
				){

					// 加载完了
					FilesOver = true;

				}


				for(
					var i = 0;
					i < ResultJSON["data"].length;
					i ++
				){



					// 如果已经存在 不重复添加
					var isTrue = false;
					for(
						var i2 = 0;
						i2 < document.getElementsByClassName('files-main')[0].getElementsByClassName('folders-or-file-li').length;
						i2 ++
					){

						if(
							document.getElementsByClassName('files-main')[0].getElementsByClassName('folders-or-file-li')[i2].fileID == ResultJSON["data"][i]["ID"]
						){

							isTrue = true;
							break;

						}


					}




					if(!isTrue){



						var div = document.createElement('div');

						div.className = "folders-or-file-li-close";

						div.fileID = ResultJSON["data"][i]["ID"];

						div.type = "file";

						div.index = div.fileID;

						div.createDatetime = ResultJSON["data"][i]["CreateDatetime"];

						div.fileName = ResultJSON["data"][i]["FileName"];

						div.fileSize = ResultJSON["data"][i]["FileSize"];

						div.hash = ResultJSON["data"][i]["Hash"];


						div.faIcon = getFileTypeForIcon(div.fileName);


						div.parentFolderID = ResultJSON["data"][i]["FolderOf"];

						div.innerHTML = '<div class="folders-or-file-file-li-icon"><i class="'+div.faIcon+'"></i></div><div class="folders-or-file-li-title"><span>'+div.fileName+'</span></div><div class="folders-or-file-li-menu-icon"><i class="fa fa-bars"></i><!--div class="folders-li-menu"--><div class="folders-or-file-li-menu-close"><div class="folders-or-file-li-menu-li file-rename-button"><i class="fa fa-pencil"></i>命名</div><div class="folders-or-file-li-menu-li share-file-button"><i class="fa fa-share-alt"></i>分享</div><div class="folders-or-file-li-menu-li Delete-File-Button"><i class="fa fa-trash"></i>删除</div><div class="folders-or-file-li-menu-li show-file-download-link"><i class="fa fa-link"></i>外链</div><a class="file-download-link" target="_blank"><div class="folders-or-file-li-menu-li"><i class="fa fa-download"></i>下载</div></a></div></div><div class="folders-or-file-li-filesize">'+sizeTostr(div.fileSize)+'</div><div class="folders-or-file-li-datetime">'+div.createDatetime+'</div>';

						div.getElementsByClassName('file-download-link')[0].href = WebHomeURL + ResultJSON["data"][i]["DownloadLink"];

						div.downloadlink = WebHomeURL + ResultJSON["data"][i]["DownloadLink"];

						div.sharelink = WebHomeURL + ResultJSON["data"][i]["ShareLink"];

						div.getElementsByClassName('show-file-download-link')[0].downloadlink = div.downloadlink;

						div.getElementsByClassName('show-file-download-link')[0].onclick = function(){

							showFileDownloadLink(this.downloadlink);

						}

						div.Keyword = Keyword;


						// 删除文件
						div.getElementsByClassName('Delete-File-Button')[0].theParentElement = div;
						div.getElementsByClassName('Delete-File-Button')[0].onclick = function(){
							DeleteFile(this.theParentElement);
						}



						// 标题的父元素
						div.getElementsByClassName('folders-or-file-li-title')[0].theParentElement = div;

						// 分享
						div.getElementsByClassName('share-file-button')[0].theParentElement = div;
						div.getElementsByClassName('share-file-button')[0].onclick = function(){
							ShareFile(this.theParentElement);
						}

						// 文件重命名
						div.getElementsByClassName('file-rename-button')[0].theParentElement = div;
						div.getElementsByClassName('file-rename-button')[0].onclick = function(){
							FileRename(this.theParentElement);
						}



						// 点击事件
						setFoldersAndFilesSelected(div);

						if(Prepend!=undefined && Prepend){
							document.getElementsByClassName('files-main')[0].prepend(div);
						}else{
							document.getElementsByClassName('files-main')[0].append(div);	
						}
						


						function test(div,i){

							setTimeout(function(){

								div.className = "folders-or-file-li";

							},(i*20)+20);

						}


						test(div,i);

					}

				}


				// 计算多文件
				var TimeoutTime = ( (document.getElementsByClassName('files-main')[0].getElementsByClassName('folders-or-file-li').length - ResultJSON["data"].length) / 2000 );




				// 删除多余的文件
				function test(length){


					setTimeout(function(){


						// 删除多余的文件夹
						for(
							var i = 0;
							i < document.getElementsByClassName('files-main')[0].getElementsByClassName('folders-or-file-li').length;
							i ++
						){


								var div = document.getElementsByClassName('files-main')[0].getElementsByClassName('folders-or-file-li')[i];

								// 如果这个文件不属于这里的
								if(
									// 是来自搜索的
									((div.Keyword != Keyword) && (Keyword.length > 0))
									||
									// 是来自搜索的 并且不是当前文件夹
									( div.Keyword.length>0 && Keyword.length<1 && (div.parentFolderID != nowFolderPositionArray[nowFolderPositionArrayIndex]))
									||
									// 或者是不是搜索却带着搜索的
									(div.Keyword.length > 0 && Keyword.length <1 )
									||
									// 不是搜索的 并且不属于当前文件夹
									(div.Keyword.length < 1 && div.parentFolderID != nowFolderPositionArray[nowFolderPositionArrayIndex] )
								){

								function test2(div,i){
									setTimeout(function(){
										// ////////console.log(div);
										div.className = "folders-or-file-li-close";
										// 删除元素
										setTimeout(function(){
											div.remove();
										},(i*20)+300);
									},(i*20)+20);
								}

								test2(div,i);


							}


						}


					},(length*20)+20);



				}

				test(ResultJSON["data"].length);














			}
		}

		if(
			xmlhttp.readyState==4
		){

			// 文件加载中解冻
			setTimeout(function(){
				FilesLoading = false;
			},500);

		}

	}
	xmlhttp.open("POST","php/files.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send("FOLDER=" + nowFolderPositionArray[nowFolderPositionArrayIndex] + "&PAGE=" + Page_Number_ + "&NUMBER=" + Number_ + "&KEYWORD=" + Keyword);






	PageScrollCooling = false;



}






















// 注册
function register(){


	var Username = document.getElementsByClassName('register-username-input')[0].value;


	if(Username == ""){

		swal({
			title: "提示",
			text: "请输入帐号！",
			icon: "info",
			closeOnClickOutside: false,
		});

		return false;

	}

	var Password = document.getElementsByClassName('register-password-input')[0].value;


	if(Password == ""){

		swal({
			title: "提示",
			text: "请输入密码！",
			icon: "info",
			closeOnClickOutside: false,
		});

		return false;

	}



	var Password2 = document.getElementsByClassName('register-password-input')[1].value;


	if(Password2 != Password){

		swal({
			title: "提示",
			text: "两次密码不一致，请重新输入确认密码。",
			icon: "info",
			closeOnClickOutside: false,
		});

		return false;

	}



	Username = encodeURIComponent(Username);
	Password = encodeURIComponent(Password);




	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var ResultJSON = JSON.parse(xmlhttp.responseText);




			if(ResultJSON["status"]){


				swal({
					title: "提示",
					text: ResultJSON["message"],
					icon: "success",
					closeOnClickOutside: false,
				});


			}else{

				
				swal({
					title: "提示",
					text: ResultJSON["message"],
					icon: "error",
					closeOnClickOutside: false,
				});


			}
		}
	}
	xmlhttp.open("POST","php/register.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send("USERNAME="+Username+"&PASSWORD="+Password);




}




// 注册操作
document.getElementsByClassName('register-button')[0].onclick = register;













// 从登录页面打开注册页面
document.getElementsByClassName('login-left-content-div-register')[0].onclick=function(){


	

	// 延迟		打开注册
	// 打开注册页面
	/*
	if(document.getElementsByClassName('register-close')[0]!=undefined){
		document.getElementsByClassName('register-close')[0].className = "register";
	}
	*/

	window.location.href = "#register";
	


}




// 找回密码
document.getElementsByClassName('login-left-content-forgot-password')[0].onclick = ResetPassword;




// 返回登录		从注册页面
for(
	var i=0;
	i<document.getElementsByClassName('register-header-go-back-to-login').length;
	i++
	){


	// 返回登录		从注册页面
	document.getElementsByClassName('register-header-go-back-to-login')[i].onclick=function(){





		/*
		// 延迟		打开登录页面
		setTimeout(function(){
			// 打开登录页面
			if(document.getElementsByClassName('login-close')[0]!=undefined){
				document.getElementsByClassName('login-close')[0].className = "login";
				window.location.href = "#login";
			}
		},250);
		*/
		window.location.href = "#login";





	}



}




// 切换菜单时的锁，防止多次触发
var mobileMenuLock = false;



// 打开手机端菜单
document.getElementsByClassName('mobile-menu-button')[0].onclick = function(){


	// 判断是否允许切换菜单
	if(mobileMenuLock == true){
		return false;
	}

	// 切换菜单		锁住
	mobileMenuLock = true;

	// 禁止主体网页滑动
	document.body.style.overflow = "hidden";

	// 打开手机端菜单
	document.getElementsByClassName('mobile-menu')[0].style.display = "block";


	// 延迟
	setTimeout(function(){


		// 打开菜单背景颜色
		document.getElementsByClassName('mobile-menu-content-background-color')[0].style.backgroundColor = "#0000006b";
		document.getElementsByClassName('mobile-menu-content-background-color')[0].style.opacity = "1";


		// 延迟
		setTimeout(function(){


			// 整体布局往右边移动
			document.getElementsByClassName('header')[0].style.marginLeft = "66.67%";
			document.getElementsByClassName('content')[0].style.marginLeft = "66.67%";
			document.getElementsByClassName('upload-file-list')[0].style.right = "calc(-66.67% + 20px)";
			if(document.getElementsByClassName('login')[0]!=undefined){
				document.getElementsByClassName('login')[0].style.marginLeft = "calc(16.67% + 20px)";
			}
			if(document.getElementsByClassName('register')[0]!=undefined){
				document.getElementsByClassName('register')[0].style.marginLeft = "calc(16.67% + 20px)";
			}

			if(document.getElementsByClassName('sharefile')[0]!=undefined){
				document.getElementsByClassName('sharefile')[0].style.marginLeft = "calc(16.67% + 20px)";
			}
			if(document.getElementsByClassName('terms')[0]!=undefined){
				document.getElementsByClassName('terms')[0].style.marginLeft = "calc(16.67% + 20px)";
			}



			// 打开菜单
			document.getElementsByClassName('mobile-menu-content')[0].style.left = "-33.33%";

			// 延迟
			setTimeout(function(){

				// 切换菜单		解锁
				mobileMenuLock = false;

			},250);




		},250);


	},10);



}





// 关闭手机端菜单
document.getElementsByClassName('mobile-menu-content-background-color')[0].onclick = function(){


	// 判断是否允许切换菜单
	if(mobileMenuLock == true){
		return false;
	}

	// 切换菜单		锁住
	mobileMenuLock = true;


	// 关闭左侧菜单
	document.getElementsByClassName('mobile-menu-content')[0].style.left = "-100%";


	// 整体布局回复（在之前是往右边移动的情况下）
	document.getElementsByClassName('header')[0].style.marginLeft = "";
	document.getElementsByClassName('content')[0].style.marginLeft = "";
	document.getElementsByClassName('upload-file-list')[0].style.right = "";
	if(document.getElementsByClassName('login')[0]!=undefined){
		document.getElementsByClassName('login')[0].style.marginLeft = "";
	}
	if(document.getElementsByClassName('register')[0]!=undefined){
		document.getElementsByClassName('register')[0].style.marginLeft = "";
	}

	if(document.getElementsByClassName('sharefile')[0]!=undefined){
		document.getElementsByClassName('sharefile')[0].style.marginLeft = "";
	}
	if(document.getElementsByClassName('terms')[0]!=undefined){
		document.getElementsByClassName('terms')[0].style.marginLeft = "";
	}




	// 延迟
	setTimeout(function(){

		// 关闭菜单背景颜色
		document.getElementsByClassName('mobile-menu-content-background-color')[0].style.backgroundColor = "#ffffff00";
		document.getElementsByClassName('mobile-menu-content-background-color')[0].style.opacity = "0";

		// 延迟
		setTimeout(function(){

			// 关闭手机端菜单
			document.getElementsByClassName('mobile-menu')[0].style.display = "none";


			// 允许主体网页滑动
			document.body.style.overflow = "";




			// 切换菜单		解锁
			mobileMenuLock = false;



		},250);


	},250);


};






// 显示		协议
for(
	var i = 0;
	i<document.getElementsByClassName('terms-button').length;
	i++
	){
	document.getElementsByClassName('terms-button')[i].onclick = function(){



		window.location.href = "#terms";




	}
}






// 显示		全部文件
for(
	var i = 0;
	i<document.getElementsByClassName('files-button').length;
	i++
	){
	document.getElementsByClassName('files-button')[i].onclick = function(){



		window.location.href = "#files";




	}
}



// 退出按钮
for(
	var i = 0;
	i<document.getElementsByClassName('user-exit-button').length;
	i++
	){
	document.getElementsByClassName('user-exit-button')[i].onclick = userExit;
}




// 一键关闭所有页面
function closePages(){



	document.getElementsByClassName('login-username-input')[0].value = "";
	document.getElementsByClassName('login-password-input')[0].value = "";
	document.getElementsByClassName('register-username-input')[0].value = "";
	document.getElementsByClassName('register-password-input')[0].value = "";
	document.getElementsByClassName('register-password-input')[1].value = "";
	document.getElementsByClassName('search-input')[0].value = "";


	// 删除所有上传的文件
	/*
	for(
		var i = 0;
		i < document.getElementsByClassName('upload-file-list-content')[0].getElementsByClassName('upload-file-list-li').length;
		i ++
	){
		document.getElementsByClassName('upload-file-list-content')[0].getElementsByClassName('upload-file-list-li')[i].getElementsByClassName('upload-file-list-li-controls-remove')[0].click();
	}
	*/


	document.getElementsByTagName('title')[0].innerText = "云中转，无限容量云盘。";


	PageFolder = 0;
	FoldersOver = false;

	setTimeout(
		function(){
			document.getElementsByClassName('folders-main')[0].innerHTML = "";
			document.getElementsByClassName('files-main')[0].innerHTML = "";
		}
	,350);

	nowFolderPositionArrayIndex = 0;



	// 关闭		手机端、移动端		菜单
	closeMobileMenu();

	// 关闭		分享		页面
	if(document.getElementsByClassName('sharefile')[0]!=undefined){
		document.getElementsByClassName('sharefile')[0].className = "sharefile-close";
	}
	
	// 关闭		登录		页面
	if(document.getElementsByClassName('login')[0]!=undefined){
		document.getElementsByClassName('login')[0].className = "login-close";
	}


	// 关闭		注册		页面
	if(document.getElementsByClassName('register')[0]!=undefined){
		document.getElementsByClassName('register')[0].className = "register-close";
	}



	// 关闭		文件		页面
	if(document.getElementsByClassName('files-div')[0]!=undefined){
		document.getElementsByClassName('files-div')[0].className = "files-div-close";
	}

	// 关闭		协议		页面
	if(document.getElementsByClassName('terms')[0]!=undefined){
		document.getElementsByClassName('terms')[0].className = "terms-close";
	}



	// 关闭		上传列表
	uploadListDisplayNone();


}





// 打开文件页面
function openFilesDiv(){


		window.location.href = "#files";


		/*

		// 打开		文件		页面
		if(document.getElementsByClassName('files-div-close')[0]!=undefined){
			document.getElementsByClassName('files-div-close')[0].className = "files-div";
			// 更改URL
			window.location.href = "#files";
		}

		*/



}

// 打开文件页面
document.getElementById('files-button').onclick = function(){





	// 如果还没登陆

	// 如果用户已经登陆
	if(
		!(

			Userinfo["Username"]!=undefined
			&&
			Userinfo["Username"]!=""
			&&
			Userinfo["Username"]!=null

		)

	){

		window.location.href = "#login";

		// 未登陆 返回登陆
		return false;

	}





	/*
	// 关闭所有页面
	closePages();


	// 延迟
	// 打开文件页面
	setTimeout(openFilesDiv,250);
	*/

	window.location.href = "#files";




}



// 获取分享文件
function getSharefile(SKEY,SID){



	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){



				// 打开		分享		页面
				if(document.getElementsByClassName('sharefile-close')[0]!=undefined){
					document.getElementsByClassName('sharefile-close')[0].className = "sharefile";
				}


				var Username = ResultJSON["data"]["Username"];

				var FileName = ResultJSON["data"]["FileName"];

				var FileSize = ResultJSON["data"]["FileSize"];

				var FileSizeText = sizeTostr(FileSize);

				var CreateDatetime = ResultJSON["data"]["CreateDatetime"];

				var Datetime = ResultJSON["data"]["Datetime"];


				var DownloadLink = ResultJSON["data"]["DownloadLink"];


				document.getElementsByTagName('title')[0].innerText = FileName + " " + FileSizeText + " 云中转，无限容量云盘。";

				document.getElementsByClassName('sharefile')[0].getElementsByClassName('sharefile-content-filename-span')[0].innerText = FileName;

				document.getElementsByClassName('sharefile')[0].getElementsByClassName('sharefile-content-filesize')[0].innerText = FileSizeText;

				document.getElementsByClassName('sharefile')[0].getElementsByClassName('folders-or-file-li-title')[0].getElementsByTagName('span')[0].innerText = FileName;

				document.getElementsByClassName('sharefile')[0].getElementsByClassName('folders-or-file-li-datetime')[0].innerText = CreateDatetime;

				document.getElementsByClassName('sharefile')[0].getElementsByClassName('folders-or-file-li-filesize')[0].innerText = FileSizeText;

				document.getElementsByClassName('sharefile')[0].getElementsByClassName('sharefile-content-userinfo-datetime')[0].innerText = Datetime;

				document.getElementsByClassName('sharefile')[0].getElementsByClassName('sharefile-content-userinfo-username')[0].innerText = Username;

				document.getElementsByClassName('sharefile-content-fileinfo')[0].getElementsByClassName('sharefile-file-download-link')[0].href = WebHomeURL + DownloadLink;

				document.getElementsByClassName('sharefile-content-fileinfo')[0].getElementsByClassName('folders-or-file-file-li-icon')[0].getElementsByTagName('i')[0].className = getFileTypeForIcon(FileName);

				document.getElementsByClassName('sharefile-content-fileinfo')[0].getElementsByClassName('sharefile-content-filename')[0].getElementsByTagName('i')[0].className = getFileTypeForIcon(FileName);




			}else{


				swal({
					title: "文件不存在！",
					text: "文件已经被删除或取消分享。",
					icon: "error",
					closeOnClickOutside: false,
				});





			}




		}
	}
	xmlhttp.open("POST","php/sharefileinfo.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send("SID="+SID+"&SKEY="+SKEY);








}
















// 如果发现链接是分享文件
var URL = window.location.href;







// 实时检查 URL 地址
var URL_Shell_Old_URL = "";




// 一键消除已经结束上传的文件
function UploadListRemoveStopUpload(){


	var int = 0;

	for(
		var i = 0;
		i < document.getElementsByClassName('upload-file-list-content')[0].getElementsByClassName('upload-file-list-li').length;
		i ++
	){

		var div = document.getElementsByClassName('upload-file-list-content')[0].getElementsByClassName('upload-file-list-li')[i];

		if(div.stopUpload!=undefined && div.stopUpload==true){

			int++;

			function test(div,i){
				setTimeout(function(){
					div.getElementsByClassName('upload-file-list-li-controls-remove')[0].click();
				},(i*20)+20);
			}
			test(div,int);

		}

	}


}
// 清空 上传结束的
document.getElementsByClassName('uploaded-file-remove')[0].onclick = UploadListRemoveStopUpload;












// 获取传来的 URL 配置
function get_URL_Shell(){


	// 更新已使用的大小
	/*if(Userinfo["UsedSize"]!=undefined && document.getElementsByClassName('files-div')[0]!=undefined){
		document.getElementsByClassName('files-div')[0].getElementsByClassName('search-input')[0].placeholder = "搜索文件（" + Userinfo["UsedSize"] + "）";
	}*/


	// 检查是否变动了 URL

	if(
		URL_Shell_Old_URL == window.location.href
		){


		setTimeout(get_URL_Shell,200);


		return false;
	}

	



	// 地址变动
	////////console.log("地址变动");

	////////console.log("老 " + URL_Shell_Old_URL);

	URL_Shell_Old_URL = window.location.href;

	////////console.log("新 " + URL_Shell_Old_URL);







	// 关闭所有页面
	closePages();






	// URL 地址传参识别
	var URL_Array = URL_Shell_Old_URL.split('#');

	if(
		URL_Array.length > 1
	){

		URL_Array = URL_Array[1];

		URL_Array = URL_Array.split('=');

















		// 如果是找回密码页面
		if(
			URL_Array[0] === "terms"
		){



			// 关闭手机端、移动端菜单
			//closeMobileMenu();




			// 延迟		打开注册
			setTimeout(function(){
				// 打开注册页面
				if(document.getElementsByClassName('terms-close')[0]!=undefined){
					document.getElementsByClassName('terms-close')[0].className = "terms";
					document.getElementsByTagName('title')[0].innerText = "用户协议 云中转，无限容量云盘。";
				}
				
			},350);



			setTimeout(get_URL_Shell,500);
			

			return false;

		}




















		// 如果是注册页面
		if(
			URL_Array[0] === "register"
		){



			// 关闭手机端、移动端菜单
			//closeMobileMenu();


			



			// 延迟		打开注册
			setTimeout(function(){
				// 打开注册页面
				if(document.getElementsByClassName('register-close')[0]!=undefined){
					document.getElementsByClassName('register-close')[0].className = "register";
					document.getElementsByTagName('title')[0].innerText = "注册 云中转，无限容量云盘。";
				}

			},350);




			setTimeout(get_URL_Shell,500);
			

			return false;

		}







		// 如果是文件列表
		if(
			URL_Array[0] === "files"
		){






			// 关闭手机端、移动端菜单
			//closeMobileMenu();




			if(Userinfo["Username"]==undefined){
				window.location.href = "#login";
				setTimeout(get_URL_Shell,500);
				return false;
			}

	


			

			// 延迟		打开注册
			setTimeout(function(){
				// 打开		登录		页面
				if(document.getElementsByClassName('files-div-close')[0]!=undefined){
					document.getElementsByClassName('files-div-close')[0].className = "files-div";
					document.getElementsByTagName('title')[0].innerText = "全部文件 云中转，无限容量云盘。";
					
					
					getFolders();

					// 上传列表		默认		关闭
					uploadListClose();
					// uploadListOpen();
					// uploadListDisplayNone();

				}
			},350);




			setTimeout(get_URL_Shell,500);
			

			return false;

		}







		// 如果是登录
		if(
			URL_Array[0] === "login"
		){


			// 关闭手机端、移动端菜单
			//closeMobileMenu();


			// 如果已经登陆用户
			if(
				Userinfo["Username"]!=undefined
				&&
				Userinfo["Username"]!=""
				&&
				Userinfo["Username"]!=null
			){


				window.location.href = "#files";


				setTimeout(get_URL_Shell,500);


				return false;

			}






			// 延迟		打开注册
			setTimeout(function(){
				// 打开		登录		页面
				if(document.getElementsByClassName('login-close')[0]!=undefined){
					document.getElementsByClassName('login-close')[0].className = "login";
					document.getElementsByTagName('title')[0].innerText = "登陆 云中转，无限容量云盘。";
				}
			},350);





			setTimeout(get_URL_Shell,500);
			

			return false;

		}








		// 是否找到直达命令
		if(URL_Array.length>1 && URL_Array[2]!=''){


			// 
			////////console.log("找到直达命令");















			// 如果是分享文件
			if(
				URL_Array[0] === "sharefile"
			){


				URL_Array = URL_Array[1];

				// 过滤 URL 中的其他值
				URL_Array = URL_Array.split('&')[0];

				URL_Array = URL_Array.split('_');

				// 如果右边满足条件
				if(
					URL_Array.length > 1
					&&
					(!isNaN(URL_Array[1]))
					&&
					URL_Array[1]!=''
					&&
					URL_Array[1]>0
					&&
					URL_Array[0].length==8
					){

					////////console.log('分享文件');

					// 操作命令
					////////console.log(URL_Array);



					// 获取分享信息
					getSharefile(URL_Array[0],URL_Array[1]);



					setTimeout(get_URL_Shell,500);


					return false;




				}





			}




			// 如果是直链文件
			if(
				URL_Array[0] === "download"
			){






			}







		}




	}


	// 最终都没有找到直达命令的话
	// 默认打开文件
	setTimeout(openFilesDiv,250);



	setTimeout(get_URL_Shell,350);


	return false;





}








// 登录账号
function login(){


	// 获取登陆窗口的帐号密码
	var Username = document.getElementsByClassName('login-username-input')[0].value;
	var Password = document.getElementsByClassName('login-password-input')[0].value;

	if(
		Username==""
		||
		Password==""
	){




		swal({
			title: "输入信息",
			text: "请输入登陆的帐号和密码。",
			icon: "warning",
			closeOnClickOutside: false,
		});

		return false;

	}

	// 用于提交表单的编码字符
	var USERNAME = encodeURIComponent(Username);
	var PASSWORD = encodeURIComponent(Password);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){

				////////console.log("登陆成功");


				// 删除在输入框的登陆帐号密码
				document.getElementsByClassName('login-username-input')[0].value = "";
				document.getElementsByClassName('login-password-input')[0].value = "";


				Userinfo["Username"] = USERNAME;

				// window.location.href = "#files";
				getUserinfo();

			}else{


				////////console.log("登陆失败");


				swal({
					title: "登陆失败",
					text: ResultJSON["message"],
					icon: "error",
					closeOnClickOutside: false,
				});




			}
		}
	}
	xmlhttp.open("POST","php/login.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send("USERNAME=" + USERNAME + "&PASSWORD=" + PASSWORD );






	return false;

	// 关闭所有页面
	closePages();


	// 登录成功
	// 打开文件页面
	setTimeout(openFilesDiv,250);




}



document.getElementsByClassName('login-button')[0].onclick = login;











// 关闭手机端、移动端菜单
function closeMobileMenu(){


	// 如果手机端、移动端菜单已经打开则关闭
	if(document.getElementsByClassName('mobile-menu')[0].style.display == "block"){

		// 点击关闭手机端、移动端菜单
		document.getElementsByClassName('mobile-menu-content-background-color')[0].click();

	}



}



// 打开登陆页面
function openLogin(){


	window.location.href = "#login";


	/*
	// 关闭全部页面
	closePages();

	// 延迟		打开登录页面
	setTimeout(function(){
		// 打开登录页面
		if(document.getElementsByClassName('login-close')[0]!=undefined){
			document.getElementsByClassName('login-close')[0].className = "login";
		}
	},250);
	*/





}

















// 关闭浏览器之前
window.onbeforeunload=function(e){



	// 查询上传中文件数量
	for(
		var i = 0;
		i < document.getElementsByClassName('upload-file-list-content')[0].getElementsByClassName('upload-file-list-li').length;
		i ++
	){

		if(
			document.getElementsByClassName('upload-file-list-content')[0].getElementsByClassName('upload-file-list-li')[i].stopUpload!=undefined
			&&
			document.getElementsByClassName('upload-file-list-content')[0].getElementsByClassName('upload-file-list-li')[i].stopUpload==false
		){

			swal("一些文件可能正在上传，关闭之前，建议先检查一下。");

			// 打开浏览器上传任务列表
			uploadListOpen();

			return false;

			break;

		}

	}






}






















// 退出登录
function userExit(){






	if(
		Userinfo["Username"]==undefined
	){

		return false;

	}






	swal({
		title: "询问",
		text: "您是否要退出登录？",
		icon: "warning",
		buttons: true,
		dangerMode: true,
		closeOnClickOutside: false,
	}).then((willDelete) => {
		if (willDelete) {








			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					var ResultJSON = JSON.parse(xmlhttp.responseText);
					if(ResultJSON["status"]){
						////////console.log("退出成功");

						// 清空登陆信息
						Userinfo = {};




						// 关闭手机端、移动端菜单
						// closeMobileMenu();


						// 打开登录页面
						// openLogin();


						window.location.href = "#login";

					}
				}
			}
			xmlhttp.open("POST","php/exit.php",true);
			xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlhttp.send();











		}
	});


}





// 用户退出
document.getElementById('user-exit').onclick = userExit;
document.getElementById('mobile-user-exit').onclick = userExit;




// 搜索次数
var SearchInputTimes = 0;

// 搜索框触发
document.getElementsByClassName('search-input')[0].oninput = function(){


	// 搜索输入完等待几秒

	SearchInputTimes++;

	var Function_SearchInputTimes = SearchInputTimes;


	function search(Function_SearchInputTimes){



		// 等待时间
		// 如果 是 有内容 等待 久一点
		var WaitTime = 2000;
		var Value = document.getElementsByClassName('search-input')[0];
		if(Value.length<1){
			WaitTime = 0;
		}

		setTimeout(function(){

			if(
				Function_SearchInputTimes == SearchInputTimes
			){




				// 文件数量
				// 延迟触发
				var FoldersOrFilesNum = document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li').length;
				FoldersOrFilesNum = FoldersOrFilesNum + 1;

				for(
					var i = 0;
					i < document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li').length;
					i ++
				){
					var div = document.getElementsByClassName('folders-or-file')[0].getElementsByClassName('folders-or-file-li')[i];
					function test(div,i){
						setTimeout(function(){
							div.className = "folders-or-file-li-close";
							setTimeout(function(){
								div.remove();
							},250);
						},(i*20)+20);
						
					}
					test(div,i);
				}

				// 等待 文件 文件夹 清理完
				setTimeout(function(){

					// 如果搜索次数不是此次 则不执行
					if(
						Function_SearchInputTimes != SearchInputTimes
					){
						return false;
					}


					// 文件夹页数 = 0
					PageFolder = 0;

					// 搜索位于根目录 0
					nowFolderPositionArrayIndex = 0;

					// 文件夹加载完了？不
					FoldersOver = false;



					// 加载文件夹
					getFolders();

				},(FoldersOrFilesNum*20));


			}

		},WaitTime);




	}
	search(Function_SearchInputTimes);



}




// 限制最大上传
var UploadFileMaxSize = 100 * 1024 * 1024 * 1024 * 1024;

// 单次提交最大上传
var UploadFileMaxSizeByOne =  100 * 1024 * 1024;



// 用户信息 JSON
var Userinfo = {};


// 判断是否已经登陆
// 获取用户信息
function getUserinfo(){


	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){

				// 记住用户名
				Userinfo["Username"] = ResultJSON["Username"];
				// Userinfo["UsedSize"] = ResultJSON["UsedSize"];






				// 如果文件页面已经打开
				if(
					document.getElementsByClassName('login')[0]!=undefined
				){

					// 未登陆 无法获取用户信息
					window.location.href = "#files";


				}



				// 如果文件页面已经打开
				if(
					document.getElementsByClassName('register')[0]!=undefined
				){

					// 未登陆 无法获取用户信息
					window.location.href = "#files";


				}








			}else{

				// 如果文件页面已经打开
				if(
					document.getElementsByClassName('files-div')[0]!=undefined
				){

					// 未登陆 无法获取用户信息
					window.location.href = "#login";


				}




			}

			// 开始检查地址
			// 获取 URL 配置
			setTimeout(get_URL_Shell,250);
		}
	}
	xmlhttp.open("POST","php/userinfo.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send("POST=1");

}

















// 处理拖动文件进来 拖放文件
/*
DragDrop：拖放完成，也就是鼠标拖入对象并在拖放区域释放。
DragEnter：拖放进入，也就是鼠标拖放对象进入拖放区域。
DragLeave：离开拖放区域。
DragOver：拖放对象悬浮于拖放区域，在拖放区域内移动时多次触发。
*/
document.addEventListener("drop",preventDe_On);
document.getElementsByClassName('upload-file-full-screen')[0].addEventListener("dragleave",preventDe_Out);
document.addEventListener("dragover",preventDe_On);// 
// document.addEventListener("dragenter",preventDe_On);
// 首次拖进
function preventDe_On(e){
	// 如果未登录
	if(Userinfo["Username"]==undefined){
		return false;
	}

	e.preventDefault();
	// ////////console.log("拖进来上传。");

	// 打开元素
	document.getElementsByClassName('upload-file-full-screen')[0].style.display="block";

}
// 文件拖进来了
/*
document.addEventListener("drop",function(e){
	e.preventDefault();
	FilesUpload(e.dataTransfer.files);
	document.getElementsByClassName('upload-file-full-screen')[0].style.display="none";
});
*/
/*
function preventDe_OnUp(e){
document.getElementsByClassName('uploadFileMasker')[0].style.display="block";
}
*/
function preventDe_Out(e){
	e.preventDefault();
	//////////console.log("取消上传。");
	document.getElementsByClassName('upload-file-full-screen')[0].style.display="none";
}
// 点击关闭上传遮罩
document.getElementsByClassName('upload-file-full-screen')[0].onclick = function(){
	document.getElementsByClassName('upload-file-full-screen')[0].style.display = "none";
}


/*
// 开始上传
function FilesUpload(files){


	////////console.log(files);

	uploadListOpen();


}
*/


























// 上传
function FileUploadStart(fb,so){

	// 如果未登录
	if(Userinfo["Username"]==undefined){
		return false;
	}





		//////////console.log(fb);



		// 开始文件分片上传
		var xhr;
		var ot;
		var oloaded;
		var sendOK; // 已发送次数
		var sendTimes; // 总共需要发送次数
		//上传文件方法
		function UpladFile() {
			// var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
            var url = "php/upload.php"; // 接收上传文件的后台地址 
            var filename=fb.name; 
            // 需要将域名解析到 CF
            // 接收文件的服务器需要绑定上传API的域名
            // 上传大小在 PHP 中需要允许 需要修改  宝塔 找到软件 PHP 修改最大上传限制
            var LENGTH = UploadFileMaxSizeByOne; // 每次上传长度
            var totalSize = fb.size;  //文件总大小
            var start = 0;      //每次上传的开始字节 
            var end = start + LENGTH;   //每次上传的结尾字节 
			var blob = null;        //二进制对象 
			// 已经发送次数
            sendOK = 0;
            // 共要发送次数
            sendTimes = Math.ceil(totalSize/LENGTH);
            //////////console.log("需要发送 " + sendTimes + " 次！");

            // 发送文件数据的数组
            var sendFileBlobArray = [];
            // 切分二进制分片数据进入数组
             for(var i=sendOK; i < sendTimes;i++){
                  sendFileBlobArray[i] = fb.slice(start,end);
                  start = end; 
                  end = start + LENGTH; 
            }
            //////////console.log(sendFileBlobArray);

            start = 0;//每次上传的开始字节 
            end = 0 + LENGTH;//每次上传的结尾字节 

            xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
            so.xhrObj = xhr;
			function send(){

				// 如果是最后一发 必须等待 计算完成
	            if((sendOK+1) == sendTimes && so.hash == undefined){
	            	setTimeout(send,500);
	            	return false;
	            }

				
	            blob = sendFileBlobArray[sendOK];//根据长度截取每次需要上传的数据 
	            xhr.onreadystatechange=function(){
    	            if(xhr.readyState==4 && xhr.status==200){

    	            	//////////console.log(xhr.responseText);



    	            	// ////////console.log("2020-11-05 17:16:41 修复批量上传失败 测试");
    	            	try{
	    	            	var ResultJSON = JSON.parse(xhr.responseText);
							//////////console.log(ResultJSON);
							if(ResultJSON["status"]){
								so.token = ResultJSON["token"];
		    	                sendOK++;
		    	                if(sendOK<sendTimes){
		    	                	setTimeout(send,500);
		    	                }else{

		    	                	so.stopUpload = true;
		    	                	
		    	                }
							}else{

								swal({
									title: "系统提示！",
									text: ResultJSON["message"],
									icon: "error",
									closeOnClickOutside: false,
								});


							}
						}catch(err){
						   //在此处理错误

						}
    	            }else{
    	            	// ////////console.log(xhr.responseText);
    	            }

                }

	            xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。

	            xhr.onload = uploadComplete; //请求完成
	            // xhr.onerror =  uploadFailed; //请求失败
	            xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
	            xhr.upload.onloadstart = function(){//上传开始执行方法
	                ot = new Date().getTime();   //设置上传开始时间
	                oloaded = 0;//设置上传开始时，以上传的文件大小为0
	            };

	            // 如果是最后一发
	            if((sendOK+1) == sendTimes){



	            	xhr.setRequestHeader("HASH", so.hash  ) ;

					// xhr.setRequestHeader("SSEESSIIOONN", PHPSESSID);
					xhr.setRequestHeader("FileSize",  encodeURIComponent (fb.size) );
					xhr.setRequestHeader("FileName", encodeURIComponent (fb.name) );
					xhr.setRequestHeader("folderOf", so.FolderID);

	            	xhr.setRequestHeader("Content-Range", "bytes " + (""+(sendOK*LENGTH)) +"-"+ fb.size + "/" +  fb.size  ) ;
	            }else{
	            	xhr.setRequestHeader("Content-Range", "bytes " + (""+(sendOK*LENGTH)) +"-"+ (""+((sendOK+1)*LENGTH)) + "/" +  fb.size  ) ;
	            }
	            // 如果不是第一次上传
	            if(so.token != undefined){
	            	xhr.setRequestHeader("token", so.token);
	            }
	            //xhr.setRequestHeader("sendOK", sendOK);
	            


	            xhr.send(blob); //开始上传，发送form数据




	        }




			/*function uploadFailed_ReSend(){
				send();
			}*/


	        send();




	    }
	    UpladFile();





		//上传失败
		function uploadFailed(evt) {

			// ////////console.log(evt);






		}






 		//上传成功响应
        function uploadComplete(evt) {
         //服务断接收完文件返回的结果
         //    alert(evt.target.responseText);


		


         //////////console.log(sendOK);
         //////////console.log(sendTimes);
         	if(sendOK==sendTimes){
	            //////////console.log(evt.target.responseText);
	            //////////console.log("上传成功！");
	            var ResultJSON = JSON.parse(evt.target.responseText);
	            if(ResultJSON["status"]){


	            	so.getElementsByClassName('upload-file-list-li-status-background-color')[0].style.width = "0%"; // 上传完成 进度归零
	            	so.getElementsByClassName('upload-file-list-li-status')[0].innerText = "上传完成"; // 上传完成 进度归零
	            	so.getElementsByClassName('upload-file-list-li-speed')[0].innerText =  '网速不错';
	            	// 加载0个文件夹 加载1个文件 加载到前面
					FoldersOver=false;
					getFolders(undefined,1,true,0);

	            }else{


	            	so.getElementsByClassName('upload-file-list-li-status-background-color')[0].style.width = "0%"; // 上传完成 进度归零
	            	so.getElementsByClassName('upload-file-list-li-status')[0].innerText = "上传失败"; // 上传完成 进度归零
	            	so.getElementsByClassName('upload-file-list-li-speed')[0].innerText =  '未知错误';


	            	swal({
					  title: "上传错误！",
					  text: ResultJSON["message"],
					  icon: "error",
					  closeOnClickOutside: false,
					});


	            }


				if(so.stopUpload == false){
					so.stopUpload = true;
					if(so.xhrObj!=undefined){
						so.xhrObj.abort();
					}
				}





			}



        }


















        //上传进度实现方法，上传过程中会频繁调用该方法
        function progressFunction(evt) {





             var progressBar = document.getElementById("progressBar");
             var percentageDiv = document.getElementById("percentage");
             // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
             if (evt.lengthComputable) {//
                 // progressBar.max = evt.total;
                 // progressBar.value = evt.loaded;
                 // percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
                 so.getElementsByClassName('upload-file-list-li-status-background-color')[0].style.width = Math.round(((evt.loaded / evt.total * 100)/sendTimes) + ((sendOK/sendTimes)*100))     + "%";
                 //////////console.log((sendOK + " - " + sendTimes));
            }
            var time = document.getElementById("time");
            var nt = new Date().getTime();//获取当前时间
            var pertime = (nt-ot)/1000; //计算出上次调用该方法时到现在的时间差，单位为s
            ot = new Date().getTime(); //重新赋值时间，用于下次计算
            
            var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b       
            oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
        
            //上传速度计算
            var speed = perload/pertime;//单位b/s
            var bspeed = speed;
            var units = 'b/s';//单位名称
            if(speed/1024>1){
                speed = speed/1024;
                units = 'k/s';
            }
            if(speed/1024>1){
                speed = speed/1024;
                units = 'M/s';
            }
            speed = speed.toFixed(1);
            //剩余时间
            var resttime = ((evt.total-evt.loaded)/bspeed).toFixed(1);
            // statusObj.getElementsByClassName('uploadsList-li-uploading-status')[0].getElementsByTagName('span')[0].innerText = '，速度：'+speed+units+'，剩余时间：'+resttime+'s';
            so.getElementsByClassName('upload-file-list-li-status')[0].innerText =  Math.round(((evt.loaded / evt.total * 100)/sendTimes) + ((sendOK/sendTimes)*100))     + "%";
            so.getElementsByClassName('upload-file-list-li-speed')[0].innerText =  speed + units;
               if(bspeed==0){
                so.getElementsByClassName('upload-file-list-li-status')[0].innerText = '任务终止';
        	}
        }















}
































// 上传文件操作
function FileUpload(Blobs,Element){



	// 如果未登录
	if(Userinfo["Username"]==undefined){return false;}






	// 是否中止上传 Element.stopUpload



	// 传到文件夹
	var FolderID = Element.FolderID;
	////////console.log(FolderID);


	// 文件大小
	var FileSize = Blobs.filesize;





	// 没有终止上传 准备进入上传
	Element.stopUpload = false;

	// 如果点击取消上传
	Element.getElementsByClassName('upload-file-list-li-controls-remove')[0].onclick = function(){



		if(Element.stopUpload == false){
			Element.stopUpload = true;
			if(Element.xhrObj!=undefined){
				Element.xhrObj.abort();
			}
		}


		function test(Element){
			Element.className = "upload-file-list-li-close";
			setTimeout(function(){
				Element.remove();
			},250);
		}
		test(this.theParentElement);

		////////console.log(this.theParentElement);


	}




	// 判断 文件是否已经存在
	FileUploadStart(Blobs,Element);













}











































// 根据文件名 返回 ICON


	// 获取文件类型
	function getFileTypeForIcon(FileName){



		// 文件名先全部转小写
		// 1、转换成大写：toUpperCase()
		// 2、转换成小写：toLowerCase()


		FileName = FileName.toLowerCase();
		FileName = FileName.split('.');
		FileName = FileName[FileName.length-1];


		// 如果是电脑程序类型
		if(
			FileName=="exe" 
			|| 
			FileName=="msi" 
			|| 
			FileName=="bat" 
			|| 
			FileName=="com" 
		){
			return "fa fa-windows";
		}

		// 如果是压缩包
		if(
			FileName=="7z" 
			|| 
			FileName=="zip" 
			|| 
			FileName=="rar" 
			|| 
			FileName=="gz" 
			|| 
			FileName=="iso" 
			|| 
			FileName=="wim" 
			||
			FileName=="tar" 
		){
			return "fa fa-file-archive-o";
		}

		// 如果是 apk
		if(
			FileName=="apk" 
		){
			return "fa fa-android";
		}




		// 如果是视频
		if(
			FileName=="mp4" 
			|| 
			FileName=="mkv" 
			|| 
			FileName=="avi" 
			|| 
			FileName=="ts"
			|| 
			FileName=="mov" 
			|| 
			FileName=="flv" 
		){
			return "fa fa-film";
		}





		// 如果是音频
		if(
			FileName=="mp3" 
			|| 
			FileName=="flac" 
			|| 
			FileName=="ape" 
			|| 
			FileName=="m4a"
			|| 
			FileName=="ogg" 
			||
			FileName=="wav" 
		){
			return "fa fa-music";
		}



		// 如果是图片
		if(
			FileName=="jpg" 
			|| 
			FileName=="png" 
			|| 
			FileName=="gif" 
			|| 
			FileName=="jpeg"
			|| 
			FileName=="bmp" 
			||
			FileName=="webp" 
		){
			return "fa fa-picture-o";
		}


		// 如果是文本
		if(
			FileName=="txt" 
			|| 
			FileName=="docx" 
			|| 
			FileName=="doc" 
			|| 
			FileName=="xls"
			||
			FileName=="xlsx"
			||
			FileName=="ppt"
			||
			FileName=="pptx"
			|| 
			FileName=="ini" 
			||
			FileName=="log" 
		){
			return "fa fa-file-text-o";
		}



		return "fa fa-file";



	}




















































	// 新上传

  (function () {
    "use strict";

    /*
     * (c) 2011,2015 by md5file.com. All rights reserved.
     */

    /*jslint browser: true, indent: 4*/
    /*global FileReader, File, Worker, alert*/

    var file_id = 1, drop_zone, is_crypto = false;



    if ((typeof File !== 'undefined') && !File.prototype.slice) {
      if(File.prototype.webkitSlice) {
        File.prototype.slice = File.prototype.webkitSlice;
      }

      if(File.prototype.mozSlice) {
        File.prototype.slice = File.prototype.mozSlice;
      }
    }

    if (!window.File || !window.FileReader || !window.FileList || !window.Blob || !File.prototype.slice) {
      alert('File APIs are not fully supported in this browser. Please use latest Mozilla Firefox or Google Chrome.');
    }

    is_crypto = window.crypto && window.crypto.subtle && window.crypto.subtle.digest;

    is_crypto = false; // 启用优质算法


    function hash_file(file, workers) {
      var i, buffer_size, block, threads, reader, blob, handle_hash_block, handle_load_block;

      handle_load_block = function (event) {
        for( i = 0; i < workers.length; i += 1) {
          threads += 1;
          workers[i].postMessage({
            'message' : event.target.result,
            'block' : block
          });
        }
      };
      handle_hash_block = function (event) {
        threads -= 1;

        if(threads === 0) {
          if(block.end !== file.size) {
            block.start += buffer_size;
            block.end += buffer_size;

            if(block.end > file.size) {
              block.end = file.size;
            }
            reader = new FileReader();
            reader.onload = handle_load_block;
            blob = file.slice(block.start, block.end);

            reader.readAsArrayBuffer(blob);
          }
        }
      };
      buffer_size = 2 * 1024 * 1024;
      block = {
        'file_size' : file.size,
        'start' : 0
      };

      block.end = buffer_size > file.size ? file.size : buffer_size;
      threads = 0;

      for (i = 0; i < workers.length; i += 1) {
        workers[i].addEventListener('message', handle_hash_block);
      }
      reader = new FileReader();
      reader.onload = handle_load_block;
      blob = file.slice(block.start, block.end);

      reader.readAsArrayBuffer(blob);
    }


    function handle_worker_event(id,so,type,fb) {// 1 md5 2 hash
      return function (event) {

		// 如果已经中止
		if(so.stopUpload!=undefined && so.stopUpload==true){
			return false;
		}



        if (event.data.result) {

          if(type==2){

          	if(fb.size<=UploadFileMaxSizeByOne){
          		so.getElementsByClassName('upload-file-list-li-speed')[0].innerText = '0B/S';
          	}

          	so.hash = event.data.result; // 得到 hash

          	// 计算 HASH 完成 不允许取消上传
          	so.getElementsByClassName('upload-file-list-li-controls-remove')[0].onclick = function(){
          		return false;
          	}


			// 如果未登录
			if(Userinfo["Username"]==undefined){return false;}




          }



        } else {


        	// ////////console.log(so);
        	if(type==2 ){
        		//////////console.log("计算中");
        		if(fb.size<=UploadFileMaxSizeByOne){
        			so.getElementsByClassName('upload-file-list-li-speed')[0].innerText = (event.data.block.end * 100 / event.data.block.file_size).toFixed(2) + '%';
        		}
        	}else{
        		return false;
        	}

        	// ////////console.log((event.data.block.end * 100 / event.data.block.file_size).toFixed(2) + '%');
          // ////////console.log(event.data.block.end * 100 / event.data.block.file_size + '%')
        }
      };
    }


    function handle_crypto_progress(id, total, loaded) {
      // ////////console.log(loaded * 100 / total + '%');
    }

    function handle_file_select(event) {

    	// 如果未登录
    	if(Userinfo["Username"]==undefined){
    		return false;
    	}


    	// 关闭 上传遮罩
    	document.getElementsByClassName('upload-file-full-screen')[0].style.display="none";




      var hash = "";
      var md5 = "";

      event.stopPropagation();
      event.preventDefault();

      var i, output, files, file, workers, worker, reader, crypto_files, crypto_algos, max_crypto_file_size = 500 * 1024 * 1024;

      files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
      output = [];
      crypto_files = [];

      var OverSizeNum = 0;

      for (i = 0; i < files.length; i += 1) {
      	file = files[i];
      	if(file.size>UploadFileMaxSize){



			OverSizeNum++;





      	}else{
        





			// 如果文件名不符合
			// 文件名不能包含特殊符号
			// \/:*?"<>|
			var tempFileName = file.name;
			if(
				tempFileName.indexOf("\\") == -1
			    &&
			    tempFileName.indexOf("/") == -1
			    &&
			    tempFileName.indexOf(":") == -1
			    &&
			    tempFileName.indexOf("*") == -1
			    &&
			    tempFileName.indexOf("?") == -1
			    &&
			    tempFileName.indexOf("\"") == -1
			    &&
			    tempFileName.indexOf("<") == -1
			    &&
			    tempFileName.indexOf(">") == -1
			    &&
			    tempFileName.indexOf("|") == -1
			){







		        workers = [];
		        crypto_algos = [];


		    	// 创建上传元素
		    	// ////////console.log(event);
		    	var div = document.createElement('div');
		    	div.filename = file.name;
		    	div.filesize = file.size;
		    	div.className = "upload-file-list-li-close";
		    	div.innerHTML = '<div class="upload-file-list-li-status-background-color"></div><div class="upload-file-list-li-content"><div class="upload-file-list-li-icon"><i class="fa fa-film"></i></div><div class="upload-file-list-li-filename">'+div.filename+'</div><div class="upload-file-list-li-filesize">'+sizeTostr(div.filesize)+'</div><div class="upload-file-list-li-status">0%</div><div class="upload-file-list-li-speed">0B/S</div><div class="upload-file-list-li-controls"><div class="upload-file-list-li-controls-remove"><i class="fa fa-trash"></i></div></div></div>';
		    	div.stopUpload = false;
		    	div.md5 = "";




		    	// 正在计算  HASH  取消上传
		    	div.getElementsByClassName('upload-file-list-li-controls-remove')[0].theParentElement = div;
		    	div.getElementsByClassName('upload-file-list-li-controls-remove')[0].onclick = function(){
		    		this.theParentElement.stopUpload = true;

		    		// 移除文件
		    		function test(div){
		    			div.className = "upload-file-list-li-close";
		    			setTimeout(function(){
		    				div.remove();
		    			},250);
		    		}
		    		test(this.theParentElement);
		    	}

		    	// 上传状态 DIV Element
				var statusObj = div;

		    	// 当前文件夹 ID
		    	statusObj.FolderID = nowFolderPositionArray[nowFolderPositionArrayIndex];

		    	// 打开上传窗口
		    	uploadListOpen();

		    	// 加入到上传列表
		    	document.getElementsByClassName('upload-file-list-content')[0].prepend(div);



				FileUpload(file,statusObj);


		    	// 倒计时 打开
		    	function UploadListFileShow(div,i){
		    		setTimeout(function(){
		    			div.className = "upload-file-list-li";
		    		},(i*20)+20);
		    	}
		    	UploadListFileShow(div,i);


		        output.push('<tr><td class="span12"><strong>', file.name, '</strong></td><td> (', file.type || 'n/a', ') - ', file.size, ' bytes</td></tr>');

		        if (true || document.getElementById('hash_hash').checked) {
		          output.push('<tr>', '<td>Hash</td><td> <div class="progress progress-striped active" style="margin-bottom: 0px" id="hash_file_hash_', file_id, '"><div class="bar" style="width: 0%;"></div></div></td></tr>');

		          if (is_crypto && file.size < max_crypto_file_size) {
		            crypto_algos.push({id: "#hash_file_hash_" + file_id, name: "Hash"});
		          } else {
		            worker = new Worker('plug-in/hash_lib/calculator.worker.hash.js');
		            worker.addEventListener('message', handle_worker_event('hash_file_hash_' + file_id,statusObj,2,file));
		            workers.push(worker);
		          }
		        }

		        if (is_crypto && crypto_algos.length > 0) { // 
		          crypto_files.push({file: file, algos: crypto_algos});

		        }

		        hash_file(file, workers);
		        file_id += 1;








		    }else{
		    	OverSizeNum++;
		    }
    	}
      }


      if(OverSizeNum>0){




		swal({
		  title: "上传限制！",
		  text: "共有 " + OverSizeNum + " 个文件不能加入上传列队，因为其大小异常、或超出 " + sizeTostr(UploadFileMaxSize) + " 单文件限制、或其文件名包含不被允许的特殊字符。\r\n文件名不允许包含的特殊字符有（\\/:*?\"<>|）。",
		  icon: "warning",
		  buttons:["取消","详情"],
		  closeOnClickOutside: false,
		}).then((willDelete) => {
		if (willDelete) {


			window.location.href = "#terms";
			// window.location.href = "#terms";

			}
		});



      }



      if (is_crypto) {
        handle_crypto_files(crypto_files);
      }



      
    }


    function handle_crypto_files(crypto_files) {
      var crypto_file, handle_crypto_file, handle_crypto_block, reader;

      crypto_file = crypto_files.pop();

      handle_crypto_block = function(data, algos) {
        var algo = algos.pop();

        if (algo) {
          window.crypto.subtle.digest({name: algo.name}, data)
          .then(function(hash) {
            var hexString = '', hashResult = new Uint8Array(hash);

            for (var i = 0; i < hashResult.length; i++) {
              hexString += ("00" + hashResult[i].toString(16)).slice(-2);
            }
            // ////////console.log(hexString);

            handle_crypto_block(data, algos);
          })
          .catch(function(error) {
            console.error(error);
          });
        } else {
          handle_crypto_files(crypto_files);
        }
      };

      handle_crypto_file = function(file, crypto_algos) {
        reader = new FileReader();

        reader.onprogress = (function(crypto_algos) {
          var algos = crypto_algos;

          return function(event) {
            var i;

            for (i = 0; i < algos.length; i++) {
              handle_crypto_progress(algos[i].id, event.total, event.loaded);
            }
          }
        })(crypto_algos);

        reader.onload = (function(crypto_algos) {
          var algos = crypto_algos;

          return function(event) {
            handle_crypto_block(event.target.result, algos);
          }
        })(crypto_algos);

        reader.readAsArrayBuffer(file);
      };

      if (crypto_file) {
        handle_crypto_file(crypto_file.file, crypto_file.algos);
      }
    }

    function handle_drag_over(event) {
      event.stopPropagation();
      event.preventDefault();
    }

    drop_zone = document.getElementById('drop_zone');

    //drop_zone.addEventListener('dragover', handle_drag_over, false);
    // drop_zone.addEventListener('drop', handle_file_select, false);


	// 绑定文件按钮
	document.getElementsByClassName('upload-file-input')[0].addEventListener('change', handle_file_select, false);
	// 邦定上传元素
	document.addEventListener('drop', handle_file_select, false);


  }());






























































// 初始化配置





// 关闭所有页面
closePages();









// 离线任务
for(

	var i = 0;
	i < document.getElementsByClassName('outline-file-button').length;
	i ++

){



	document.getElementsByClassName('outline-file-button')[i].onclick = function(){


		if( Userinfo["Username"] == undefined ){
			return false;
		}


		swal({
			title:"离线任务",
			text: "目前仅支持离线下载<35MB以内的HTTPS协议文件。\r\n为了解决Github文件下载速度慢，所以做了离线。\r\n添加任务之后，服务器会下载该文件并自动保存到根目录。\r\n等会儿，你再刷新页面就行了。",
			closeOnClickOutside: false,
		  content: {
		    element: "input",
		    attributes: {
		      placeholder: "https://github.com/demo.exe",
		      // value:"文件名",
		      type: "text",
		    },
		  },
		  buttons:true,
		}).then((value) => {

			if(value){



				// 判断是否正确的 URL
				var url_array = value.split('/');
				if(
					url_array.length>3 && ( url_array[0] == "http:" || url_array[0] == "https:" ) && url_array[2].indexOf('.') != -1
				){


					var URL = encodeURIComponent( value );

					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange=function(){
						if(xmlhttp.readyState==4 && xmlhttp.status==200){
							var ResultJSON = JSON.parse(xmlhttp.responseText);
							if(ResultJSON["status"] && ResultJSON["outline_status"]){


							// 加载文件夹数量0个，加载文件数量0个，从前面插入，加载文件页面0
			            	FoldersOver=false;
			            	getFolders(undefined,1,true,0);


							}
						}
					}
					xmlhttp.open("POST","php/outline_new.php",true);
					xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
					xmlhttp.send("url=" + URL);


	
				}else{


					swal("链接不正确。");




				}




			}

		});






	}




}






// 设置手机端左侧菜单当前选中下标
function ForSetMobileMenuIndex(Element){

	for(
			var i2 = 0;
			i2 < document.getElementsByClassName('mobile-menu-li-active').length;
			i2 ++
		){

			document.getElementsByClassName('mobile-menu-li-active')[i2].className = document.getElementsByClassName('mobile-menu-li-active')[i2].className.replace(/mobile-menu-li-active/,'');

		}

		Element.className = Element.className + " mobile-menu-li-active";



}



// 手机端点击用户协议
for(var i=0;i<document.getElementsByClassName('mobile-terms-button').length;i++){

	document.getElementsByClassName('mobile-terms-button')[i].onclick = function(){

	
		ForSetMobileMenuIndex(this);

		window.location.href = "#terms";

		document.getElementsByClassName('mobile-menu-content-background-color')[0].click();

	}

}















// 判断是否登陆
setTimeout(
	function(){
		// 判断是否已经登陆
		getUserinfo();
	}
,100);





