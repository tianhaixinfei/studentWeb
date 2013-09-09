package com.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.DefaultValueProcessor;

public class JSONGrid {
	
	public static JSONObject toJSon(List<?> displayDataList) throws Exception {
		int totalCount = displayDataList == null ? 0 : displayDataList.size();
		return toJSon(displayDataList, totalCount, "");
	}
	
	public static JSONObject toJSon(List<?> displayDataList, String otherInfo) throws Exception {
		int totalCount = displayDataList == null ? 0 : displayDataList.size();
		return toJSon(displayDataList, totalCount, otherInfo);
	}
	
	public static JSONObject toJSon(List<?> displayDataList, SimpleDateFormat df) throws Exception {
		int totalCount = displayDataList == null ? 0 : displayDataList.size();
		return toJSon(displayDataList, totalCount, df, "");
	}
	
	public static JSONObject toJSon(List<?> displayDataList, SimpleDateFormat df, String otherInfo) throws Exception {
		int totalCount = displayDataList == null ? 0 : displayDataList.size();
		return toJSon(displayDataList, totalCount, df, otherInfo);
	}
	
	public static JSONObject toJSon(List<?> displayDataList, int totalCount, SimpleDateFormat df, String otherInfo) throws Exception {
		JSONObject dataObj = new JSONObject();
		dataObj.put("total", totalCount);
		dataObj.put("otherInfo", otherInfo);
		JSONArray dataArray = new JSONArray();
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor(df));
		dataArray.addAll(displayDataList, config);
		dataObj.put("invdata", dataArray);
		return dataObj;
	}
	
	public static JSONObject toJSonDouble(List<?> displayDataList, int totalCount, SimpleDateFormat df, String otherInfo) throws Exception {
		JSONObject dataObj = new JSONObject();
		dataObj.put("total", totalCount);
		dataObj.put("otherInfo", otherInfo);
		JSONArray dataArray = new JSONArray();
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor(df));
		config.registerDefaultValueProcessor(Double.class, new DefaultValueProcessor() {
		    public Object getDefaultValue(Class type) {    
		        return "";    
		    } 
		}); 
		dataArray.addAll(displayDataList, config);
		dataObj.put("invdata", dataArray);
		return dataObj;
	}
	
	public static JSONObject toJSon(List<?> displayDataList, int totalCount) throws Exception {
		JSONObject dataObj = new JSONObject();
		dataObj.put("total", totalCount);
		JSONArray dataArray = new JSONArray();
		dataArray.addAll(displayDataList);
		dataObj.put("invdata", dataArray);
		return dataObj;
	}
	
	public static JSONObject toJSon(List<?> displayDataList, int totalCount, String otherInfo) throws Exception {
		JSONObject dataObj = new JSONObject();
		dataObj.put("total", totalCount);
		dataObj.put("otherInfo", otherInfo);
		JSONArray dataArray = new JSONArray();
		dataArray.addAll(displayDataList);
		dataObj.put("invdata", dataArray);
		return dataObj;
	}
	
	public static JSONObject toJSon(List<?> displayDataList, int totalCount, SimpleDateFormat df) throws Exception {
		JSONObject dataObj = new JSONObject();
		dataObj.put("total", totalCount);
		JSONArray dataArray = new JSONArray();
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor(df));
		dataArray.addAll(displayDataList, config);
		dataObj.put("invdata", dataArray);
		return dataObj;
	}
	
	public static JSONObject toJSon(List<?> displayDataList, int totalCount, SimpleDateFormat df, double costTime) throws Exception {
		return toJSon(displayDataList, totalCount, df, costTime, "");
	}
	
	public static JSONObject toJSon(List<?> displayDataList, int totalCount, SimpleDateFormat df, double costTime, String otherInfo) throws Exception {
		JSONObject dataObj = new JSONObject();
		dataObj.put("total", totalCount);
		dataObj.put("costTime", costTime);
		dataObj.put("otherInfo", otherInfo);
		JSONArray dataArray = new JSONArray();
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor(df));
		dataArray.addAll(displayDataList, config);
		dataObj.put("invdata", dataArray);
		return dataObj;
	}
	
}
