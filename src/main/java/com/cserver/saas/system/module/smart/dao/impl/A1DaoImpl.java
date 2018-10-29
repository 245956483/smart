package com.cserver.saas.system.module.smart.dao.impl;

import java.lang.reflect.Field;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.transaction.annotation.Transactional;

import com.cserver.saas.system.smartclient.dao.impl.BasicHibernateDAOImpl;
import com.cserver.saas.system.module.smart.dao.A1Dao;
import com.cserver.saas.system.module.smart.entity.A1;

@Transactional
public class A1DaoImpl extends BasicHibernateDAOImpl<A1, String>
		implements A1Dao {

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<A1> fetch(Map<String, Object> map, final int startRow, final int pageSize) throws Exception {
		StringBuffer sql = new StringBuffer(
				"from A1 a1 where 1 = 1 ");
		//获取拼接的sql
		final Map<String, Object> mapValue = getWhereString(map);
		if(null != mapValue) {
			sql.append(mapValue.get("whereString"));
		}
		sql.append(" order by a1.updateTime desc");
		final String hql = sql.toString();
		List<A1> list = getHibernateTemplate().executeFind(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						try {
							Query query = session.createQuery(hql.toString());
							//给参数赋值
							if(null != mapValue) {
								query = getQuery(query, mapValue);
							}
							if(pageSize != 0) {
								query.setFirstResult(startRow);
								query.setMaxResults(pageSize);
							}
							List<A1> listTemp = query.list();
							return listTemp;
						} catch (Exception e) {
							e.printStackTrace();
						}
						return null;
					}
				});
		return list;
	}
	@SuppressWarnings({ "rawtypes", "unused" })
	@Override
	public long fetchCounts(Map<String, Object> map) throws Exception{
		StringBuffer sql =new StringBuffer( "select count(a1.id) from A1 a1 where  1 = 1 ");
		//获取拼接的sql
		final Map<String, Object> mapValue = getWhereString(map);
		if(null != mapValue) {
			sql.append(mapValue.get("whereString"));
		}
		final String hql = sql.toString();
		final List<Object> list = new ArrayList<Object>();
		List list1 =getHibernateTemplate().executeFind(
				new HibernateCallback() {
					@SuppressWarnings("unchecked")
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						try {
							Query query = session.createQuery(hql.toString());
							//给参数赋值
							if(null != mapValue) {
								query = getQuery(query, mapValue);
							}
							List<Object> listTemp = query.list();
							list.addAll(listTemp);
						} catch (Exception e) {
							e.printStackTrace();
						}
						return null;
					}
				});
		if(list.size() > 0){
			return Long.parseLong(list.get(0)+"");
		}
		return -1;
	}
	/***
	 * 通过占位符给参数赋值
	 * @param query
	 * @param mapValue
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private Query getQuery(Query query, Map<String, Object> mapValue) {
		List<Map<String, Object>> listMap = (List<Map<String, Object>>) mapValue.get("listMap");
		for (int i = 0; i < listMap.size(); i++) {
			Map<String, Object> map = listMap.get(i);
			String type = (String) map.get("type");
			String fieldName = (String) map.get("fieldName");
			if("String".equals(type)) {
				String value = (String) map.get("value");
				query.setString(fieldName, "%" + value + "%");
			} else if("Date".equals(type)) {
				Date currentDate = (Date) map.get("value");
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(currentDate);
				calendar.add(Calendar.DATE, 1);// 当前日期后一天
				Date dateAfter = calendar.getTime();
				query.setDate(fieldName + "Start", currentDate);
				query.setDate(fieldName + "End", dateAfter);

			} else if("Num".equals(type)) {
				String value = (String) map.get("value");
				query.setString(fieldName, value);
			}
			//自己特殊的参数可以往后追加else if
		}
		return query;
	}
	/***
	 * 拼接where查询条件
	 * @param map
	 * @return
	 * @throws Exception
	 */
	private Map<String, Object> getWhereString(Map<String, Object> map) throws Exception {
		if(null == map) {
			return null;
		}
		Map<String, Object> mapValue = new HashMap<String, Object>();
		List<Map<String, Object>> listMap = new ArrayList<Map<String,Object>>();
		//拼接的参数sql
		StringBuffer whereString = new StringBuffer("");
		boolean flag = false;
		for (Map.Entry<String, Object> entry : map.entrySet()) {
			String fieldName = entry.getKey();
			//判断参数是否属于实体类的字段
			//将参数名、值、类型放到map中
			Map<String, Object> hashMap = new HashMap<String, Object>();
			if(existsField(A1.class, fieldName)) {
				flag = true;
				Field field = A1.class.getDeclaredField(fieldName);
				String type = field.getGenericType().toString();
				hashMap.put("fieldName", fieldName);//字段名
				hashMap.put("value", entry.getValue());//字段值
				//判断字段类型
				if("class java.lang.String".equals(type)) {
					whereString.append(" and a1." + fieldName + " like :" + fieldName);
					hashMap.put("type", "String");//字符串类型
				} else if("class java.util.Date".equals(type)) {
					whereString.append(" and a1." + fieldName + " >= :" + fieldName + "Start and a1." + fieldName + " < :" + fieldName + "End");
					hashMap.put("type", "Date");//日期类型
				} else if("float".equals(type) || "int".equals(type)) {
					whereString.append(" and a1." + fieldName + " =:" + fieldName);
					hashMap.put("type", "Num");//数字类型
				}
				listMap.add(hashMap);
			}
			//自己特殊的参数可以往后追加else if 而且必须设置flag为true
		}
		if(flag) {
			mapValue.put("listMap", listMap);
			mapValue.put("whereString", whereString);
			return mapValue;
		} else {
			return null;
		}
	}
	
	public boolean existsField(Class clz, String fieldName){
		try
		{
		  return (clz.getDeclaredField(fieldName) != null);
		}
		catch (Exception localException)
		{
		  if (clz != Object.class)
			return existsField(clz.getSuperclass(), fieldName);
		}
		return false;
	}
}
