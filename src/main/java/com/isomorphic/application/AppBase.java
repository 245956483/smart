/*jadclipse*/// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) radix(10) lradix(10) 
// Source File Name:   AppBase.java

package com.isomorphic.application;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.collections.map.LinkedMap;

import com.isomorphic.base.Base;
import com.isomorphic.base.Const;
import com.isomorphic.base.Reflection;
import com.isomorphic.collections.DataTypeMap;
import com.isomorphic.datasource.DSRequest;
import com.isomorphic.datasource.DSResponse;
import com.isomorphic.datasource.DataSource;
import com.isomorphic.datasource.DataSourceManager;
import com.isomorphic.datasource.FreeResourcesHandler;
import com.isomorphic.interfaces.IMessaging;
import com.isomorphic.interfaces.ISpringBeanFactory;
import com.isomorphic.interfaces.InterfaceProvider;
import com.isomorphic.log.Logger;
import com.isomorphic.servlet.RequestContext;
import com.isomorphic.store.DataStructCache;
import com.isomorphic.util.DataTools;

import isc.org.apache.oro.text.perl.Perl5Util;
import net.sf.json.JSONArray;

public class AppBase extends Base  implements FreeResourcesHandler
{

    public AppBase()
    {
        context = null;
        operation = null;
        operationType = null;
        request = null;
        result = null;
        userTypes = new HashMap();
        dataSource = null;
        operationsMap = null;
        leasedDataSources = new HashMap();
    }

    public static AppBase findByAppID(String appID)
        throws Exception
    {
    //	System.out.println("~~~~~~~~~~~~~~~~~~AppBase-appID"+appID);
        AppBase theApp = null;
        if(appID.equals("builtinApplication") || appID.equals("defaultApplication"))
            if(authorizationEnabled)
            {
                throw new Exception("The special application 'builtinApplication' cannot be used unless authorization is globally disabled (property authorization.enabled: false)");
            } else
            {
                theApp = new AppBase();
                theApp.appID = "builtinApplication";
                theApp.appConfig = new HashMap();
                return theApp;
            }
        Map appConfig = (Map)DataStructCache.getInstance(appID, "apps", "App");
        if(appConfig == null)
            throw new Exception((new StringBuilder()).append("Unable to find app file for application ID ").append(appID).toString());
        String appClassname = (String)appConfig.get("appImplementer");
        if(appClassname == null)
            appClassname = DEFAULT_IMPLEMENTER;
        else
        if(appClassname.indexOf(".") == -1 && DEFAULT_PACKAGE != null && !"".equals(DEFAULT_PACKAGE))
            appClassname = (new StringBuilder()).append(DEFAULT_PACKAGE).append(".").append(appClassname).toString();
        log.info((new StringBuilder()).append("Using class '").append(appClassname).append("' as the implementer for application '").append(appID).append("'").toString());
        theApp = null;
        try
        {
            theApp = (AppBase)Reflection.instantiateClass(appClassname);
        }
        catch(Exception e)
        {
            throw new Exception((new StringBuilder()).append("Unable to instantiate ").append(appClassname).append(" - check the appImplementer setting in the app file").append(" for appID: ").append(appID).append(" and ensure that your class has a").append(" public zero-argument constructor").append(" - actual error was: ").append(e.toString()).toString());
        }
        theApp.appID = appID;
        theApp.appConfig = appConfig;
        Map userTypes = (Map)appConfig.get("userTypes");
        Map userTypeRequirements = userTypes;
        if(userTypes != null && !userTypes.isEmpty() && (userTypes.values().iterator().next() instanceof Map))
        {
            userTypeRequirements = new LinkedMap();
            Map userType;
            String userTypeID;
            for(Iterator e = userTypes.values().iterator(); e.hasNext(); userTypeRequirements.put(userTypeID, userType.get("requirements")))
            {
                userType = (Map)e.next();
                userTypeID = (String)userType.get("ID");
            }

        }
        log.info((new StringBuilder()).append("UserType requirements: ").append(DataTools.prettyPrint(userTypeRequirements)).toString());
        theApp.definedUserTypes = userTypeRequirements;
        return theApp;
    }

    protected void canPerformAutoOperation()
        throws Exception
    {
        if(appID.equals("builtinApplication") || appID.equals("defaultApplication"))
        {
            if(authorizationEnabled)
                throw new Exception((new StringBuilder()).append("DENIED attempt to execute auto operation '").append(operation).append("' bound to the auto-generated default application ").append("because authorization is currently enabled").toString());
        } else
        {
            Boolean definedOperationsOnly = (Boolean)appConfig.get("definedOperationsOnly");
            Map opConfig = getOperationConfig(operation);
            if(definedOperationsOnly != null && definedOperationsOnly.booleanValue() && (opConfig == null || opConfig.isEmpty()))
                throw new Exception((new StringBuilder()).append("DENIED attempt to execute auto operation '").append(operation).append("' bound to the application '").append(appID).append("' because").append(" this application is configued for defined operations").append(" only and there is no definition for this operation").append(" in the app file").toString());
        }
    }

    protected Map createAutoOperation(String operationType, Map passedOperationConfig, String dataSourceId)
    {
        if(passedOperationConfig == null)
            passedOperationConfig = new HashMap();
        passedOperationConfig.remove("dataSource");
        passedOperationConfig.remove("type");
        passedOperationConfig.remove("ID");
        Map defaultOperationConfig = DataTools.buildMap("ID", operation, "type", operationType, "dataSource", dataSourceId);
        DataTools.mapMerge(defaultOperationConfig, passedOperationConfig);
        return passedOperationConfig;
    }

    private boolean userQualifiesForOperation(String operation)
        throws Exception
    {
        if(definedUserTypes == null || definedUserTypes.size() == 0)
        {
            log.debug("No userTypes defined, allowing anyone access to all operations for this application");
            return true;
        }
        Map opConstraints = getOperationConstraints(operation);
        List allowedUserTypes;
        if(opConstraints == null || opConstraints.containsKey("*"))
            allowedUserTypes = DataTools.enumToList(definedUserTypes.keySet().iterator());
        else
            allowedUserTypes = DataTools.enumToList(opConstraints.keySet().iterator());
        List qualifiedUserTypes = userIsOfTypes(allowedUserTypes);
        if(qualifiedUserTypes != null)
        {
            log.debug("Qualified for user types for this operation", qualifiedUserTypes);
            return true;
        } else
        {
            return false;
        }
    }

    public boolean userQualifiesForType(String userType)
        throws Exception
    {
        Logger.auth.info("AppBase::boolean userQualifiesForType(String userType): override this method to provide custom userType qualification logic (base implementation returns true)");
        return true;
    }

    public boolean userIsOfType(String userType)
        throws Exception
    {
        if(definedUserTypes == null)
            return false;
        Boolean qualified = (Boolean)userTypes.get(userType);
        if(qualified != null)
        {
            return qualified.booleanValue();
        } else
        {
            qualified = new Boolean(!authorizationEnabled || userQualifiesForType(userType));
            userTypes.put(userType, qualified);
            return qualified.booleanValue();
        }
    }

    public List userIsOfTypes()
        throws Exception
    {
        if(definedUserTypes == null)
            return null;
        else
            return userIsOfTypes(DataTools.enumToList(definedUserTypes.keySet().iterator()));
    }

    public List userIsOfTypes(List userTypes)
        throws Exception
    {
        List qualified = new ArrayList();
        Iterator e = userTypes.iterator();
        do
        {
            if(!e.hasNext())
                break;
            String userType = (String)e.next();
            if(userIsOfType(userType))
                qualified.add(userType);
        } while(true);
        if(qualified.size() > 0)
            return qualified;
        else
            return null;
    }

    public DSResponse execute(DSRequest request, RequestContext context)
        throws Exception
    {
        this.request = request;
        this.context = context;
        result = new DSResponse(request != null ? request.getDataSource() : (DataSource)null);
        Logger.pushContext((new StringBuilder()).append(request.getAppID()).append(".").append(request.getOperation()).toString());
        DSResponse dsresponse;
        operation = request.getOperation();
        Map operationConfig = getOperationConfig(operation);
        String dataSourceId;
        if(operationConfig == null || operationConfig.isEmpty())
        {
            canPerformAutoOperation();
            dataSourceId = request.getDataSourceName();
            String operationType = request.getOperationType();
            if((dataSourceId == null || operationType == null) && getCustomMethod(operation) == null)
            {
                String message = (new StringBuilder()).append("Auto-operation name (").append(operation).append(") must either be of the format ").append("dataSourceId_operationType or a public zero-argument method").toString();
                throw new Exception(message);
            }
            Map operations = getOperationsMap();
            operationConfig = createAutoOperation(operationType, request.getOperationConfig(), dataSourceId);
            operations.put(operation, operationConfig);
        } else
        {
            this.operationType = getDSOperationType(operation);
        }
        if (!(userQualifiesForOperation(this.operation)))
        {
          log.warn("User does not qualify for any userTypes that are allowed to perform this operation ('" + this.operation + "')");

          this.result.setStatus(Const.AUTHORIZATION_FAILURE);
          return this.result;
        }
        try
        {
          executeAppOperation();
        } finally {
          freeDataSources();
        }

        if (this.result.getStatus() == Const.UNSET) this.result.setSuccess();

        if (this.result.statusIsError()) { 
          return this.result;
        }
        String exportAs = (String)getOperationProperty(this.operation, "exportAs");
        if (exportAs != null) {
          throw new Exception("CSV export is not supported in this version.");
        }


        return this.result;
        
       /* if(userQualifiesForOperation(operation))
            break MISSING_BLOCK_LABEL_293;
        log.warn((new StringBuilder()).append("User does not qualify for any userTypes that are allowed to perform this operation ('").append(operation).append("')").toString());
        result.setStatus(Const.AUTHORIZATION_FAILURE);
        dsresponse = result;
        Logger.popContext();
        return dsresponse;
        executeAppOperation();
        freeDataSources();
        break MISSING_BLOCK_LABEL_313;
        Exception exception;
        exception;
        freeDataSources();
        throw exception;
        if(result.getStatus() == Const.UNSET)
            result.setSuccess();
        if(!result.statusIsError())
            break MISSING_BLOCK_LABEL_356;
        dsresponse = result;
        Logger.popContext();
        return dsresponse;
        DSResponse dsresponse1;
        String exportAs = (String)getOperationProperty(operation, "exportAs");
        if(exportAs != null)
            throw new Exception("CSV export is not supported in this version.");
        dsresponse1 = result;
        Logger.popContext();
        return dsresponse1;
        Exception exception1;
        exception1;
        Logger.popContext();
        throw exception1;*/
    }

    public void _messagingSend()
        throws Exception
    {
        IMessaging messaging = (IMessaging)InterfaceProvider.load("IMessaging");
        messaging.send(context, request.getValues());
    }

    protected void executeAppOperation()
        throws Exception
    {
        Method customMethod = getCustomMethod(operation);
        if(customMethod != null)
        {
            log.info((new StringBuilder()).append("Invoking custom app operation method '_").append(operation).append("'").toString());
            customMethod.invoke(this, new Class[0]);
        } else
        {
            log.debug((new StringBuilder()).append("No public zero-argument method named '_").append(operation).append("' found, performing generic datasource operation").toString());
            String dsName = request.getDataSourceName();
            if(dsName == null)
                throw new Exception((new StringBuilder()).append("No public zero-argument method named '_").append(operation).append(" and request does not specify a DataSource to use for a default operation").append(" - unable to proceed.").toString());
            dataSource = request.getDataSource();
            executeDefaultDSOperation();
            dataSource = null;
        }
    }

	protected void executeDefaultDSOperation() throws Exception {
		DataSource ds;
		 String dsName = request.getDataSourceName();
		label0: {
			ds = request.getDataSource();
			if (ds == null)
				throw new Exception((new StringBuilder())
						.append("Can't find dataSource: ").append(dsName)
						.append(" - please make sure that you have a ")
						.append(dsName).append(".ds.xml")
						.append(" file for it in [webRoot]/shared/ds")
						.toString());
			String operationType = request.getOperationType();
			if (!request.isClientRequest || request.getAllowMultiUpdate()
					|| !"remove".equals(operationType)
					&& !"update".equals(operationType))
				break label0;
			List criteria = request.getCriteriaSets();
			Iterator i = criteria.iterator();
			Boolean allowMultiUpdate;
			/*
			 * do { List keysMissing; do { if(!i.hasNext()) break label0; Map
			 * data = (Map)i.next(); if(data == null) throw new Exception((new
			 * StringBuilder
			 * ()).append("Received null criteria for ").append(operationType
			 * ).append
			 * (" operation - would delete all records - ignoring.").toString
			 * ()); List passedKeys = new ArrayList(data.keySet()); List
			 * keysPresent = DataTools.setIntersection(ds.getPrimaryKeys(),
			 * passedKeys); keysMissing =
			 * DataTools.setDisjunction(ds.getPrimaryKeys(), keysPresent); }
			 * while(ds instanceof SessionDataSource); Map opBinding =
			 * ds.getOperationBinding(operationType, request.getOperationId());
			 * allowMultiUpdate = Boolean.FALSE; if(opBinding != null)
			 * allowMultiUpdate = (Boolean)opBinding.get("allowMultiUpdate");
			 * if(keysMissing.size() > 0 &&
			 * !Boolean.TRUE.equals(allowMultiUpdate)) throw new
			 * UpdateWithoutPKException((new
			 * StringBuilder()).append("Criteria received from the client for "
			 * ).
			 * append(operationType).append(" operation is missing the following "
			 * )
			 * .append("required unique and/or primary fields: ").append(keysMissing
			 * .toString()).append(". Either provide all primary ").append(
			 * "key fields or set allowMultiUpdate on the OperationBinding"
			 * ).toString()); } while(ds.getPrimaryKeys().size() != 0 ||
			 * Boolean.TRUE.equals(allowMultiUpdate));
			 */
			// throw new UpdateWithoutPKException((new
			// StringBuilder()).append(operationType).append(" operation received ").append("from client for DataSource '").append(ds.getName()).append("', ").append("operationId '").append(request.getOperationId()).append("'. This ").append("is not allowed because the DataSource has no ").append("primaryKey.  Either declare a primaryKey or ").append("set allowMultiUpdate to true on the OperationBinding").toString());
		}
		 String type = request.getOperationType();   
	        if (("add".equals(type) || "update".equals(type)) && !dsName.equals("Filesystem")) {
	        	if("add".equals(type)) {
		  			  Map map = request.getValues();
		  			  if(null == map.get("id") && null == map.get("ID")) {
		  				  //附件 主子表等功能 提交表单前，提前给主表添加Id
		  				  Object formInitId = map.get("formInitId");
		  				  String id = System.currentTimeMillis()+"";
		  				  if(null != formInitId) {
		  					  id = map.get("formInitId").toString();
		  				  }
		  				  map.put("id", id);
			  			  map.put("ID", id);
		                  map.put("createTime", new Date());
		                  map.put("updateTime", new Date());
		                  map.put("printWord", "<a href=\"PrintWordServlet?dsId=" + dsName + "&id=" + id + "\">打印</a>");
			  			  request.setValues(map);
		  			  }
		  		}
	        	if("update".equals(type)) {
	        		 Map map = request.getValues();
	        		 map.put("updateTime", new Date());
	        		 request.setValues(map);
	        	}
				result = ds.execute(request);
			} else {
				Object exportResults = request.getParameter("exportResults");
				if(null != exportResults) {
					if("true".equals(exportResults.toString())) {
						String exportFieldTitles = (String) request.getParameter("exportFieldTitles");
						exportFieldTitles = "[" + new String(exportFieldTitles.getBytes("iso-8859-1"),"gbk") + "]";
						List title = new ArrayList(); 
						JSONArray jsonArray = JSONArray.fromObject(exportFieldTitles);
						title = JSONArray.toList(jsonArray, Map.class);
						Map exportFieldTitlesMap = (Map) title.get(0);
						request.setParameter("exportFieldTitles", exportFieldTitlesMap);
					}
				}
				result = ds.execute(request);
			}

	}
    public void freeDataSources()
    {
        for(Iterator i = leasedDataSources.values().iterator(); i.hasNext(); DataSourceManager.freeDataSource((DataSource)i.next()));
    }

    private Method getCustomMethod(String operationName)
    {
        String dataSourceId;
        try
        {
            Method method = Reflection.findMethod(this, (new StringBuilder()).append("_").append(operationName).toString());
            if(method != null)
                return method;
       
	        if(dataSource == null) 	
	            return null;
	        if(!"auto".equals(request.getOperationSource())) {
	        	String dataSourceId1 = this.dataSource.getName();
	            if ("fetch".equals(this.operationType))
	              return Reflection.findMethod(this, "_" + dataSourceId1 + "_select");
	            if ("add".equals(this.operationType))
	              return Reflection.findMethod(this, "_" + dataSourceId1 + "_insert");
	            if ("remove".equals(this.operationType)) {
	              return Reflection.findMethod(this, "_" + dataSourceId1 + "_delete");
	            }
	        }
	        return null; 
        }
        catch(Exception e)
        {
            return null;
        }
    }

    public Map getOperationsMap()
    {
        if((Map)appConfig.get("operations") == null)
            appConfig.put("operations", new HashMap());
        if(operationsMap == null)
            operationsMap = new DataTypeMap((Map)appConfig.get("operations"));
        return operationsMap;
    }

    public Map getOperationConfig(String appOperation)
    {
        Map opConfig = (Map)getOperationsMap().get(appOperation);
        if(opConfig == null)
            return new HashMap();
        else
            return opConfig;
    }

    public Object getOperationProperty(String appOperation, String property)
    {
        try
        {
            return DataTools.nestedGet(getOperationsMap(), (new StringBuilder()).append(appOperation).append(".").append(property).toString());
        }
        catch(Exception e)
        {
            return null;
        }
    }

    public Map getOperationConstraints(String appOperation)
    {
        return (Map)getOperationProperty(appOperation, "constraints");
    }

    public Map getOperationOutputs(String appOperation)
    {
        return (Map)getOperationProperty(appOperation, "outputs");
    }

    public String getDSOperationType(String appOperation)
    {
        return (String)getOperationProperty(appOperation, "type");
    }

    public List getConstraintsForUserType(String userType, String operation)
    {
        Map opConstraints = getOperationConstraints(operation);
        if(opConstraints == null || opConstraints.get(userType) == null)
            return null;
        else
            return DataTools.makeListIfSingle(opConstraints.get(userType));
    }

    public List getOutputsForUserType(String userType, String operation)
    {
        Map opOutputs = getOperationOutputs(operation);
        if(opOutputs == null || opOutputs.get(userType) == null)
            return null;
        else
            return DataTools.makeListIfSingle(opOutputs.get(userType));
    }

    public void _getTime()
        throws Exception
    {
        Long currentTime = new Long(System.currentTimeMillis());
        result.setData(currentTime);
    }

    protected static Logger log = new Logger(com.isomorphic.application.AppBase.class.getName());
    protected static final boolean authorizationEnabled;
    protected static Perl5Util staticRegex = new Perl5Util();
    protected String appID;
    protected Map appConfig;
    protected Map definedUserTypes;
    protected RequestContext context;
    protected String operation;
    protected String operationType;
    protected DSRequest request;
    protected DSResponse result;
    protected Map userTypes;
    protected DataSource dataSource;
    protected Map operationsMap;
    protected static String DEFAULT_IMPLEMENTER = "com.isomorphic.application.AppBase";
    protected static String DEFAULT_PACKAGE;
    Map leasedDataSources;

    static 
    {
        authorizationEnabled = config.getBoolean("authorization.enabled", false);
        DEFAULT_PACKAGE = config.getString("application.defaultPackage");
    }

	@Override
	 public void freeResources(DSRequest req)
	    {
		
		DataSource ds;
		try {
			ds = req.getDataSource();
			System.out.println("freeResources中~~~~~~~~~~~~~~freeResources:ds="+ds);
			DataSourceManager.free(ds);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	        
	    }
}


/*
	DECOMPILATION REPORT

	Decompiled from: D:\yangshaofeng\VB\WebContent\WEB-INF\lib\isomorphic_core_rpc.jar
	Total time: 115 ms
	Jad reported messages/errors:
Overlapped try statements detected. Not all exception handlers will be resolved in the method execute
Couldn't fully decompile method execute
Couldn't resolve all exception handlers in method execute
Couldn't resolve all exception handlers in method getCustomMethod
	Exit status: 0
	Caught exceptions:
*/