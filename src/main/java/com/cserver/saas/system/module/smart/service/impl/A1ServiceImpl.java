package com.cserver.saas.system.module.smart.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.cserver.saas.system.module.smart.dao.A1Dao;
import com.cserver.saas.system.module.smart.entity.A1;
import com.cserver.saas.system.module.smart.service.DMIService;
import com.isomorphic.datasource.DSRequest;
import com.isomorphic.datasource.DSResponse;
import com.isomorphic.util.DataTools;

public class A1ServiceImpl extends DMIService{
	private A1Dao a1Dao;
	
	@SuppressWarnings("rawtypes")
	@Override
	public DSResponse fetch(DSRequest req) throws Exception {
		Map map = req.getCriteria();
		DSResponse dsResponse = new DSResponse();
		Object currentPageObj =  req.getHttpServletRequest().getParameter("currentPage");
        Object pageSizeObj =  req.getHttpServletRequest().getParameter("pageSize");
		int currentPage = 0;
    	int pageSize = 0;
    	int startRow = 0;
    	if(null != currentPageObj) {
    		currentPage = Integer.parseInt(currentPageObj.toString());
        	pageSize = Integer.parseInt(pageSizeObj.toString());
        	startRow = (currentPage - 1) * pageSize;
    	}
		List list = a1Dao.fetch(map, startRow, pageSize);
		long totalRows = -1;
		totalRows = a1Dao.fetchCounts(map);
		dsResponse.setProperty("totalCount", totalRows);
		dsResponse.setData(list);
		dsResponse.setSuccess();
		return  dsResponse;
	}
	@SuppressWarnings("rawtypes")
	public DSResponse addData(DSRequest req) throws Exception {
		DSResponse dsResponse = new DSResponse();
		Map map = req.getValues();
		A1 a1 = new A1();
		DataTools.setProperties(map, a1);
		HttpSession session = req.getHttpServletRequest().getSession();
		a1.setId(System.currentTimeMillis() + "");
		a1.setCreateTime(new Date());
		a1.setUpdateTime(new Date());
		a1.setPrintWord("<a href=\"PrintWordServlet?dsId=A1&id=" + a1.getId() + "\">打印</a>");
		a1Dao.saveOrUpdate(a1);
		dsResponse.setData(a1);
		dsResponse.setSuccess();
		return dsResponse;
	}
	@SuppressWarnings("rawtypes")
	public DSResponse updateData(DSRequest req) throws Exception {
		DSResponse dsResponse = new DSResponse();
		Map map = req.getValues();
		A1 a1 = new A1();
		DataTools.setProperties(map, a1);
		a1.setUpdateTime(new Date());
		a1Dao.saveOrUpdate(a1);
		dsResponse.setData(a1);
		dsResponse.setSuccess();
		return dsResponse;
	}
	@SuppressWarnings("rawtypes")
	@Override
	public DSResponse remove(DSRequest req) throws Exception {
		DSResponse dsResponse = new DSResponse();
		Map map = req.getValues();
		A1 a1 = new A1();
		DataTools.setProperties(map, a1);
		a1Dao.delete(a1);
		dsResponse.setSuccess();
		return dsResponse;
	}

	public A1Dao getA1Dao() {
		return a1Dao;
	}

	public void setA1Dao(A1Dao a1Dao) {
		this.a1Dao = a1Dao;
	}

}
