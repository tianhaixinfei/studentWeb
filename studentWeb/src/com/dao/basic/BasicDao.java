package com.dao.basic;

import java.util.List;
import java.util.Map;

import com.domain.basic.Basic;

public interface BasicDao {

	
	/**
	 * 获取模块
	 * @param userid
	 * @return
	 */
	List<Basic> queryModuleList(Map<String,Object> param );
	
	/**
	 * 获取用户的Theme
	 * @param userid
	 * @return
	 */
	String queryUserTheme(String userid);
	
	
	/**
	 * 验证码
	 * @return
	 */
	String validateUPass(Map<String,String> upass);
	
	/**
	 * 获取资源列表
	 * @param userid
	 * @return
	 */
	List<Basic> queryResourcesList();
	
	void saveResource(Basic basic);
	
	Basic  geResourcesInfoByID(String id);
	
	void updateResourceByID(Basic basic); 
	
	void deleteResourcesByID(String id);
	
	List<Basic>  queryResourcesListByID(String Id);
	
	List<Basic> queryResourcesListByRoleId(Basic basic);
	/**
	 * 获取角色
	 * @param basic
	 * @return
	 */
	List<Basic> queryRoleList(Basic basic);
	
	List<Basic> querySelectRoleListByUserId(String userid);
	
	void insertRole(Basic basic);
	
	void updateRole(Basic basic);
	
	void insertRole_Res(Basic basic);
	
	void deleteRoles(String id);
	
	void deleteRole_ResById(String id);
	
	void deleteUser_roleByUserId(String userid);
	
	void deleteUser_roleByRoleId(String roleid);
	
	void insertUser_Role(Map<String,String> map);
	
	/**
	 * 课程管理模块
	 */
	
	void insertCourse(Basic basic);
	
	void deleteCourseById(String courseId);
	
	void updateCourse(Basic basic);
	
	List<Basic> queryCourseList(Basic basic);
}
