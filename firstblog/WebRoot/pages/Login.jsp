<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>welcome</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript" src="common/jquery.js"></script>
	<script type="text/javascript" language="javascript" >
		$(document).ready(function(){
			$("#username").focus();
			//$("#loginbut").bind('click',function(){
			//	alert("您点击了登陆按钮，亲");
			//});
			
			//$("#loginbut").bind('click',checkLogin());
			$("#reset").bind('click',function(){
				alert("您点击了重置按钮，亲");
			});
		});
		
		function checkLogin(){
			var username = $('#username').val();
			var pass = $('#password').val();
			alert("获取用户名和密码"+"--user--"+username+"--password"+pass);
		}
		
		
	</script>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
     
     <center>
	      <form id="form1" algin="center" >
	         <table id="login" border="0" >
	            <tr>
	            	<td algin="center" colspan="4">用户登录</td>
	            </tr>
	             <tr>
	            	<td algin="right" >用户名:</td>
	            	<td algin="left" colspan="3">
                        <input type="text" id="username"></td>
	            </tr>
	             <tr>
	            	<td algin="right" >密&nbsp;码:</td>
	            	<td algin="left" colspan="3">
                        <input type="password" id="password"></td>
	            </tr>
	            
	             <tr>
	            	
	            	<td algin="left" colspan="2">
                        <input type="button" id="loginbut" value="登陆" onclick="checkLogin()"></td>
                        <td algin="left" colspan="2">
                        <input type="reset" id="reset" value="重置"></td>
	            </tr>
	         </table>
	            
	      		
	      </form>
      </center>
  </body>
</html>
