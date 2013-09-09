package com.controller.basic;

import java.util.List;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.domain.basic.Dept;
import com.service.basic.DeptService;
import com.util.JSONGrid;

@Controller
@RequestMapping("/dept/")
public class DeptAction {

	
	@Autowired
	private DeptService deptService;
	
	/**
	 * 单位的保存
	 * @param dept
	 * @return
	 */
	@RequestMapping(value="insertDept")
	public @ResponseBody String insertDept(Dept dept){
		return deptService.insertDept(dept);
	}
	
	/**
	 * 单位的查询
	 * @param dept
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="queryDeptList")
	public @ResponseBody String queryDeptList(Dept dept) throws Exception{
		List<Dept> dataList = deptService.queryDeptList(dept);
		return JSONGrid.toJSon(dataList).toString();
	}
	
	/**
	 * 单位的tree列表
	 * @param dept
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="queryDeptTreeList")
	public @ResponseBody String queryDeptTreeList(Dept dept) throws Exception{
		return deptService.queryDeptTreeList(dept);
	}
	
	
	/**
	 * 删除
	 * @param dept
	 * @return
	 */
	@RequestMapping(value="delete_play_stopDeptById")
	public @ResponseBody String delete_play_stopDeptById(String idstr,String type){
		return deptService.delete_play_stopDeptById(idstr,type);
	}

	/**
	 * 获取单位ByID
	 * @param dept
	 * @return
	 */
	@RequestMapping(value="queryDeptById")
	public @ResponseBody String queryDeptById(String deptid){
		JSONObject obj = new JSONObject();
		Dept dept = deptService.queryDeptById(deptid);
		JSONObject dataObj = new JSONObject();
		dataObj.put("deptid",   dept.getDeptid());
		dataObj.put("parentid", dept.getParentid().equals("0")?"北京大学":dept.getParentid());
		dataObj.put("deptname", dept.getDeptname());
		dataObj.put("deptleve", dept.getDeptleve());
		dataObj.put("orderno",  dept.getOrderno());
		obj.put("data", dataObj);
		obj.put("success", true);
		return obj.toString();
	}
	
	
}
