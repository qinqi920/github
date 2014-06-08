

//验证码
var code = "";

$(function(){
	var xhr = getXmlHttpRequest();
    xhr.open('get', '/firstblog/pages/IdentityServlet?getcode=true',true);
     xhr.onreadystatechange=function(){
         if(xhr.readyState == 4){
             if(xhr.status == 200){
                 code = xhr.responseText;
             }
         }
     };
     xhr.send(null);
});


//校验内容是否填写完整
function check(){
	if($("input=[name='name']").val()==""){
					$("#checkUsername").html("用户名不能为空！");
					return false;
				}else if($("input=[name='pwd']").val()==""){
					$("#checkPassword").html("密码不能为空！");
					return false;
				}else if($("input=[name='pwd']").val()<6){
					$("#checkPassword").html("密码不能小于六位！");
					return false;
				}else if($("input=[name='question']").val()==""){
					$("#question").html("密码找回问题不能为空！");
					return false;
				}else if($("input=[name='answer']").val()==""){
					$("#answer").html("密码找回问题答案不能为空！");
					return false;
				}else if($("input=[name='code']").val()==""){
					$("#checkCode").html("验证码不能为空！");
					return false;
				}else if($("input=[name='code']").val().toLowerCase()!=code.toLowerCase()){
					$("#checkCode").html("验证码不正确！");
					return false;
				}else{
					alert("注册成功。");
					return true;
				}
}


function clearAlert(id){
	$("#"+id).html("");
}
//密码一致校验
function check_password(){
	var onepwd = $("input=[name='password']").val();
	if(onepwd.length <6){
		$("#checkPassword").html("密码不能小于六位！");
	}else if($("input=[name='password']").val() == $("input=[name='pwd']").val()){
		$("#checkPassword").html("");
	}else{
		$("#checkPassword").html("两次输入密码不一致！");
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


//ajax请求检查用户名是否存在
function check_username(){
	if($("input[name='name']").val().toString().length <= 3){
		$("#checkUsername").html("用户名太短！");
	}else{
		var xhr = getXmlHttpRequest();
		xhr.open('post','/firstblog/pages/checkUsername',true);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.onreadystatechange=function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					var content = xhr.responseText;
					$("#checkUsername").html(content);
				}
			}
		}
		xhr.send("username="+$("input[name='name']").val()  );
	}
}


//验证码生成
function createCode(){
	$("#code").attr("src",'pages/IdentityServlet?ts='+new Date().getTime());
	 var xhr = getXmlHttpRequest();
    //step2 发送请求
    xhr.open('get', '/firstblog/pages/IdentityServlet?getcode=true',true);
     xhr.onreadystatechange=function(){
         //step4 获取服务器返回的数据，更新页面
         if(xhr.readyState == 4){
             if(xhr.status == 200){
                 code = xhr.responseText;
             }
         }
     };
     xhr.send(null);
//	 code = ""; 
//	 var codeLength = 4;//验证码的长度
//	 var checkCode = document.getElementById("code"); 
//	 var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
//	 'S','T','U','V','W','X','Y','Z');//随机数
//	 for(var i = 0; i < codeLength; i++) {//循环操作
//		var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
//		code += random[index];//根据索引取得随机数加到code上
//	}
//	checkCode.value = code;//把code值赋给验证码
}