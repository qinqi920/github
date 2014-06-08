package com.ourproject.firstblog.servlet;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

public class IdentityServlet extends HttpServlet{
	public static final char[]  CHARS = {'2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R',
			'S','T','U','V','W','X','Y','Z'};
	String codeString = null;
	public static Random random = new Random();
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException,IOException{
		
		String getCode = request.getParameter("getcode");
		if("true".equals(getCode)){
			response.setCharacterEncoding("utf-8");
			PrintWriter out = response.getWriter();
			out.write(codeString);
		}else{
			codeString = getRandomString();
			response.setContentType("image/jpeg");
			int height = 35;
			int width = 98;
			Color color = getRandomColor();
			Color reverse = getReverseColor(color);
			BufferedImage bi = new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
			Graphics2D g = bi.createGraphics();
			g.setFont(new Font(Font.SANS_SERIF,Font.BOLD,28));
			g.setColor(color);
			g.fillRect(0, 0, width, height);
			g.setColor(reverse);
			g.drawString(codeString, 15, 27);
			for(int i=0;i<random.nextInt(100);i++){
				g.drawRect(random.nextInt(width), random.nextInt(height), 1, 1);
			}
			
			ServletOutputStream out = response.getOutputStream();
			JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
			encoder.encode(bi);
			out.flush();
		}
	}
	public static String getRandomString(){
		StringBuffer buffer = new StringBuffer();
		for(int i=0;i<4;i++){
			buffer.append(CHARS[random.nextInt(CHARS.length)]);
		}
		return buffer.toString();
		
	}
	public static Color getRandomColor(){
		return new Color(random.nextInt(255),random.nextInt(255),random.nextInt(255));
	}
	public static Color getReverseColor(Color c){
		return new Color(255-c.getRed(),255-c.getGreen(),255-c.getBlue());
	}

}
