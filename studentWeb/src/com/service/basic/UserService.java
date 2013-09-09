package com.service.basic;

import java.util.Date;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.basic.UserDao;
import com.domain.basic.User;


@Service
@Transactional
public class UserService{
	
	@Autowired
	private UserDao userDao;
	/**
	 * 登录验证
	 * @param param
	 * @return
	 */
	@Transactional(readOnly = true)
	public User login(Map<String,Object> param) {
		return userDao.login(param);
	}
	
	/**
	 * 判断此登门明是否存在
	 * @param param
	 * @return
	 */
	@Transactional(readOnly = true)
	public User valiUserCode(Map<String,String> map) {
		return userDao.valiUserCode(map);
	}
	
	/**
	 * 查询用户Count
	 * @param user
	 * @return
	 */
	public int queryUserListLimitCount(User user) {
		return userDao.queryUserListLimitCount(user);
	}
	
	/**
	 * 查询用户List
	 * @param user
	 * @return
	 */
	public List<User> queryUserListLimitData(User user){
		return userDao.queryUserListLimitData(user);
	}
	
	/**
	 * 用户修改和保存
	 * @param user
	 * @return
	 */
	public String saveUser(User user){
		JSONObject outObj  = new JSONObject();
		try{
			if(user.getId()!=null && !user.getId().equals("")){
				userDao.updateUserByID(user);
			}else{
				user.setId(new com.eaio.uuid.UUID().toString());
				user.setCreateDate(new Date());
				user.setUpass("123456");
				userDao.saveUser(user);
			}
			outObj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			outObj.put("success", false);
			return outObj.toString();
		}
		return outObj.toString();
	}
	
	/**
	 * 用户修改和保存
	 * @param user
	 * @return
	 */
	public String registerUser(User user){
		JSONObject outObj  = new JSONObject();
		try{
			user.setId(new com.eaio.uuid.UUID().toString());//初始化ID
			user.setCreateDate(new Date());//注册时间
			user.setUpass("123456");//用户密码
			user.setState("未审核");
			user.setType("学生");
			userDao.saveUser(user);
			outObj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			outObj.put("success", false);
			return outObj.toString();
		}
		return outObj.toString();
	}
	
	/**
	 * 根据Id获取用户信息
	 * @param id
	 * @return
	 */
	public User getUserInfoByID(User user){
		return userDao.getUserInfoByID(user);
	}
	
	/**
	 * 删除、暂停、启动
	 * @param basic
	 * @return
	 */
	public String delete_play_stopUser(String idStr,String nameStr,String handleType){
		JSONObject outObj  = new JSONObject();
		try{
			String[] ids = idStr.split(",");
			for(int i = 0;i < ids.length;i++){
				if(handleType.equals("删除")){
					userDao.deleteUserByID(ids[i]);
				}else if(handleType.equals("停用") || handleType.equals("审核") || handleType.equals("未审核")){
					User user = new User();
					user.setId(ids[i]);
					user.setState(handleType);
					userDao.updateUserState(user);
				}else if(handleType.equals("初始化")){
					User user = new User();
					user.setId(ids[i]);
					userDao.updateUserPassword(user);
				}
			}
			outObj.put("success", true);
			outObj.put("retinfo", "["+nameStr+']'+handleType+"成功");
		}catch(Exception e){
			e.printStackTrace();
			outObj.put("retinfo", "["+nameStr+']'+handleType+"失败");
			outObj.put("success", false);
			return outObj.toString();
		}
		return outObj.toString();
	}
	
	/**
	 * 修改密码
	 * @param user
	 * @return
	 */
	@Transactional(readOnly = true)
	public String updateUserPassword(User user){
		JSONObject outObj  = new JSONObject();
		try{
			userDao.updateUserPassword(user);
			outObj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			outObj.put("success", false);
			return outObj.toString();
		}
		return outObj.toString();
	}
	
	/**
	 * 保存用户Theme
	 * @param user
	 * @return
	 */
	public String savaUserTheme(User user){
		JSONObject outObj  = new JSONObject();
		try{
			userDao.savaUserTheme(user);
			outObj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			outObj.put("success", false);
			return outObj.toString();
		}
		return outObj.toString();
	}
	
	/**
	 * 查询用户是否存在
	 * @param user
	 * @return
	 */
	public List<User> findUpassByInfo(User user){
		return userDao.findUpassByInfo(user);
	}
	
}
