package com.ourproject.firstblog;
import java.sql.Connection;  
import java.sql.DriverManager;  
import java.sql.ResultSet;  
import java.sql.Statement;  
  
public class TestMySql  
{  
    public static void main(String[] args)  
    {  
        try  
        {  
            Statement stmt=null;  
            ResultSet rs=null;  
            Class.forName("com.mysql.jdbc.Driver");  
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/blog","root","root");   
            stmt = (Statement)conn.createStatement();  
            String sql2 = "insert into user(name,password,question,answer) values ('qinqi','123456','123','123');";
            stmt.execute(sql2);   
  
//            while (rs.next())   
//            {   
//                 System.out.println(rs.getString(2));  
//            }   
            stmt.close();
            conn.close();
        }  
        catch(Exception ex)  
        {  
            ex.printStackTrace();  
        }  
    }  
}  