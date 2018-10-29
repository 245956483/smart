package com.cserver.saas.system.smartclient.dao;

import java.util.List;
import java.util.Map;


public interface PrintWordDao extends BasicHibernateDAO<Object,String>{

	public List<Object> selectList(Map<String, String> map) throws Exception;
}
