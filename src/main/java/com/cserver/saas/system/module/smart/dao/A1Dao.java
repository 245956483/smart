package com.cserver.saas.system.module.smart.dao;

import java.util.List;
import java.util.Map;

import com.cserver.saas.system.smartclient.dao.BasicHibernateDAO;
import com.cserver.saas.system.module.smart.entity.A1;

public interface A1Dao extends BasicHibernateDAO<A1,String>{
	public List<A1> fetch(Map<String, Object> map, final int startRow, final int pageSize) throws Exception;
	public long fetchCounts(Map<String, Object> map) throws Exception;
}
