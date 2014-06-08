package com.ourproject.firstblog.dao.impl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.mysql.jdbc.Connection;
import com.ourproject.firstblog.dao.UserDao;
import com.ourproject.firstblog.entity.User;
import com.ourproject.firstblog.util.DBUtil;

public class UserDaoImple implements UserDao{

	public void save(User user)  {
		Connection conn = DBUtil.getConnection();
		
		PreparedStatement perp;
		try {
			perp = (PreparedStatement) conn.prepareStatement("insert into user(name,password,question,answer)values(?,?,?,?) " );
			perp.setString(1, user.getName());
			perp.setString(2, user.getPassword());
			perp.setString(3, user.getQuestion());
			perp.setString(4, user.getAnswer());
			perp.executeUpdate();
			DBUtil.close(conn);
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public User findByUsername(String name) {
		User user = null;
		Connection conn = DBUtil.getConnection();
		PreparedStatement perp;
		try {
			perp =  conn.prepareStatement("select * from user where name = ? " );
			perp.setString(1, name);
			ResultSet res = perp.executeQuery();
			if(res.next()){
				user = new User();
				user.setName(res.getString("name"));
				user.setPassword("passsword");
				user.setQuestion(res.getString("question"));
				user.setAnswer(res.getString("answer"));
			}
			DBUtil.close(conn);
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return user;
	}

}
