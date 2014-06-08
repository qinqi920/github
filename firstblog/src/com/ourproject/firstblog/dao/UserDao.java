package com.ourproject.firstblog.dao;

import com.ourproject.firstblog.entity.User;

public interface UserDao {
	public void save(User user);
	public User findByUsername(String name);
}
