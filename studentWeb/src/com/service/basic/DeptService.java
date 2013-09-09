package com.service.basic;

import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.basic.DeptDao;
import com.domain.basic.Dept;


@Service
@Transactional
public class DeptService{
	
	@Autowired
	private DeptDao deptDao;
	
	/**
	 * 单位保存
	 * @param dept
	 */
	public String insertDept(Dept dept){
		JSONObject outObj  = new JSONObject();
		try{
			if(dept.getDeptid()!=null && !dept.getDeptid().equals("")){
				deptDao.updateDept(dept);
			}else{
				dept.setDeptid(new com.eaio.uuid.UUID().toString());
				if(dept.getDeptleve()!=null && dept.getDeptleve().equals("院系"))
					dept.setParentid("0");
				deptDao.insertDept(dept);
			}
			outObj.put("deptid", dept.getDeptid());
			outObj.put("parentid", dept.getParentid());
			outObj.put("deptname", dept.getDeptname());
			outObj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			outObj.put("success", false);
		}
		return outObj.toString();
	}
	
	/**
	 * 单位删除
	 * @param deptid
	 */
	public String delete_play_stopDeptById(String idstr,String type){
		JSONObject outObj  = new JSONObject();
		try{
			String[] ids = idstr.split(",");
			for(int i = 0;i < ids.length;i++){
				if(type!=null && type.equals("删除"))
					deptDao.deleteDeptById(ids[i]);
				else if(type!=null && (type.equals("停用") || type.equals("启用"))){
					Dept dept = new Dept();
					dept.setDeptid(ids[i]);
					dept.setStart_stop(type);
					deptDao.updateDept(dept);
				}
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
	 * 单位查询
	 * @param dept
	 * @return
	 */
	public List<Dept>  queryDeptList(Dept dept){
		return deptDao.queryDeptList(dept);
	}
	
	
	/**
	 * 单位查询TreeList
	 * @param dept
	 * @return
	 */
	public String  queryDeptTreeList(Dept dept){
		JSONArray retArr = new JSONArray();
		//首先取出一级
		if(dept.getParentid()==null || dept.getParentid().equals(""))dept.setParentid("0");
		List<Dept>  parentlist = deptDao.queryDeptList(dept);
		for(int i=0;i<parentlist.size();i++){
			JSONObject pobj = new JSONObject();
			Dept pd = parentlist.get(i);
			pobj.put("text", pd.getDeptname());
			pobj.put("leaf",pd.getLeaf().equals("1")?false:true);
			pobj.put("id",pd.getDeptid());
			
			//取出二级
			JSONArray  array =  new JSONArray();
			dept.setParentid(pd.getDeptid());
			List<Dept>  list = deptDao.queryDeptList(dept);
			for(int j=0;j<list.size();j++){
				JSONObject obj = new JSONObject();
				Dept d = list.get(j);
				obj.put("text", d.getDeptname());
				obj.put("leaf",d.getLeaf().equals("1")?false:true);
				obj.put("id",d.getDeptid());
				
				//取出三级
				JSONArray  childArray =  new JSONArray();
				dept.setParentid(d.getDeptid());
				List<Dept>  sublist = deptDao.queryDeptList(dept);
				for(int z=0;z<sublist.size();z++){
					JSONObject subObj = new JSONObject();
					Dept subd = sublist.get(z);
					subObj.put("text", subd.getDeptname());
					subObj.put("leaf",subd.getLeaf().equals("1")?false:true);
					subObj.put("id",subd.getDeptid());
					childArray.add(subObj);
				}
				obj.put("children", childArray);
				array.add(obj);
			}
			pobj.put("children", array);
			retArr.add(pobj);
		}
		return retArr.toString();
	}
	
	/**
	 * 单位Byid
	 * @param basic
	 * @return
	 */
	@Transactional(readOnly = true)
	public Dept queryDeptById(String deptid){
		Dept dept = new Dept();
		dept.setDeptid(deptid);
		List<Dept> list = deptDao.queryDeptList(dept);
		return list.get(0);
	}
	
}
