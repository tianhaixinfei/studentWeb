package com.dao.jdbc;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcDaoSupport;

public class JdbcConUtilDaoImp extends NamedParameterJdbcDaoSupport implements JdbcConUtilDao{

//	public void insert(String tableName, JSONObject params) {
//		StringBuilder former = new StringBuilder("INSERT INTO ");
//		former.append(tableName);
//		former.append(" (");
//		StringBuilder latter = new StringBuilder(" VALUES (");
//		String key = null;
//		for (Iterator<String> it = params.keySet().iterator(); it.hasNext();) {
//			key = it.next();
//			former.append(key);
//			former.append(",");
//			latter.append("?,");
//		}
////		former.deleteCharAt(former.length() - 1);
////		latter.deleteCharAt(latter.length() - 1);
//		former.append(")");
//		latter.append(")");
//		former.append(latter.toString());
//		this.getJdbcTemplate().execute(latter.toString());
//	}

//	public int delete(String tableName, String cond) {
//		// TODO Auto-generated method stub
//		return 0;
//	}
//
//	public int update(String tableName, JSONObject params, String cond) {
//		// TODO Auto-generated method stub
//		return 0;
//	}
//
//	public int queryForInt(String sql, Map<String, ?> params) {
//		// TODO Auto-generated method stub
//		return 0;
//	}
//
//	public JSONArray queryForJSONObject(String sql, Map<String, ?> params) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	public JSONObject queryForJSONObjectPage(String sql, JSONObject params,
//			String orderby) {
//		// TODO Auto-generated method stub
//		return null;
//	}

}
