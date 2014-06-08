<%@page pageEncoding="utf8" contentType="text/html;charset=utf-8" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"
					+request.getServerName()+":"+request.getServerPort()+path+"/";
 %>
<html>
	<head>
	<title>密码找回</title>
	<meta http-equiv="Content-Type" content="text/html;charset-UTF-8" />
	<link rel="stylesheet" style="text/css" href="<%=basePath %>style/css/resetpwd.css"/>
	<script type="text/javascript" src="<%=basePath %>common/jquery.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/resetpwd.js"></script>
	</head>
	<body>
		<div class="wrap">
			<div id="first">
			<h1>请输入您要找回密码的账号</h1>
				<div style="text-align:center; ">
					<input type="text" name="name"><label id="errorMesgName"></label><br><br><br>
					<input type="button" onclick="findUsername();" value="下一步">
				</div>
			</div>
			<div id="second" style="display: none">
			<h1>请您回答密码找回问题</h1>
				<div style="text-align:center; ">
					<h2><label id="question"></label></h2><br><br>
					<input type="text" name="answer"><label id="errorMesgName"></label><br><br>
					<input type="button" onclick="answerConfirm();" value="下一步">
				</div>
			</div>
		</div>
	</body>
</html>