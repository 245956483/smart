/*jadclipse*/// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.

package com.isomorphic.tools;


import com.isomorphic.base.Base;
import com.isomorphic.base.Config;
import com.isomorphic.datasource.*;
import com.isomorphic.hibernate.HibernateDataSource;
import com.isomorphic.io.ISCFile;
import com.isomorphic.log.Logger;
import com.isomorphic.sql.*;
import com.isomorphic.store.DataStructCache;
import com.isomorphic.util.DataTools;
import com.isomorphic.xml.XML;


import java.io.*;
import java.sql.*;
import java.util.*;

import org.apache.commons.cli.*;
import org.hibernate.tool.hbm2ddl.SchemaExport;
import org.hibernate.tool.hbm2ddl.SchemaUpdate;

// Referenced classes of package com.isomorphic.tools:
//            DataImport, BuiltinRPC

public class SQLImport extends Base
{

    public SQLImport()
    {
    }

    public static List getFullDSList(List dataSources)
    {
        List fullDSList = new ArrayList();
        Iterator i = dataSources.iterator();
        do
        {
            if(!i.hasNext())
                break;
            String dsName = (String)i.next();
            if(dsName.indexOf("/") != -1)
            {
                File dsDir = new File(dsName);
                if(dsDir.isDirectory())
                {
                    File fileList[] = dsDir.listFiles();
                    int ii = 0;
                    while(ii < fileList.length) 
                    {
                        File f = fileList[ii];
                        if(f.isFile())
                        {
                            String fileName = f.getName();
                            if(fileName.indexOf(".ds.") != -1)
                            {
                                dsName = fileName.substring(0, fileName.indexOf(".ds."));
                                if(!fullDSList.contains(dsName))
                                    fullDSList.add(dsName);
                            }
                        }
                        ii++;
                    }
                }
            } else
            if(!fullDSList.contains(dsName))
                fullDSList.add(dsName);
        } while(true);
        return fullDSList;
    }

    public static void main(String args[])
    {
    }

    public static void outputHelp(String cmdLineSyntax, Options options)
    {
        HelpFormatter formatter = new HelpFormatter();
        formatter.printHelp(cmdLineSyntax, "", options, "\nUtility to create database table(s) in the current project's SQL database (as set up by the 'dev' script), from the datasource and test data files.\n\n Examples:\n> sqlImport -tk supplyItem\n> sqlImport --schemaonly task");
    }

    public static boolean processDataSource(String dsName)
        throws Exception
    {
        DataSource ds;
        if(dsName.endsWith(".ds.js"))
            dsName = dsName.substring(0, dsName.length() - 6);
        else
        if(dsName.endsWith(".ds.xml"))
            dsName = dsName.substring(0, dsName.length() - 7);
        ds = DataSourceManager.getDataSource(dsName, null);
        if(ds == null)
            throw new Exception((new StringBuilder()).append("Could not find datasource: ").append(dsName).toString());
        boolean flag;
        if(ds instanceof SQLDataSource) {
            processSQLDataSource((SQLDataSource)ds);
            flag = true;
        }else if(ds instanceof HibernateDataSource) {
            processHibernateDataSource((HibernateDataSource)ds);
            flag = true;
        } else {
        	 err.println((new StringBuilder()).append("Skipping non-SQL DataSource: '").append(dsName).append("'").toString());
             flag = false;
        }
        DataSourceManager.freeDataSource(ds);
        return flag;
    }

    public static void recreateHibernateSchema()
    {
        try
        {
            org.hibernate.cfg.Configuration hibernateConfig = HibernateDataSource.getStaticHibernateConfig();
            SchemaExport se = new SchemaExport(hibernateConfig);
            se.drop(debug, doWork);
            se.create(debug, doWork);
            List exceptions = se.getExceptions();
            if(exceptions != null && exceptions.size() > 0)
            {
                for(Iterator i = exceptions.iterator(); i.hasNext(); log.warn("SchemaExport", i.next()));
            }
        }
        catch(Exception e)
        {
            log.error("Error recreating Hibernate schema", e);
        }
    }

    public static void processHibernateDataSource(HibernateDataSource ds)
        throws Exception
    {
        String dsName = ds.getName();
        org.hibernate.cfg.Configuration hibernateConfig = ds.getHibernateConfig();
        if(!dropTables)
        {
            SchemaUpdate su = new SchemaUpdate(hibernateConfig);
            su.execute(debug, doWork);
        }
        if(!schemaOnly && doWork)
            importData(ds);
    }

    public static void processSQLDataSource(SQLDataSource ds)
        throws Exception
    {
        Connection conn = SQLConnectionManager.getConnection(ds.getDriver().getDBName());
        String dbURL = conn.getMetaData().getURL();
        SQLConnectionManager.free(conn);
         boolean iswww = config.getBoolean("iswww", false);
        Map dsConfig = ds.getConfig();
        String databaseName = (String)dsConfig.get("dbName");
        if(databaseName == null)
            databaseName = config.getString("sql.defaultDatabase");
        if(databaseName == null)
            throw new Exception((new StringBuilder()).append("config file for datasource: ").append(ds.getName()).append(" does not define a database and no default").append(" has been specified in the master config file.").append(" Unable to continue").toString());
        if(iswww && !databaseName.equals("webdemos") && config.getBoolean("wwwProduction", false) && !config.getBoolean("allowWWWProductionDSImport", false))
            throw new Exception("Refusing DataSource import for non-webdemos production table.");
        if(doWork && dbURL != null && (dbURL.indexOf("www") != -1 || dbURL.indexOf("pyro") != -1) && !config.getBoolean("wwwProduction", false))
            throw new Exception((new StringBuilder()).append("Processing DataSource '").append(ds.getName()).append("' would alter production www data (JDBC URL: ").append(dbURL).append(") - cowardly refusing to process this DataSource - run with '-n' flag").append(" instead and create tables manually using the generated SQL.").toString());
        String tableName = ds.getTable().getName();
        String tableDrop = (new StringBuilder()).append("DROP TABLE ").append(tableName).toString();
        StringBuffer tableBuild = new StringBuffer();
        oracle = mysql = postgres = sqlserver = db2 = hsqldb = firebird = generic = false;
        String dbType = config.getString((new StringBuilder()).append("sql.").append(databaseName).append(".database.type").toString());
        if(dbType.equals("oracle"))
            oracle = true;
        else
        if(dbType.equals("mysql"))
            mysql = true;
        else
        if(dbType.equals("postgresql"))
            postgres = true;
        else
        if(dbType.equals("sqlserver"))
            sqlserver = true;
        else
        if(dbType.equals("db2") || dbType.equals("db2iSeries"))
            db2 = true;
        else
        if(dbType.equals("hsqldb"))
            hsqldb = true;
        else
        if(dbType.equals("cache"))
            cache = true;
        else
        if(dbType.equals("firebirdsql") || dbType.equals("firebird"))
            firebird = true;
        else
        if(dbType.equals("generic"))
            generic = true;
        tableBuild.append((new StringBuilder()).append("CREATE ").append(hsqldb ? "CACHED " : "").append("TABLE ").append(tableName).append(" (").toString());
        boolean gotColumn = false;
        Iterator e = ds.getFieldNames().iterator();
        List<String> oldColumnList = new ArrayList<String>(); 
        //新表的列字段
        List<String> newColumnList = new ArrayList<String>();
        do
        {
            if(!e.hasNext())
                break;
            String fieldName = (String)e.next();
            //过滤重复列
            if(oldColumnList.contains(fieldName)) {
            	continue;
            } else {
            	oldColumnList.add(fieldName);
            }
            newColumnList.add(fieldName.toUpperCase());
            DSField field = ds.getField(fieldName);
            String defauleValue = null;
            if("flowState".equals(fieldName)) {
            	defauleValue = (String)field.get("defauleValue");
            }
            String fieldTable = (String)field.get("tableName");
            if(fieldTable == null || fieldTable.equals(tableName))
            {
                String columnName = ds.getColumnName(fieldName);
                String sqlColumn = dsFieldToSQLColumn(ds, fieldName);
                if(sqlColumn != null)
                {
                    if(gotColumn)
                        tableBuild.append(", ");
                    gotColumn = true;
                    tableBuild.append((new StringBuilder()).append(ds.escapeColumnName(columnName)).append(" ").append(sqlColumn).toString());
                    if(null != defauleValue) {
                    	tableBuild.append(" default '" +defauleValue+ "'");
                    }
                }
            }
        } while(true);
        
        conn = SQLConnectionManager.getConnection(ds.getDriver().getDBName());
        PreparedStatement pst = conn.prepareStatement("select * from " + tableName);//准备执行语句  
        //新表字段值list
        List<String> valuesList = new ArrayList<String>();
        //旧表原始字段值list
        List<String> valuesOldList = new ArrayList<String>();
        String column = "";
        String columnOld = "";
		try {
			ResultSet ret = pst.executeQuery();// 执行语句，得到结果集
			ResultSetMetaData rsmd = ret.getMetaData();
			int count=rsmd.getColumnCount();
			boolean flag = true;
			while (ret.next()) {
				String values = "";
				String valueOlds = "";
				for(int i=0;i<count;i++) {
					String value = ret.getString(i + 1);
					String valueOld = ret.getString(i + 1);
					//如果原始字段依然存在于新表中，才insert
					String fieldName = rsmd.getColumnName(i+1).toUpperCase();
					int columnType = rsmd.getColumnType(i + 1);
					if(newColumnList.contains(fieldName)) {
						if(null != value) {
							value.replaceAll("'", "''");
							if(columnType == 91 || columnType == 93) {
								if(value.endsWith(".0")) {
									value = value.substring(0, value.length() - 2);
								}
								values += "to_date('" + value + "', 'yyyy-mm-dd hh24:mi:ss'),";
							} else {
								value = value.replaceAll("'", "''");
								values += "'" + value + "',";
							}
						} else {
							values += "null,";
						}
						if(flag) {
							column += fieldName + ",";
						}
					}
					//备份原始数据到文件中
					if(null != valueOld) {
						valueOld.replaceAll("'", "''");
						if(columnType == 91 || columnType == 93) {
							if(valueOld.endsWith(".0")) {
								valueOld = valueOld.substring(0, valueOld.length() - 2);
							}
							valueOlds += "to_date('" + valueOld + "', 'yyyy-mm-dd hh24:mi:ss'),";
						} else {
							valueOld = valueOld.replaceAll("'", "''");
							valueOlds += "'" + valueOld + "',";
						}
					} else {
						valueOlds += "null,";
					}
					if(flag) {
						columnOld += fieldName + ",";
					}
					
				} 
				if(values.length() > 0) {
					values = values.substring(0, values.length() - 1);
				}
				valuesList.add(values);
				
				if(valueOlds.length() > 0) {
					valueOlds = valueOlds.substring(0, valueOlds.length() - 1);
				}
				valuesOldList.add(valueOlds);
				
				flag = false;
			}
			if(column.length() > 0) {
				column = column.substring(0, column.length() - 1);
			}
			if(columnOld.length() > 0) {
				columnOld = columnOld.substring(0, columnOld.length() - 1);
			}
            ret.close();
            pst.close();
            
        } catch (SQLException e1) {  
            e1.printStackTrace();  
        } finally {
        	SQLConnectionManager.free(conn);
        }
        
        if(!gotColumn)
            throw new Exception("Empty table definition");
        List primaryKeys = ds.getPrimaryKeys();
        if(primaryKeys.size() > 0)
        {
            if(cache)
            {
                Iterator i = primaryKeys.iterator();
                do
                {
                    if(!i.hasNext())
                        break;
                    String key = (String)i.next();
                    DSField dsField = ds.getField(key);
                    String nativeName = dsField.getNativeName();
                    if(nativeName == null)
                        nativeName = key;
                    if(nativeName.equals("ID") || nativeName.equals("%ID"))
                        i.remove();
                } while(true);
            }
            if(primaryKeys.size() > 0)
                tableBuild.append((new StringBuilder()).append(", ").append(sqlForConstraint(ds, primaryKeys, "PRIMARY KEY")).toString());
        }
        Map constraints = (Map)dsConfig.get("unique");
        if(constraints != null)
        {
            String sqlConstraint;
            for(Iterator e1 = constraints.keySet().iterator(); e1.hasNext(); tableBuild.append((new StringBuilder()).append(", ").append(sqlConstraint).toString()))
            {
                String constraintID = (String)e1.next();
                Map constraint = (Map)constraints.get(constraintID);
                String constraintType = (String)constraint.get("type");
                if(constraintType == null)
                    constraintType = "UNIQUE";
                List constraintFields = (List)constraint.get("fields");
                sqlConstraint = sqlForConstraint(ds, constraintFields, constraintType, constraintID);
            }

        }
        tableBuild.append(")");
        if(mysql)
        {
            boolean innoDB = config.getBoolean("sql.mysql.alwaysUseInnoDB").booleanValue();
            if(!innoDB && "true".equals(dsConfig.get("supportTransactions")))
                innoDB = true;
            if(innoDB)
                tableBuild.append("ENGINE=InnoDB");
        }
        if(oracle || postgres || firebird)
            buildSequences(ds);
        if(debug && dropTables)
            err.println((new StringBuilder()).append("rebuilding table: ").append(tableName).toString());
        Map sequences;
        if(doWork && dropTables)
            try
            {
                if(oracle)
                    tableDrop = (new StringBuilder()).append(tableDrop).append(" CASCADE CONSTRAINTS").toString();
                if(hsqldb || postgres)
                    tableDrop = (new StringBuilder()).append(tableDrop).append(" CASCADE").toString();
                if(debug)
                    out.println((new StringBuilder()).append("issuing table drop command: ").append(tableDrop).toString());
                if(mysql)
                    ds.executeNativeUpdate("SET foreign_key_checks = 0", null);
                ds.executeNativeUpdate(tableDrop, null);
                if(mysql)
                    ds.executeNativeUpdate("SET foreign_key_checks = 1", null);
                if(oracle || postgres)
                {
                    sequences = (Map)dsConfig.get("sequences");
                    if(oracle && sequences != null)
                    {
                        String sequenceDelete;
                        for(Iterator e1 = sequences.keySet().iterator(); e1.hasNext(); ds.executeNativeUpdate(sequenceDelete, null))
                        {
                            String sequenceName = (String)e1.next();
                            sequenceDelete = (new StringBuilder()).append("DROP SEQUENCE ").append(ds.escapeColumnName(sequenceName)).toString();
                            if(debug)
                                err.println((new StringBuilder()).append("dropping sequence via: ").append(sequenceDelete).toString());
                        }

                    }
                }
            }
            catch(SQLException ignored) { }
        if(debug && createTables)
            out.println((new StringBuilder()).append("issuing table create command: ").append(tableBuild).toString());
        if(doWork && createTables)
            ds.executeNativeUpdate(tableBuild.toString(), null);
        Map ignored = (Map)dsConfig.get("sequences");
        if(oracle && ignored != null)
        {
            String sequenceCreate;
            for(Iterator e1 = ignored.keySet().iterator(); e1.hasNext(); ds.executeNativeUpdate(sequenceCreate, null))
            {
                String sequenceName = (String)e1.next();
                Map sequenceDef = (Map)ignored.get(sequenceName);
                Integer startWith = new Integer(1);
                if(sequenceDef.get("startWith") != null)
                    startWith = Integer.valueOf(sequenceDef.get("startWith").toString());
                Integer incrementBy = new Integer(1);
                if(sequenceDef.get("incrementBy") != null)
                    incrementBy = Integer.valueOf(sequenceDef.get("incrementBy").toString());
                sequenceCreate = (new StringBuilder()).append("CREATE SEQUENCE ").append(ds.escapeColumnName(sequenceName)).append(" START WITH ").append(startWith).append(" INCREMENT BY ").append(incrementBy).toString();
                if(debug)
                    out.println((new StringBuilder()).append("creating standalone sequence via: ").append(sequenceCreate).toString());
            }

        }
        boolean importSuccess = true;
        if(!schemaOnly && doWork)
            importSuccess = importData(ds);
        if((oracle || postgres) && importSuccess && dropTables && doWork)
            rebuildSequences(ds);
        
        conn = SQLConnectionManager.getConnection(ds.getDriver().getDBName());
		if (valuesList.size() > 0) {
			boolean databaseType = config.getString("sql.defaultDatabase").equalsIgnoreCase("mysql");
			String insertSql = "";
			if(databaseType) {
				insertSql = "INSERT INTO " + tableName + " (" + column + ") VALUES";
				for (int i = 0; i < valuesList.size(); i++) {
					insertSql += "(" + valuesList.get(i) + "),";
				}
				insertSql = insertSql.substring(0, insertSql.length() -1);
			} else {
				insertSql = "INSERT ALL INTO " + tableName + " (" + column + ") VALUES(" + valuesList.get(0) + ") ";
				for (int i = 1; i < valuesList.size(); i++) {
					insertSql += "INTO " + tableName + " (" + column + ") VALUES(" + valuesList.get(i) + ") ";
				}
				insertSql += "select 1 from dual";
			}
			
			System.out.println("备份sql:" + insertSql);
			pst = conn.prepareStatement(insertSql);// 准备执行语句
			pst.executeUpdate();
			pst.close();
			SQLConnectionManager.free(conn);
		}
		String oldSql = "";
		for (int i = 0; i < valuesOldList.size(); i++) {
			oldSql += "INSERT  INTO " + tableName + " (" + columnOld + ") VALUES(" + valuesOldList.get(i) + ");\n";
		}
		if(oldSql.length() > 0) {
			File file = new File(Base.config.getPath("webRoot") +"/dsSqlBak/" + tableName + "_" + System.currentTimeMillis() + ".sql");
	        if(file.getParentFile() != null && !file.getParentFile().exists()){
	            file.getParentFile().mkdirs();
	        }
	        if(file.exists()){
	            file.delete();
	        }
			FileOutputStream fos = new FileOutputStream(file);
	        OutputStreamWriter osw = new OutputStreamWriter(fos, "UTF-8");
	        osw.write(oldSql);
	        osw.flush();
	        osw.close();
	        fos.close();
		}
    }

    private static String sqlForConstraint(SQLDataSource ds, List fieldNames, String constraintType)
    {
        return sqlForConstraint(ds, fieldNames, constraintType, null);
    }

    private static String sqlForConstraint(SQLDataSource ds, List fieldNames, String constraintType, String constraintName)
    {
        if(constraintName == null)
            constraintName = indexNameForTable(ds.getTable().getName());
        log.debug((new StringBuilder()).append("Creating constraint of type ").append(constraintType).append(" on fields ").append(fieldNames).toString());
        String constraint = (new StringBuilder()).append("CONSTRAINT ").append(ds.escapeColumnName(constraintName)).append(" ").append(constraintType).append(" (").toString();
        Iterator e = fieldNames.iterator();
        do
        {
            if(!e.hasNext())
                break;
            String fieldName = (String)e.next();
            String columnName = ds.getColumnName(fieldName);
            constraint = (new StringBuilder()).append(constraint).append(ds.escapeColumnName(columnName)).toString();
            if(e.hasNext())
                constraint = (new StringBuilder()).append(constraint).append(", ").toString();
        } while(true);
        constraint = (new StringBuilder()).append(constraint).append(")").toString();
        return constraint;
    }

    private static void buildSequences(SQLDataSource ds)
        throws Exception
    {
        Map sequences = ds.getTable().getSequences();
        Iterator e = sequences.keySet().iterator();
        do
        {
            if(!e.hasNext())
                break;
            String columnName = (String)e.next();
            String sequenceName = SQLDriver.getSequenceName(columnName, sequences, ds.getTable().getName());
            String sequenceCreate = (new StringBuilder()).append("CREATE SEQUENCE ").append(sequenceName).toString();
            if(oracle || db2)
                sequenceCreate = (new StringBuilder()).append(sequenceCreate).append(" INCREMENT BY 1 START WITH 1").toString();
            if(postgres)
                sequenceCreate = (new StringBuilder()).append(sequenceCreate).append(" INCREMENT 1 START 1").toString();
            if(debug)
                out.println((new StringBuilder()).append("creating sequence named: ").append(sequenceName).append(" for column: ").append(columnName).toString());
            if(!doWork)
                out.println((new StringBuilder()).append("create command: ").append(sequenceCreate).toString());
            else
                try
                {
                    ds.executeNativeUpdate(sequenceCreate, null);
                }
                catch(SQLException se)
                {
                    if(dropTables)
                        try
                        {
                            if(debug)
                                out.println("sequence exists, destroying and re-creating...");
                            ds.executeNativeUpdate((new StringBuilder()).append("DROP SEQUENCE ").append(sequenceName).toString(), null);
                            ds.executeNativeUpdate(sequenceCreate, null);
                        }
                        catch(SQLException se2)
                        {
                            out.println((new StringBuilder()).append("unable create sequence: ").append(sequenceName).toString());
                            throw se;
                        }
                }
        } while(true);
    }

    public static void rebuildSequences(SQLDataSource ds)
        throws Exception
    {
        Map sequences = ds.getTable().getSequences();
        Iterator e = sequences.keySet().iterator();
        do
        {
            if(!e.hasNext())
                break;
            String sequence = (String)e.next();
            String sequenceName = SQLDriver.getSequenceName(sequence, sequences, ds.getTable().getName());
            try
            {
                Object count = ds.getDriver().executeScalar((new StringBuilder()).append("SELECT MAX(").append(ds.escapeColumnName(sequence)).append(") FROM ").append(ds.getTable().getName()).toString(), null);
                Long currentCount = new Long(0L);
                if(count != null)
                    currentCount = new Long(count.toString());
                Long newCount = new Long(currentCount.longValue() + 1L);
                ds.executeNativeUpdate((new StringBuilder()).append("DROP SEQUENCE ").append(sequenceName).toString(), null);
                String sequenceCreate = (new StringBuilder()).append("CREATE SEQUENCE ").append(sequenceName).toString();
                if(oracle || db2)
                    sequenceCreate = (new StringBuilder()).append(sequenceCreate).append(" INCREMENT BY 1 START WITH ").toString();
                if(postgres)
                    sequenceCreate = (new StringBuilder()).append(sequenceCreate).append(" INCREMENT 1 START ").toString();
                sequenceCreate = (new StringBuilder()).append(sequenceCreate).append(newCount.toString()).toString();
                ds.executeNativeUpdate(sequenceCreate, null);
            }
            catch(Exception ee)
            {
                out.println((new StringBuilder()).append("unable to rebuild sequence: ").append(sequenceName).append(" for sequenced column: ").append(sequence).toString());
                throw ee;
            }
        } while(true);
    }

    public static String indexNameForTable(String tableName)
    {
        if(db2 && tableName.length() > 15)
            tableName = tableName.substring(0, 15);
        return (new StringBuilder()).append(tableName).append("_UI").toString();
    }

    public static String dsFieldToSQLColumn(SQLDataSource ds, String fieldName)
    {
        DSField field = ds.getField(fieldName);
        if(field.isDerived())
            return null;
        if(ds.isInherited(field))
            return null;
        if(field.getBoolean("customSQL"))
            return null;
        if(field.get("customSelectExpression") != null)
            return null;
        if(field.get("includeFrom") != null)
            return null;
        String type = field.getType();
        if(type == null || "".equals(type))
            type = "text";
        String title = field.getTitle();
        long length = -1L;
        boolean boolInt = false;
        if(field.getLength() != null)
            length = field.getLength().longValue();
        if(type.equals("boolean"))
        {
            String sqlType = field.getProperty("sqlStorageStrategy");
            if(sqlType != null)
                if(sqlType.equals("number") || sqlType.equals("integer"))
                {
                    type = "integer";
                    boolInt = true;
                } else
                if(sqlType.startsWith("singleChar"))
                {
                    type = "text";
                    length = 1L;
                }
        }
        String result = "";
        if(SQLDataSource.typeIsNumeric(type) && !SQLDataSource.typeIsDecimal(type))
        {
            if(boolInt)
                result = (new StringBuilder()).append(result).append(!oracle && !cache ? "integer" : "number").toString();
            else
            if(oracle || cache)
                result = (new StringBuilder()).append(result).append("number").toString();
            else
            if(mysql)
                result = (new StringBuilder()).append(result).append("integer").toString();
            else
            if(postgres)
                result = (new StringBuilder()).append(result).append("bigint").toString();
            else
            if(sqlserver)
                result = (new StringBuilder()).append(result).append("bigint").toString();
            else
            if(firebird)
                result = (new StringBuilder()).append(result).append("bigint").toString();
            else
            if(generic)
                result = (new StringBuilder()).append(result).append("bigint").toString();
            else
            if(db2)
                result = (new StringBuilder()).append(result).append("bigint").toString();
            else
            if(hsqldb)
                result = (new StringBuilder()).append(result).append("integer").toString();
            if(type.equals("sequence"))
            {
                if(mysql)
                    result = (new StringBuilder()).append(result).append(" auto_increment").toString();
                else
                if(oracle || postgres || firebird)
                    result = (new StringBuilder()).append(result).append(" default 0").toString();
                else
                if(sqlserver)
                    result = (new StringBuilder()).append(result).append(" identity (1, 1)").toString();
                else
                if(db2)
                    result = (new StringBuilder()).append(result).append(" GENERATED BY DEFAULT AS IDENTITY (START WITH 1, INCREMENT BY 1, CACHE 20)").toString();
                else
                if(hsqldb)
                    result = (new StringBuilder()).append(result).append(" GENERATED BY DEFAULT AS IDENTITY(START WITH 1, INCREMENT BY 1)").toString();
            } else
            {
                if(oracle)
                {
                    if(length == -1L)
                        length = 38L;
                    result = (new StringBuilder()).append(result).append("(").append(length).append(")").toString();
                }
                if(!field.isPrimaryKey())
                    result = (new StringBuilder()).append(result).append(" default null").toString();
            }
        } else
        if(SQLDataSource.typeIsDecimal(type))
        {
            if(mysql || db2 || hsqldb || cache)
                result = (new StringBuilder()).append(result).append("double default 0.0").toString();
            if(postgres)
                result = (new StringBuilder()).append(result).append("real default 0.0").toString();
            if(oracle || sqlserver || firebird || generic)
                result = (new StringBuilder()).append(result).append("float default 0.0").toString();
        } else
        if(type.equals("date") || type.equals("datetime") || type.equals("time"))
        {
            boolean overridden = false;
            if(type.equals("date"))
            {
                String sqlType = field.getProperty("sqlStorageStrategy");
                if(sqlType == null)
                {
                    String defaultDateType = config.getString((new StringBuilder()).append("sql.").append(ds.getDriver().getDBName()).append(".defaultDateType").toString());
                    if(defaultDateType != null)
                    {
                        result = (new StringBuilder()).append(result).append(defaultDateType).toString();
                        overridden = true;
                    }
                } else
                if(sqlType.equals("nativeDate"))
                {
                    result = (new StringBuilder()).append(result).append("date").toString();
                    overridden = true;
                } else
                if(sqlType.equals("number"))
                {
                    if(oracle || cache)
                        result = (new StringBuilder()).append(result).append("number").toString();
                    if(mysql)
                        result = (new StringBuilder()).append(result).append("integer").toString();
                    if(postgres)
                        result = (new StringBuilder()).append(result).append("bigint").toString();
                    if(sqlserver || firebird || generic)
                        result = (new StringBuilder()).append(result).append("bigint").toString();
                    if(db2)
                        result = (new StringBuilder()).append(result).append("bigint").toString();
                    if(hsqldb)
                        result = (new StringBuilder()).append(result).append("integer").toString();
                    overridden = true;
                } else
                if(sqlType.equals("text"))
                {
                    result = (new StringBuilder()).append(result).append("varchar(").toString();
                    String format = field.getProperty("sqlDateFormat");
                    if(format == null)
                        result = (new StringBuilder()).append(result).append("10").toString();
                    else
                        result = (new StringBuilder()).append(result).append(format.length()).toString();
                    result = (new StringBuilder()).append(result).append(")").toString();
                    overridden = true;
                } else
                {
                    result = (new StringBuilder()).append(result).append(sqlType).toString();
                    overridden = true;
                }
            }
            if(type.equals("datetime"))
            {
                String sqlType = field.getProperty("sqlStorageStrategy");
                if(sqlType != null)
                    if(sqlType.equals("number"))
                    {
                        if(oracle || cache)
                            result = (new StringBuilder()).append(result).append("number").toString();
                        else
                        if(mysql)
                            result = (new StringBuilder()).append(result).append("bigint").toString();
                        else
                        if(postgres)
                            result = (new StringBuilder()).append(result).append("bigint").toString();
                        else
                        if(sqlserver)
                            result = (new StringBuilder()).append(result).append("bigint").toString();
                        else
                        if(db2)
                            result = (new StringBuilder()).append(result).append("bigint").toString();
                        else
                        if(hsqldb)
                            result = (new StringBuilder()).append(result).append("bigint").toString();
                        else
                        if(firebird)
                            result = (new StringBuilder()).append(result).append("firebird").toString();
                        else
                        if(generic)
                            result = (new StringBuilder()).append(result).append("generic").toString();
                        overridden = true;
                    } else
                    if(sqlType.equals("text"))
                    {
                        result = (new StringBuilder()).append(result).append("varchar(").toString();
                        String format = field.getProperty("sqlDateFormat");
                        if(format == null)
                            result = (new StringBuilder()).append(result).append("23").toString();
                        else
                            result = (new StringBuilder()).append(result).append(format.length()).toString();
                        result = (new StringBuilder()).append(result).append(")").toString();
                        overridden = true;
                    }
            }
            if(!overridden)
            {
                if(mysql)
                    result = (new StringBuilder()).append(result).append(type).toString();
                else
                if(mysql || sqlserver)
                    result = (new StringBuilder()).append(result).append("datetime").toString();
                if(oracle)
                    result = (new StringBuilder()).append(result).append("date").toString();
                if(postgres || db2 || hsqldb || cache || firebird || generic)
                    result = (new StringBuilder()).append(result).append("timestamp").toString();
            }
        } else
        if(type.equals("binary") || type.equals("blob") || type.equals("imageFile"))
        {
            if(mysql)
                result = (new StringBuilder()).append(result).append("longblob").toString();
            else
            if(postgres)
                result = (new StringBuilder()).append(result).append("bytea").toString();
            else
            if(oracle || db2)
                result = (new StringBuilder()).append(result).append("blob").toString();
            else
            if(hsqldb || cache)
                result = (new StringBuilder()).append(result).append("binary").toString();
            else
            if(sqlserver)
                result = (new StringBuilder()).append(result).append("image").toString();
            else
            if(firebird)
                result = (new StringBuilder()).append(result).append("BLOB").toString();
            else
            if(generic)
                result = (new StringBuilder()).append(result).append(config.getString("sql.generic.binary.type")).toString();
        } else
        {
            if(type.equals("boolean"))
            {
                type = "text";
                if(length < 6L)
                    length = 6L;
            }
            if(!type.equals("text") && !type.equals("string"))
            {
                log.warn((new StringBuilder()).append("Unrecognized type: '").append(type).append("' in datasource: ").append(ds.getName()).append(" mapping to type text.").toString());
                type = "text";
            }
            if(length == -1L)
                length = 255L;
            if(mysql)
            {
                if(length <= 255L)
                    result = (new StringBuilder()).append(result).append("varchar(").append(length).append(")").toString();
                else
                if(length <= 65535L)
                    result = (new StringBuilder()).append(result).append("text").toString();
                else
                if(length <= 16777215L)
                    result = (new StringBuilder()).append(result).append("mediumtext").toString();
                else
                if(length <= 4294967295L)
                    result = (new StringBuilder()).append(result).append("longtext").toString();
            } else
            if(oracle || db2)
            {
                if(length <= 4000L)
                    result = (new StringBuilder()).append(result).append("varchar(").append(length).append(")").toString();
                else
                    result = (new StringBuilder()).append(result).append("clob").toString();
            } else
            if(postgres)
            {
                if(length <= 4000L)
                    result = (new StringBuilder()).append(result).append("varchar(").append(length).append(")").toString();
                else
                    result = (new StringBuilder()).append(result).append("text").toString();
            } else
            if(sqlserver)
            {
                if(length <= 8000L)
                    result = (new StringBuilder()).append(result).append("varchar(").append(length).append(")").toString();
                else
                    result = (new StringBuilder()).append(result).append("text").toString();
            } else
            if(hsqldb)
                result = (new StringBuilder()).append(result).append("varchar_ignorecase(").append(length).append(")").toString();
            else
            if(firebird)
            {
                if(length <= 32767L)
                    result = (new StringBuilder()).append(result).append("varchar(").append(length).append(")").toString();
                else
                    result = (new StringBuilder()).append(result).append("BLOB SUB_TYPE 1").toString();
            } else
            {
                result = (new StringBuilder()).append(result).append("varchar(").append(length).append(")").toString();
            }
            if(field.isPrimaryKey() || field.isRequired())
                if(cache)
                    result = (new StringBuilder()).append(result).append(" default \"\"").toString();
                else
                if(!mysql || length <= 255L)
                    result = (new StringBuilder()).append(result).append(" default ''").toString();
        }
        if(field.isPrimaryKey() && (mysql || db2) || field.getBoolean("defineSQLColumnAsNotNull"))
            result = (new StringBuilder()).append(result).append(" not null").toString();
        return result;
    }

    public static String dsTypeForDBType(Number dbType, String dbName)
        throws Exception
    {
        switch(dbType.intValue())
        {
        case -1: 
        case 1: // '\001'
        case 12: // '\f'
        case 2005: 
            return "text";

        case -7: 
        case -6: 
        case -5: 
        case 2: // '\002'
        case 3: // '\003'
        case 4: // '\004'
        case 5: // '\005'
            return "number";

        case 6: // '\006'
        case 7: // '\007'
        case 8: // '\b'
            return "float";

        case 91: // '['
        case 92: // '\\'
        case 93: // ']'
            return "date";
        }
        return "text";
    }

    public static boolean dsTypeIsString(String dsType)
    {
        return "text".equals(dsType);
    }

    public static boolean importData(DataSource ds)
        throws Exception
    {
        if (ds == null) return false;

        String testFileName = ds.getTestFileName();
        if (testFileName == null) {
          log.warn("importData(" + ds.getName() + "): No test file");
          return false;
        }

        log.warn("importData(" + ds.getName() + "): Got test filename " + testFileName);
        Object rowData = null;
        if (testFileName.endsWith(".xml"))
        {
          rowData = (List)XML.toDSRecords(new ISCFile(testFileName));
        } else if (testFileName.endsWith(".csv")) {
          InputStream is = null;
          try {
            is = DataTools.inputStreamForFilename(testFileName);
            Reader reader = new InputStreamReader(is);
            rowData = new DataImport().importToRows(reader); } finally {
            try {
              is.close(); } catch (Exception ignored) { }
          }
        } else {
          rowData = loadJSTestData(ds, testFileName);
        }

        if (!(rowData instanceof List)) {
          log.warn("Test data loaded for DS '" + ds.getName() + "' from file " + testFileName + ((rowData == null) ? " is null" : new StringBuilder().append(" is a ").append(rowData.getClass().getName()).toString()) + ".  Test data must be a list of records.");

          return false;
        }
        List rows = (List)rowData;

        rows = (List)ds.toRecords(rows);
        log.warn("importData(" + ds.getName() + "): " + rows.size() + " rows");
        try
        {
          DSRequest req = new DSRequest(ds.getName(), "insert");
          req.setValues(rows);
          req.forceInvalidateCache(true);
          ds.execute(req);
          if ("hibernate".equals(ds.getType()))
            ((HibernateDataSource)ds).freeResources(req);
        }
        catch (Exception e) {
          if (!(continueOnError)) throw e;
          e.printStackTrace();
        }

        return true;
    }

    public static Object loadJSTestData(DataSource ds, String testFileName)
        throws Exception
    {
        Map dataMap = DataStructCache.getDataMap(testFileName);
        DataStructCache.cache.clearCacheEntry(testFileName);
        String variableName = (new StringBuilder()).append(ds.getName()).append("TestData").toString();
        Object testData = dataMap.get(variableName);
        if(testData == null && dataMap.size() > 0)
        {
            log.warn((new StringBuilder()).append("Variable ").append(variableName).append(" not found in test data file ").append(testFileName).append(" falling back to first declared variable").toString());
            variableName = (String)dataMap.keySet().iterator().next();
            testData = dataMap.get(variableName);
        }
        if(testData == null)
        {
            log.warn((new StringBuilder()).append("No variables declared in test data file ").append(testFileName).toString());
            return null;
        } else
        {
            return testData;
        }
    }

    private static Logger log = new Logger(com.isomorphic.tools.SQLImport.class.getName());
    static PrintStream out;
    static PrintStream err;
    public static boolean interactive = true;
    public static boolean debug = true;
    public static boolean doWork = true;
    public static boolean continueOnError = false;
    public static boolean dropTables = false;
    public static boolean createTables = true;
    public static boolean schemaOnly = false;
    public static boolean showHelp = false;
    public static boolean onlySimpleModeList = false;
    public static boolean oracle = false;
    public static boolean mysql = false;
    public static boolean postgres = false;
    public static boolean sqlserver = false;
    public static boolean db2 = false;
    public static boolean hsqldb = false;
    public static boolean cache = false;
    public static boolean firebird = false;
    public static boolean generic = false;
    public static boolean doShutdown = true;

    static 
    {
        out = System.out;
        err = System.err;
    }
}


/*
	DECOMPILATION REPORT

	Decompiled from: D:\yangshaofeng\VB\WebContent\WEB-INF\lib\isomorphic_tools.jar
	Total time: 47 ms
	Jad reported messages/errors:
Couldn't fully decompile method main
Couldn't resolve all exception handlers in method main
Overlapped try statements detected. Not all exception handlers will be resolved in the method processDataSource
Couldn't fully decompile method processDataSource
Couldn't resolve all exception handlers in method processDataSource
Overlapped try statements detected. Not all exception handlers will be resolved in the method importData
Couldn't fully decompile method importData
Couldn't resolve all exception handlers in method importData
	Exit status: 0
	Caught exceptions:
*/