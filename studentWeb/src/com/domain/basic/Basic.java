package com.domain.basic;

import java.io.Serializable;

public class Basic implements Serializable {
	private static final long serialVersionUID = -5268898209820709788L;
	
	public String id;//资源ID
	public String menuname;//资源名称
	public String parantid;//父亲资源ID
	public String c_iconcls;//图片
	public String c_url;//路径
	public String state;//状态
	public Integer orderno;//排序号
	public String cid;//子节点ID
	public String cname;//子节点名称
	
	
	public String roleid;//角色ID
	public String rolename;//角色名称
	public String resourceid;//资源ID
	
	
	//为映射前台
	public String checkState;//是否选择
	
	
	public String courseid;//课程ID
	public String coursename;//课程名称
	
	
	public String getCourseid() {
		return courseid;
	}
	public void setCourseid(String courseid) {
		this.courseid = courseid;
	}
	public String getCoursename() {
		return coursename;
	}
	public void setCoursename(String coursename) {
		this.coursename = coursename;
	}
	public String getCheckState() {
		return checkState;
	}
	public void setCheckState(String checkState) {
		this.checkState = checkState;
	}
	public String getRoleid() {
		return roleid;
	}
	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}
	public String getRolename() {
		return rolename;
	}
	public void setRolename(String rolename) {
		this.rolename = rolename;
	}
	public String getResourceid() {
		return resourceid;
	}
	public void setResourceid(String resourceid) {
		this.resourceid = resourceid;
	}
	public String getCid() {
		return cid;
	}
	public void setCid(String cid) {
		this.cid = cid;
	}
	public String getCname() {
		return cname;
	}
	public void setCname(String cname) {
		this.cname = cname;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getMenuname() {
		return menuname;
	}
	public void setMenuname(String menuname) {
		this.menuname = menuname;
	}
	public String getParantid() {
		return parantid;
	}
	public void setParantid(String parantid) {
		this.parantid = parantid;
	}
	public String getC_iconcls() {
		return c_iconcls;
	}
	public void setC_iconcls(String c_iconcls) {
		this.c_iconcls = c_iconcls;
	}
	public String getC_url() {
		return c_url;
	}
	public void setC_url(String c_url) {
		this.c_url = c_url;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	public Integer getOrderno() {
		return orderno;
	}
	public void setOrderno(Integer orderno) {
		this.orderno = orderno;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String remark;
	
}
