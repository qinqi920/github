<%@page pageEncoding="utf8"  contentType="text/html;charset=utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
 %>
<html>
	<head>
		<title>register</title>
		<base href="<%=basePath%>">
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<link rel="stylesheet" style="text/css" href="<%=basePath%>style/css/register.css" / >
		<script type="text/javascript" src="<%=basePath%>common/jquery.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/verify.js"></script>
		<script type="text/javascript">
		
		
		</script>
	</head>
	
	<body >
		<div class="wrap">
			<div css="header">
				
			</div>
			<div class="content">
				<h1 align="center"> 注        册   </h1>
				<form onsubmit="return check()" action="pages/regist" method="post">
				<table cellpadding="0" cellspacing="0" border="0" class="form_table">
							<tr >
								<td valign="middle" align="right" width="380px">用户名:</td>
								<td valign="middle" align="left" width="200px">
									<input type="text" class="inputgri" name="name"  value="" onblur="check_username();"//>
								</td>
								<td align="left" width="380px">
									<span id="checkUsername" style="color: red; font-style: italic;">
									</span>
								</td>
							</tr>
							<tr>
								<td valign="middle" align="right">密码:</td>
								<td valign="middle" align="left">
									<input type="password" name="password" class="inputgri" />
								</td>
								<td>
								</td>
							</tr>
							<tr>
								<td valign="middle" align="right">确认密码:</td>
								<td valign="middle" align="left">
									<input type="password" class="inputgri" name="pwd" onblur="check_password();"/>
								</td>
								<td align="left">
									<span id="checkPassword" style="color: red; font-style: italic;">
									</span>
								</td>
							</tr>
							<tr>
								<td valign="middle" align="right">密码找回问题:</td>
								<td valign="middle" align="left">
									<input type="text" class="inputgri" name="question" onblur="clearAlert('question')"/>
								</td>
								<td>
									<span id="question" style="color: red; font-style: italic;">
									</span>
								</td>
							</tr>
							<tr>
								<td valign="middle" align="right">问题答案:</td>
								<td valign="middle" align="left">
									<input type="text" class="inputgri" name="answer" onblur="clearAlert('answer')"/>
								</td>
								<td align="left">
									<span id="answer" style="color: red; font-style: italic;">
									</span>
								</td>
							</tr>
							<tr>
								<td valign="middle" align="right"> 验证码:
									
								</td>
								<td valign="middle" align="left">
									<input type="text" class="inputgri" name="code" style="width:98px;float:left" onblur="clearAlert('checkCode')"/>
									<!-- <input type = "button" id="code" style="width:98px;float:right" onclick="createCode();"/> -->
									<img src="pages/IdentityServlet" id="code" style="width:98px;height:35px;float:right" onclick="createCode();" />
								</td>
								<td align="left">
									<span id="checkCode" style="color: red; font-style: italic;">
									</span>
								</td>
							</tr>
							<tr>
							<td  align="right"><input type="submit" class="button" value="提交" /></td>
							<td  align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="reset" class="button" value="重置"  /></td>
							</tr>
						</table>
				
				
				</form>
			</div>
		</div>
		
	</body>
</html>