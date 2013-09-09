package com.domain.basic;

import java.io.Serializable;
import java.util.Date;

public class User implements Serializable {
	private static final long serialVersionUID = -5268898209820709788L;
	
	private String id;//ID
	private String uname;//用户名称
	private String ucode;//登入名称
	private String upass;//登入密码
	private String newpass;//新密码
	private Integer age;//年龄
	private String sex;//性别
	private String tel;//电话
	private String mail;//邮箱
	private Integer qq;//QQ号
	private Date createDate;//注册时间
	private String findbackPassInfo;//找回密码内容
	private String themeName;//模板样式
	private String type;//是学生还是老师
	private String remark;//备注信息
	private float orderno;//排序号
	private String state;//状态(停用)、(未审核)、(已审核)
	
	private String parentDeptId;//学院ID
	private String deptId;//专业ID
	private String subDeptId;//班级ID
	private Integer stunumber;//学号
	
	public String getNewpass() {
		return newpass;
	}
	public void setNewpass(String newpass) {
		this.newpass = newpass;
	}
	
	public float getOrderno() {
		return orderno;
	}
	public void setOrderno(float orderno) {
		this.orderno = orderno;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getUcode() {
		return ucode;
	}
	public void setUcode(String ucode) {
		this.ucode = ucode;
	}
	public String getUpass() {
		return upass;
	}
	public void setUpass(String upass) {
		this.upass = upass;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Integer getStunumber() {
		return stunumber;
	}
	public void setStunumber(Integer stunumber) {
		this.stunumber = stunumber;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getParentDeptId() {
		return parentDeptId;
	}
	public void setParentDeptId(String parentDeptId) {
		this.parentDeptId = parentDeptId;
	}
	public String getDeptId() {
		return deptId;
	}
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}
	public String getSubDeptId() {
		return subDeptId;
	}
	public void setSubDeptId(String subDeptId) {
		this.subDeptId = subDeptId;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public Integer getQq() {
		return qq;
	}
	public void setQq(Integer qq) {
		this.qq = qq;
	}
	public String getFindbackPassInfo() {
		return findbackPassInfo;
	}
	public void setFindbackPassInfo(String findbackPassInfo) {
		this.findbackPassInfo = findbackPassInfo;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getThemeName() {
		return themeName;
	}
	public void setThemeName(String themeName) {
		this.themeName = themeName;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	
	
	
}
