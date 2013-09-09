package com.dao.basic;

import java.util.List;

import com.domain.basic.Dept;

public interface DeptDao {

	void insertDept(Dept dept);
		
	void deleteDeptById(String deptid);
	
	void updateDept(Dept dept);
	
	public List<Dept>  queryDeptList(Dept dept);
}
