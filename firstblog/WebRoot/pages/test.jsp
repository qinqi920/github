<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>公益地图</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	
	<script type="text/javascript">
		function test(){
		alert(898)
			document.getElementById("registerFrame").contentWindow.register(document.getElementById("username").value);
		}
		
		
	</script>
	

	
  </head>
  
  <body>

		<iframe src="<%= basePath %>pages/test2.jsp" name="registerFrame" id="registerFrame"></iframe>
    	<input type="text" id="username"/>
    	<input type="button"  value="queding" onclick="test()"/>
  </body>
</html>
