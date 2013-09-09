package com.domain.basic;

import java.io.Serializable;

public class Dept implements Serializable {
	private static final long serialVersionUID = -5268898209820709788L;
	
	public String deptid;//单位ID
	public String deptname;//单位名称
	public String parentid;//父亲单位ID
	public String deptleve;//单位级别
	public String orderno;//排序号
	public String start_stop;//是否停用
	
	public String leaf;//是否为子节点
	
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	public String getStart_stop() {
		return start_stop;
	}
	public void setStart_stop(String start_stop) {
		this.start_stop = start_stop;
	}
	public String getDeptid() {
		return deptid;
	}
	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}
	public String getDeptname() {
		return deptname;
	}
	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}
	public String getParentid() {
		return parentid;
	}
	public void setParentid(String parentid) {
		this.parentid = parentid;
	}
	public String getDeptleve() {
		return deptleve;
	}
	public void setDeptleve(String deptleve) {
		this.deptleve = deptleve;
	}
	public String getOrderno() {
		return orderno;
	}
	public void setOrderno(String orderno) {
		this.orderno = orderno;
	}
	
	
	
}
