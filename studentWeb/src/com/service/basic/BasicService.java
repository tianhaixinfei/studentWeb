package com.service.basic;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.basic.BasicDao;
import com.domain.basic.Basic;

@Service
@Transactional
public class BasicService {

	@Autowired
	public BasicDao basicDao;
	
	/**
	 * 获取此用户左模块
	 * @param userid
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<Basic> queryModuleList(Map<String,Object> param) {
		return basicDao.queryModuleList(param);
	}
	
	/**
	 * 获取用户主题
	 * @param userId
	 * @return
	 */
	@Transactional(readOnly = true)
	public String queryUserTheme(String userId){
		JSONObject outObj  = new JSONObject();
		String themename = basicDao.queryUserTheme(userId);
		if(themename==null || (themename!=null && themename.equals("default"))){
			outObj.put("showCss", "/css/ext-all.css");
			outObj.put("themename", "default");
		}
		else{
			outObj.put("showCss", "/ext3.3.1-theme/css/"+themename+".css");
			outObj.put("themename", themename);
		}
		return outObj.toString();
	}
	
	/**
	 * 获取所有资源
	 * kind:是获取资源列表，还是为角色配置资源。关键是否显示checkbox。kind有值就不显示
	 * @return
	 */
	@Transactional(readOnly = true)
	public JSONArray queryResourcesList(){
		List<Basic> list = basicDao.queryResourcesList();
		JSONArray  resArr = new JSONArray();
		for(int i = 0; i < list.size();i++){
			JSONObject obj = new JSONObject();
			Basic b = list.get(i);
			obj.put("id", b.getId());
			obj.put("parantid", b.getParantid());
			obj.put("text", b.getMenuname());
			obj.put("c_url", b.getC_url());
			obj.put("state", b.getState());
			obj.put("orderno", b.getOrderno());
			obj.put("iconCls", b.getC_iconcls());
			obj.put("expanded", true);
			List<Basic> queryArray = basicDao.queryResourcesListByID(b.getId());
			JSONArray  childArray =  new JSONArray();
			for(int j=0;j<queryArray.size();j++) {
				JSONObject outChild = new JSONObject();
				Basic bb = (Basic)queryArray.get(j);
				outChild.put("text", bb.getMenuname());
				outChild.put("id", bb.getId());
				outChild.put("parantid", bb.getParantid());
				outChild.put("iconCls",bb.getC_iconcls());
				outChild.put("state", bb.getState());
				outChild.put("c_url", bb.getC_url());
				outChild.put("orderno", bb.getOrderno());
				outChild.put("expanded", true);
				outChild.put("leaf", true);
				childArray.add(outChild);
			}
			obj.put("children", childArray);
			resArr.add(obj);
		}
		return resArr;
	}
	
	/**
	 * 锁定验证
	 * @param map
	 * @return
	 */
	@Transactional(readOnly = true)
	public String validateUPass(Map<String,String> map){
		JSONObject outObj  = new JSONObject();
		try{
			String uname = basicDao.validateUPass(map);
			if(uname!=null && !uname.equals("")){
				outObj.put("success", true);
			}else{
				outObj.put("success", false);
			}
		}catch(Exception e){
			e.printStackTrace();
			outObj.put("success", false);
			return outObj.toString();
		}
		return outObj.toString();
	}
	
	/**
	 * 保存和修改资源
	 * @param basic
	 * @return
	 */
	public String saveResource(Basic basic){
		JSONObject outObj  = new JSONObject();
		try{
			if(basic.getId()!=null && !basic.getId().equals("")){
				basicDao.updateResourceByID(basic);
			}else{
				basic.setId(new com.eaio.uuid.UUID().toString());
				basicDao.saveResource(basic);
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
	 * 根据ID获取资源
	 * @param id
	 * @return
	 */
	@Transactional(readOnly = true)
	public Basic geResourcesInfoByID(String id) {
		Basic basic = basicDao.geResourcesInfoByID(id);
		return basic;
	}
	
	/**
	 * 删除、暂停、启动资源
	 * @param basic
	 * @return
	 */
	@Transactional(readOnly = true)
	public String deleteResourcesByID(Basic basic){
		JSONObject outObj  = new JSONObject();
		try{
			if(basic.getState().equals("删除")){
				basicDao.deleteResourcesByID(basic.getId());
			}else if(basic.getState().equals("停用") ||basic.getState().equals("启用")){
				basicDao.updateResourceByID(basic);
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
	 * 角色List
	 * @param basic
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<Basic> queryRoleList(Basic basic){
		return basicDao.queryRoleList(basic);
	}
	
	/**
	 * 角色List
	 * @param basic
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<Basic> querySelectRoleListByUserId(String userid){
		return basicDao.querySelectRoleListByUserId(userid);
	}
	/**
	 * 角色保存
	 * @param basic
	 * @return
	 */
	public String insertRole(Basic basic){
		JSONObject outObj  = new JSONObject();
		try{
			if(basic.getId()!=null && !basic.getId().equals("")){
				basicDao.updateRole(basic);
			}else{
				basic.setId(new com.eaio.uuid.UUID().toString());
				basicDao.insertRole(basic);
			}
			outObj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			outObj.put("success", false);
		}
		return outObj.toString();
	}
	
	/**
	 * 给角色配置资源 vals(获取选择的树)：AAA:aaa,bbb;BBB:aaa,bbb;
	 * @param basic
	 * @return
	 */
	public String insertRole_Res(String res,Basic basic){
		JSONObject outObj  = new JSONObject();
		try{
			//先删除
			basicDao.deleteRole_ResById(basic.getRoleid());
			//再插入
			String[] childs =  res.split(",");
			for(int j = 0; j < childs.length;j++){
				basic.setId(new com.eaio.uuid.UUID().toString());
				basic.setResourceid(childs[j]);
				basicDao.insertRole_Res(basic);
			}
			outObj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			outObj.put("success", false);
		}
		return outObj.toString();
	}
	
	
	/**
	 * 给用户配置角色
	 * @param basic
	 * @return
	 */
	public String insertUser_Role(String userid,String roleids){
		JSONObject outObj  = new JSONObject();
		try{
			
			String[] userids = userid.split(",");
			for(int i = 0; i < userids.length;i++){
				//先删除
				basicDao.deleteUser_roleByUserId(userids[i]);
				
				//再插入
				String[] childs =  roleids.split(",");
				Map<String,String> map = new HashedMap();
				for(int j = 0; j < childs.length;j++){
					map.put("id", new com.eaio.uuid.UUID().toString());
					map.put("userid", userids[i]);
					map.put("roleid", childs[j]);
					basicDao.insertUser_Role(map);
				}
			}
			outObj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			outObj.put("success", false);
		}
		return outObj.toString();
	}
	
	
	/**
	 * 获取角色BYID
	 * @param id
	 * @return
	 */
	public Basic geRoleInfoByID(String id){
		Basic basic = new Basic();
		basic.setId(id);
		List<Basic> list = basicDao.queryRoleList(basic);
		return list.get(0);
	}
	
	/**
	 * 删除角色：根据roleid删除role表、user_role表、
	 * @param basic
	 * @return
	 */
	public String deleteRoles(String idstr,String namestr){
		JSONObject outObj  = new JSONObject();
		try{
			String[] ids = idstr.split(",");
			for(int i = 0;i < ids.length;i++){
				basicDao.deleteRoles(ids[i]);//删除role表
				basicDao.deleteUser_roleByRoleId(ids[i]);//删除角色和用户的关联信息
				basicDao.deleteRole_ResById(ids[i]);//删除角色和资源的关联信息
			}
			outObj.put("success", true);
			outObj.put("retinfo", "["+namestr+']'+"删除成功");
		}catch(Exception e){
			e.printStackTrace();
			outObj.put("success", false);
			outObj.put("retinfo", "["+namestr+']'+"删除失败");
			return outObj.toString();
		}
		return outObj.toString();
	}
	
	/**
	 * 获取此角色下配置的资源。
	 * @return
	 */
	@Transactional(readOnly = true)
	public JSONArray queryResourcesListByRoleId(String roleid){
		Basic basic = new Basic();
		basic.setParantid("0");
		basic.setRoleid(roleid);
		List<Basic> list = basicDao.queryResourcesListByRoleId(basic);
		JSONArray  resArr = new JSONArray();
		for(int i = 0; i < list.size();i++){
			JSONObject obj = new JSONObject();
			Basic b = list.get(i);
			obj.put("id", b.getId());
			obj.put("parantid", b.getParantid());
			obj.put("text", b.getMenuname());
			obj.put("c_url", b.getC_url());
			obj.put("state", b.getState());
			obj.put("orderno", b.getOrderno());
			obj.put("iconCls", b.getC_iconcls());
			obj.put("expanded", true);
			obj.put("checked",(b.getCheckState()!=null && b.getCheckState().equals("1")?true:false));
			basic.setParantid(b.getId());
			List<Basic> queryArray = basicDao.queryResourcesListByRoleId(basic);
			JSONArray  childArray =  new JSONArray();
			for(int j=0;j<queryArray.size();j++) {
				JSONObject outChild = new JSONObject();
				Basic bb = (Basic)queryArray.get(j);
				outChild.put("text", bb.getMenuname());
				outChild.put("id", bb.getId());
				outChild.put("parantid", bb.getParantid());
				outChild.put("iconCls",bb.getC_iconcls());
				outChild.put("state", bb.getState());
				outChild.put("c_url", bb.getC_url());
				outChild.put("orderno", bb.getOrderno());
				outChild.put("expanded", true);
				outChild.put("leaf", true);
				outChild.put("checked",(bb.getCheckState()!=null && bb.getCheckState().equals("1")?true:false));
				childArray.add(outChild);
			}
			obj.put("children", childArray);
			resArr.add(obj);
		}
		return resArr;
	}
	
	
	/**
	 * 课程保存
	 * @param basic
	 * @return
	 */
	public String insertCourse(Basic basic){
		JSONObject outObj  = new JSONObject();
		try{
			if(basic.getCourseid()!=null && !basic.getCourseid().equals("")){
				basicDao.updateCourse(basic);
			}else{
				basic.setCourseid(new com.eaio.uuid.UUID().toString());
				basicDao.insertCourse(basic);
			}
			outObj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			outObj.put("success", false);
		}
		return outObj.toString();
	}
	
	

	/**
	 * 课程List
	 * @param basic
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<Basic> queryCourseList(Basic basic){
		return basicDao.queryCourseList(basic);
	}
	
	
	/**
	 * 删除课程
	 * @param basic
	 * @return
	 */
	public String deleteCourseById(String idstr,String namestr){
		JSONObject outObj  = new JSONObject();
		try{
			String[] ids = idstr.split(",");
			for(int i = 0;i < ids.length;i++){
				basicDao.deleteCourseById(ids[i]);
			}
			outObj.put("success", true);
			outObj.put("retinfo", "["+namestr+']'+"删除成功");
		}catch(Exception e){
			e.printStackTrace();
			outObj.put("success", false);
			outObj.put("retinfo", "["+namestr+']'+"删除失败");
			return outObj.toString();
		}
		return outObj.toString();
	}
	
	/**
	 * 课程Byid
	 * @param basic
	 * @return
	 */
	@Transactional(readOnly = true)
	public Basic queryCourseById(String courseid){
		Basic basic = new Basic();
		basic.setCourseid(courseid);
		List<Basic> list = basicDao.queryCourseList(basic);
		return list.get(0);
	}
}
