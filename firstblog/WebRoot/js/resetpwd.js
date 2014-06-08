//保存查找到的用户信息
var userInfoArray = new Array();
function findUsername(){
	
	var xhr = getXmlHttpRequest();
		xhr.open('post','/firstblog/pages/ResetpwdServlet',true);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.onreadystatechange=function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					var content = xhr.responseText;
					if(content == null){
						$("#errorMesgName").html("用户名错误！");
					}else{
						userInfoArray = content.toString().split("$");
						alert(userInfoArray.toString())
						$("#first").css("display","none");
						$("#second").css("display","");
						$("#question").html(userInfoArray[2]);
					}
				}
			}
		}
		xhr.send("username="+$("input[name='name']").val());

}


//问题答案确定
function answerConfirm(){
	if($("input[name='answer']").val()==userInfoArray[3]){
		
	}
}

function getXmlHttpRequest(){
	var xhr = null;
	if((typeof XMLHttpRequest)!='undefined'){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject('Microsoft.XMLHttp');
	}
	return xhr;
	
}