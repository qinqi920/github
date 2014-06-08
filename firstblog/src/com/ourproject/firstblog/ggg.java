package com.ourproject.firstblog;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
public class ggg {
    private Connection con = null ;
    private Statement stmt = null ;
    private String url = "jdbc:mysql://localhost:3036/blog";
    private String user = "root ";
    private String pwd = "root ";
   
    public ggg() {
        init();
    }
   
    private void init(){
        try {       
          Class.forName("com.mysql.jdbc.Driver");
          con = DriverManager.getConnection(url ,user ,pwd );
          stmt = con .createStatement();
        } catch (Exception e){
          // your installation of JDBC Driver Failed
          e.printStackTrace();
        }
    }
   
    public void add(){    
    	String sql2 = "insert into user(name) values('qinqi')";
        try {
            stmt.execute(sql2);
        }catch (SQLException e){
            e.printStackTrace();
        }
    }
   
    public String search(String sn){
        String str = "so ：sa ："+sn+" ss ：";
        String sql1 = "select * from student where sn= '"+sn+"'; ";
        try {
            ResultSet rs = stmt .executeQuery(sql1);          
            if(rs.next()){  
                str = str+rs.getString("sn ")+" 手机号 ："
                        +rs.getString("sa ");
            }else str = "该记录不存在 ！！！";
        }catch (Exception e){
           e.printStackTrace();
        }
        return str;
    }
   
    public void modify(String sn,String ss){
        String sql = "update sturesult set ss ="+ss
                +" where sn ='"+sn+"' ";
        try {
            stmt .executeUpdate(sql);
        }catch (SQLException e){
            e.printStackTrace();
        }
    }
    
    public void delete(String sn){
        String sql1 = "delete from teststudent "+" where sn= '"+sn+"'; ";
        try {
            stmt.executeUpdate(sql1);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
          
    public void close(){
        try {
            if (con != null ) con .close();
            if (stmt != null ) stmt .close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    public static void main(String args[])throws Exception{
    	new ggg().add();
        //add test here!!!!
     //System.out .println("ghost is a big worry "); 
       
   
    }
   
}