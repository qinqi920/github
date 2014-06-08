package com.ourproject.firstblog;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
/**
 * @version 1
 * @author liyh
 * 本类主要实现所有关于数据连接的操作，以后可写为工具类
 * */
public class JdbcFactory {
	final static String URL = "jdbc:mysql://localhost:3306/blog";
	final static String USERNAME = "root";
	final static String PASSWORD = "root";
//	Connection conn = null;
//	ResultSet rs = null;
	PreparedStatement  pst = null;
	//DriverManager.getConnection(url, user, password)
	
	public static void main(String args[]){
		new JdbcFactory().show();
		new JdbcFactory().getConnect();
	}
	
	public void show(){
		System.out.println(URL);
	}
	
	public void getConnect(){
		Connection con = null;
		Statement st = null;
		try {
			
			Class.forName("com.mysql.jdbc.Driver");  
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/blog","root","root");   
            st = conn.createStatement();  
            String sql2 = "insert into user(name,password,question,answer) values ('aaaaa','123456','123','123');";
            st.execute(sql2);   
  
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			if(st != null){
				System.out.println("11111");
				st.close();
			}
			if(con != null){
				con.close();
			}
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
}
