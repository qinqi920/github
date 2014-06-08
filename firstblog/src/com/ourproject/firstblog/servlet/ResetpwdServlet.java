package com.ourproject.firstblog.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ourproject.firstblog.dao.UserDao;
import com.ourproject.firstblog.dao.impl.UserDaoImple;
import com.ourproject.firstblog.entity.User;

public class ResetpwdServlet extends HttpServlet{
	public void service(HttpServletRequest request,HttpServletResponse response)throws IOException{
		response.setContentType("utf-8");
		PrintWriter out = response.getWriter();
		String username = request.getParameter("username");
		
		UserDao dao = new UserDaoImple();
		User user = dao.findByUsername(username);
		String content = null;
		if(user != null){
			content = user.getName()+"$";
			content = content + user.getPassword()+"$";
			content = content + user.getQuestion()+"$";
			content = content + user.getAnswer()+"$";
		}
		System.out.println(content);
		out.write(content);
		
	}
}
