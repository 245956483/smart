/*jadclipse*/// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.

package com.isomorphic.sql;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import javax.servlet.http.HttpSession;

import org.apache.commons.collections.map.LinkedMap;

import com.isomorphic.datasource.BasicDataSource;
import com.isomorphic.datasource.DSField;
import com.isomorphic.datasource.DSRequest;
import com.isomorphic.datasource.DSResponse;
import com.isomorphic.datasource.DataSource;
import com.isomorphic.datasource.DataSourceManager;
import com.isomorphic.datasource.IncludeFromDefinition;
import com.isomorphic.datasource.StreamingResponseException;
import com.isomorphic.datasource.StreamingResponseIterator;
import com.isomorphic.interfaces.ISQLDataSource;
import com.isomorphic.js.JSONFilter;
import com.isomorphic.js.JSTranslater;
import com.isomorphic.log.Logger;
import com.isomorphic.rpc.RPCManager;
import com.isomorphic.rpc.RPCManagerCompletionCallback;
import com.isomorphic.store.DataStructCache;
import com.isomorphic.util.DataTools;
import com.isomorphic.velocity.Velocity;

import net.sf.json.JSONArray;

// Referenced classes of package com.isomorphic.sql:
//            SQLTable, CacheDriver, OracleDriver, PostgresDriver, 
//            HSQLDBDriver, SQLTableClause, SQLSelectClause, SQLOrderClause, 
//            SQLValuesClause, SQLWhereClause, SQLJoinWhereClause, EscapedValuesMap, 
//            SQLDSGenerator, SQLDriver, SQLTransaction, SQLConnectionManager, 
//            SQLTransform, SQLClauseType

public class SQLDataSource extends BasicDataSource
    implements ISQLDataSource, RPCManagerCompletionCallback
{

    public SQLDataSource()
    {
        lastRow = null;
        lastPrimaryKeys = null;
        lastPrimaryKeysData = null;
    }

    public void init(Map theConfig, DSRequest dsRequest)
        throws Exception
    {
        if(wwwProduction)
        {
            String tableName = (String)theConfig.get("tableName");
            if(tableName == null)
                tableName = (String)theConfig.get("ID");
            if(!doNotSandboxTables.contains(tableName))
            {
                theConfig = DataTools.mapMerge(theConfig, new LinkedMap());
                theConfig.put("dbName", "webdemos");
            }
        }
        Object obj = theConfig.get("fields");
        Map fields;
        if(obj instanceof List)
            fields = DataTools.makeIndex((List)obj, "name");
        else
            fields = (Map)obj;
        Object autoDerive = theConfig.get("autoDeriveSchema");
        if(autoDerive != null && autoDerive.toString().equals("true"))
        {
            String ID = (new StringBuilder()).append((String)theConfig.get("ID")).append("_inheritsFrom").toString();
            Object dsObject = DataStructCache.getCachedObjectWithNoConfigFile(ID);
            if(dsObject instanceof DataSource)
            {
                autoDeriveDS = (DataSource)dsObject;
            } else
            {
                String tableName = (String)theConfig.get("tableName");
                if(tableName == null)
                    tableName = (String)theConfig.get("ID");
                String serverType = (String)theConfig.get("serverType");
                String dsName = (String)theConfig.get("ID");
                String dbName = (String)theConfig.get("dbName");
                String schema = (String)theConfig.get("schema");
                Map autoDeriveSchemaOperation = null;
                List operationBindings = DataSource.getOperationBindings(theConfig);
                if(operationBindings != null)
                {
                    Iterator i = operationBindings.iterator();
                    do
                    {
                        if(!i.hasNext())
                            break;
                        Map operationBinding = (Map)i.next();
                        String isAutoDeriveSchemaOperation = (String)operationBinding.get("autoDeriveSchemaOperation");
                        if("true".equals(isAutoDeriveSchemaOperation))
                            autoDeriveSchemaOperation = operationBinding;
                    } while(true);
                }
                log.info((new StringBuilder()).append("Deriving dataSource ").append(dsName).append(tableName == null ? "" : (new StringBuilder()).append(" from table: ").append(tableName).toString()).append(autoDeriveSchemaOperation == null ? "" : (new StringBuilder()).append(" using operation: ").append(DataTools.prettyPrint(autoDeriveSchemaOperation)).toString()).toString());
                autoDeriveDS = fromTable(null, tableName, schema, ID, serverType, dbName, autoDeriveSchemaOperation, true, fields);
            }
        }
        super.init(theConfig, dsRequest);
        table = buildSQLTable();
        String dbName = (String)dsConfig.get("dbName");
        if(dbName == null)
            dbName = config.getString("sql.defaultDatabase");
        if(dbName == null)
        {
            throw new Exception((new StringBuilder()).append("datasource '").append(this.dsName).append("' does not define a target").append(" database and sql.defaultDatabase is not specified").append(" in the master config.  Unable to determine target database").toString());
        } else
        {
            driver = SQLDriver.instance(dbName, table);
            return;
        }
    }

    private SQLTable buildSQLTable()
        throws Exception
    {
        Map sequences = new HashMap();
        Map fieldTypes = new HashMap();
        Iterator e = native2DSFieldMap.keySet().iterator();
        do
        {
            if(!e.hasNext())
                break;
            String columnName = (String)e.next();
            Object fieldNameObj = native2DSFieldMap.get(columnName);
            String fieldName = null;
            if(fieldNameObj instanceof List)
                fieldName = (String)((List)fieldNameObj).get(0);
            else
                fieldName = (String)fieldNameObj;
            DSField field = getField(fieldName);
            String fieldType = field.getType();
            fieldTypes.put(columnName, fieldType);
            if("sequence".equals(fieldType))
            {
                String sequenceName = (String)field.get("sequenceName");
                if(sequenceName == null)
                    sequenceName = "__default";
                sequences.put(columnName, sequenceName);
            }
        } while(true);
        String tableName = (String)dsConfig.get("tableName");
        if(tableName == null)
            tableName = getName();
        String dsQuotedColumnNames = (String)dsConfig.get("quoteColumnNames");
        String oracleQuotedColumnNames = (String)dsConfig.get("OracleQuotedColumnNames");
        String genericQuotedColumnNames = (String)dsConfig.get("quotedColumnNames");
        if(genericQuotedColumnNames == null)
            genericQuotedColumnNames = oracleQuotedColumnNames;
        return new SQLTable(tableName, primaryKeys, fieldTypes, native2DSFieldMap, sequences, dsQuotedColumnNames != null ? dsQuotedColumnNames : genericQuotedColumnNames);
    }

    public String getColumnName(String fieldName)
    {
        return (String)ds2NativeFieldMap.get(fieldName);
    }

    public DSResponse executeFetch(DSRequest req)
        throws Exception
    {
    	System.out.println("!!!!!!!!!!!!!!!!!!!!进入executeFetch");
        return processRequest(req);
    }

    public DSResponse executeUpdate(DSRequest req)
        throws Exception
    {
        return processRequest(req);
    }

    public DSResponse executeAdd(DSRequest req)
        throws Exception
    {
        return processRequest(req);
    }

    public DSResponse executeRemove(DSRequest req)
        throws Exception
    {
        return processRequest(req);
    }

    public DSResponse executeCustom(DSRequest req)
        throws Exception
    {
        return processRequest(req);
    }

    protected DSResponse processRequest(DSRequest req)
        throws Exception
    {
        String operationType = req.getOperationType();
        if(isFetch(operationType) || isAdd(operationType) || isRemove(operationType) || isUpdate(operationType) || isCustom(operationType) || operationType.equals("replace"))
        {
            DSResponse validationFailure = validateDSRequest(req);
            if(validationFailure != null)
                return validationFailure;
            req.setRequestStarted(true);
            Map opConfig = req.operationConfig();
            Object dsObject = null;
            if(opConfig != null)
            {
                Object dsProperty = opConfig.get("dataSource");
                if(dsProperty != null && (dsProperty instanceof List) && ((List)dsProperty).size() > 1)
                    dsObject = dsProperty;
            }
            return SQLExecute(req, dsObject == null ? ((Object) (this)) : dsObject);
        } else
        {
            return super.execute(req);
        }
    }

    public DSResponse executeDownload(DSRequest req)
        throws Exception
    {
        String fieldName = req.getDownloadFieldName();
        Map criteria = req.getCriteria();
        downloadDsRequest = new DSRequest(getName(), "fetch");
        downloadDsRequest.setRPCManager(req.getRPCManager());
        downloadDsRequest.setCriteria(criteria);
        downloadDsRequest.setFreeOnExecute(req.getFreeOnExecute());
        DSResponse resp = downloadDsRequest.execute();
        req.setFreeOnExecute(downloadDsRequest.getFreeOnExecute());
        if(resp.getData() instanceof List)
            resp.setData(forceSingle(resp.getDataList()));
        return resp;
    }

    public SQLDriver getDriver()
    {
        return driver;
    }

    public Connection getTransactionalConnection(DSRequest req)
        throws Exception
    {
        Connection conn = null;
        if(shouldAutoJoinTransaction(req))
        {
            conn = (Connection)getTransactionObject(req);
            if(conn == null && shouldAutoStartTransaction(req, false))
            {
                SQLTransaction.startTransaction(req.rpc, driver.getDBName());
                conn = (Connection)getTransactionObject(req);
                if(req != null && req.rpc != null)
                    req.rpc.registerCallback(this);
            }
            if(conn != null && req != null)
                req.setPartOfTransaction(true);
        }
        return conn;
    }

    public Connection getConnection()
        throws Exception
    {
        Connection conn = driver.getConnection();
        if(conn == null)
            conn = SQLConnectionManager.getConnection(driver.getDBName());
        return conn;
    }

    public void freeConnection(Connection conn)
        throws Exception
    {
        SQLConnectionManager.free(conn);
    }

    public SQLTable getTable()
    {
        return table;
    }

    public List executeNativeQuery(String nativeCommand)
        throws Exception
    {
        return executeNativeQuery(nativeCommand, (List)null, null);
    }

    public List executeNativeQuery(String nativeCommand, DSRequest req)
        throws Exception
    {
        return executeNativeQuery(nativeCommand, (List)null, req);
    }

    public List executeNativeQuery(String nativeCommand, List dataSources, DSRequest req)
        throws Exception
    {
        return executeNativeQuery(nativeCommand, dataSources, null, req, null);
    }

    public List executeNativeQuery(String nativeCommand, DataSource ds, Map opConfig, DSRequest req, DSResponse resp)
        throws Exception
    {
        if(ds == null)
            return executeNativeQuery(nativeCommand, (List)null, opConfig, req, resp);
        else
            return executeNativeQuery(nativeCommand, DataTools.makeList(ds), opConfig, req, resp);
    }

    public List executeNativeQuery(String nativeCommand, List dataSources, Map opConfig, DSRequest req, DSResponse resp)
        throws Exception
    {
        return driver.executeQuery(nativeCommand, dataSources, opConfig, req, resp);
    }

    public int executeNativeUpdate(String nativeCommand)
        throws Exception
    {
        return executeNativeUpdate(nativeCommand, null);
    }

    public int executeNativeUpdate(String nativeCommand, List data, DSRequest req)
        throws Exception
    {
        return driver.executeUpdate(nativeCommand, data, req);
    }

    public int executeNativeUpdate(String nativeCommand, DSRequest req)
        throws Exception
    {
        return driver.executeUpdate(nativeCommand, req);
    }

    public Map getSequences()
    {
        Map seq = new HashMap();
        if(getSuper() != null)
            seq = ((SQLDataSource)getSuper()).getSequences();
        DataTools.mapMerge(getTable().getSequences(), seq);
        return seq;
    }

    public void clearCache()
    {
        lastRow = null;
        lastPrimaryKeys = null;
        lastPrimaryKeysData = null;
    }

    public void finalize()
        throws Throwable
    {
        if(driver != null)
            driver.clearState();
    }

    public void clearState()
    {
        clearCache();
        if(driver != null)
            driver.clearState();
    }

    public Object getLastRow()
        throws Exception
    {
        return getLastRow(null, true);
    }

    public Object getLastRow(DSRequest req, boolean qualifyColumnNames)
        throws Exception
    {
        if(lastRow != null)
            return lastRow;
        Map primaryKeys = getLastPrimaryKeys(req);
        log.info((new StringBuilder()).append("primaryKeys: ").append(primaryKeys).toString());
        String schema = (String)getConfig().get("schema");
        String schemaClause = "";
        if(schema != null)
            schemaClause = (new StringBuilder()).append(schema).append(getDriver().getQualifiedSchemaSeparator()).toString();
        String cacheSyncOperation = null;
        Map updateOperationBinding = getOperationBinding(req.getOperationType(), req.getOperationId());
        if(updateOperationBinding != null)
            cacheSyncOperation = (String)updateOperationBinding.get("cacheSyncOperation");
        Map syncOpBinding = getOperationBinding("fetch", cacheSyncOperation);
        if(syncOpBinding != null)
        {
            boolean useIt = true;
            if(cacheSyncOperation == null)
            {
                Object cacheSyncObj = syncOpBinding.get("useForCacheSync");
                if(cacheSyncObj != null)
                    useIt = Boolean.parseBoolean(cacheSyncObj.toString());
            }
            if(useIt)
                if(cacheSyncOperation != null)
                    log.info((new StringBuilder()).append(driver.getDBName()).append(" getLastRow(): using specific cacheSyncOperation ").append(cacheSyncOperation).toString());
                else
                    log.info((new StringBuilder()).append(driver.getDBName()).append(" getLastRow(): using default operationBinding").toString());
        }
        DSRequest csReq = new DSRequest(getName(), "fetch");
        csReq.setOperationId(cacheSyncOperation);
        csReq.setCriteria(getLastPrimaryKeys(req));
        csReq.context = req.context;
        csReq.setRPCManager(req.getRPCManager());
        String key;
        for(Iterator i = req.getAttributeNames(); i.hasNext(); csReq.setAttribute(key, req.getAttribute(key)))
            key = (String)i.next();

        csReq.setPrimaryDSRequest(req);
        req.addSubRequest(csReq);
        DSResponse csResp = csReq.execute();
        if(csReq.getDroppedFields() != null)
        {
            for(Iterator i = csReq.getDroppedFields().iterator(); i.hasNext(); req.removeField((String)i.next(), true));
        }
        return lastRow = csResp.getData();
    }

    public void setLastPrimaryKeys(Map primaryKeys)
    {
        lastPrimaryKeys = primaryKeys;
    }

    public Map getLastPrimaryKeys(DSRequest req)
        throws Exception
    {
        if(lastPrimaryKeys != null)
            return lastPrimaryKeys;
        if(lastPrimaryKeysData == null)
            throw new Exception("getLastPrimaryKeys() called before valid insert/replace/update operation has been performed");
        Map submittedPrimaryKeys = DataTools.subsetMap(lastPrimaryKeysData, getPrimaryKeys());
        Iterator i = submittedPrimaryKeys.keySet().iterator();
        do
        {
            if(!i.hasNext())
                break;
            String keyName = (String)i.next();
            if(submittedPrimaryKeys.get(keyName) == null)
                submittedPrimaryKeys.remove(keyName);
        } while(true);
        List sequencesNotPresent = DataTools.setDisjunction(getPrimaryKeys(), DataTools.keysAsList(submittedPrimaryKeys));
        if(sequencesNotPresent.isEmpty())
            return lastPrimaryKeys = submittedPrimaryKeys;
        else
            return lastPrimaryKeys = driver.fetchLastPrimaryKeys(submittedPrimaryKeys, sequencesNotPresent, this, req);
    }

    public void setLastPrimaryKeysData(Map keys)
    {
        lastPrimaryKeysData = DataTools.subsetMap(keys, getPrimaryKeys());
    }

    public String escapeColumnName(Object columnName)
    {
        return driver.escapeColumnName(columnName);
    }

    public String escapeValue(Object value)
    {
        return driver.escapeValue(value);
    }

    public String escapeValueForFilter(Object value)
    {
        return driver.escapeValueForFilter(value, null);
    }

    public String escapeValueForWhereClause(Object value, Object field)
    {
        return valueForWhereClause(value, field, false);
    }

    public String valueForWhereClause(Object value, Object field)
    {
        return valueForWhereClause(value, field, false);
    }

    public String valueForWhereClause(Object value, Object field, boolean filter)
    {
        String columnType = null;
        DSField dsField = getField(field.toString());
        if(dsField != null)
            columnType = dsField.getType();
        try
        {
            if(columnType != null)
                columnType = getSimpleBaseType(columnType);
        }
        catch(Exception e)
        {
            log.warn((new StringBuilder()).append("Exception trying to get simpleBaseType for field ").append(field.toString()).toString(), e);
        }
        if(columnType == null)
            if(value instanceof Date)
                columnType = "date";
            else
            if(value instanceof Number)
            {
                if((value instanceof Float) || (value instanceof Double))
                    columnType = "float";
                else
                    columnType = "integer";
            } else
            {
                columnType = "text";
            }
        if("text".equals(columnType) || "string".equals(columnType))
            if(!filter)
                return driver.sqlInTransform(value, dsField, this);
            else
                return driver.sqlFilterTransform(value, dsField, this, null);
        if(typeIsNumeric(columnType))
        {
            if(value instanceof String)
                try
                {
                    if(typeIsDecimal(columnType))
                        value = (new BigDecimal((String)value)).toString();
                    else
                        value = (new BigInteger((String)value)).toString();
                }
                catch(Exception e)
                {
                    log.warn((new StringBuilder()).append("Got non-numeric value '").append(value).append("' for numeric column '").append(field.toString()).append("', creating literal false expression").toString());
                    return "'0'='1'";
                }
            return value.toString();
        } else
        {
            return driver.sqlInTransform(value, dsField, this);
        }
    }

    public static boolean typeIsDate(String type)
    {
        return "date".equals(type) || "time".equals(type) || "datetime".equals(type);
    }

    public static boolean typeIsBoolean(String type)
    {
        return "boolean".equals(type);
    }

    public static boolean typeIsDecimal(String type)
    {
        return "float".equals(type) || "decimal".equals(type) || "double".equals(type);
    }

    public static boolean typeIsNumeric(String type)
    {
        return "number".equals(type) || "float".equals(type) || "decimal".equals(type) || "double".equals(type) || "int".equals(type) || "intEnum".equals(type) || "integer".equals(type) || "sequence".equals(type);
    }

    public String getNextSequenceValue(String columnName)
        throws Exception
    {
        return driver.getNextSequenceValue(columnName, this);
    }

    public String sqlValueForFieldValue(String columnName, Object columnValue)
    {
        DSField field = getField(columnName);
        String columnType = field.getType();
        if(columnValue == null)
            return "NULL";
        if(field.isMultiple() && (columnValue instanceof Collection))
        {
            String sqlValue = "";
            Collection coll = (Collection)columnValue;
            for(Iterator i = coll.iterator(); i.hasNext();)
            {
                Object entry = i.next();
                if(sqlValue.length() != 0)
                    sqlValue = (new StringBuilder()).append(sqlValue).append(",").toString();
                sqlValue = (new StringBuilder()).append(sqlValue).append(entry).toString();
            }

            columnValue = sqlValue;
        }
        if(typeIsNumeric(columnType))
        {
            if("".equals(columnValue))
                return "NULL";
            else
                return columnValue.toString();
        } else
        {
            return driver.sqlInTransform(columnValue, field, this);
        }
    }

    private static String getClause(DSRequest request, String clauseName, String defaultValue)
        throws Exception
    {
    	 System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~clauseName="+clauseName);
    	 System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~defaultValue="+defaultValue);
        String clause = (String)request.getOperationProperty(clauseName);
        System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~clause="+clause);
        if(clause != null)
            return clause;
        Map operationBinding = request.getDataSource().getOperationBinding(request.getOperationType(), request.getOperationId());
        System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~operationBinding="+operationBinding);
        if(operationBinding == null)
            return defaultValue;
        Object clauseValue = operationBinding.get(clauseName);
        System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~clauseValue="+clauseValue);
        clause = clauseValue == null ? null : clauseValue.toString();
        if(clause != null)
            return clause;
        else
            return defaultValue;
    }

    public static String generateSQLStatement(DSRequest request, Map parameters)
        throws Exception
    {
        String opType = request.getOperationType();
        String command = (String)request.getOperationProperty("command");
        DataSource ds = request.getDataSource();
        if(command != null)
            return Velocity.evaluateAsString(command, parameters, opType, ds, true);
        String customSQL = getClause(request, "customSQL", null);
        if(customSQL != null)
        {
            String trimmed = new String(customSQL.trim());
            if(trimmed.endsWith(";"))
                trimmed = trimmed.substring(0, trimmed.length() - 1);
            return Velocity.evaluateAsString(trimmed, parameters, opType, ds, true);
        }
        String selectClause = getClause(request, "selectClause", "$defaultSelectClause");
        String tableClause = getClause(request, "tableClause", "$defaultTableClause");
        String whereClause = getClause(request, "whereClause", "$defaultWhereClause");
        String joinWhereClause = getClause(request, "joinWhereClause", "$defaultJoinWhereClause");
        String valuesClause = getClause(request, "valuesClause", "$defaultValuesClause");
        String groupClause = getClause(request, "groupClause", "$defaultGroupClause");
        String groupWhereClause = getClause(request, "groupWhereClause", "$defaultGroupWhereClause");
        String orderClause = getClause(request, "orderClause", "$defaultOrderClause");
        String statement;
        if(isFetch(opType))
        {
            statement = (new StringBuilder()).append("SELECT ").append(selectClause).append(" FROM ").append(tableClause).toString();
            boolean emittedWhere = false;
            if(!"$defaultWhereClause".equals(whereClause) || parameters.get("defaultWhereClause") != null)
            {
                statement = (new StringBuilder()).append(statement).append(" WHERE ").append(whereClause).toString();
                emittedWhere = true;
            }
            if(!"$defaultJoinWhereClause".equals(joinWhereClause) || parameters.get("defaultJoinWhereClause") != null)
                if(!emittedWhere)
                    statement = (new StringBuilder()).append(statement).append(" WHERE ").append(joinWhereClause).toString();
                else
                    statement = (new StringBuilder()).append(statement).append(" AND ").append(joinWhereClause).toString();
            if(!"$defaultGroupClause".equals(groupClause))
                statement = (new StringBuilder()).append(statement).append(" GROUP BY ").append(groupClause).toString();
            if(!"$defaultGroupWhereClause".equals(groupWhereClause))
                statement = (new StringBuilder()).append("SELECT * FROM (").append(statement).append(") work WHERE ").append(groupWhereClause).toString();
            Object defaultOrderClause = parameters.get("defaultOrderClause");
            if(!"$defaultOrderClause".equals(orderClause) || defaultOrderClause != null && !defaultOrderClause.equals(""))
                statement = (new StringBuilder()).append(statement).append(" ORDER BY ").append(orderClause).toString();
            log.info((new StringBuilder()).append("derived query: ").append(statement).toString());
        } else
        if(isAdd(opType))
            statement = (new StringBuilder()).append("INSERT INTO ").append(tableClause).append(" ").append(valuesClause).toString();
        else
        if(isUpdate(opType))
        {
            statement = (new StringBuilder()).append("UPDATE ").append(tableClause).append(" SET ").append(valuesClause).append(" WHERE ").append(whereClause).toString();
            if(!"$defaultJoinWhereClause".equals(joinWhereClause) || parameters.get("defaultJoinWhereClause") != null)
                statement = (new StringBuilder()).append(statement).append(" AND ").append(joinWhereClause).toString();
        } else
        if(isRemove(opType))
            statement = (new StringBuilder()).append("DELETE FROM ").append(tableClause).append(" WHERE ").append(whereClause).toString();
        else
        if("replace".equals(opType))
            statement = (new StringBuilder()).append("REPLACE INTO ").append(tableClause).append(" ").append(valuesClause).toString();
        else
        if("custom".equals(opType))
            statement = "";
        else
            throw new Exception((new StringBuilder()).append("Operation type ").append(opType).append(" not supported by generateSQLStatement").toString());
        return Velocity.evaluateAsString(statement, parameters, opType, ds, true);
    }

    public static void sandbox(DSRequest req)
        throws Exception
    {
        HttpSession session = null;
        if(!config.getBoolean("wwwProduction", false))
            return;
        if(req == null || req.context == null || req.context.request == null || req.context.request.getSession() == null)
            return;
        session = req.context.request.getSession();
        DataSource ds = req.getDataSource();
        if(ds instanceof SQLDataSource)
        {
            SQLDataSource sqlds = (SQLDataSource)ds;
            if(!sqlds.isModificationOperation(req.getOperationType(), req.getOperationId()))
                return;
        }
        if(session.getAttribute("isc_sandbox") != null)
            return;
        Map sandbox = new HashMap();
        session.setAttribute("isc_sandbox", sandbox);
        List doNotSandbox = config.getList("doNotSandboxTables", new ArrayList());
        SQLDriver driver = SQLDriver.instance("webdemos");
        String tableSchema = config.getString((new StringBuilder()).append("sql.").append(driver.getDBName()).append(".driver.databaseName").toString(), "isomorphic");
        List qryResults = driver.executeQuery("SHOW TABLES", null);
        List tables = new ArrayList();
        Iterator i = qryResults.iterator();
        do
        {
            if(!i.hasNext())
                break;
            Map row = (Map)i.next();
            String tableInSchema = (String)row.get((new StringBuilder()).append("Tables_in_").append(tableSchema).toString());
            if(tableInSchema.indexOf("_sbx_") == -1)
                tables.add(tableInSchema);
        } while(true);
        tables = DataTools.setDisjunction(tables, doNotSandbox);
        String tableName;
        String sandboxTable;
        for(i = tables.iterator(); i.hasNext(); sandbox.put(tableName, sandboxTable))
        {
            tableName = (String)i.next();
            sandboxTable = (new StringBuilder()).append(tableName).append("_sbx_").append(session.getId()).toString();
            int trimChars = sandboxTable.length() - 64;
            if(trimChars > 0)
            {
                if(trimChars > tableName.length())
                {
                    log.warn("Sandboxed table name was too long, and this cannot be resolved by trimming the base name because the amount of excess length is greater than the length of the base name");
                    return;
                }
                String trimmedName = tableName.substring(0, tableName.length() - trimChars);
                sandboxTable = (new StringBuilder()).append(trimmedName).append("_sbx_").append(session.getId()).toString();
                int rchar = 0;
                for(String replacementChar = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; sandbox.containsValue(sandboxTable) && rchar < replacementChar.length(); sandboxTable = (new StringBuilder()).append(trimmedName.substring(0, trimmedName.length() - 2)).append("_").append(replacementChar.substring(rchar++, rchar)).append("_sbx_").append(session.getId()).toString());
                if(sandbox.get(sandboxTable) != null)
                {
                    log.warn("Sandboxed table name was too long, and attempting to resolve this by trimming the base name failed because every attempted variation on the base name was already in use");
                    return;
                }
            }
            driver.execute((new StringBuilder()).append("CREATE TABLE `").append(sandboxTable).append("` LIKE `").append(tableName).append("`").toString());
            driver.execute((new StringBuilder()).append("INSERT INTO `").append(sandboxTable).append("` SELECT * FROM `").append(tableName).append("`").toString());
            log.warn((new StringBuilder()).append("Created sandbox copy of ").append(tableName).append(" as: ").append(sandboxTable).toString());
        }

    }

    public static String applySandboxNames(String statement, DSRequest req)
        throws Exception
    {
        HttpSession session = null;
        if(req != null && req.context != null && req.context.request != null)
            session = req.context.request.getSession();
        if(session == null)
            return statement;
        Map sandbox = (Map)session.getAttribute("isc_sandbox");
        if(sandbox == null)
            return statement;
        String delimiters = " \t\n\r\f.,()";
        StringTokenizer st = new StringTokenizer(statement, delimiters, true);
        StringBuffer sandboxedStatement = new StringBuffer("");
        String tokens[] = new String[st.countTokens()];
        int c = 0;
        while(st.hasMoreTokens()) 
            tokens[c++] = st.nextToken();
        boolean hitSelect = false;
        boolean hitFrom = false;
        boolean hitSet = false;
        boolean hitWhere = false;
        boolean hitOrderBy = false;
        boolean hitInsertInto = false;
        boolean hitOpeningParen = false;
        for(int j = 0; j < c; j++)
        {
            String token;
label0:
            {
                token = tokens[j];
                boolean check = true;
                if("SELECT".equals(token))
                {
                    hitSelect = true;
                    check = false;
                }
                if("FROM".equals(token))
                {
                    hitFrom = true;
                    check = false;
                }
                if("SET".equals(token))
                {
                    hitSet = true;
                    check = false;
                }
                if("WHERE".equals(token))
                {
                    hitWhere = true;
                    check = false;
                }
                if("ORDER".equals(token) && j + 2 < c && "BY".equals(tokens[j + 2]))
                {
                    hitOrderBy = true;
                    check = false;
                }
                if("INSERT".equals(token) && j + 2 < c && "INTO".equals(tokens[j + 2]))
                {
                    hitInsertInto = true;
                    check = false;
                }
                if("(".equals(token))
                {
                    hitOpeningParen = true;
                    check = false;
                }
                if(delimiters.indexOf(token) != -1)
                    check = false;
                if((hitSelect && !hitFrom || hitInsertInto && hitOpeningParen || hitSet || hitWhere || hitOrderBy) && (j + 1 >= c || !".".equals(tokens[j + 1])))
                    check = false;
                if(!check)
                    break label0;
                Iterator i = sandbox.keySet().iterator();
                String origTable;
                do
                {
                    if(!i.hasNext())
                        break label0;
                    origTable = (String)i.next();
                } while(!origTable.equals(token));
                token = (String)sandbox.get(origTable);
            }
            sandboxedStatement.append(token);
        }

        return sandboxedStatement.toString();
    }

    private static boolean shouldInvalidateCache(DSRequest req, SQLDriver driver)
        throws Exception
    {
        if(req.forceInvalidateCache())
            return true;
        Map opBinding = req.getDataSource().getOperationBinding(req.getOperationType(), req.getOperationId());
        if(opBinding != null)
        {
            Object invalCache = opBinding.get("invalidateCache");
            if(invalCache != null && invalCache.toString().toLowerCase().equals("true"))
                return true;
        }
        if(driver instanceof CacheDriver)
            return true;
        Object work = getClause(req, "canSyncCache", null);
        if(work != null)
            return work.toString().toLowerCase().equals("false");
        if(getClause(req, "cacheSyncOperation", null) != null)
            return false;
        if(req.getOperationProperty("command") != null)
            return true;
        if(getClause(req, "customSQL", null) != null)
            return true;
        String opType = req.getOperationType();
        if(isAdd(opType) || "replace".equals(opType))
            return getClause(req, "valuesClause", null) != null;
        if(isRemove(opType) || isUpdate(opType))
        {
            return getClause(req, "whereClause", null) != null;
        } else
        {
            log.warning("shouldInvalidateCache called for a DSRequest with a non-update operation; returning false");
            return false;
        }
    }

    public static DSResponse SQLExecute(DSRequest req)
        throws Exception
    {
        return SQLExecute(req, null);
    }

    public static DSResponse SQLExecute(DSRequest req, Object dsObject)
        throws Exception
    {
    	System.out.println("!!!!!!!!!!!!!!!!!!!!进入SQLExecute");
        DSResponse result;
label0:
        {
            sandbox(req);
            Map opConfig = req.operationConfig();
            String opType = req.getOperationType();
            if(log.isInfoEnabled())
            {
                List values = req.getValueSets();
                JSTranslater jsTrans = JSTranslater.instance().enablePrettyPrinting(false);
                String valuesString = "";
                if(values != null)
                    if(values.size() == 1)
                        valuesString = (new StringBuilder()).append("\tvalues: ").append(jsTrans.toJS(values.get(0))).toString();
                    else
                        valuesString = (new StringBuilder()).append("\tvalues: ").append(values.size()).append(" valueSets").toString();
                log.info((new StringBuilder()).append("Performing ").append(opType).append(" operation with\n").append(req.constraints() == null ? "" : (new StringBuilder()).append("\tconstraints: ").append(req.constraints()).toString()).append(req.outputs() == null ? "" : (new StringBuilder()).append("\toutputs: ").append(req.outputs()).toString()).append(req.getRawCriteria() == null ? "" : (new StringBuilder()).append("\tcriteria: ").append(jsTrans.toJS(req.getRawCriteria())).toString()).append(valuesString).toString());
            }
            if(dsObject == null)
            {
                if(opConfig == null)
                    throw new Exception("no datasources specified in argument and no operation config to look them up; can't proceed");
                dsObject = opConfig.get("dataSource");
            }
            List dataSources;
            if((dsObject instanceof String) || (dsObject instanceof SQLDataSource))
                dataSources = getDataSources(DataTools.makeList(dsObject), req);
            else
            if(dsObject instanceof List)
                dataSources = getDataSources((List)dsObject, req);
            else
                throw new Exception("in the app operation config, datasource must be set to a string or list");
            SQLDataSource firstDS = (SQLDataSource)dataSources.get(0);
            List valueSets = req.getValueSets();
            if(isAdd(opType) && valueSets.size() > 1)
                return executeMultipleInsert(req, valueSets, dataSources);
            if(opType.equals("replace") && !firstDS.getDriver().supportsNativeReplace())
            {
                req.setOperationType("remove");
                SQLExecute(req, dataSources);
                req.setOperationType("add");
                return SQLExecute(req, dataSources);
            }
            Map operationBinding = req.getDataSource().getOperationBinding(req.getOperationType(), req.getOperationId());
            List customFields = getCustomFields(operationBinding);
            List customCriteriaFields = getCustomCriteriaFields(operationBinding);
            List customValueFields = getCustomValueFields(operationBinding);
            List excludeValueFields = getExcludeValueFields(operationBinding);
            if(customCriteriaFields == null)
                customCriteriaFields = customFields;
            if(customValueFields == null)
                customValueFields = customFields;
            boolean qualifyColumnNames = shouldQualifyColumnNames(operationBinding, firstDS);
            Map context = getClausesContext(req, dataSources, qualifyColumnNames, customCriteriaFields, customValueFields, excludeValueFields, operationBinding);
            if((isAdd(opType) || isUpdate(opType) || opType.equals("replace")) && req.getOperationProperty("command") == null && (operationBinding == null || !operationBinding.containsKey("customSQL")) && (operationBinding == null || !operationBinding.containsKey("valuesClause")) && req.getOperationProperty("valuesClause") == null && context.get("defaultValuesClause") == null)
            {
                log.warn("Insert, update or replace operation requires non-empty values; check submitted values parameter");
                throw new Exception("Insert, update or replace operation requires non-empty values; check submitted values parameter");
            }
            if(opConfig != null || operationBinding != null)
                context.putAll(getVariablesContext(req, dataSources));
            String statement = generateSQLStatement(req, context);
            statement = applySandboxNames(statement, req);
            result = new DSResponse(firstDS);
            if(isCustom(opType) && "".equals(statement))
            {
                result.setStatus(0);
                break label0;
            }
            if(isFetch(opType) || isCustom(opType) && operationBinding != null && !"update".equals(operationBinding.get("sqlType")))
            {
                String paging = null;
                if(req.isPaged())
                {
                    if(operationBinding != null)
                        paging = (String)operationBinding.get("sqlPaging");
                    if(paging == null && (req.getOperationProperty("command") != null || operationBinding != null && operationBinding.containsKey("customSQL")))
                    {
                        paging = config.getString("sql.defaultCustomSQLPaging");
                        if(paging == null)
                            if(config.getBoolean("sql.customSQLReturnsAllRows", true))
                                paging = "none";
                            else
                                paging = "jdbcScroll";
                    } else
                    if(paging == null)
                    {
                        if(paging == null)
                            paging = firstDS.getProperty("sqlPaging");
                        if(paging == null)
                        {
                            paging = config.getString("sql.defaultPaging");
                            if(paging == null)
                            {
                                Object useSQLLimit = firstDS.getConfig().get("useSQLLimit");
                                if(useSQLLimit == null || useSQLLimit.toString().equals("true"))
                                    paging = "sqlLimit";
                                else
                                    paging = "none";
                            }
                        }
                    }
                }
                if(req.isPaged() && !"none".equals(paging))
                {
                    long start = System.currentTimeMillis();
                    boolean dbType = config.getString("sql.defaultDatabase").equalsIgnoreCase("mysql");
                    Object obj =  req.getHttpServletRequest().getParameter("currentPage");
                    Object obj1 =  req.getHttpServletRequest().getParameter("pageSize");
                    String statement1 = "";
                    if(null != obj) {
                    	int currentPage = Integer.parseInt(obj.toString());
                    	int pageSize = Integer.parseInt(obj1.toString());
                    	int endRow= (currentPage - 1) * pageSize + pageSize;
                    	int startRow = (currentPage - 1) * pageSize;
                    	if(dbType){
                    		paging = "";
                    		statement1 = "select * from (select tmp_tb.*, @rownum :=@rownum + 1 AS R from (SELECT @rownum := 0) ROW,(";
                            statement1 += statement;
                            statement1 += " order by updateTime desc) tmp_tb ";
                            statement1 += ") u limit "+startRow+","+endRow;
                    	}else{
                    	statement1 = "select * from (select tmp_tb.*,ROWNUM row_id from (";
                        statement1 += statement;
                        statement1 += " order by updateTime desc) tmp_tb where ROWNUM<="+endRow;
                        statement1 += ") where row_id>"+startRow;
                    	}
                    } else {
                        if(dbType){
                        	paging = "";
                        	statement1 = "select * from (select tmp_tb.*, @rownum :=@rownum + 1 AS R from (SELECT @rownum := 0) ROW,(";
                            statement1 += statement;
                            statement1 += " order by updateTime desc) tmp_tb";
                            statement1 += ") u limit 0,10";
                    		
                    	}else{
                    	statement1 = "select * from (select tmp_tb.*,ROWNUM row_id from (";
                        statement1 += statement;
                        statement1 += " order by updateTime desc) tmp_tb where ROWNUM<=10";
                        statement1 += ") where row_id>0";
                    	}
                    }
                    DSResponse  result1 = executeWindowedSelect(req, dataSources, context, statement, paging);
                    String totalCount = result1.getTotalRows() + "";
                    statement = statement1;
                    System.out.println("selectSql################:" + statement);
                    result = executeWindowedSelect(req, dataSources, context, statement, paging);
                    result.setParameter("totalCount", totalCount);
                    long end = System.currentTimeMillis();
                    Logger.timing.debug((new StringBuilder()).append("Query time: ").append(end - start).append("ms").toString());
                } else
                {
                    log.info((new StringBuilder()).append("Executing SQL query on '").append(firstDS.getDriver().dbName).append("'").toString(), statement);
                    List results = firstDS.executeNativeQuery(statement, firstDS, operationBinding, req, result);
                    if(!req.shouldStreamResults())
                    {
                        result.setData(results);
                        result.setTotalRows(results.size());
                        result.setStartRow(0L);
                        result.setEndRow(results.size());
                    }
                }
                break label0;
            }
            firstDS.clearCache();
            List streams = new ArrayList();
            List binaryStreams;
            if(config.getBoolean("oldBinaryStreamHandling", false))
                binaryStreams = req.getUploadedFileStreams();
            else
                binaryStreams = req.getBinaryStreams();
            int binaryStreamsIndex = 0;
            Iterator i = firstDS.getFieldNames().iterator();
label1:
            do
            {
                String fieldName;
label2:
                {
                    DSField dsField;
                    boolean skipCustomSQLCheck;
label3:
                    {
                        if(!i.hasNext())
                            break label1;
                        fieldName = (String)i.next();
                        dsField = firstDS.getField(fieldName);
                        if(firstDS.getDriver().fieldAssignableInline(dsField))
                            continue;
                        if(!dsField.isBinary())
                            break label2;
                        skipCustomSQLCheck = false;
                        if(customValueFields == null)
                            break label3;
                        Iterator iter = customValueFields.iterator();
                        do
                            if(!iter.hasNext())
                                break label3;
                        while(!iter.next().equals(dsField.getName()));
                        skipCustomSQLCheck = true;
                    }
                    if((skipCustomSQLCheck || !dsField.getBoolean("customSQL")) && binaryStreams != null && binaryStreams.size() > binaryStreamsIndex)
                        streams.add(binaryStreams.get(binaryStreamsIndex++));
                    continue;
                }
                String s = (String)req.getValues().get(fieldName);
                if(s != null)
                    streams.add(new StringBuffer(s));
                else
                if(req.getValues().containsKey(fieldName))
                    streams.add(null);
            } while(true);
            int rowsAffected = firstDS.executeNativeUpdate(statement, streams, req);
            result.setAffectedRows(rowsAffected);
            if(!isCustom(opType))
                if(rowsAffected > 0)
                {
                    log.debug((new StringBuilder()).append(opType).append(" operation affected ").append(rowsAffected).append(" rows").toString());
                    if(shouldInvalidateCache(req, firstDS.getDriver()))
                    {
                        result.setInvalidateCache(true);
                    } else
                    {
                        Map storeValues = req.getCriteria();
                        if(isAdd(opType))
                        {
                            storeValues = new HashMap(req.getCriteria());
                            Iterator i1 = storeValues.keySet().iterator();
                            do
                            {
                                if(!i1.hasNext())
                                    break;
                                String fieldName = (String)i1.next();
                                DSField field = firstDS.getField(fieldName);
                                if(field != null && "sequence".equals(field.getType()))
                                    i1.remove();
                            } while(true);
                        }
                        firstDS.setLastPrimaryKeysData(storeValues);
                        if(req.getAllowMultiUpdate())
                        {
                            result.setInvalidateCache(true);
                        } else
                        {
                            Object data = isRemove(opType) ? ((Object) (firstDS.getLastPrimaryKeys(req))) : firstDS.getLastRow(req, qualifyColumnNames);
                            result.setData((data instanceof JSONFilter) ? data : ((Object) (DataTools.makeListIfSingle(data))));
                        }
                    }
                } else
                {
                    log.warning((new StringBuilder()).append(opType).append(" operation affected no rows").toString());
                }
        }
        return result;
    }

    protected static boolean shouldQualifyColumnNames(Map operationBinding, DataSource ds)
    {
        boolean qualifyColumnNames = true;
        if(operationBinding != null)
        {
            Object qual = operationBinding.get("qualifyColumnNames");
            if(qual != null)
            {
                if(qual.toString().toLowerCase().equals("false"))
                    qualifyColumnNames = false;
            } else
            {
                qual = ds.getConfig().get("qualifyColumnNames");
                if(qual != null && qual.toString().toLowerCase().equals("false"))
                    qualifyColumnNames = false;
            }
        } else
        {
            Object qual = ds.getConfig().get("qualifyColumnNames");
            if(qual != null && qual.toString().toLowerCase().equals("false"))
                qualifyColumnNames = false;
        }
        return qualifyColumnNames;
    }

    protected static List getCustomFields(Map opBinding)
    {
        List fieldList = null;
        if(opBinding != null)
        {
            Object customFieldObj = opBinding.get("customFields");
            if(customFieldObj instanceof List)
                fieldList = (List)customFieldObj;
            else
            if(customFieldObj != null)
            {
                fieldList = new ArrayList();
                String fields[] = customFieldObj.toString().split(",");
                for(int i = 0; i < fields.length; i++)
                    fieldList.add(fields[i].trim());

            }
        }
        return fieldList;
    }

    protected static List getCustomCriteriaFields(Map opBinding)
    {
        List fieldList = null;
        if(opBinding != null)
        {
            Object customCriteriaFieldObj = opBinding.get("customCriteriaFields");
            if(customCriteriaFieldObj instanceof List)
                fieldList = (List)customCriteriaFieldObj;
            else
            if(customCriteriaFieldObj != null)
            {
                fieldList = new ArrayList();
                String fields[] = customCriteriaFieldObj.toString().split(",");
                for(int i = 0; i < fields.length; i++)
                    fieldList.add(fields[i].trim());

            }
        }
        return fieldList;
    }

    protected static List getCustomValueFields(Map opBinding)
    {
        List fieldList = null;
        if(opBinding != null)
        {
            Object customValueFieldObj = opBinding.get("customValueFields");
            if(customValueFieldObj instanceof List)
                fieldList = (List)customValueFieldObj;
            else
            if(customValueFieldObj != null)
            {
                fieldList = new ArrayList();
                String fields[] = customValueFieldObj.toString().split(",");
                for(int i = 0; i < fields.length; i++)
                    fieldList.add(fields[i].trim());

            }
        }
        return fieldList;
    }

    protected static List getExcludeValueFields(Map opBinding)
    {
        List fieldList = null;
        if(opBinding != null)
        {
            Object excludeCriteriaFieldObj = opBinding.get("excludeCriteriaFields");
            if(excludeCriteriaFieldObj instanceof List)
                fieldList = (List)excludeCriteriaFieldObj;
            else
            if(excludeCriteriaFieldObj != null)
            {
                fieldList = new ArrayList();
                String fields[] = excludeCriteriaFieldObj.toString().split(",");
                for(int i = 0; i < fields.length; i++)
                    fieldList.add(fields[i].trim());

            }
        }
        return fieldList;
    }

    private static DSResponse executeMultipleInsert(DSRequest req, List valueSets, List dataSources)
        throws Exception
    {
        DSResponse result = null;
        boolean invalidateCache = false;
        List resultSets = new ArrayList();
        Iterator i = valueSets.iterator();
        do
        {
            if(!i.hasNext())
                break;
            Object values = i.next();
            if(!(values instanceof Map))
                throw new Exception((new StringBuilder()).append("values must be set to a map or list of maps; was set to list of ").append(values.getClass().getName()).toString());
            req.setValues(values);
            result = SQLExecute(req, dataSources);
            List currentRS = result.getDataList();
            if(currentRS != null && !currentRS.isEmpty())
                resultSets.add(currentRS.get(0));
            if(result.getInvalidateCache())
                invalidateCache = true;
        } while(true);
        result.setAffectedRows(valueSets.size());
        result.setData(resultSets);
        result.setInvalidateCache(invalidateCache);
        return result;
    }

    private static DSResponse executeWindowedSelect(DSRequest req, List dataSources, Map context, String rowFetchQuery, String paging)
        throws Exception
    {
        DSResponse result;
        SQLDataSource firstDS;
        SQLDriver driver;
        Map opConfig;
        result = new DSResponse((DataSource)dataSources.get(0));
        firstDS = (SQLDataSource)dataSources.get(0);
        driver = firstDS.getDriver();
        opConfig = req.getDataSource().getOperationBinding(req.getOperationType(), req.getOperationId());
        boolean useRowCount;
        String orderClause;
        DSResponse dsresponse;
        useRowCount = opConfig == null || !opConfig.containsKey("customSQL") && !opConfig.containsKey("command") && !"true".equals((String)opConfig.get("skipRowCount"));
        String selectString = getClause(req, "selectClause", "$defaultSelectClause");
        String tableString = getClause(req, "tableClause", "$defaultTableClause");
        String whereString = getClause(req, "whereClause", "$defaultWhereClause");
        String joinWhereString = getClause(req, "joinWhereClause", "$defaultJoinWhereClause");
        String groupString = getClause(req, "groupClause", "$defaultGroupClause");
        String groupWhereString = getClause(req, "groupWhereClause", "$defaultGroupWhereClause");
        orderClause = context.get("defaultOrderClause").toString();
        long start = System.currentTimeMillis();
        if(useRowCount) {
        	
        	String rowCountQueryString = driver.getRowCountQueryString(selectString, tableString, whereString, joinWhereString, groupString, groupWhereString, context);
        	log.debug("Executing row count query", rowCountQueryString);
        	String rowCountQuery = Velocity.evaluateAsString(rowCountQueryString, context, req.getOperationType(), firstDS, true);
        	rowCountQuery = applySandboxNames(rowCountQuery, req);
        	log.debug("Eval'd row count query", rowCountQuery);
        	String sCount = driver.executeScalar(rowCountQuery, req).toString();
        	Integer count = null;
        	try
        	{
        		count = new Integer(sCount);
        	}
        	catch(NumberFormatException nfe)
        	{
        		int dotIndex = sCount.indexOf(".");
        		if(dotIndex != -1)
        		{
        			sCount = sCount.substring(0, dotIndex);
        			count = new Integer(sCount);
        		}
        	}
        	long end = System.currentTimeMillis();
        	result.setTotalRows(count.intValue());
        	Logger.timing.debug((new StringBuilder()).append("Counted ").append(result.getTotalRows()).append(" total rows in result set: ").append(end - start).append("ms").toString());
        	if(result.getTotalRows() == 0L) {
        		result.setData(new ArrayList());
        		result.setStartRow(0L);
        		result.setEndRow(0L);
        		dsresponse = result;
        		return dsresponse;
        	}
        	if(req.getStartRow() > result.getTotalRows() || result.getTotalRows() - req.getStartRow() < req.getBatchSize())
        	{
        		long newStartRow = Math.max(result.getTotalRows() - req.getBatchSize(), 0L);
        		req.setStartRow(newStartRow);
        	}
        } else {
        	log.info("Skipping row count query - Row count will be obtained by traversing the entire dataset");
        }
        Statement s;
        ResultSet rs;
        Connection conn;
        boolean userTransaction;
        boolean streaming;
        if(req.getEndRow() != -1L && req.getEndRow() - req.getStartRow() > req.getBatchSize())
            req.setBatchSize(req.getEndRow() - req.getStartRow());
        if(paging.equals("sqlLimit") && !driver.supportsSQLLimit())
        {
            if(opConfig != null && opConfig.get("sqlPaging") != null)
                log.warn((new StringBuilder()).append("DataSource '").append(firstDS.getName()).append("'").append(opConfig != null ? (new StringBuilder()).append(", OperationBinding '").append(opConfig.get("operationId")).toString() : "").append(": sqlPaging was explicitly specified as 'sqlLimit', but ").append("the underlying database (").append(driver.getDBType()).append(") does ").append("not support SQL limit queries.  Falling back to 'jdbcScroll'").toString());
            paging = "jdbcScroll";
        }
		if (paging.equals("sqlLimit")) {
			log.debug("Using SQL Limit query");
			Map remap = new HashMap();
			for (Iterator i = dataSources.iterator(); i.hasNext();) {
				SQLDataSource ds = (SQLDataSource) i.next();
				remap = DataTools
						.orderedMapUnion(remap, ds.ds2NativeFieldMap());
			}

			List constraints = (List) req.constraints();
			if (constraints != null)
				remap = DataTools.subsetMap(remap, constraints);
			List outputs = req.outputs();
			if (outputs != null)
				remap = DataTools.subsetMap(remap, outputs);
			if (driver.limitRequiresSQLOrderClause()) {
				if (orderClause == null || orderClause.equals("")) {
					List pkList = result.getDataSource().getPrimaryKeys();
					if (driver instanceof OracleDriver)
						orderClause = "rownum";
					else if (!pkList.isEmpty()) {
						orderClause = (String) pkList.get(0);
						if (orderClause != null)
							orderClause = driver.escapeColumnName(orderClause);
						log.debug((new StringBuilder())
								.append("Using PK as default sorter: ")
								.append(orderClause).toString());
					} else {
						Iterator i = remap.keySet().iterator();
						if (i.hasNext())
							orderClause = (String) i.next();
						orderClause = (String) DataTools.enumToList(
								remap.values().iterator()).get(0);
						if (orderClause != null)
							orderClause = driver.escapeColumnName(orderClause);
						log.debug((new StringBuilder())
								.append("Using first field as default sorter: ")
								.append(orderClause).toString());
					}
				}
				rowFetchQuery = driver.limitQuery(rowFetchQuery,
						req.getStartRow(), req.getBatchSize(),
						DataTools.enumToList(remap.values().iterator()),
						orderClause);
			} else {
				rowFetchQuery = driver.limitQuery(rowFetchQuery,
						req.getStartRow(), req.getBatchSize(),
						DataTools.enumToList(remap.values().iterator()));
			}
			if (log.isDebugEnabled())
				log.debug(
						(new StringBuilder())
								.append("SQL windowed select rows ")
								.append(req.getStartRow()).append("->")
								.append(req.getEndRow())
								.append(", result size ")
								.append(req.getBatchSize()).append(". Query")
								.toString(), rowFetchQuery);
			s = null;
			rs = null;
			conn = null;
			userTransaction = true;
			streaming = req.shouldStreamResults();
			DSResponse dsresponse1;
			try {
				long start1 = System.currentTimeMillis();
				try {
					conn = firstDS.getTransactionalConnection(req);
					if (conn == null) {
						conn = SQLConnectionManager.getConnection(driver
								.getDBName());
						userTransaction = false;
					}
					s = driver.createFetchStatement(conn, streaming,
							req.getBatchSize());
					rs = s.executeQuery(rowFetchQuery);
				} catch (SQLException se) {
					if (!userTransaction) {
						SQLConnectionManager.free(conn);
						conn = SQLConnectionManager.getNewConnection(driver
								.getDBName());
						s = driver.createFetchStatement(conn, streaming,
								req.getBatchSize());
						rs = s.executeQuery(rowFetchQuery);
					} else {
						throw se;
					}
				}
				Logger.timing.debug((new StringBuilder())
						.append("Time to execute fetch query: ")
						.append(System.currentTimeMillis() - start1)
						.append("ms").toString());
				if (req.getBatchSize() != -1L
						&& !(driver instanceof PostgresDriver)
						&& !(driver instanceof HSQLDBDriver))
					rs.setFetchSize((int) (req.getBatchSize() + 1L));
				if (streaming) {
					log.debug("Streaming the response");
					result.setData(new StreamingResponseIterator(result));
					Map sContext = new HashMap();
					sContext.put("resultSet", rs);
					sContext.put("brokenCursorAPIs", Boolean
							.valueOf(SQLTransform.hasBrokenCursorAPIs(driver)));
					sContext.put("dataSources", dataSources);
					sContext.put("opConfig", opConfig);
					sContext.put("dsRequest", req);
					result.setStreamingContext(sContext);
					result.setStartRow(req.getStartRow());
					result.setEndRow(req.getStartRow());
					result._setHasNextRecord(rs.next());
				} else {
					long ss = System.currentTimeMillis();
					List rows = SQLTransform.toListOfMapsOrBeans(rs, driver,
							dataSources, opConfig, req);
					Logger.timing.debug((new StringBuilder())
							.append("SQLTransform took: ")
							.append(System.currentTimeMillis() - ss)
							.append("ms").toString());
					result.setData(rows);
					result.setEndRow(req.getStartRow() + (long) rows.size());
					result.setStartRow(req.getStartRow());
					if (!useRowCount) {
						String error = "";
						if (opConfig == null
								&& "sqlLimit".equals(config
										.get("sql.defaultCustomSQLPaging")))
							error = "server.properties entry 'defaultCustomSQLPaging' is set to 'sqlLimit'.  SmartClient Server does not currently support sqlLimit paging for customSQL operations: only the first page will be returned.";
						else if (opConfig != null)
							error = (new StringBuilder())
									.append("DataSource '")
									.append(firstDS.getName())
									.append("', ")
									.append("operationId: '")
									.append(opConfig.get("operationId"))
									.append("'")
									.append(" is a customSQL operation, but specifies ")
									.append("sqlPaging: 'sqlLimit'.  SmartClient Server does not currently ")
									.append("support sqlLimit paging for customSQL operations: only ")
									.append("the first page will be returned.")
									.toString();
						log.warn(error);
					}
					if ((long) rows.size() < req.getBatchSize())
						result.setTotalRows(result.getEndRow());
				}
				dsresponse1 = result;
				return dsresponse1;
			} finally {
				if (!streaming) {
					try {
						rs.close();
					} catch (Exception ignored) {
					}
					try {
						s.close();
					} catch (Exception ignored) {
					}
				}
				if (!userTransaction) {
					SQLConnectionManager.free(conn);
					if (req.shouldStreamResults()) {
						log.error("DSRequest was set to stream results, but also to free database connection immediately; abandoning streaming to prevent a connection leak");
						result._setHasNextRecord(false);
					}
				}
			}
		}
        if(log.isDebugEnabled())
            log.debug((new StringBuilder()).append("JDBC driver windowed select rows ").append(req.getStartRow()).append("->").append(req.getEndRow()).append(", result size ").append(req.getBatchSize()).append(". Query").toString(), rowFetchQuery);
        s = null;
        rs = null;
        conn = null;
        userTransaction = true;
        streaming = req.shouldStreamResults();
        DSResponse dsresponse2;
        long start11 = System.currentTimeMillis();
        try
        {
            javax.servlet.http.HttpServletRequest servletReq = null;
            if(req.context != null && req.context.request != null)
                servletReq = req.context.request;
            conn = firstDS.getTransactionalConnection(req);
            if(conn == null)
            {
                conn = driver.getConnection();
                if(conn == null)
                    conn = SQLConnectionManager.getConnection(driver.getDBName());
                userTransaction = false;
            }
            if(streaming)
                s = driver.createFetchStatement(conn, streaming, req.getBatchSize() + 1L);
            else
                s = driver.createScrollableFetchStatement(conn, req.getBatchSize() + 1L);
            rs = s.executeQuery(rowFetchQuery);
        }
        catch(SQLException se)
        {
            if(!userTransaction)
            {
                SQLConnectionManager.free(conn);
                conn = SQLConnectionManager.getNewConnection(driver.getDBName());
                if(streaming)
                    s = driver.createFetchStatement(conn, streaming, req.getBatchSize() + 1L);
                else
                    s = driver.createScrollableFetchStatement(conn, req.getBatchSize() + 1L);
                rs = s.executeQuery(rowFetchQuery);
            } else
            {
                throw se;
            }
        }
        long executeTime = System.currentTimeMillis() - start11;
        start11 = System.currentTimeMillis();
        if(paging.equals("jdbcScroll") && !streaming)
        {
            rs.absolute((int)req.getStartRow() + 1);
        } else
        {
            for(int i = 0; (long)i <= req.getStartRow() && rs.next(); i++);
        }
        long scrollTime = System.currentTimeMillis() - start11;
        if(streaming)
        {
            log.debug("Streaming the response");
            result.setData(new StreamingResponseIterator(result));
            Map sContext = new HashMap();
            sContext.put("resultSet", rs);
            sContext.put("brokenCursorAPIs", Boolean.valueOf(SQLTransform.hasBrokenCursorAPIs(driver)));
            sContext.put("dataSources", dataSources);
            sContext.put("opConfig", opConfig);
            sContext.put("dsRequest", req);
            result.setStreamingContext(sContext);
            result.setStartRow(req.getStartRow());
            result.setEndRow(req.getStartRow());
            result._setHasNextRecord(rs.next());
        } else
        {
            if(driver.canSetFetchSize())
                rs.setFetchSize((int)(req.getBatchSize() + 1L));
            start11 = System.currentTimeMillis();
            List rows = SQLTransform.toListOfMapsOrBeans(rs, req.getBatchSize(), driver, dataSources, opConfig, req);
            long fetchTime = System.currentTimeMillis() - start11;
            Logger.timing.debug((new StringBuilder()).append("Execute: ").append(executeTime).append("ms, Scroll: ").append(scrollTime).append("ms, Fetch: ").append(fetchTime).append("ms, Total: ").append(executeTime + scrollTime + fetchTime).append("ms").toString());
            result.setData(rows);
            result.setEndRow(req.getStartRow() + (long)rows.size());
            result.setStartRow(req.getStartRow());
            if(!useRowCount)
            {
                long rc;
                for(rc = result.getEndRow() + 1L; rs.next(); rc++);
                result.setTotalRows(rc);
            }
            if((long)rows.size() < req.getBatchSize())
                result.setTotalRows(result.getEndRow());
        }
        dsresponse2 = result;
        if(!streaming)
        {
            try
            {
                rs.close();
            }
            catch(Exception ignored) { }
            try
            {
                s.close();
            }
            catch(Exception ignored) { }
        }
        return dsresponse2;
    }

    private static Map getClausesContext(DSRequest req, List dataSources, boolean qualifyColumnNames, List customCriteriaFields, List customValueFields, List excludeCriteriaFields, Map operationBinding)
        throws Exception
    {
        String opType = req.getOperationType();
        Map context = new HashMap();
        context.put("defaultTableClause", (new SQLTableClause(req, dataSources)).getSQLString());
        ArrayList includeDataSources = new ArrayList(dataSources);
        for(int i = 0; i < dataSources.size(); i++)
        {
            BasicDataSource ds = (BasicDataSource)dataSources.get(i);
            if(ds.autoDeriveDS instanceof BasicDataSource)
                includeDataSources.add(ds.autoDeriveDS);
        }

        if(isFetch(opType) || isCustom(opType))
        {
            SQLSelectClause selectClause = new SQLSelectClause(req, includeDataSources, qualifyColumnNames);
            selectClause.setCustomValueFields(customValueFields);
            context.put("defaultSelectClause", selectClause.getSQLString());
            SQLOrderClause orderClause = new SQLOrderClause(req, dataSources, qualifyColumnNames);
            orderClause.setCustomValueFields(customValueFields);
            if(orderClause.size() > 0)
                context.put("defaultOrderClause", orderClause.getSQLString());
        }
        if(isAdd(opType) || isUpdate(opType) || isCustom(opType) || "replace".equals(opType))
        {
            SQLValuesClause valuesClause = new SQLValuesClause(req, (SQLDataSource)dataSources.get(0));
            if(valuesClause.size() > 0)
                if(isUpdate(opType))
                    context.put("defaultValuesClause", valuesClause.getSQLStringForUpdate());
                else
                    context.put("defaultValuesClause", valuesClause.getSQLStringForInsert());
        }
        if(!isAdd(opType))
        {
            boolean isFilter = "filter".equals(opType) || ("fetch".equals(opType) || "select".equals(opType)) && ("substring".equals(req.getTextMatchStyle()) || "startsWith".equals(req.getTextMatchStyle()));
            SQLWhereClause whereClause = new SQLWhereClause(qualifyColumnNames, req, dataSources, isFilter, req.getTextMatchStyle());
            whereClause.setCustomCriteriaFields(customCriteriaFields);
            whereClause.setExcludeCriteriaFields(excludeCriteriaFields);
            if(isRemove(opType) && whereClause.isEmpty() && (operationBinding == null || !operationBinding.containsKey("customSQL") && !operationBinding.containsKey("whereClause")))
                throw new SQLException("empty where clause on delete operation - would  destroy table - ignoring.");
            context.put("defaultWhereClause", whereClause.getSQLString());
            if(req.getIncludeFrom() != null && req.getIncludeFrom().size() > 0)
            {
                boolean oneSQLIncludeFrom = false;
                Iterator i = req.getIncludeFrom().iterator();
                do
                {
                    if(!i.hasNext())
                        break;
                    if(!isAllSql((IncludeFromDefinition)i.next()))
                        continue;
                    oneSQLIncludeFrom = true;
                    break;
                } while(true);
                if(oneSQLIncludeFrom)
                {
                    SQLJoinWhereClause joinWhereClause = new SQLJoinWhereClause(req, dataSources, qualifyColumnNames);
                    context.put("defaultJoinWhereClause", joinWhereClause.getSQLString());
                }
            }
        }
        return context;
    }

    private static boolean isAllSql(IncludeFromDefinition incFrom)
        throws Exception
    {
        for(; incFrom != null; incFrom = incFrom.getTargetIncludeFrom())
            if(!incFrom.getDataSource().canJoinIncludedFields())
                return false;

        return true;
    }

    private static Map getVariablesContext(DSRequest req, List dataSources)
        throws Exception
    {
        String opType = req.getOperationType();
        Map context = Velocity.getStandardContextMap(req);
        context.put("where", req.getCriteria());
        context.put("filter", new EscapedValuesMap(req.getCriteria(), dataSources, 2));
        context.put("equals", new EscapedValuesMap(req.getCriteria(), dataSources, 3));
        context.put("substringMatches", new EscapedValuesMap(req.getCriteria(), dataSources, 4));
        if(!(dataSources.get(0) instanceof SQLDataSource))
            return context;
        Map fields = new HashMap();
        Map qfields = new HashMap();
        SQLDataSource firstDS = (SQLDataSource)dataSources.get(0);
        Map remapTable = getField2ColumnMap(dataSources);
        Map column2TableMap = getColumn2TableMap(dataSources);
        String key;
        String columnName;
        for(Iterator i = firstDS.getFieldNames().iterator(); i.hasNext(); fields.put(key, firstDS.getDriver().sqlOutTransform(columnName, key, null)))
        {
            key = (String)i.next();
            columnName = (String)remapTable.get(key);
            String tableName = (String)column2TableMap.get(columnName);
            if(tableName == null)
                tableName = firstDS.getTable().getName();
            int j = 0;
            do
            {
                if(j >= dataSources.size())
                    break;
                DataSource ds = (DataSource)dataSources.get(j);
                DSField field = ds.getField(key);
                if(field != null)
                {
                    if(field.get("tableName") != null)
                        tableName = field.get("tableName").toString();
                    break;
                }
                j++;
            } while(true);
            qfields.put(key, firstDS.getDriver().sqlOutTransform(columnName, key, tableName));
        }

        context.put("fields", fields);
        context.put("qfields", qfields);
        Map rawValue = new HashMap();
        String key1;
        for(Iterator i = context.keySet().iterator(); i.hasNext(); rawValue.put(key1, context.get(key1)))
            key1 = i.next().toString();

        context.put("rawValue", rawValue);
        return context;
    }

    private static List getDataSources(List dataSourceList, DSRequest dsRequest)
        throws Exception
    {
        List dataSources = new ArrayList();
        Iterator i = dataSourceList.iterator();
        do
        {
            if(!i.hasNext())
                break;
            Object ds = i.next();
            if(ds instanceof SQLDataSource)
            {
                dataSources.add(ds);
            } else
            {
                SQLDataSource SQLds = (SQLDataSource)DataSourceManager.getDataSource((String)ds, dsRequest);
                if(SQLds != null)
                    dataSources.add(SQLds);
            }
        } while(true);
        return dataSources;
    }

    public static Map getField2ColumnMap(List dataSources)
    {
        return getField2ColumnMap(dataSources, false);
    }

    public static Map getField2ColumnMap(List dataSources, boolean primaryKeysOnly)
    {
        Map combinedRemap = new HashMap();
        for(Iterator i = dataSources.iterator(); i.hasNext();)
        {
            SQLDataSource ds = (SQLDataSource)i.next();
            Map singleRemap = ds.getExpandedDs2NativeFieldMap();
            if(primaryKeysOnly)
                singleRemap = DataTools.subsetMap(singleRemap, ds.getPrimaryKeys());
            combinedRemap = DataTools.orderedMapUnion(combinedRemap, singleRemap);
        }

        return combinedRemap;
    }

    public static Map getColumn2TableMap(List dataSources)
    {
        return getColumn2TableMap(dataSources, false);
    }

    public static Map getColumn2TableMap(List dataSources, boolean primaryKeysOnly)
    {
        Map column2TableMap = new HashMap();
        for(Iterator i = dataSources.iterator(); i.hasNext();)
        {
            SQLDataSource ds = (SQLDataSource)i.next();
            Map singleRemap = ds.ds2NativeFieldMap();
            if(primaryKeysOnly)
                singleRemap = DataTools.subsetMap(singleRemap, ds.getPrimaryKeys());
            Iterator ii = singleRemap.keySet().iterator();
            while(ii.hasNext()) 
            {
                Object column = ii.next();
                if(!column2TableMap.containsKey(column))
                    column2TableMap.put(column, ds.getTable().getName());
            }
        }

        return column2TableMap;
    }

    public static Map getCombinedValueMaps(List dataSources, List sortBy)
    {
        Map valueMaps = new HashMap();
        for(Iterator i = dataSources.iterator(); i.hasNext();)
        {
            SQLDataSource ds = (SQLDataSource)i.next();
            valueMaps = DataTools.orderedMapUnion(valueMaps, ds.getValueMaps(sortBy));
        }

        return valueMaps;
    }

    public static DataSource fromTable(Connection conn, String tableName, String schema)
        throws Exception
    {
        return fromTable(conn, tableName, tableName, schema, null, null, null, true, null);
    }

    public static DataSource fromTable(Connection conn, String tableName, String schema, String ID)
        throws Exception
    {
        return fromTable(conn, tableName, schema, ID, null, null, null, true, null);
    }

    public static DataSource fromTable(Connection conn, String tableName, String schema, String ID, String serverType)
        throws Exception
    {
        return fromTable(conn, tableName, schema, ID, serverType, null, null, true, null);
    }

    public static DataSource fromTable(Connection conn, String tableName, String schema, String ID, String serverType, String dbName)
        throws Exception
    {
        return fromTable(conn, tableName, schema, ID, serverType, dbName, null, true, null);
    }

    public static DataSource fromTable(Connection conn, String tableName, String schema, String ID, String serverType, String dbName, Map autoDeriveSchemaOperation, boolean cacheDS, 
            Map overriddenFields)
        throws Exception
    {
        if(serverType == null)
            serverType = "sql";
        if(tableName == null)
            tableName = ID;
        if(ID == null)
            ID = tableName;
        String wkTableName;
        if(tableName.endsWith("_inheritsFrom"))
            wkTableName = tableName.substring(0, tableName.lastIndexOf("_inheritsFrom"));
        else
            wkTableName = tableName;
        Map config = getConfigFromTable(conn, wkTableName, schema, ID, serverType, dbName, autoDeriveSchemaOperation, overriddenFields);
        config.put("__autoConstruct", "DataSource");
        if("hibernate".equals(serverType) && tableName.endsWith("_inheritsFrom"))
            config.put("_inheritsFrom", "true");
        if(cacheDS)
            config.put("dbName", dbName);
        DataSource ds = DataSource.fromConfig(config, null);
        log.warn((new StringBuilder()).append("ds:").append(DataTools.prettyPrint(ds)).toString());
        if(cacheDS)
            if(tableName.endsWith("_inheritsFrom"))
                DataStructCache.addCachedObjectWithNoConfigFile((new StringBuilder()).append(ID).append("_inheritsFrom").toString(), ds);
            else
                DataStructCache.addCachedObjectWithNoConfigFile(ID, ds);
        return ds;
    }

    public static Map getConfigFromTable(String tableName, String schema, String serverType, String dbName)
        throws Exception
    {
        return getConfigFromTable(null, tableName, tableName, schema, serverType, dbName, null, null);
    }

    public static Map getConfigFromTable(Connection conn, String tableName, String schema, String ID, String serverType, String dbName, Map autoDeriveSchemaOperation, Map overriddenFields)
        throws Exception
    {
        SQLDSGenerator generator = new SQLDSGenerator(tableName, schema, dbName, serverType);
        generator.setConn(conn);
        generator.setID(ID);
        generator.setOverriddenFields(overriddenFields);
        if(autoDeriveSchemaOperation != null)
            generator.setAutoDeriveSchemaOperation(autoDeriveSchemaOperation);
        return generator.generate();
    }

    public static List getFieldsFromTable(Connection conn, String tableName, String schema)
        throws Exception
    {
        return SQLDSGenerator.getFieldsFromTable(conn, tableName, schema);
    }

    public Object transformFieldValue(DSField field, Object obj)
    {
        return driver.transformFieldValue(field, obj);
    }

    protected Boolean autoJoinAtProviderLevel(DSRequest req)
    {
        String dbName = (String)dsConfig.get("dbName");
        if(dbName == null)
            dbName = config.getString("sql.defaultDatabase");
        String autoJoin = config.getString((new StringBuilder()).append("sql.").append(dbName).append(".autoJoinTransactions").toString());
        if(autoJoin == null)
            return null;
        if(autoJoin.toLowerCase().equals("true") || autoJoin.equals("ALL"))
            return Boolean.TRUE;
        if(autoJoin.toLowerCase().equals("false") || autoJoin.equals("NONE"))
            return Boolean.FALSE;
        if(req != null && req.rpc != null)
        {
            if(autoJoin.equals("FROM_FIRST_CHANGE"))
                return Boolean.valueOf(req.rpc.requestQueueIncludesUpdates());
            if(autoJoin.equals("ANY_CHANGE"))
                return Boolean.valueOf(req.rpc.requestQueueIncludesUpdates());
        }
        return null;
    }

    public int getProviderLevelTransactionPolicy(DSRequest req)
    {
        String dbName = (String)dsConfig.get("dbName");
        if(dbName == null)
            dbName = config.getString("sql.defaultDatabase");
        String autoJoin = config.getString((new StringBuilder()).append("sql.").append(dbName).append(".autoJoinTransactions").toString());
        if(autoJoin == null)
            return 0;
        if(autoJoin.toLowerCase().equals("true") || autoJoin.equals("ALL"))
            return 3;
        if(autoJoin.toLowerCase().equals("false") || autoJoin.equals("NONE"))
            return 4;
        if(req != null && req.rpc != null)
        {
            if(autoJoin.equals("FROM_FIRST_CHANGE"))
                return 1;
            if(autoJoin.equals("ANY_CHANGE"))
                return 2;
        }
        return 0;
    }

    public String getTransactionObjectKey()
        throws Exception
    {
        return (new StringBuilder()).append("_isc_sql_connection_").append(driver.getDBName()).toString();
    }

    public void onSuccess(RPCManager rpc)
        throws Exception
    {
        SQLTransaction.commitTransaction(rpc, driver.getDBName());
    }

    public void onFailure(RPCManager rpc, boolean transactionFailed)
        throws Exception
    {
        if(transactionFailed)
            SQLTransaction.rollbackTransaction(rpc, driver.getDBName());
        else
            SQLTransaction.commitTransaction(rpc, driver.getDBName());
    }

    public void freeResources(DSRequest req)
    {
        try
        {
            if(req != null && req.getRPCManager() != null && !req.getFreeOnExecute() && SQLTransaction.getConnection(req.getRPCManager(), driver.dbName) != null)
                SQLTransaction.endTransaction(req.getRPCManager());
        }
        catch(Exception e)
        {
            log.warn("Exception while ending transaction connection", e);
        }
        super.freeResources(req);
        if(downloadDsRequest != null)
            try
            {
                DataSourceManager.free(downloadDsRequest.getDataSource());
            }
            catch(Exception e)
            {
                log.warn("Exception while freeing download DSRequest", e);
            }
    }

    public boolean canJoinIncludedFields()
    {
        return true;
    }

    public boolean inheritsParent()
    {
        if(dsConfig.containsKey("autoInheritParent") && DataTools.getBoolean(dsConfig, "autoInheritParent"))
            return false;
        if(!(getSuper() instanceof SQLDataSource))
            return false;
        else
            return isRelatedThroughPrimaryKey(getSuper());
    }

    public List getPrimaryKeys()
    {
        if(primaryKeys != null && primaryKeys.size() > 0)
            return primaryKeys;
        List pks = new ArrayList();
        if(getSuper() != null)
            pks = getSuper().getPrimaryKeys();
        return pks;
    }

    public boolean shouldUseUTCDateTimes()
    {
        if(dsConfig.get("useUTCDateTimes") != null)
            return DataTools.getBoolean(dsConfig, "useUTCDateTimes");
        if(driver != null)
            return driver.useUTCDateTimes;
        else
            return true;
    }

    public static String getSQLClause(SQLClauseType type, DSRequest dsRequest)
        throws Exception
    {
        List dataSources = new ArrayList();
        DataSource ds = dsRequest.getDataSource();
        dataSources.add(ds);
        Map opBinding = ds.getOperationBinding(dsRequest);
        List customFields = getCustomFields(opBinding);
        List customCriteriaFields = getCustomCriteriaFields(opBinding);
        List customValueFields = getCustomValueFields(opBinding);
        List excludeValueFields = getExcludeValueFields(opBinding);
        if(customCriteriaFields == null)
            customCriteriaFields = customFields;
        if(customValueFields == null)
            customValueFields = customFields;
        Map context = Velocity.getStandardContextMap(dsRequest);
        context.putAll(getClausesContext(dsRequest, dataSources, shouldQualifyColumnNames(opBinding, ds), customCriteriaFields, customValueFields, excludeValueFields, opBinding));
        String clauseName = (new StringBuilder()).append(type).append("Clause").toString();
        String defaultClause = (new StringBuilder()).append("$default").append(clauseName).toString();
        clauseName = (new StringBuilder()).append(clauseName.substring(0, 1).toLowerCase()).append(clauseName.substring(1)).toString();
        String sql;
        if(type == SQLClauseType.All)
            sql = generateSQLStatement(dsRequest, context);
        else
            sql = getClause(dsRequest, clauseName, defaultClause);
        return Velocity.evaluateAsString(sql, context, (new StringBuilder()).append("getSQLClause(").append(type).append(")").toString(), ds, true);
    }

    public Object streamNextRecordAsObject(DSResponse response)
        throws StreamingResponseException
    {
        return _streamNextRecord(response, true);
    }

    public Map streamNextRecord(DSResponse response, Map context)
        throws StreamingResponseException
    {
        Object obj = _streamNextRecord(response, false);
        if(obj == null || (obj instanceof Map))
            return (Map)obj;
        else
            throw new StreamingResponseException((new StringBuilder()).append("Unexpected object type ").append(obj.getClass().getName()).append("returned from SQLTransform").toString());
    }

    private Object _streamNextRecord(DSResponse response, boolean convertToBeans)
        throws StreamingResponseException
    {
        try
        {
            Map context = response._getStreamingContext();
            ResultSet resultSet = (ResultSet)context.get("resultSet");
            List dataSources = (List)context.get("dataSources");
            Boolean brokenCursorAPIs = (Boolean)context.get("brokenCursorAPIs");
            Map opConfig = (Map)context.get("opConfig");
            DSRequest dsRequest = (DSRequest)context.get("dsRequest");
            List work = SQLTransform.toListOfMapsOrBeans(resultSet, 1L, brokenCursorAPIs.booleanValue(), dataSources, opConfig, dsRequest, convertToBeans, response);
            return work.get(0);
        }
        catch(Exception e)
        {
            if(e instanceof StreamingResponseException)
            {
                throw (StreamingResponseException)e;
            } else
            {
                StreamingResponseException sre = new StreamingResponseException("Exception trying to stream the next record in a SQLDataSource DSResponse");
                sre.initCause(e);
                throw sre;
            }
        }
    }

    private static Logger log = new Logger(com.isomorphic.sql.SQLDataSource.class.getName());
    private static List doNotSandboxTables;
    private static boolean wwwProduction;
    protected SQLTable table;
    protected SQLDriver driver;
    protected Object lastRow;
    protected Map lastPrimaryKeys;
    protected Map lastPrimaryKeysData;
    private DSRequest downloadDsRequest;
    private static final int MAX_TABLENAME_LENGTH = 64;

    static 
    {
        doNotSandboxTables = config.getList("doNotSandboxTables", new ArrayList());
        wwwProduction = config.getBoolean("wwwProduction", false);
    }
}


/*
	DECOMPILATION REPORT

	Decompiled from: D:\yangshaofeng\VB\WebContent\WEB-INF\lib\isomorphic_sql.jar
	Total time: 78 ms
	Jad reported messages/errors:
Overlapped try statements detected. Not all exception handlers will be resolved in the method executeWindowedSelect
Couldn't fully decompile method executeWindowedSelect
Couldn't resolve all exception handlers in method executeWindowedSelect
	Exit status: 0
	Caught exceptions:
*/