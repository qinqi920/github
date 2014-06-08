package com.ourproject.firstblog.servlet;


import java.io.UnsupportedEncodingException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ourproject.firstblog.dao.UserDao;
import com.ourproject.firstblog.dao.impl.UserDaoImple;
import com.ourproject.firstblog.entity.User;



public class RegisterServlet extends HttpServlet {
	public void doPost(HttpServletRequest request,HttpServletResponse response){
		System.out.println("dhsfgdsh");
	}
	public void service(HttpServletRequest request,HttpServletResponse response)throws ServletException{
		
		try {
			request.setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}System.out.println(request.getContextPath());
		System.out.println(request.getRequestURI());
		
		String name = request.getParameter("name");
		UserDao dao = new UserDaoImple() ;
		User user = null;
		try {
			user = new User();
	        user.setName(request.getParameter("name"));
	        user.setPassword(request.getParameter("password"));
	        user.setQuestion(request.getParameter("question"));
	        user.setAnswer(request.getParameter("answer"));
	        dao.save(user);
	        response.sendRedirect("Login.jsp");
	    } catch (Exception e) {
	    		e.printStackTrace();
	        
	     }
	}
}
