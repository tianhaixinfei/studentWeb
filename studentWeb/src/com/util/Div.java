package com.util;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

public class Div extends TagSupport{

	private static final long serialVersionUID = 1L;

	String type;// 类型

	String param;// 其余的参数信息,可以是自定义的任意字符串,然后再从中拆分

	String value;// 默认value

	public static ArrayList<String> typeList = new ArrayList<String>();                              
	static {
		typeList.add("north");
	}

	public int doStartTag() throws JspTagException {
		if (typeList.contains(type.toLowerCase())) {
			return EVAL_BODY_INCLUDE;
		} else {
			throw new JspTagException("type必须是定义");
		}
	}

	public int doEndTag() {
		try {
			StringBuffer s = new StringBuffer();
			if (type.toLowerCase().equals("north")) {
				s.append(getNorthDiv());
			} 
			pageContext.getOut().write(s.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}
	
	/**
	 * 
	 * @return
	 */
	public String getNorthDiv(){
		GregorianCalendar ca = new GregorianCalendar();
		java.text.DateFormat format1 = new java.text.SimpleDateFormat("yyyy年MM月dd日 ");
		StringBuffer s = new StringBuffer();
		s.append("<div id='north'>");
		s.append("<table border='0' cellpadding='0' cellspacing='0' width='100%'  height='100%' background='../../resources/images/main/default.png'>" );
			s.append("<tr>" );
				s.append("<td style='padding-left:15px'><img class='IEPNG' src='../../resources/images/main/Top_Title.png' /></td>" );
				s.append("<td style='padding-right:5px'>" );
					s.append("<table width='100%'   border='0' cellpadding='0' cellspacing='3'>" );
						s.append("<tr align='right'>" );
							s.append("<td>");
								s.append("<table border='0' cellpadding='0' cellspacing='1' align='right'>" );
								s.append("<tr align='right'>" );
									s.append("<td class='fontsize'>" );
										s.append(ca.get(GregorianCalendar.AM_PM) == '0'?"上午好，":"下午好，");
										s.append("<span id='loguser'><span>");
									s.append("</td>");
									s.append("<td>&nbsp;</td>" );
									s.append("<td class='fontsize'>" );
										s.append("  "+format1.format(new Date()));
										s.append("<span id='rTime'><span>");
									s.append("</td>");
									s.append("<td>&nbsp;</td>" );
									s.append("<td class='fontsize'>" );
										s.append("<span id='weekDays'><span>");
									s.append("</td>");
								s.append("</tr>" );
								s.append("</table>" );
							s.append("</td>");
						s.append("</tr>" );
						s.append("<tr align='right'>");
						s.append("<td>" );
							s.append("<table border='0' cellpadding='0' cellspacing='1' align='right'>" );
							s.append("<tr align='right'>" );
								s.append("<td><div id = 'themeDiv'></td> " );
								s.append("<td>&nbsp;</td>" );
								s.append("<td><div id = 'configDiv'></td> " );
								s.append("<td>&nbsp;</td>" );
								s.append("<td><div id = 'closeDiv'></td>" );
							s.append("</tr>" );
						 s.append("</table>" );
						 s.append("</td>" );
					 s.append("</tr>" );
					s.append("</table>" );
				s.append("</td>" );
			s.append("</tr>" );
		 s.append("</table>" );
	 s.append("</div>");
	return s.toString();
}
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}
