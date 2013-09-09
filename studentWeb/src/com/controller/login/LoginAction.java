package com.controller.login;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.domain.basic.User;
import com.service.basic.UserService;
import com.util.JSONGrid;

@Controller
@RequestMapping("/user/")
public class LoginAction {
	
	@Autowired
	private UserService userService;
	
	
	/**
	 * 登录验证
	 * @param request
	 * @param response
	 * @param user
	 * @return
	 */
	@RequestMapping(value="login",method=RequestMethod.POST)
	public @ResponseBody String loginCheck(HttpServletRequest request,User retUser){
		JSONObject responseObj = new JSONObject();
		Map<String,Object> param = new HashMap<String,Object>();
		String valicode = request.getParameter("valicode");
		String vcode = (String) request.getSession().getAttribute("vcode");
		try {
			if(valicode==null || !valicode.equals(vcode)){
				responseObj.put("success", "valicode");
				responseObj.put("info", "验证码错误！");
				return responseObj.toString();
			}
				
			param.put("ucode", retUser.getUcode());
			param.put("upass", retUser.getUpass());
			param.put("type", retUser.getType());
			User user = userService.login(param);
			if(user!=null) {
				responseObj.put("success", "true");
				responseObj.put("info", "登录成功！");
				request.getSession().setAttribute("user", user); 
				request.getSession().setAttribute("userId", user.getId()); 
				request.getSession().setAttribute("loginUserName", user.getUname()); 
			}else {
				responseObj.put("success", "false");
				responseObj.put("info", "用户名或密码错误！");
			}
			return responseObj.toString();
		}catch(Exception e) {
			e.printStackTrace();
			responseObj.put("info", e.getClass()+":"+e.getMessage());
			return responseObj.toString();
		}
	}
	
	
	/**
	 * 判断此用户是否存在
	 * @param request
	 * @param retUser
	 * @return
	 */
	@RequestMapping(value="valiUserCode",method=RequestMethod.POST)
	public @ResponseBody String valiUserCode(String ucode,String userid)throws Exception{
		JSONObject responseObj = new JSONObject();
		Map<String,String> map = new HashMap<String, String>();
		map.put("ucode", ucode);
		map.put("userid", userid);
		User user = userService.valiUserCode(map);
		if(user!=null) {
			responseObj.put("success", "true");
		}else {
			responseObj.put("success", "false");
		}
		return responseObj.toString();
	}
	
	/**
	 * 获取所有用户
	 * @param request
	 * @param retUser
	 * @return
	 */
	@RequestMapping(value="queryUserList",method=RequestMethod.POST)
	public @ResponseBody String queryUserList(HttpServletRequest request,User retUser)throws Exception{
		int count = userService.queryUserListLimitCount(retUser);
		List<User> dataList = userService.queryUserListLimitData(retUser);
		return JSONGrid.toJSon(dataList, count, new SimpleDateFormat("yyyy-MM-dd")).toString();
	}
	
	

	/**
	 * 保存用户
	 * @param parentid
	 * @param basic
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="saveUser",method=RequestMethod.POST)
	public @ResponseBody String saveUser(User user)throws Exception{
		return userService.saveUser(user);
	}

	/**
	 * 学生注册
	 * @param parentid
	 * @param basic
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="registerUser",method=RequestMethod.POST)
	public @ResponseBody String registerUser(User user)throws Exception{
		return userService.registerUser(user);
	}
	/**
	 * 修改密码
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="updateUserPassword",method=RequestMethod.POST)
	public @ResponseBody String updateUserPassword(HttpServletRequest request,User user)throws Exception{
		user.setId((String)request.getSession().getAttribute("userId"));
		return userService.updateUserPassword(user);
	}
	
	/**
	 * 保存Theme
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="savaUserTheme",method=RequestMethod.POST)
	public @ResponseBody String savaUserTheme(HttpServletRequest request,String themename)throws Exception{
		User user = new User();
		user.setId((String)request.getSession().getAttribute("userId"));
		user.setThemeName(themename);
		return userService.savaUserTheme(user);
	}
	
	/**
	 * 根据ID获取莫资源
	 * @param request
	 * @param id
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="getUserInfoByID")
	public @ResponseBody String getUserInfoByID(HttpServletRequest request,User retUser,HttpServletResponse response)throws Exception{
		JSONObject obj = new JSONObject();
		User user = userService.getUserInfoByID(retUser);
		JSONObject dataObj = new JSONObject();
		dataObj.put("id", user.getId());
		dataObj.put("uname", user.getUname());
		dataObj.put("ucode", user.getUcode());
		dataObj.put("stunumber", user.getStunumber());
		dataObj.put("age", user.getAge());
		dataObj.put("sex", user.getSex());
		dataObj.put("parentDeptId", user.getParentDeptId());
		dataObj.put("deptId", user.getDeptId());
		dataObj.put("subDeptId", user.getSubDeptId());
		dataObj.put("tel", user.getTel());
		dataObj.put("mail", user.getMail());
		dataObj.put("qq", user.getQq());
		dataObj.put("findbackPassInfo", user.getFindbackPassInfo());
		dataObj.put("state", user.getState());
		dataObj.put("remark", user.getRemark());
		dataObj.put("orderno", user.getOrderno());
		dataObj.put("themeName", user.getThemeName());
		dataObj.put("type", user.getType());
		obj.put("data", dataObj);
		obj.put("success", true);
		return obj.toString();
	}
	
	/**
	 * 删除、暂停用户、启动用户
	 * @param basic
	 * @return
	 */
	@RequestMapping(value="delete_play_stopUser")
	public @ResponseBody String delete_play_stopUser(String idstr,String namestr,String handletype){
		return userService.delete_play_stopUser(idstr,namestr,handletype);
	}
	
	/**
	 * 验证用户找回密码
	 * @param request
	 * @param retUser
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="findUpassByInfo",method=RequestMethod.POST)
	public @ResponseBody String findUpassByInfo(HttpServletRequest request,User retUser)throws Exception{
		JSONObject obj = new JSONObject();
		try{
			List<User> dataList = userService.findUpassByInfo(retUser);
			if(dataList.size()>0)
				obj.put("success", true);
			else
				obj.put("success", false);
		}catch(Exception e){
			obj.put("success", false);
			e.printStackTrace();
		}
		return obj.toString();
	}
}
