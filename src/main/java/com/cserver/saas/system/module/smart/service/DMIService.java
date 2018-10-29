package com.cserver.saas.system.module.smart.service;

import com.isomorphic.datasource.DSRequest;
import com.isomorphic.datasource.DSResponse;

public abstract class DMIService {
	public abstract DSResponse fetch(DSRequest req) throws Exception;
	//新增
	public DSResponse add(DSRequest req) throws Exception {
		if(null != req.context.request.getAttribute("Flow_action") && !"".equals(req.context.request.getAttribute("Flow_action")))
		{
			return (DSResponse)this.getClass().getMethod(req.context.request.getAttribute("Flow_action").toString(), new Class[]{req.getClass()}).invoke(this, req);
		}
		else
		{
			return (DSResponse)this.getClass().getMethod("addData", new Class[]{req.getClass()}).invoke(this, req);
		}
	}
	
	public DSResponse update(DSRequest req) throws Exception {	
		if(null != req.context.request.getAttribute("Flow_action") && !"".equals(req.context.request.getAttribute("Flow_action")))
		{
			return (DSResponse)this.getClass().getMethod(req.context.request.getAttribute("Flow_action").toString(), new Class[]{req.getClass()}).invoke(this, req);
		}
		else
		{
			return (DSResponse)this.getClass().getMethod("updateData", new Class[]{req.getClass()}).invoke(this, req);
		}
	}

	public abstract DSResponse remove(DSRequest req) throws Exception;
}
