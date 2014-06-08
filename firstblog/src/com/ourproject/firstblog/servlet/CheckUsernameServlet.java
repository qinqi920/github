package com.ourproject.firstblog.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ourproject.firstblog.dao.UserDao;
import com.ourproject.firstblog.dao.impl.UserDaoImple;
import com.ourproject.firstblog.entity.User;

public class CheckUsernameServlet extends HttpServlet{
	public void service(HttpServletRequest request, HttpServletResponse response)throws IOException{
		try {
			request.setCharacterEncoding("utf-8");
			response.setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		PrintWriter out = response.getWriter();
		String name = request.getParameter("username");
		UserDao dao = new UserDaoImple();
		User user = null;
		user = dao.findByUsername(name);
		if(user == null){
			out.write("");
		}else{
			out.write("此用户名已经存在！");
		}
		
	}
}
