package com.dao.basic;

import java.util.List;
import java.util.Map;

import com.domain.basic.User;

public interface UserDao {
	
	/**
	 * 查找用户
	 * @param obj
	 * @return
	 */
	User login(Map<String,Object> param);
	
	User valiUserCode(Map<String, String> map);
	
	int queryUserListLimitCount(User user);
	
	List<User> queryUserListLimitData(User user);
	
	void updateUserByID(User user);
	
	void saveUser(User user);
	
	User getUserInfoByID(User user);
	
	void deleteUserByID(String id);
	
	void updateUserState(User user);
	
	void updateUserPassword(User user);
	
	void savaUserTheme(User user);
	
	List<User> findUpassByInfo(User user);
}
