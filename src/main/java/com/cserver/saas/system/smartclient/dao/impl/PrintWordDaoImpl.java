package com.cserver.saas.system.smartclient.dao.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.cserver.saas.system.smartclient.dao.PrintWordDao;



public class PrintWordDaoImpl extends BasicHibernateDAOImpl<Object,String> implements PrintWordDao {

    public List<Object> selectList(Map<String, String> map){
        String tableName = map.get("tableName");
        String id = map.get("id");
        String columns = map.get("columns");
    	StringBuffer sql = new StringBuffer(
				"select " + columns + " from " + tableName +" where id = '" + id + "'");
    	final String hql = sql.toString();
		List<Object> list = getHibernateTemplate().executeFind(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						try {
							Query query = session
									.createSQLQuery(hql.toString());
							List<Object> listTemp = query.list();
							return listTemp;
						} catch (Exception e) {
							e.printStackTrace();
						}
						return null;
					}
				});

		return list;
    }
}
