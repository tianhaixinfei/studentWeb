package com.controller.basic;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.domain.basic.Basic;
import com.service.basic.BasicService;
import com.util.JSONGrid;

@Controller
@RequestMapping("/basic/")
public class BasicAction {

	
	@Autowired
	private BasicService basicService;
	
	/**
	 * 模块查询
	 * @return
	 */
	@RequestMapping(value="queryModuleList",method=RequestMethod.POST)
	public @ResponseBody String queryModuleList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		List<Basic> list = new ArrayList<Basic>();
		String userId = (String)request.getSession().getAttribute("userId");
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("userId", userId);
		param.put("parantId", "0");
		list = basicService.queryModuleList(param);
		JSONArray dataArray = new JSONArray();
		dataArray.addAll(list);
		return dataArray.toString();
	}
	
	/***
	 * 获取模块下的菜单
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="queryTreeList",method=RequestMethod.POST)
	public @ResponseBody String queryTreeList(HttpServletRequest request, Basic basic)throws Exception{
		JSONArray  childArray =  new JSONArray();
		String userId = (String)request.getSession().getAttribute("userId");
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("userId", userId);
		param.put("parantId", basic.getId());
		List<Basic> list = basicService.queryModuleList(param);
		for(int i=0;i<list.size();i++) {
			JSONObject outChild = new JSONObject();
			Basic b = (Basic)list.get(i);
			outChild.put("text", b.getMenuname());
			outChild.put("id", b.getId());
			outChild.put("parantid", b.getParantid());
			outChild.put("iconCls",b.getC_iconcls());
			outChild.put("c_url", b.getC_url());
			outChild.put("orderno", b.getOrderno());
			outChild.put("expanded", true);
			outChild.put("leaf", true);
			childArray.add(outChild);
		}
		return childArray.toString();
	}
	
	
	
	/**
	 * 初始化主题
	 * @param themename
	 * @return
	 */
	@RequestMapping(value="queryUserTheme",method=RequestMethod.POST)
	public @ResponseBody String queryUserTheme(HttpServletRequest request,HttpServletResponse response)throws Exception{
		String outStr = basicService.queryUserTheme((String)request.getSession().getAttribute("userId"));
		return outStr;
	}
	
	/**
	 * 资源列表
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="queryResourcesList",method=RequestMethod.POST)
	public @ResponseBody String queryResourcesList()throws Exception{
		JSONArray list = basicService.queryResourcesList();
		return list.toString();
	}
	
	/**
	 * 验证密码
	 * @param upass
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="validateUPass",method=RequestMethod.POST)
	public @ResponseBody String validateUPass(HttpServletRequest request,String upass)throws Exception{
		Map<String,String> map = new HashMap<String,String>();
		map.put("id", (String) request.getSession().getAttribute("userId"));
		map.put("upass", upass);
		return basicService.validateUPass(map);
	}
	
	/**
	 * 资源保存
	 * @param parentid
	 * @param basic
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="saveResource",method=RequestMethod.POST)
	public @ResponseBody String saveResource(String parentid,Basic basic)throws Exception{
		basic.setParantid(parentid);
		return basicService.saveResource(basic);
	}
	
	/**
	 * 根据ID获取莫资源
	 * @param request
	 * @param id
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="geResourcesInfoByID")
	public @ResponseBody String geResourcesInfoByID(HttpServletRequest request,String id,HttpServletResponse response)throws Exception{
		JSONObject obj = new JSONObject();
		Basic basic = basicService.geResourcesInfoByID(id);
		JSONObject dataObj = new JSONObject();
		dataObj.put("id", basic.getId());
		dataObj.put("menuname", basic.getMenuname().toString());
		dataObj.put("c_iconcls", basic.getC_iconcls());
		dataObj.put("state", basic.getState());
		dataObj.put("orderno", basic.getOrderno());
		dataObj.put("c_url", basic.getC_url());
		obj.put("data", dataObj);
		obj.put("success", true);
		return obj.toString();
	}
	
	/**
	 * 资源的删除、启用、停用
	 * @param basic
	 * @return
	 */
	@RequestMapping(value="delete_play_stopByResources")
	public @ResponseBody String delete_play_stopByResources(Basic basic){
		return basicService.deleteResourcesByID(basic);
	}
	
	/**
	 * 角色的List
	 * @param basic
	 * @return
	 */
	@RequestMapping(value="queryRoleList")
	public @ResponseBody String queryRoleList(Basic basic) throws Exception{
		List<Basic> dataList = basicService.queryRoleList(basic);
		return JSONGrid.toJSon(dataList,dataList.size()).toString();
	}
	
	/**
	 * 角色的List
	 * @param basic
	 * @return
	 */
	@RequestMapping(value="querySelectRoleListByUserId")
	public @ResponseBody String querySelectRoleListByUserId(String userid) throws Exception{
		List<Basic> dataList = basicService.querySelectRoleListByUserId(userid);
		return JSONGrid.toJSon(dataList,dataList.size()).toString();
	}
	
	/**
	 * 角色的保存
	 * @param basic
	 * @return
	 */
	@RequestMapping(value="insertRole")
	public @ResponseBody String insertRole(Basic basic){
		return basicService.insertRole(basic);
	}
	

	/**
	 * 角色--资源配置:vals(获取选择的树)：AAA:aaa,bbb;BBB:aaa,bbb;
	 * @param basic
	 * @return
	 */
	@RequestMapping(value="insertRole_Res")
	public @ResponseBody String insertRole_Res(String vals,Basic basic){
		return basicService.insertRole_Res(vals,basic);
	}
	
	
	/**
	 * 给用户配置角色;
	 * @param basic
	 * @return
	 */
	@RequestMapping(value="insertUser_Role")
	public @ResponseBody String insertUser_Role(String userid,String roleids){
		return basicService.insertUser_Role(userid,roleids);
	}
	
	/**
	 * 获取角色ByID
	 * @param basic
	 * @return
	 */
	@RequestMapping(value="geRoleInfoByID")
	public @ResponseBody String geRoleInfoByID(String id){
		JSONObject obj = new JSONObject();
		Basic basic = basicService.geRoleInfoByID(id);
		JSONObject dataObj = new JSONObject();
		dataObj.put("id", basic.getId());
		dataObj.put("rolename", basic.getRolename());
		dataObj.put("orderno", basic.getOrderno());
		dataObj.put("remark", basic.getRemark());
		obj.put("data", dataObj);
		return obj.toString();
	}
	
	/**
	 * 删除
	 * @param basic
	 * @return
	 */
	@RequestMapping(value="deleteRoles")
	public @ResponseBody String deleteRoles(String idstr,String namestr){
		return basicService.deleteRoles(idstr,namestr);
	}
	
	/**
	 * 获取当前用户所拥有的资源树
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="queryResourcesListByRoleId",method=RequestMethod.POST)
	public @ResponseBody String queryResourcesListByRoleId(String roleid)throws Exception{
		JSONArray list = basicService.queryResourcesListByRoleId(roleid);
		return list.toString();
	}
	
	

	/**
	 * 课程的保存
	 * @param basic
	 * @return
	 */
	@RequestMapping(value="insertCourse")
	public @ResponseBody String insertCourse(Basic basic){
		return basicService.insertCourse(basic);
	}
	
	/**
	 * 课程List
	 * @param basic
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="queryCourseList")
	public @ResponseBody String queryCourseList(Basic basic) throws Exception{
		List<Basic> dataList = basicService.queryCourseList(basic);
		return JSONGrid.toJSon(dataList,dataList.size()).toString();
	}
	
	/**
	 * 删除
	 * @param basic
	 * @return
	 */
	@RequestMapping(value="deleteCourseById")
	public @ResponseBody String deleteCourseById(String idstr,String namestr){
		return basicService.deleteCourseById(idstr,namestr);
	}

	/**
	 * 获取ByID
	 * @param basic
	 * @return
	 */
	@RequestMapping(value="queryCourseById")
	public @ResponseBody String queryCourseByid(String courseid){
		JSONObject obj = new JSONObject();
		Basic basic = basicService.queryCourseById(courseid);
		JSONObject dataObj = new JSONObject();
		dataObj.put("courseid", basic.getCourseid());
		dataObj.put("coursename", basic.getCoursename());
		dataObj.put("orderno", basic.getOrderno());
		dataObj.put("remark", basic.getRemark());
		obj.put("data", dataObj);
		obj.put("success", true);
		return obj.toString();
	}
}
